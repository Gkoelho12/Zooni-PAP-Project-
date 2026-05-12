# -*- coding: utf-8 -*-
import re
import os

dono_files = ['dashboard_dono.html', 'meus_animais.html', 'agenda_dono.html', 'definicoes_dono.html', 'notificacoes.html', 'veterinarios.html']

dono_sidebar_template = '''        <aside class="sidebar">
            <div class="logo-container">
                <img src="assets/logo.png" alt="Zooni Logo" class="logo-img-sidebar">
            </div>
            <ul class="nav-links">
                <li class="nav-item">
                    <a href="dashboard_dono.html" class="nav-link {active_dashboard_dono.html}"><i class="fa-solid fa-house"></i> <span data-i18n="nav_home">Início</span></a>
                </li>
                <li class="nav-item">
                    <a href="meus_animais.html" class="nav-link {active_meus_animais.html}"><i class="fa-solid fa-dog"></i> <span data-i18n="nav_animals">Os Meus Animais</span></a>
                </li>
                <li class="nav-item">
                    <a href="agenda_dono.html" class="nav-link {active_agenda_dono.html}"><i class="fa-solid fa-calendar"></i> <span data-i18n="nav_calendar">Calendário</span></a>
                </li>
                <li class="nav-item">
                    <a href="chat_dono.html" class="nav-link {active_chat_dono.html}"><i class="fa-solid fa-comments"></i> <span data-i18n="nav_chat">Chat da Clínica</span></a>
                </li>
                <li class="nav-item">
                    <a href="veterinarios.html" class="nav-link {active_veterinarios.html}"><i class="fa-solid fa-user-doctor"></i> <span>Veterinários</span></a>
                </li>
            </ul>
            
            <div class="nav-line-break"></div>
            <a href="definicoes_dono.html" class="nav-link {active_definicoes_dono.html}"><i class="fa-solid fa-gear"></i> <span data-i18n="nav_settings">Configurações</span></a>
            <a href="index.html" class="nav-link text-danger"><i class="fa-solid fa-arrow-right-from-bracket"></i> <span data-i18n="nav_logout">Sair</span></a>

            <button class="btn-sidebar-cta mt-auto" data-bs-toggle="modal" data-bs-target="#novoTicketModal">
                <i class="fa-solid fa-plus"></i> <span data-i18n="nav_new_ticket">Novo Pedido</span>
            </button>
        </aside>'''

for f in dono_files:
    if not os.path.exists(f): continue
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Create the specialized HTML sidebar for this file by setting active
    specific_html = dono_sidebar_template
    for test_f in ['dashboard_dono.html', 'meus_animais.html', 'agenda_dono.html', 'chat_dono.html', 'definicoes_dono.html', 'notificacoes.html', 'veterinarios.html']:
        token = f"{{active_{test_f}}}"
        if test_f == f:
            specific_html = specific_html.replace(token, "active")
        else:
            specific_html = specific_html.replace(token, "")
    
    # If the file has a sidebar tag, replace it.
    if '<aside class="sidebar">' in content:
        content = re.sub(r'<aside class="sidebar">.*?</aside>', specific_html, content, flags=re.DOTALL)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print('DONO HTML sidebars updated.')
