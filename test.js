
    /* ── Supabase Init ────────────────────────────────────────── */
    const SUPABASE_URL = 'https://xqtbtggmwejnkhckduti.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxdGJ0Z2dtd2VqbmtoY2tkdXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2OTU5NjEsImV4cCI6MjA4MzI3MTk2MX0.G1wG0UC6sF7r6tMxGdqLGvsHa_dxlVD1-j6QNEw32IM';
    const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    /* ── State ────────────────────────────────────────────────── */
    let VET_USER_ID = null;
    let allPatients = [];       // Raw data from DB
    let filteredPatients = [];  // After search/filter
    let currentAnimalId = null; // Selected for offcanvas
    let currentDonoId = null;
    let currentFilter = 'todos';

    const PAGE_SIZE = 12;
    let currentPage = 1;

    /* ── Bootstrap Offcanvas Instance ───────────────────────── */
    const offcanvasEl = document.getElementById('clinicalOffcanvas');
    const ocInstance = new bootstrap.Offcanvas(offcanvasEl);

    /* ── Auth & Bootstrap ────────────────────────────────────── */
    async function init() {
        const { data: { session } } = await sb.auth.getSession();
        if (!session) { window.location.href = 'login.html?role=veterinario'; return; }
        VET_USER_ID = session.user.id;
        await loadPatients();
    }

    /* ── Load Patients from DB ───────────────────────────────── */
    async function loadPatients() {
        try {
            // Strategy: fetch all agendamentos for this vet, join with animais + clientes
            // This respects the security rule: vet sees only his/her own patients
            const { data: agendamentos, error } = await sb
                .from('agendamentos')
                .select(`
                    id_animal,
                    data_hora_inicio,
                    status,
                    animais (
                        id, nome, raca, tipo_animal, foto_url,
                        "Data de nascimento",
                        microchip, peso_kg, alergias, alertas_clinicos,
                        proxima_vacina, proxima_desparas, id_dono
                    ),
                    clientes ( id, nome, user_id )
                `)
                .eq('id_vet', VET_USER_ID)
                .in('status', ['Confirmado', 'Concluido', 'Realizado'])
                .order('data_hora_inicio', { ascending: false });

            if (error) throw error;

            // Deduplicate by animal id, keeping the most recent agendamento
            const seen = new Map();
            (agendamentos || []).forEach(ag => {
                if (!ag.animais) return;
                const aId = ag.animais.id;
                if (!seen.has(aId)) {
                    seen.set(aId, {
                        ...ag.animais,
                        ultima_data_agendamento: ag.data_hora_inicio,
                        dono_nome: ag.clientes?.nome || '—',
                        dono_id_bigint: ag.clientes?.id,
                        dono_user_id: ag.clientes?.user_id
                    });
                }
            });

            allPatients = Array.from(seen.values());
            updateStats();
            filterAndRender();

        } catch (err) {
            console.error('Erro ao carregar pacientes:', err);
            document.getElementById('tableBody').innerHTML = `
                <tr><td colspan="8">
                    <div class="empty-table-state">
                        <i class="fa-solid fa-circle-exclamation"></i>
                        <p class="fw-bold">Erro ao carregar pacientes</p>
                        <p class="small">Verifique a ligação e tente novamente.</p>
                    </div>
                </td></tr>`;
        }
    }

    /* ── Stats KPIs ──────────────────────────────────────────── */
    function updateStats() {
        document.getElementById('statTotal').textContent = allPatients.length;

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentCount = allPatients.filter(p => {
            if (!p.ultima_data_agendamento) return false;
            return new Date(p.ultima_data_agendamento) >= thirtyDaysAgo;
        }).length;
        document.getElementById('statUltimoMes').textContent = recentCount;

        const today = new Date(); today.setHours(0,0,0,0);
        const atrasadas = allPatients.filter(p => {
            if (!p.proxima_vacina) return false;
            return new Date(p.proxima_vacina) < today;
        }).length;
        document.getElementById('statVacinaAtrasada').textContent = atrasadas;

        const comAlerta = allPatients.filter(p => p.alertas_clinicos || p.alergias).length;
        document.getElementById('statComAlerta').textContent = comAlerta;
    }

    /* ── Filter & Search ─────────────────────────────────────── */
    function setFilter(filter, pill) {
        currentFilter = filter;
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentPage = 1;
        filterAndRender();
    }

    function filterAndRender() {
        const query = document.getElementById('searchInput').value.trim().toLowerCase();
        const today = new Date(); today.setHours(0,0,0,0);
        const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        filteredPatients = allPatients.filter(p => {
            // Species filter
            if (currentFilter === 'cão') {
                if (!p.tipo_animal?.toLowerCase().includes('cão')) return false;
            } else if (currentFilter === 'gato') {
                if (!p.tipo_animal?.toLowerCase().includes('gato')) return false;
            } else if (currentFilter === 'exotico') {
                const t = p.tipo_animal?.toLowerCase() || '';
                if (t.includes('cão') || t.includes('gato')) return false;
            } else if (currentFilter === 'ultimo_mes') {
                if (!p.ultima_data_agendamento) return false;
                if (new Date(p.ultima_data_agendamento) < thirtyDaysAgo) return false;
            }

            // Text search
            if (query) {
                const nome = p.nome?.toLowerCase() || '';
                const dono = p.dono_nome?.toLowerCase() || '';
                const chip = p.microchip?.toLowerCase() || '';
                const raca = p.raca?.toLowerCase() || '';
                if (!nome.includes(query) && !dono.includes(query) &&
                    !chip.includes(query) && !raca.includes(query)) return false;
            }
            return true;
        });

        renderTable();
    }

    /* ── Render Table ────────────────────────────────────────── */
    function renderTable() {
        const tbody = document.getElementById('tableBody');
        const pagWrap = document.getElementById('paginationWrap');

        if (filteredPatients.length === 0) {
            tbody.innerHTML = `
                <tr><td colspan="8">
                    <div class="empty-table-state">
                        <i class="fa-solid fa-paw"></i>
                        <p class="fw-bold mb-1">Nenhum paciente encontrado</p>
                        <p class="small">Ajuste os filtros ou a pesquisa.</p>
                    </div>
                </td></tr>`;
            pagWrap.style.display = 'none';
            return;
        }

        const totalPages = Math.ceil(filteredPatients.length / PAGE_SIZE);
        if (currentPage > totalPages) currentPage = 1;
        const pageData = filteredPatients.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

        tbody.innerHTML = pageData.map(p => buildRow(p)).join('');
        renderPagination(filteredPatients.length, totalPages);
        pagWrap.style.display = 'flex';
    }

    function buildRow(p) {
        const today = new Date(); today.setHours(0,0,0,0);

        // Avatar
        const avatarHtml = p.foto_url
            ? `<img src="${p.foto_url}" class="animal-avatar" alt="${p.nome}">`
            : `<div class="animal-emoji-sm">${getSpeciesEmoji(p.tipo_animal)}</div>`;

        // Vaccine badge (traffic light)
        let vacBadge = '<span class="badge-neutral">—</span>';
        if (p.proxima_vacina) {
            const d = new Date(p.proxima_vacina); d.setHours(0,0,0,0);
            const diff = Math.round((d - today) / 86400000);
            if (diff < 0) {
                vacBadge = `<span class="badge-danger"><i class="fa-solid fa-circle-xmark"></i> ${Math.abs(diff)}d atraso</span>`;
            } else if (diff <= 30) {
                vacBadge = `<span class="badge-warn"><i class="fa-solid fa-circle-exclamation"></i> ${diff}d</span>`;
            } else {
                vacBadge = `<span class="badge-ok"><i class="fa-solid fa-circle-check"></i> Em dia</span>`;
            }
        }

        // Alert badges
        let alertBadges = '';
        if (p.alergias) alertBadges += `<span class="badge-alert me-1"><i class="fa-solid fa-pills"></i> Alergia</span>`;
        if (p.alertas_clinicos) alertBadges += `<span class="badge-alert"><i class="fa-solid fa-triangle-exclamation"></i> Alerta</span>`;
        if (!alertBadges) alertBadges = '<span class="badge-neutral">—</span>';

        // Last appointment
        const lastDate = p.ultima_data_agendamento
            ? new Date(p.ultima_data_agendamento).toLocaleDateString('pt-PT', { day:'2-digit', month:'short', year:'numeric' })
            : '—';

        return `
            <tr onclick="openClinicalFile(${JSON.stringify(p).replace(/"/g, '&quot;')})" id="row-${p.id}">
                <td>${avatarHtml}</td>
                <td>
                    <div class="animal-name">${escHtml(p.nome)}</div>
                    <div class="animal-breed">${escHtml(p.raca || p.tipo_animal || '—')}</div>
                </td>
                <td><span style="font-size:1.2rem;" title="${escHtml(p.tipo_animal || '')}">${getSpeciesEmoji(p.tipo_animal)} <small class="text-muted" style="font-size:0.75rem;">${escHtml(p.tipo_animal || '—')}</small></span></td>
                <td>
                    <div class="fw-600" style="font-weight:600;">${escHtml(p.dono_nome || '—')}</div>
                </td>
                <td><span class="small text-muted">${lastDate}</span></td>
                <td>${vacBadge}</td>
                <td>${alertBadges}</td>
                <td>
                    <i class="fa-solid fa-chevron-right text-muted" style="font-size:0.8rem;"></i>
                </td>
            </tr>`;
    }

    /* ── Pagination ─────────────────────────────────────────── */
    function renderPagination(total, totalPages) {
        const start = (currentPage - 1) * PAGE_SIZE + 1;
        const end = Math.min(currentPage * PAGE_SIZE, total);
        document.getElementById('pagInfo').textContent = `${start}–${end} de ${total} pacientes`;

        const btns = document.getElementById('pagBtns');
        btns.innerHTML = '';

        const prev = document.createElement('button');
        prev.className = 'pag-btn';
        prev.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        prev.disabled = currentPage === 1;
        prev.onclick = () => { currentPage--; renderTable(); };
        btns.appendChild(prev);

        // Show up to 5 page numbers
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...');
            }
        }

        pages.forEach(p => {
            if (p === '...') {
                const span = document.createElement('span');
                span.className = 'pag-btn';
                span.style.cursor = 'default';
                span.textContent = '...';
                btns.appendChild(span);
            } else {
                const btn = document.createElement('button');
                btn.className = `pag-btn${p === currentPage ? ' active' : ''}`;
                btn.textContent = p;
                btn.onclick = () => { currentPage = p; renderTable(); };
                btns.appendChild(btn);
            }
        });

        const next = document.createElement('button');
        next.className = 'pag-btn';
        next.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        next.disabled = currentPage === totalPages;
        next.onclick = () => { currentPage++; renderTable(); };
        btns.appendChild(next);
    }

    /* ── Clinical Offcanvas ──────────────────────────────────── */
    function openClinicalFile(patient) {
        currentAnimalId = patient.id;
        currentDonoId = patient.dono_id_bigint;

        // Header
        const emoji = getSpeciesEmoji(patient.tipo_animal);
        if (patient.foto_url) {
            document.getElementById('ocEmoji').innerHTML = `<img src="${patient.foto_url}" class="patient-avatar-lg" alt="${escHtml(patient.nome)}">`;
        } else {
            document.getElementById('ocEmoji').innerHTML = emoji;
            document.getElementById('ocEmoji').style.fontSize = '2.2rem';
        }

        document.getElementById('ocName').textContent = patient.nome || '—';
        document.getElementById('ocSub').textContent = `${patient.tipo_animal || '—'} · ${patient.raca || 'Raça não definida'}`;

        // Age
        const age = calcAge(patient['Data de nascimento'] || patient.data_nascimento);
        document.getElementById('ocAge').textContent = age !== null ? age : '—';

        // Alerts
        const alertBar = document.getElementById('ocAlertBar');
        const allergyBar = document.getElementById('ocAllergyBar');
        if (patient.alertas_clinicos) {
            alertBar.style.display = 'flex';
            document.getElementById('ocAlertText').textContent = patient.alertas_clinicos;
        } else {
            alertBar.style.display = 'none';
        }
        if (patient.alergias) {
            allergyBar.style.display = 'flex';
            document.getElementById('ocAllergyText').textContent = patient.alergias;
        } else {
            allergyBar.style.display = 'none';
        }

        // Overview tab data
        document.getElementById('ocPeso').textContent = patient.peso_kg ? `${patient.peso_kg} kg` : '—';
        document.getElementById('ocMicrochip').textContent = patient.microchip || 'Não registado';
        document.getElementById('ocNasc').textContent = patient['Data de nascimento']
            ? new Date(patient['Data de nascimento']).toLocaleDateString('pt-PT') : '—';
        document.getElementById('ocRaca').textContent = patient.raca || '—';

        // Owner card
        const ownerName = patient.dono_nome || '—';
        document.getElementById('ocOwnerName').textContent = ownerName;
        document.getElementById('ocOwnerInitial').textContent = ownerName.charAt(0).toUpperCase();
        const chatUrl = `chat_veterinario.html?dono_id=${patient.dono_id_bigint || ''}`;
        document.getElementById('ocChatLink').href = chatUrl;
        document.getElementById('btnChatOffcanvas').onclick = () => { window.location.href = chatUrl; };

        // Prefill edit fields
        document.getElementById('editPeso').value = patient.peso_kg || '';
        document.getElementById('editMicrochip').value = patient.microchip || '';
        document.getElementById('editAlergias').value = patient.alergias || '';
        document.getElementById('editAlertas').value = patient.alertas_clinicos || '';
        document.getElementById('editProxVacina').value = patient.proxima_vacina || '';
        document.getElementById('editProxDesparas').value = patient.proxima_desparas || '';

        // Reset to overview tab
        switchTab('overview', document.querySelector('.clinical-tab[data-tab="overview"]'));

        // Load history and prophylaxis
        loadHistory(patient.id, patient.dono_id_bigint);
        loadProphylaxis(patient);

        ocInstance.show();
    }

    /* ── Tab Switcher ────────────────────────────────────────── */
    function switchTab(tab, el) {
        document.querySelectorAll('.clinical-tab').forEach(t => t.classList.remove('active'));
        if (el) el.classList.add('active');

        ['tabOverview', 'tabHistory', 'tabProphy'].forEach(id => {
            document.getElementById(id).style.display = 'none';
        });

        if (tab === 'overview') document.getElementById('tabOverview').style.display = 'block';
        if (tab === 'history') document.getElementById('tabHistory').style.display = 'block';
        if (tab === 'prophy') document.getElementById('tabProphy').style.display = 'block';
    }

    /* ── History Timeline ────────────────────────────────────── */
    async function loadHistory(animalId, donoId) {
        const tl = document.getElementById('historyTimeline');
        tl.innerHTML = `<div class="text-center py-4 text-muted"><i class="fa-solid fa-circle-notch fa-spin fa-2x mb-3 opacity-25"></i><p class="small">A carregar histórico...</p></div>`;

        try {
            const { data: hist } = await sb
                .from('agendamentos')
                .select('id, titulo, data_hora_inicio, tipo_servico, notas_medicas, status')
                .eq('id_vet', VET_USER_ID)
                .eq('id_animal', animalId)
                .in('status', ['Confirmado', 'Concluido'])
                .order('data_hora_inicio', { ascending: false });

            // Also check tickets
            const { data: tickets } = await sb
                .from('tickets')
                .select('id, motivo, descricao, criado_em, estado, notas_privadas, feedback_publico')
                .eq('id_animal', animalId)
                .eq('id_veterinario', VET_USER_ID)
                .in('estado', ['arquivado', 'marcado'])
                .order('criado_em', { ascending: false });

            // Merge and sort
            const events = [];
            (hist || []).forEach(h => events.push({
                date: h.data_hora_inicio,
                title: h.titulo || h.tipo_servico || 'Agendamento',
                notes: h.notas_medicas || '',
                type: 'agendamento',
                id: h.id
            }));
            (tickets || []).forEach(t => events.push({
                date: t.criado_em,
                title: t.motivo || 'Ticket',
                notes: (t.notas_privadas || t.feedback_publico || t.descricao || '').substring(0, 200),
                type: 'ticket',
                id: t.id
            }));

            events.sort((a, b) => new Date(b.date) - new Date(a.date));

            if (events.length === 0) {
                tl.innerHTML = `<div class="empty-table-state py-4"><i class="fa-solid fa-timeline"></i><p class="small">Sem histórico registado.</p></div>`;
                return;
            }

            tl.innerHTML = events.map((ev, i) => `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-card">
                        <div class="timeline-date">
                            <i class="fa-regular fa-calendar me-1"></i>
                            ${new Date(ev.date).toLocaleDateString('pt-PT', { day:'2-digit', month:'long', year:'numeric' })}
                            <span class="ms-2 badge ${ev.type === 'ticket' ? 'bg-primary' : 'bg-success'} rounded-pill" style="font-size:0.65rem;">${ev.type === 'ticket' ? 'Ticket' : 'Consulta'}</span>
                        </div>
                        <div class="timeline-motivo">${escHtml(ev.title)}</div>
                        ${ev.notes ? `
                            <div class="timeline-notes" id="notes-${i}" style="display:none;">${escHtml(ev.notes)}</div>
                            <span class="timeline-expand" onclick="toggleNotes('notes-${i}', this)">
                                <i class="fa-solid fa-chevron-down me-1" style="font-size:0.65rem;"></i>Ver notas
                            </span>
                        ` : ''}
                    </div>
                </div>
            `).join('');

        } catch (err) {
            console.error('Erro ao carregar histórico:', err);
            tl.innerHTML = `<div class="text-center text-danger small py-3">Erro ao carregar histórico.</div>`;
        }
    }

    function toggleNotes(id, btn) {
        const el = document.getElementById(id);
        const visible = el.style.display !== 'none';
        el.style.display = visible ? 'none' : 'block';
        btn.innerHTML = visible
            ? '<i class="fa-solid fa-chevron-down me-1" style="font-size:0.65rem;"></i>Ver notas'
            : '<i class="fa-solid fa-chevron-up me-1" style="font-size:0.65rem;"></i>Ocultar';
    }

    /* ── Prophylaxis ─────────────────────────────────────────── */
    function loadProphylaxis(patient) {
        const today = new Date(); today.setHours(0,0,0,0);
        const renderItem = (label, dateStr) => {
            if (!dateStr) {
                return `<div class="prophy-item">
                    <div><div class="prophy-name">${label}</div><div class="prophy-date">—</div></div>
                    <div class="traffic-dot" style="background:#ddd;"></div>
                </div>`;
            }
            const d = new Date(dateStr); d.setHours(0,0,0,0);
            const diff = Math.round((d - today) / 86400000);
            let dotClass = 'traffic-green';
            let statusText = 'Em dia';
            if (diff < 0) { dotClass = 'traffic-red'; statusText = `${Math.abs(diff)} dias em atraso`; }
            else if (diff <= 30) { dotClass = 'traffic-yellow'; statusText = `Daqui a ${diff} dias`; }
            return `<div class="prophy-item">
                <div>
                    <div class="prophy-name">${label}</div>
                    <div class="prophy-date">${new Date(dateStr).toLocaleDateString('pt-PT')} · <span class="${diff < 0 ? 'text-danger' : diff <= 30 ? 'text-warning' : 'text-success'} fw-bold">${statusText}</span></div>
                </div>
                <div class="traffic-dot ${dotClass}"></div>
            </div>`;
        };

        document.getElementById('prophyVacinas').innerHTML =
            renderItem('Vacina Polivalente / Múltipla', patient.proxima_vacina);
        document.getElementById('prophyDesparas').innerHTML =
            renderItem('Desparasitação Interna', patient.proxima_desparas);
    }

    /* ── Save Clinical Data ─────────────────────────────────── */
    async function saveClinicalData() {
        if (!currentAnimalId) return;
        const btn = document.getElementById('btnSaveClinical');
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> A guardar...';
        btn.disabled = true;

        try {
            const payload = {
                peso_kg: parseFloat(document.getElementById('editPeso').value) || null,
                microchip: document.getElementById('editMicrochip').value.trim() || null,
                alergias: document.getElementById('editAlergias').value.trim() || null,
                alertas_clinicos: document.getElementById('editAlertas').value.trim() || null
            };

            const { error } = await sb.from('animais').update(payload).eq('id', currentAnimalId);
            if (error) throw error;

            // Update local state
            const idx = allPatients.findIndex(p => p.id === currentAnimalId);
            if (idx !== -1) Object.assign(allPatients[idx], payload);

            // Refresh alert bars immediately
            const pat = allPatients[idx];
            const alertBar = document.getElementById('ocAlertBar');
            const allergyBar = document.getElementById('ocAllergyBar');
            if (pat.alertas_clinicos) { alertBar.style.display='flex'; document.getElementById('ocAlertText').textContent = pat.alertas_clinicos; }
            else alertBar.style.display='none';
            if (pat.alergias) { allergyBar.style.display='flex'; document.getElementById('ocAllergyText').textContent = pat.alergias; }
            else allergyBar.style.display='none';

            showToast('Dados clínicos guardados! ✅');
        } catch (err) {
            alert('Erro ao guardar: ' + err.message);
        } finally {
            btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Guardar Alterações';
            btn.disabled = false;
        }
    }

    /* ── Save Prophylaxis Dates ──────────────────────────────── */
    async function saveProphylaxis() {
        if (!currentAnimalId) return;
        const btn = document.getElementById('btnSaveProphy');
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> A guardar...';
        btn.disabled = true;

        try {
            const payload = {
                proxima_vacina: document.getElementById('editProxVacina').value || null,
                proxima_desparas: document.getElementById('editProxDesparas').value || null
            };

            const { error } = await sb.from('animais').update(payload).eq('id', currentAnimalId);
            if (error) throw error;

            const idx = allPatients.findIndex(p => p.id === currentAnimalId);
            if (idx !== -1) {
                Object.assign(allPatients[idx], payload);
                loadProphylaxis(allPatients[idx]);
            }
            updateStats();
            filterAndRender();
            showToast('Datas actualizadas! ✅');
        } catch (err) {
            alert('Erro ao guardar: ' + err.message);
        } finally {
            btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Guardar Datas';
            btn.disabled = false;
        }
    }

    /* ── CSV Export ──────────────────────────────────────────── */
    function exportCSV() {
        const headers = ['Nome', 'Raça', 'Espécie', 'Tutor', 'Microchip', 'Peso (kg)', 'Próx. Vacina', 'Alergias', 'Alertas'];
        const rows = filteredPatients.map(p => [
            p.nome || '', p.raca || '', p.tipo_animal || '',
            p.dono_nome || '', p.microchip || '',
            p.peso_kg || '', p.proxima_vacina || '',
            p.alergias || '', p.alertas_clinicos || ''
        ]);

        const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url;
        a.download = `pacientes_zooni_${new Date().toISOString().slice(0,10)}.csv`;
        a.click(); URL.revokeObjectURL(url);
    }

    /* ── Helpers ─────────────────────────────────────────────── */
    function getSpeciesEmoji(tipo) {
        if (!tipo) return '🐾';
        const t = tipo.toLowerCase();
        if (t.includes('cão') || t.includes('cao')) return '🐶';
        if (t.includes('gato')) return '🐱';
        if (t.includes('ave') || t.includes('pássaro') || t.includes('passaro')) return '🦜';
        if (t.includes('coelho')) return '🐰';
        if (t.includes('hamster') || t.includes('roedor')) return '🐹';
        if (t.includes('cobra') || t.includes('réptil') || t.includes('reptil')) return '🦎';
        return '🐾';
    }

    function calcAge(dateStr) {
        if (!dateStr) return null;
        const birth = new Date(dateStr);
        if (isNaN(birth)) return null;
        const now = new Date();
        return Math.floor((now - birth) / (365.25 * 24 * 3600 * 1000));
    }

    function escHtml(str) {
        if (!str) return '';
        return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    function showToast(msg) {
        const t = document.createElement('div');
        t.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;background:#00B894;color:#fff;padding:14px 22px;border-radius:14px;font-weight:700;box-shadow:0 6px 24px rgba(0,0,0,.15);font-size:0.92rem;animation:slideUp 0.3s ease;';
        t.innerHTML = msg;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 3000);
    }

    /* ── Logout ──────────────────────────────────────────────── */
    document.getElementById('logoutBtn').addEventListener('click', async (e) => {
        e.preventDefault();
        await sb.auth.signOut();
        window.location.href = 'index.html';
    });

    /* ── Start ───────────────────────────────────────────────── */
    init();
