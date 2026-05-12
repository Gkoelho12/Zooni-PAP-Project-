import re
import os

vet_files = ['dashboard_veterinario.html', 'agenda_veterinario.html', 'tickets_veterinario.html', 'pacientes_veterinario.html']

vet_sidebar_template = '''        <aside class="sidebar">
            <div class="logo-container">
                <img src="assets/logo.png" alt="Zooni Logo" class="logo-img-sidebar">
                <div class="logo-subtext">VETERINÁRIO</div>
            </div>
            
            <ul class="nav-links">
                <li class="nav-item">
                    <a href="dashboard_veterinario.html" class="nav-link {active_dashboard_veterinario.html}"><i class="fa-solid fa-chart-pie"></i> Visão Geral</a>
                </li>
                <li class="nav-item">
                    <a href="agenda_veterinario.html" class="nav-link {active_agenda_veterinario.html}"><i class="fa-regular fa-calendar"></i> Agenda</a>
                </li>
                <li class="nav-item">
                    <a href="tickets_veterinario.html" class="nav-link {active_tickets_veterinario.html}"><i class="fa-solid fa-ticket"></i> Tickets</a>
                </li>
                <li class="nav-item">
                    <a href="chat_veterinario.html" class="nav-link {active_chat_veterinario.html}"><i class="fa-solid fa-comments"></i> Chat Médico</a>
                </li>
                <li class="nav-item">
                    <a href="pacientes_veterinario.html" class="nav-link {active_pacientes_veterinario.html}"><i class="fa-solid fa-users"></i> Pacientes</a>
                </li>
            </ul>

            <div class="nav-line-break"></div>
            <a href="#" class="nav-link" onclick="openVetProfileModal(); return false;"><i class="fa-solid fa-gear"></i> Configurações</a>
            <a href="index.html" class="nav-link text-danger"><i class="fa-solid fa-arrow-right-from-bracket"></i> Sair</a>
        </aside>'''

vet_css_template = '''        /* -- SIDEBAR GENERIC STYLES -- */
        .sidebar {
            background-color: var(--primary-dark);
            color: white;
            padding: 2rem 1.5rem;
            display: flex;
            flex-direction: column;
            position: sticky;
            top: 0;
            height: 100vh;
        }

        .logo-container {
            margin-bottom: 2.5rem;
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-items: flex-start;
        }

        .logo-img-sidebar {
            max-width: 160px;
            filter: brightness(0) invert(1);
        }

        .logo-subtext {
            font-size: 0.85rem;
            letter-spacing: 2px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.8);
            text-transform: uppercase;
            padding-left: 5px;
        }

        .nav-links {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex-grow: 1;
        }

        .nav-item {
            margin: 0;
        }

        .nav-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 15px;
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            border-radius: 12px;
            font-weight: 500;
            transition: all 0.2s;
        }

        .nav-link:hover,
        .nav-link.active {
            background-color: rgba(255, 255, 255, 0.15);
            color: white;
        }

        .nav-link.active {
            border-left: 4px solid var(--primary);
            background: rgba(255, 255, 255, 0.2);
        }

        .nav-link i {
            width: 20px;
            text-align: center;
            font-size: 1.1rem;
        }

        .nav-link.text-danger {
            color: #ff6b6b !important;
        }
        .nav-link.text-danger:hover {
            background-color: rgba(255, 107, 107, 0.15);
            color: #ff6b6b !important;
        }

        .nav-line-break {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin: 15px 0;
        }'''

for f in vet_files:
    if not os.path.exists(f): continue
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Create the specialized HTML sidebar for this file by setting active
    specific_html = vet_sidebar_template
    for test_f in ['dashboard_veterinario.html', 'agenda_veterinario.html', 'tickets_veterinario.html', 'chat_veterinario.html', 'pacientes_veterinario.html']:
        token = f"{{active_{test_f}}}"
        if test_f == f:
            specific_html = specific_html.replace(token, "active")
        else:
            specific_html = specific_html.replace(token, "")
    
    # Replace the HTML sidebar
    # The regex assumes the sidebar is wrapped in <aside class="sidebar"> ... </aside>
    content = re.sub(r'<aside class="sidebar">.*?</aside>', specific_html, content, flags=re.DOTALL)
    
    # We also need to replace the CSS. This is trickier since each file might have different css definitions.
    # We will search for .sidebar { ... } up to the next structural component. Let's try inserting the CSS 
    # before .app-container or after ody {.
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print('VET HTML sidebars updated.')
