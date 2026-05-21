/**
 * Zooni Image Cropper — Módulo partilhado
 * Usa Cropper.js para recorte de imagens antes do upload.
 * Injeta automaticamente o modal de crop na página.
 */

(function () {
    'use strict';

    // ── Injetar CSS do Cropper.js ────────────────────────────────────
    if (!document.getElementById('zooni-cropperjs-css')) {
        const link = document.createElement('link');
        link.id = 'zooni-cropperjs-css';
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.css';
        document.head.appendChild(link);
    }

    // ── Injetar CSS do modal de crop ─────────────────────────────────
    if (!document.getElementById('zooni-cropper-style')) {
        const style = document.createElement('style');
        style.id = 'zooni-cropper-style';
        style.textContent = `
            #zooniCropModal .modal-content {
                border-radius: 20px;
                border: none;
                box-shadow: 0 20px 60px rgba(0,0,0,0.2);
            }
            #zooniCropModal .modal-header {
                background: linear-gradient(135deg, #1E4D1E, #3D8B3D);
                border-radius: 20px 20px 0 0;
                border: none;
                padding: 1.2rem 1.5rem;
            }
            #zooniCropModal .modal-title {
                color: #fff;
                font-weight: 700;
                font-size: 1rem;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            #zooniCropModal .btn-close {
                filter: invert(1);
            }
            #zooniCropModal .modal-body {
                padding: 1.5rem;
                background: var(--bg-color, #f8f9fa);
            }
            #zooniCropModal .modal-footer {
                border: none;
                padding: 0 1.5rem 1.5rem;
                gap: 10px;
                background: var(--bg-color, #f8f9fa);
                border-radius: 0 0 20px 20px;
            }
            #zooniCropContainer {
                max-height: 420px;
                overflow: hidden;
                border-radius: 12px;
                background: #1a1a1a;
                position: relative;
            }
            #zooniCropContainer img {
                display: block;
                max-width: 100%;
            }
            #zooniCropModal .crop-hint {
                font-size: 0.8rem;
                color: var(--text-sec, #6c757d);
                text-align: center;
                margin-top: 0.75rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
            }
            #zooniCropModal .btn-crop-confirm {
                background: linear-gradient(135deg, #3D8B3D, #5CB85C);
                color: #fff;
                border: none;
                border-radius: 12px;
                padding: 10px 28px;
                font-weight: 700;
                font-size: 0.9rem;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            #zooniCropModal .btn-crop-confirm:hover {
                transform: translateY(-1px);
                box-shadow: 0 6px 20px rgba(61,139,61,0.35);
            }
            #zooniCropModal .btn-crop-cancel {
                background: transparent;
                border: 1.5px solid var(--border, #dee2e6);
                border-radius: 12px;
                padding: 10px 22px;
                font-weight: 600;
                font-size: 0.9rem;
                cursor: pointer;
                color: var(--text-sec, #6c757d);
                transition: all 0.2s;
            }
            #zooniCropModal .btn-crop-cancel:hover {
                border-color: #d63031;
                color: #d63031;
            }
            #zooniCropModal .crop-tools {
                display: flex;
                justify-content: center;
                gap: 8px;
                margin-top: 0.75rem;
            }
            #zooniCropModal .crop-tool-btn {
                width: 36px;
                height: 36px;
                border-radius: 8px;
                border: 1.5px solid var(--border, #dee2e6);
                background: var(--card-bg, #fff);
                color: var(--text-sec, #555);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.85rem;
                transition: all 0.15s;
            }
            #zooniCropModal .crop-tool-btn:hover {
                border-color: #3D8B3D;
                color: #3D8B3D;
                background: rgba(61,139,61,0.08);
            }
        `;
        document.head.appendChild(style);
    }

    // ── Injetar HTML do modal ─────────────────────────────────────────
    function injectCropModal() {
        if (document.getElementById('zooniCropModal')) return;
        const modal = document.createElement('div');
        modal.innerHTML = `
        <div class="modal fade" id="zooniCropModal" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title">
                            <i class="fa-solid fa-crop-simple"></i>
                            Recortar Imagem
                        </div>
                        <button type="button" class="btn-close" id="zooniCropCancelBtn" aria-label="Cancelar"></button>
                    </div>
                    <div class="modal-body">
                        <div id="zooniCropContainer">
                            <img id="zooniCropImage" src="" alt="Imagem a recortar">
                        </div>
                        <div class="crop-tools">
                            <button class="crop-tool-btn" onclick="ZooniCropper._rotate(-90)" title="Rodar esquerda">
                                <i class="fa-solid fa-rotate-left"></i>
                            </button>
                            <button class="crop-tool-btn" onclick="ZooniCropper._rotate(90)" title="Rodar direita">
                                <i class="fa-solid fa-rotate-right"></i>
                            </button>
                            <button class="crop-tool-btn" onclick="ZooniCropper._flip('h')" title="Espelhar horizontal">
                                <i class="fa-solid fa-left-right"></i>
                            </button>
                            <button class="crop-tool-btn" onclick="ZooniCropper._flip('v')" title="Espelhar vertical">
                                <i class="fa-solid fa-up-down"></i>
                            </button>
                            <button class="crop-tool-btn" onclick="ZooniCropper._reset()" title="Repor">
                                <i class="fa-solid fa-arrows-rotate"></i>
                            </button>
                        </div>
                        <p class="crop-hint">
                            <i class="fa-solid fa-circle-info"></i>
                            Arraste para mover · Pinça/scroll para zoom · Use as ferramentas para rodar
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-crop-cancel" id="zooniCropCancelBtn2">
                            <i class="fa-solid fa-xmark me-1"></i> Cancelar
                        </button>
                        <button class="btn-crop-confirm" id="zooniCropConfirmBtn">
                            <i class="fa-solid fa-check"></i> Aplicar Recorte
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
        document.body.appendChild(modal.firstElementChild);
    }

    // ── Carregar Cropper.js dinamicamente ───────────────────────────
    function loadCropperJS(cb) {
        if (window.Cropper) { cb(); return; }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.js';
        script.onload = cb;
        document.head.appendChild(script);
    }

    // ── Estado interno ───────────────────────────────────────────────
    let _cropperInstance = null;
    let _currentCallback = null;
    let _currentOptions = {};
    let _scaleX = 1;
    let _scaleY = 1;

    // ── API pública ──────────────────────────────────────────────────
    window.ZooniCropper = {

        /**
         * Abre o modal de crop para um ficheiro.
         * @param {File} file - O ficheiro de imagem selecionado
         * @param {Object} options - { aspectRatio: 1, maxSize: 800, quality: 0.88 }
         * @param {Function} callback - Recebe (blob, dataUrl) após confirmar
         */
        open(file, options, callback) {
            if (!file || !file.type.startsWith('image/')) return;
            _currentCallback = callback;
            _currentOptions = Object.assign({ aspectRatio: NaN, maxSize: 1200, quality: 0.88 }, options);
            _scaleX = 1;
            _scaleY = 1;

            loadCropperJS(() => {
                injectCropModal();

                const reader = new FileReader();
                reader.onload = (e) => {
                    const modalEl = document.getElementById('zooniCropModal');
                    const img = document.getElementById('zooniCropImage');
                    img.src = e.target.result;

                    // Destruir instância anterior se existir
                    if (_cropperInstance) { _cropperInstance.destroy(); _cropperInstance = null; }

                    const bsModal = new bootstrap.Modal(modalEl);
                    bsModal.show();

                    // Inicializar Cropper após o modal estar visível
                    modalEl.addEventListener('shown.bs.modal', function onShown() {
                        modalEl.removeEventListener('shown.bs.modal', onShown);
                        _cropperInstance = new Cropper(img, {
                            aspectRatio: _currentOptions.aspectRatio,
                            viewMode: 1,
                            dragMode: 'move',
                            autoCropArea: 0.85,
                            restore: false,
                            guides: true,
                            center: true,
                            highlight: false,
                            cropBoxMovable: true,
                            cropBoxResizable: true,
                            toggleDragModeOnDblclick: false,
                            responsive: true,
                        });
                    }, { once: true });

                    // Botões cancelar
                    const cancelHandler = () => {
                        bootstrap.Modal.getInstance(modalEl)?.hide();
                        if (_cropperInstance) { _cropperInstance.destroy(); _cropperInstance = null; }
                        _currentCallback = null;
                    };
                    document.getElementById('zooniCropCancelBtn').onclick = cancelHandler;
                    document.getElementById('zooniCropCancelBtn2').onclick = cancelHandler;

                    // Botão confirmar
                    document.getElementById('zooniCropConfirmBtn').onclick = () => {
                        if (!_cropperInstance) return;
                        const btn = document.getElementById('zooniCropConfirmBtn');
                        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> A processar...';
                        btn.disabled = true;

                        setTimeout(() => {
                            const canvas = _cropperInstance.getCroppedCanvas({
                                maxWidth: _currentOptions.maxSize,
                                maxHeight: _currentOptions.maxSize,
                                imageSmoothingEnabled: true,
                                imageSmoothingQuality: 'high',
                            });

                            canvas.toBlob((blob) => {
                                const dataUrl = canvas.toDataURL('image/jpeg', _currentOptions.quality);
                                bootstrap.Modal.getInstance(modalEl)?.hide();
                                _cropperInstance.destroy();
                                _cropperInstance = null;
                                btn.innerHTML = '<i class="fa-solid fa-check"></i> Aplicar Recorte';
                                btn.disabled = false;

                                if (_currentCallback) {
                                    _currentCallback(blob, dataUrl);
                                    _currentCallback = null;
                                }
                            }, 'image/jpeg', _currentOptions.quality);
                        }, 50);
                    };
                };
                reader.readAsDataURL(file);
            });
        },

        // Ferramentas internas (usadas pelos botões do modal)
        _rotate(deg) { _cropperInstance?.rotate(deg); },
        _flip(axis) {
            if (!_cropperInstance) return;
            if (axis === 'h') { _scaleX = -_scaleX; _cropperInstance.scaleX(_scaleX); }
            else { _scaleY = -_scaleY; _cropperInstance.scaleY(_scaleY); }
        },
        _reset() {
            if (!_cropperInstance) return;
            _scaleX = 1; _scaleY = 1;
            _cropperInstance.reset();
        }
    };

})();
