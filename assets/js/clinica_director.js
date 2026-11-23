// ════════════════════════════════════════════════════════════════════════════════
//  ZOONI — GESTÃO DE PERFIL DE DIRETOR CLÍNICO & MENUS DESBLOQUEADOS
// ════════════════════════════════════════════════════════════════════════════════

(function () {
    async function initDirectorProfile() {
        const logoSubtext = document.querySelector('.logo-subtext');
        const navLinks = document.querySelector('.nav-links');
        if (!logoSubtext && !navLinks) return;

        // Nunca confiar apenas no localStorage — validar sempre no Supabase
        let isDiretor = false;
        const client = (typeof sb !== 'undefined') ? sb : (typeof supabaseClient !== 'undefined' ? supabaseClient : null);

        if (client) {
            try {
                const { data: { session } } = await client.auth.getSession();
                if (session) {
                    const { data: vet } = await client
                        .from('veterinarios')
                        .select('is_diretor, status, clinica_id, clinica')
                        .eq('user_id', session.user.id)
                        .maybeSingle();

                    if (vet && vet.is_diretor === true && vet.status === 'ativo') {
                        isDiretor = true;
                        localStorage.setItem('zooni-diretor', 'true');
                        if (vet.clinica_id) localStorage.setItem('zooni-clinica-id', vet.clinica_id);
                    } else {
                        localStorage.removeItem('zooni-diretor');
                    }
                } else {
                    localStorage.removeItem('zooni-diretor');
                }
            } catch (e) {
                console.warn('Verificação de diretor no Supabase:', e);
            }
        }

        // Se for Diretor Clínico, atualizar a interface
        if (isDiretor) {
            aplicarVisualDiretor();
        }
    }

    function aplicarVisualDiretor() {
        // 1. Substituir etiqueta VETERINÁRIO por etiqueta dourada DIRETOR CLÍNICO
        const logoSubtext = document.querySelector('.logo-subtext');
        if (logoSubtext && !document.getElementById('directorBadgeEl')) {
            const badge = document.createElement('div');
            badge.id = 'directorBadgeEl';
            badge.style.cssText = `
                display: inline-flex;
                align-items: center;
                gap: 6px;
                background: linear-gradient(135deg, #FFEAA7, #FDCB6E);
                color: #5D4037;
                font-weight: 800;
                font-size: 0.72rem;
                letter-spacing: 1px;
                padding: 4px 10px;
                border-radius: 20px;
                box-shadow: 0 2px 8px rgba(253, 203, 110, 0.35);
                text-transform: uppercase;
                margin-top: 5px;
                border: 1px solid rgba(255, 255, 255, 0.5);
                cursor: pointer;
            `;
            badge.title = 'Perfil de Gestor / Diretor Clínico com permissões máximas';
            badge.innerHTML = `<i class="fa-solid fa-crown" style="color:#D35400; font-size:0.75rem;"></i> DIRETOR CLÍNICO`;
            
            logoSubtext.style.display = 'none';
            logoSubtext.parentElement.appendChild(badge);
        }

        // 2. Desbloquear botão "Gestão de Equipa" no menu lateral
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && !document.getElementById('directorEquipaLink')) {
            const isEquipaPage = window.location.pathname.includes('equipa_clinica');

            // Separador de secção
            const sectionHeader = document.createElement('div');
            sectionHeader.style.cssText = 'font-size:0.68rem; text-transform:uppercase; letter-spacing:1.2px; color:rgba(255, 255, 255, 0.5); margin:14px 0 6px 12px; font-weight:700;';
            sectionHeader.textContent = 'DIREÇÃO DA CLÍNICA';

            // Item de menu
            const li = document.createElement('li');
            li.className = 'nav-item';
            li.id = 'directorEquipaLink';

            li.innerHTML = `
                <a href="equipa_clinica.html" class="nav-link ${isEquipaPage ? 'active' : ''}">
                    <i class="fa-solid fa-user-doctor"></i> Gestão de Equipa
                    <span id="directorPendingBadge" style="display:none; margin-left:auto; background:#E74C3C; color:white; font-size:0.7rem; font-weight:800; padding:2px 7px; border-radius:10px;">0</span>
                </a>
            `;

            navLinks.appendChild(sectionHeader);
            navLinks.appendChild(li);

            // Verificar se há médicos pendentes de aprovação para mostrar contador
            carregarBadgePendentes();
        }
    }

    async function carregarBadgePendentes() {
        if (typeof sb === 'undefined') return;
        try {
            const clinicaId = localStorage.getItem('zooni-clinica-id');
            let query = sb.from('veterinarios').select('id', { count: 'exact', head: true }).eq('aprovado_pela_clinica', false);
            if (clinicaId) query = query.eq('clinica_id', clinicaId);

            const { count } = await query;
            const badge = document.getElementById('directorPendingBadge');
            if (badge && count > 0) {
                badge.textContent = count;
                badge.style.display = 'inline-block';
            }
        } catch (e) {}
    }

    // Executar ao carregar a página
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDirectorProfile);
    } else {
        initDirectorProfile();
    }
})();
