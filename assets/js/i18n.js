// ═══════════════════════════════════════════════════════════
// Zooni — i18n Translation System
// Usage: include this file, then call applyLanguage('en')
// Elements with data-i18n="key" get their textContent replaced
// Elements with data-i18n-placeholder="key" get their placeholder replaced
// ═══════════════════════════════════════════════════════════

const ZOONI_TRANSLATIONS = {
    pt: {
        // Navigation
        nav_home: 'Início',
        nav_animals: 'Os Meus Animais',
        nav_agenda: 'Agenda',
        nav_vets: 'Veterinários',
        nav_routine: 'Rotina',
        nav_settings: 'Definições',
        nav_logout: 'Sair',
        nav_new_ticket: 'Nova Consulta',

        // Dashboard
        dash_greeting: 'Olá',
        dash_subtitle: 'Aqui está o resumo da saúde dos seus amigos hoje.',
        dash_quick_alerts: 'Avisos Rápidos',
        dash_tickets_title: 'Estado dos Meus Tickets',
        dash_no_tickets: 'Nenhum ticket em aberto.',
        dash_filter_all: 'Todos',
        dash_filter_pending: 'Pendente',
        dash_filter_marked: 'Marcado',
        dash_filter_refused: 'Recusado',
        dash_filter_finished: 'Finalizado',

        // Ticket statuses
        status_pending: 'Pendente',
        status_marked: 'Aceite',
        status_refused: 'Recusado',
        status_waiting: 'A confirmar',
        status_finished: 'Finalizado',

        // Ticket motivos (stored in DB in Portuguese)
        motivo_vomitos: 'Vómitos',
        motivo_pele: 'Problema de Pele',
        motivo_vacinacao: 'Vacinação',
        motivo_rotina: 'Rotina',
        motivo_outro: 'Outro',

        // Settings — General
        settings_title: 'Definições',
        settings_subtitle: 'Gere a sua conta, notificações e privacidade.',
        settings_nav_profile: 'Perfil e Conta',
        settings_nav_notifications: 'Notificações',
        settings_nav_preferences: 'Preferências',
        settings_nav_billing: 'Faturação',
        settings_nav_privacy: 'Privacidade / RGPD',

        // Settings — Profile
        profile_photo_title: 'Foto de Perfil',
        profile_photo_change: 'Alterar Foto',
        profile_photo_remove: 'Remover Foto',
        profile_photo_hint: 'Formato JPG ou PNG. Tamanho máximo 2MB.',
        profile_personal_title: 'Dados Pessoais',
        profile_full_name: 'Nome Completo',
        profile_email: 'Email',
        profile_email_hint: 'O email é gerido pelo sistema de autenticação.',
        profile_phone: 'Telemóvel (Contacto de Emergência)',
        profile_phone_hint: 'Usado pelos veterinários para contacto urgente.',
        profile_location: 'Localidade',
        profile_save: 'Guardar Alterações',
        profile_security_title: 'Segurança',
        profile_current_pass: 'Password Atual',
        profile_new_pass: 'Nova Password',
        profile_confirm_pass: 'Confirmar Nova Password',
        profile_change_pass: 'Alterar Password',

        // Settings — Notifications
        notif_health_title: 'Alertas de Saúde e Rotina',
        notif_vaccines: 'Vacinas e Desparasitações',
        notif_vaccines_desc: 'Alertas quando uma vacina está prestes a expirar',
        notif_birthday: 'Aniversários dos Animais',
        notif_birthday_desc: 'Lembrete no dia de aniversário do pet',
        notif_medication: 'Medicação e Rotina',
        notif_medication_desc: 'Lembretes de medicação diária ou semanal',
        notif_tickets_title: 'Consultas e Tickets',
        notif_vet_reply: 'Resposta do Veterinário',
        notif_vet_reply_desc: 'Quando o veterinário aceita, recusa ou responde',
        notif_reminder: 'Lembrete antes da Consulta',
        notif_reminder_desc: 'Aviso 1 hora antes da consulta agendada',
        notif_marketing_title: 'Novidades e Marketing',
        notif_news: 'Novidades do Zooni',
        notif_news_desc: 'Novas funcionalidades e atualizações da plataforma',
        notif_gdpr_note: 'Conforme o RGPD, esta opção está desativada por defeito.',
        notif_mark_read: 'Marcar como lidas',
        notif_no_notifs: 'Sem notificações recentes.',
        notif_dropdown_title: 'Notificações',
        notif_view_all: 'Ver todas as notificações',
        notif_label_email: 'EMAIL',
        notif_label_app: 'APP',

        // Settings — Preferences
        pref_appearance_title: 'Aparência',
        pref_light: 'Modo Claro',
        pref_dark: 'Modo Escuro',
        pref_auto: 'Automático',
        pref_region_title: 'Idioma e Região',
        pref_language: 'Idioma',
        pref_timezone: 'Fuso Horário',

        // Settings — Billing
        billing_payment_title: 'Métodos de Pagamento',
        billing_add_card: 'Adicionar Novo Cartão',
        billing_invoices_title: 'Histórico de Faturas',
        billing_no_invoices: 'Sem faturas registadas.',
        billing_remove: 'Remover',

        // Settings — Privacy
        privacy_export_title: 'Exportar os Meus Dados',
        privacy_export_desc: 'Receba um ficheiro com todos os dados da sua conta: animais, vacinas, histórico clínico e tickets. Conforme o Artigo 20.º do RGPD (direito à portabilidade).',
        privacy_export_btn: 'Descarregar os Meus Dados',
        privacy_control_title: 'Controlo de Dados',
        privacy_analytics: 'Partilhar dados anónimos para melhorar o Zooni',
        privacy_analytics_desc: 'Estatísticas de uso sem identificação pessoal',
        privacy_danger_title: 'Zona de Perigo',
        privacy_danger_desc: 'Ao eliminar a sua conta, todos os dados — animais, fichas clínicas, histórico e tickets — serão permanentemente apagados. Esta ação não pode ser revertida.',
        privacy_delete_btn: 'Eliminar Conta Permanentemente',

        // Delete modal
        delete_modal_title: 'Confirmar Eliminação',
        delete_modal_desc: 'Esta ação é irreversível. Para confirmar, introduza a sua palavra-passe atual.',
        delete_modal_cancel: 'Cancelar',
        delete_modal_confirm: 'Eliminar Conta',

        // Meus Animais
        animals_title: 'A Minha Matilha / Família 🐾',
        animals_subtitle: 'Gere todas as informações e alertas de saúde dos teus animais num único lugar.',
        animals_search: 'Procurar animal pelo nome...',
        animals_add: 'Adicionar Animal',
        animals_no_animals: 'Nenhum animal encontrado.',

        // Agenda
        agenda_title: 'A Minha Agenda',
        agenda_subtitle: 'Todos os seus eventos e consultas num só lugar.',
        agenda_filter_all: 'Todas',
        agenda_filter_vaccines: 'Vacinas',
        agenda_filter_deworming: 'Desparasitação',
        agenda_filter_medication: 'Medicação',
        agenda_filter_appointments: 'Consultas / Tickets',
        agenda_filter_routine: 'Rotina',
        agenda_add_event: 'Adicionar Evento',

        // Pet Profile
        profile_tab_data: 'Dados',
        profile_tab_health: 'Saúde',
        profile_tab_history: 'Histórico',
        profile_microchip: 'Microchip',
        profile_weight: 'Peso',
        profile_gender: 'Sexo',
        profile_neutered: 'Castrado/Esterilizado',
        profile_allergies: 'Alergias Conhecidas',
        profile_diseases: 'Doenças Crónicas',
        profile_male: '♂ Macho',
        profile_female: '♀ Fêmea',
        profile_yes: 'Sim',
        profile_no: 'Não',
        profile_no_allergies: 'Nenhuma conhecida',
        profile_no_diseases: 'Nenhuma registada',
        profile_no_breed: 'Raça não definida',
        profile_no_vaccines: 'Sem vacinas registadas.',
        profile_no_deworming: 'Sem desparasitações registadas.',
        profile_no_history: 'Sem historial de consultas.',
        profile_vaccines: 'Vacinas',
        profile_deworming: 'Desparasitação',
        profile_add: '+ Adicionar',
        profile_years: 'Anos',
        profile_loading: 'A carregar...',
        profile_error: 'Erro ao carregar.',
        profile_not_indicated: 'Não indicado',
        
        // Common
        common_save: 'Guardar',
        common_cancel: 'Cancelar',
        common_delete: 'Eliminar',
        common_edit: 'Editar',
        common_loading: 'A carregar...',
        common_error: 'Erro',
        common_success: 'Sucesso',
        common_profile: 'O Meu Perfil',
        common_manage_animals: 'Gerir Animais',
        common_payments: 'Pagamentos / Faturação',
        common_settings: 'Definições',
        common_help: 'Ajuda / Suporte',
        common_sign_out: 'Terminar Sessão',
        common_new_ticket: 'Novo Ticket',
        common_tutor: 'Tutor',
        common_updated: 'Preferência atualizada!',
        common_saved: 'Guardado com sucesso!',
        common_pref_updated: 'Preferência atualizada!',
        common_today: 'Hoje',
        common_today_consult: 'Consulta Hoje',
        calendar_appointments_for: 'Marcações para',
        
        // Modals - Pet
        modal_pet_title: 'Gerir Animal',
        modal_pet_name: 'Nome',
        modal_pet_type: 'Tipo',
        modal_pet_type_select: 'Selecione o tipo...',
        modal_pet_breed: 'Raça',
        modal_pet_breed_select: 'Selecione a raça...',
        modal_pet_birth: 'Nascimento',
        modal_pet_weight: 'Peso (kg)',
        modal_pet_gender: 'Sexo',
        modal_pet_neutered: 'Castrado / Esterilizado',
        modal_pet_microchip: 'N.º Microchip',
        modal_pet_photo: 'Foto',
        modal_pet_choose: 'Escolher',
        modal_pet_remove: 'Remover',
        modal_pet_allergies: 'Alergias Conhecidas',
        modal_pet_allergies_ph: 'Ex: Amendoim, determinados antibióticos...',
        modal_pet_diseases: 'Doenças Crónicas',
        modal_pet_diseases_ph: 'Ex: Diabetes, Leishmaniose...',
        btn_save: 'Salvar',

        // Modals - Ticket
        modal_ticket_title: 'Nova Consulta',
        modal_ticket_which_pet: 'Qual pet precisa de ajuda hoje?',
        modal_ticket_reason: 'Motivo Principal',
        ticket_reason_select: 'Selecione um motivo...',
        ticket_reason_vomit: 'Vómitos',
        ticket_reason_skin: 'Problema de Pele',
        ticket_reason_vaccine: 'Vacinação',
        ticket_reason_routine: 'Rotina',
        ticket_reason_other: 'Outro',
        modal_ticket_desc_label: 'Descreva o que se passa com o máximo de detalhes.',
        modal_ticket_desc_ph: 'Ex: Quando começou? Mudou a alimentação? Está apático?...',
        modal_ticket_media_label: 'Mostre-nos o problema (Fotos/Vídeos)',
        modal_ticket_attach: 'Anexar Média',
        modal_ticket_date_suggest: 'Quando preferia ser atendido? (Sugestão)',
        modal_ticket_date_info: 'Este horário é uma sugestão e necessita de confirmação da clínica.',
        modal_ticket_vet: 'Escolha o Veterinário',
        modal_loading_vets: 'A carregar veterinários...',
        btn_send_ticket: 'Enviar Pedido de Consulta',

        // Modals - Event
        modal_event_title: 'Criar Evento Saude',
        modal_event_which_pet: 'Para qual Pet?',
        modal_event_pet_select: 'Selecione o pet...',
        modal_loading_pets: 'A carregar pets...',
        modal_event_type: 'Tipo de Evento',
        event_type_vaccine: '🔴 Vacina (Urgente)',
        event_type_deworming: '🟠 Desparasitação (Atenção)',
        event_type_medication: '🟢 Medicação (Tratamento)',
        event_type_consult: '🔵 Consulta / Zooni Ticket',
        event_type_routine: '🟣 Rotina / Banhos',
        modal_event_name: 'Título do Evento',
        modal_event_name_ph: 'Ex: Vacina da Raiva, Bravecto...',
        modal_event_start_date: 'Data de Início',
        modal_event_time: 'Hora (Opcional)',
        modal_event_recurrence: 'Repetição Automática',
        recurrence_none: 'Apenas uma vez (Não repete)',
        recurrence_daily: 'Repetir todos os dias',
        recurrence_weekly: 'Repetir todas as semanas',
        recurrence_monthly: 'Repetir a cada mês (ex: desparasitante)',
        recurrence_yearly: 'Repetir todos os anos (ex: vacinas anuais)',
        btn_save_event: 'Guardar na Agenda',

        // Veterinários Page
        vet_page_subtitle: 'Pesquisa, guarda favoritos e marca consultas com quem mais confias.',
        vet_favourites: 'Favoritos',
        vet_search_ph: 'Pesquisar por nome ou clínica...',
        vet_all_specs: 'Todas as Especialidades',
        vet_any_status: 'Qualquer Estado',
    },

    en: {
        // Navigation
        nav_home: 'Home',
        nav_animals: 'My Animals',
        nav_agenda: 'Schedule',
        nav_vets: 'Veterinarians',
        nav_routine: 'Routine',
        nav_settings: 'Settings',
        nav_logout: 'Sign Out',
        nav_new_ticket: 'New Appointment',
        common_new_ticket: 'New Appointment',
        common_today: 'Today',
        common_today_consult: 'Appointment Today',
        calendar_appointments_for: 'Appointments for',

        // Dashboard
        dash_greeting: 'Hello',
        dash_subtitle: 'Here is the health summary of your friends today.',
        dash_quick_alerts: 'Quick Alerts',
        dash_tickets_title: 'My Tickets Status',
        dash_no_tickets: 'No open tickets.',
        dash_filter_all: 'All',
        dash_filter_pending: 'Pending',
        dash_filter_marked: 'Confirmed',
        dash_filter_refused: 'Refused',
        dash_filter_finished: 'Finished',

        // Ticket statuses
        status_pending: 'Pending',
        status_marked: 'Accepted',
        status_refused: 'Refused',
        status_waiting: 'Awaiting confirmation',
        status_finished: 'Finished',

        // Ticket motivos
        motivo_vomitos: 'Vomiting',
        motivo_pele: 'Skin Problem',
        motivo_vacinacao: 'Vaccination',
        motivo_rotina: 'Routine',
        motivo_outro: 'Other',

        // Settings — General
        settings_title: 'Settings',
        settings_subtitle: 'Manage your account, notifications and privacy.',
        settings_nav_profile: 'Profile & Account',
        settings_nav_notifications: 'Notifications',
        settings_nav_preferences: 'Preferences',
        settings_nav_billing: 'Billing',
        settings_nav_privacy: 'Privacy / GDPR',

        // Settings — Profile
        profile_photo_title: 'Profile Photo',
        profile_photo_change: 'Change Photo',
        profile_photo_remove: 'Remove Photo',
        profile_photo_hint: 'JPG or PNG format. Maximum size 2MB.',
        profile_personal_title: 'Personal Details',
        profile_full_name: 'Full Name',
        profile_email: 'Email',
        profile_email_hint: 'Email is managed by the authentication system.',
        profile_phone: 'Phone (Emergency Contact)',
        profile_phone_hint: 'Used by veterinarians for urgent contact.',
        profile_location: 'City',
        profile_save: 'Save Changes',
        profile_security_title: 'Security',
        profile_current_pass: 'Current Password',
        profile_new_pass: 'New Password',
        profile_confirm_pass: 'Confirm New Password',
        profile_change_pass: 'Change Password',

        // Settings — Notifications
        notif_health_title: 'Health & Routine Alerts',
        notif_vaccines: 'Vaccines & Deworming',
        notif_vaccines_desc: 'Alerts when a vaccine is about to expire',
        notif_birthday: 'Pet Birthdays',
        notif_birthday_desc: 'Reminder on your pet\'s birthday',
        notif_medication: 'Medication & Routine',
        notif_medication_desc: 'Daily or weekly medication reminders',
        notif_tickets_title: 'Appointments & Tickets',
        notif_vet_reply: 'Vet Response',
        notif_vet_reply_desc: 'When the vet accepts, refuses or responds',
        notif_reminder: 'Appointment Reminder',
        notif_reminder_desc: 'Alert 1 hour before your scheduled appointment',
        notif_marketing_title: 'News & Marketing',
        notif_news: 'Zooni News',
        notif_news_desc: 'New features and platform updates',
        notif_gdpr_note: 'As per GDPR, this option is disabled by default.',
        notif_mark_read: 'Mark as read',
        notif_no_notifs: 'No recent notifications.',
        notif_dropdown_title: 'Notifications',
        notif_view_all: 'View all notifications',
        notif_label_email: 'EMAIL',
        notif_label_app: 'APP',

        // Settings — Preferences
        pref_appearance_title: 'Appearance',
        pref_light: 'Light Mode',
        pref_dark: 'Dark Mode',
        pref_auto: 'System',
        pref_region_title: 'Language & Region',
        pref_language: 'Language',
        pref_timezone: 'Timezone',

        // Settings — Billing
        billing_payment_title: 'Payment Methods',
        billing_add_card: 'Add New Card',
        billing_invoices_title: 'Invoice History',
        billing_no_invoices: 'No invoices yet.',
        billing_remove: 'Remove',

        // Settings — Privacy
        privacy_export_title: 'Export My Data',
        privacy_export_desc: 'Receive a file with all your account data: animals, vaccines, clinical history and tickets. As per Article 20 of the GDPR (right to portability).',
        privacy_export_btn: 'Download My Data',
        privacy_control_title: 'Data Control',
        privacy_analytics: 'Share anonymous data to improve Zooni',
        privacy_analytics_desc: 'Usage statistics without personal identification',
        privacy_danger_title: 'Danger Zone',
        privacy_danger_desc: 'Deleting your account will permanently erase all data — animals, clinical records, history and tickets. This action cannot be undone.',
        privacy_delete_btn: 'Delete Account Permanently',

        // Delete modal
        delete_modal_title: 'Confirm Deletion',
        delete_modal_desc: 'This action is irreversible. To confirm, enter your current password.',
        delete_modal_cancel: 'Cancel',
        delete_modal_confirm: 'Delete Account',

        // Meus Animais
        animals_title: 'My Pack / Family 🐾',
        animals_subtitle: 'Manage all health information and alerts for your animals in one place.',
        animals_search: 'Search animal by name...',
        animals_add: 'Add Animal',
        animals_no_animals: 'No animals found.',

        // Agenda
        agenda_title: 'My Schedule',
        agenda_subtitle: 'All your events and appointments in one place.',
        agenda_filter_all: 'All',
        agenda_filter_vaccines: 'Vaccines',
        agenda_filter_deworming: 'Deworming',
        agenda_filter_medication: 'Medication',
        agenda_filter_appointments: 'Appointments / Tickets',
        agenda_filter_routine: 'Routine',
        agenda_add_event: 'Add Event',

        // Pet Profile
        profile_tab_data: 'Data',
        profile_tab_health: 'Health',
        profile_tab_history: 'History',
        profile_microchip: 'Microchip',
        profile_weight: 'Weight',
        profile_gender: 'Gender',
        profile_neutered: 'Neutered/Spayed',
        profile_allergies: 'Known Allergies',
        profile_diseases: 'Chronic Diseases',
        profile_male: '♂ Male',
        profile_female: '♀ Female',
        profile_yes: 'Yes',
        profile_no: 'No',
        profile_no_allergies: 'None known',
        profile_no_diseases: 'None registered',
        profile_no_breed: 'Breed not defined',
        profile_no_vaccines: 'No vaccines registered.',
        profile_no_deworming: 'No deworming registered.',
        profile_no_history: 'No appointment history.',
        profile_vaccines: 'Vaccines',
        profile_deworming: 'Deworming',
        profile_add: '+ Add',
        profile_years: 'Years',
        profile_loading: 'Loading...',
        profile_error: 'Error loading.',
        profile_not_indicated: 'Not indicated',

        // Common
        common_save: 'Save',
        common_cancel: 'Cancel',
        common_delete: 'Delete',
        common_edit: 'Edit',
        common_loading: 'Loading...',
        common_error: 'Error',
        common_success: 'Success',
        common_profile: 'My Profile',
        common_manage_animals: 'Manage Animals',
        common_payments: 'Payments / Billing',
        common_settings: 'Settings',
        common_help: 'Help / Support',
        common_sign_out: 'Sign Out',
        common_new_ticket: 'New Ticket',
        common_tutor: 'Owner',
        common_updated: 'Preference updated!',
        common_saved: 'Saved successfully!',
        common_pref_updated: 'Preference updated!',
    
        // Modals - Pet
        modal_pet_title: 'Manage Pet',
        modal_pet_name: 'Name',
        modal_pet_type: 'Type',
        modal_pet_type_select: 'Select type...',
        modal_pet_breed: 'Breed',
        modal_pet_breed_select: 'Select breed...',
        modal_pet_birth: 'Birth Date',
        modal_pet_weight: 'Weight (kg)',
        modal_pet_gender: 'Gender',
        modal_pet_neutered: 'Neutered / Spayed',
        modal_pet_microchip: 'Microchip No.',
        modal_pet_photo: 'Photo',
        modal_pet_choose: 'Choose',
        modal_pet_remove: 'Remove',
        modal_pet_allergies: 'Known Allergies',
        modal_pet_allergies_ph: 'Ex: Peanuts, certain antibiotics...',
        modal_pet_diseases: 'Chronic Diseases',
        modal_pet_diseases_ph: 'Ex: Diabetes, Leishmaniasis...',
        btn_save: 'Save',

        // Modals - Ticket
        modal_ticket_title: 'New Consultation',
        modal_ticket_which_pet: 'Which pet needs help today?',
        modal_ticket_reason: 'Main Reason',
        ticket_reason_select: 'Select a reason...',
        ticket_reason_vomit: 'Vomiting',
        ticket_reason_skin: 'Skin Problem',
        ticket_reason_vaccine: 'Vaccination',
        ticket_reason_routine: 'Routine',
        ticket_reason_other: 'Other',
        modal_ticket_desc_label: 'Describe what\'s happening with maximum details.',
        modal_ticket_desc_ph: 'Ex: When did it start? Has the diet changed? Is it apathetic?...',
        modal_ticket_media_label: 'Show us the problem (Photos/Videos)',
        modal_ticket_attach: 'Attach Media',
        modal_ticket_date_suggest: 'When would you prefer to be seen? (Suggestion)',
        modal_ticket_date_info: 'This time is a suggestion and requires clinic confirmation.',
        modal_ticket_vet: 'Choose the Veterinarian',
        modal_loading_vets: 'Loading veterinarians...',
        btn_send_ticket: 'Send Request',

        // Modals - Event
        modal_event_title: 'Create Health Event',
        modal_event_which_pet: 'For which Pet?',
        modal_event_pet_select: 'Select pet...',
        modal_loading_pets: 'Loading pets...',
        modal_event_type: 'Event Type',
        event_type_vaccine: '🔴 Vaccine (Urgent)',
        event_type_deworming: '🟠 Deworming (Attention)',
        event_type_medication: '🟢 Medication (Treatment)',
        event_type_consult: '🔵 Consult / Zooni Ticket',
        event_type_routine: '🟣 Routine / Baths',
        modal_event_name: 'Event Title',
        modal_event_name_ph: 'Ex: Rabies Vaccine, Bravecto...',
        modal_event_start_date: 'Start Date',
        modal_event_time: 'Time (Optional)',
        modal_event_recurrence: 'Auto Recurrence',
        recurrence_none: 'Just once (No repeat)',
        recurrence_daily: 'Repeat every day',
        recurrence_weekly: 'Repeat every week',
        recurrence_monthly: 'Repeat every month (e.g. deworming)',
        recurrence_yearly: 'Repeat every year (e.g. annual vaccines)',
        btn_save_event: 'Save to Agenda',

        // Veterinarians Page
        vet_page_subtitle: 'Search, save favourites and book appointments with vets you trust.',
        vet_favourites: 'Favourites',
        vet_search_ph: 'Search by name or clinic...',
        vet_all_specs: 'All Specialties',
        vet_any_status: 'Any Status',
    },

    es: {
        // Navigation
        nav_home: 'Inicio',
        nav_animals: 'Mis Animales',
        nav_agenda: 'Agenda',
        nav_vets: 'Veterinarios',
        nav_routine: 'Rutina',
        nav_settings: 'Configuración',
        nav_logout: 'Salir',
        nav_new_ticket: 'Nueva Consulta',

        // Dashboard
        dash_greeting: 'Hola',
        dash_subtitle: 'Aquí está el resumen de la salud de tus amigos hoy.',
        dash_quick_alerts: 'Avisos Rápidos',
        dash_tickets_title: 'Estado de Mis Tickets',
        dash_no_tickets: 'Sin tickets abiertos.',
        dash_filter_all: 'Todos',
        dash_filter_pending: 'Pendiente',
        dash_filter_marked: 'Marcado',
        dash_filter_refused: 'Rechazado',
        dash_filter_finished: 'Finalizado',

        // Ticket statuses
        status_pending: 'Pendiente',
        status_marked: 'Aceptado',
        status_refused: 'Rechazado',
        status_waiting: 'Esperando confirmación',
        status_finished: 'Finalizado',

        // Ticket motivos
        motivo_vomitos: 'Vómitos',
        motivo_pele: 'Problema de Piel',
        motivo_vacinacao: 'Vacunación',
        motivo_rotina: 'Rutina',
        motivo_outro: 'Otro',

        // Settings — General
        settings_title: 'Configuración',
        settings_subtitle: 'Gestiona tu cuenta, notificaciones y privacidad.',
        settings_nav_profile: 'Perfil y Cuenta',
        settings_nav_notifications: 'Notificaciones',
        settings_nav_preferences: 'Preferencias',
        settings_nav_billing: 'Facturación',
        settings_nav_privacy: 'Privacidad / RGPD',

        // Settings — Profile
        profile_photo_title: 'Foto de Perfil',
        profile_photo_change: 'Cambiar Foto',
        profile_photo_remove: 'Eliminar Foto',
        profile_photo_hint: 'Formato JPG o PNG. Tamaño máximo 2MB.',
        profile_personal_title: 'Datos Personales',
        profile_full_name: 'Nombre Completo',
        profile_email: 'Correo Electrónico',
        profile_email_hint: 'El correo está gestionado por el sistema de autenticación.',
        profile_phone: 'Teléfono (Contacto de Emergencia)',
        profile_phone_hint: 'Usado por los veterinarios para contacto urgente.',
        profile_location: 'Localidad',
        profile_save: 'Guardar Cambios',
        profile_security_title: 'Seguridad',
        profile_current_pass: 'Contraseña Actual',
        profile_new_pass: 'Nueva Contraseña',
        profile_confirm_pass: 'Confirmar Nueva Contraseña',
        profile_change_pass: 'Cambiar Contraseña',

        // Settings — Notifications
        notif_health_title: 'Alertas de Salud y Rutina',
        notif_vaccines: 'Vacunas y Desparasitaciones',
        notif_vaccines_desc: 'Alertas cuando una vacuna está a punto de expirar',
        notif_birthday: 'Cumpleaños de los Animales',
        notif_birthday_desc: 'Recordatorio en el cumpleaños de la mascota',
        notif_medication: 'Medicación y Rutina',
        notif_medication_desc: 'Recordatorios de medicación diaria o semanal',
        notif_tickets_title: 'Consultas y Tickets',
        notif_vet_reply: 'Respuesta del Veterinario',
        notif_vet_reply_desc: 'Cuando el veterinario acepta, rechaza o responde',
        notif_reminder: 'Recordatorio antes de la Consulta',
        notif_reminder_desc: 'Aviso 1 hora antes de la consulta programada',
        notif_marketing_title: 'Novedades y Marketing',
        notif_news: 'Novedades de Zooni',
        notif_news_desc: 'Nuevas funcionalidades y actualizaciones de la plataforma',
        notif_gdpr_note: 'Según el RGPD, esta opción está desactivada por defecto.',
        notif_mark_read: 'Marcar como leídas',
        notif_no_notifs: 'Sin notificaciones recientes.',
        notif_dropdown_title: 'Notificaciones',
        notif_view_all: 'Ver todas las notificaciones',
        notif_label_email: 'EMAIL',
        notif_label_app: 'APP',

        // Settings — Preferences
        pref_appearance_title: 'Apariencia',
        pref_light: 'Modo Claro',
        pref_dark: 'Modo Oscuro',
        pref_auto: 'Automático',
        pref_region_title: 'Idioma y Región',
        pref_language: 'Idioma',
        pref_timezone: 'Zona Horaria',

        // Settings — Billing
        billing_payment_title: 'Métodos de Pago',
        billing_add_card: 'Añadir Nueva Tarjeta',
        billing_invoices_title: 'Historial de Facturas',
        billing_no_invoices: 'Sin facturas registradas.',
        billing_remove: 'Eliminar',

        // Settings — Privacy
        privacy_export_title: 'Exportar Mis Datos',
        privacy_export_desc: 'Recibe un archivo con todos los datos de tu cuenta: animales, vacunas, historial clínico y tickets. Según el Artículo 20 del RGPD (derecho a la portabilidad).',
        privacy_export_btn: 'Descargar Mis Datos',
        privacy_control_title: 'Control de Datos',
        privacy_analytics: 'Compartir datos anónimos para mejorar Zooni',
        privacy_analytics_desc: 'Estadísticas de uso sin identificación personal',
        privacy_danger_title: 'Zona de Peligro',
        privacy_danger_desc: 'Al eliminar tu cuenta, todos los datos — animales, fichas clínicas, historial y tickets — serán eliminados permanentemente. Esta acción no puede deshacerse.',
        privacy_delete_btn: 'Eliminar Cuenta Permanentemente',

        // Delete modal
        delete_modal_title: 'Confirmar Eliminación',
        delete_modal_desc: 'Esta acción es irreversible. Para confirmar, introduce tu contraseña actual.',
        delete_modal_cancel: 'Cancelar',
        delete_modal_confirm: 'Eliminar Cuenta',

        // Meus Animais
        animals_title: 'Mi Manada / Familia 🐾',
        animals_subtitle: 'Gestiona toda la información de salud y alertas de tus animales en un solo lugar.',
        animals_search: 'Buscar animal por nombre...',
        animals_add: 'Añadir Animal',
        animals_no_animals: 'Sin animales encontrados.',

        // Agenda
        agenda_title: 'Mi Agenda',
        agenda_subtitle: 'Todos tus eventos y citas en un solo lugar.',
        agenda_filter_all: 'Todas',
        agenda_filter_vaccines: 'Vacunas',
        agenda_filter_deworming: 'Desparasitación',
        agenda_filter_medication: 'Medicación',
        agenda_filter_appointments: 'Consultas / Tickets',
        agenda_filter_routine: 'Rutina',
        agenda_add_event: 'Agregar Evento',

        // Pet Profile
        profile_tab_data: 'Datos',
        profile_tab_health: 'Salud',
        profile_tab_history: 'Historial',
        profile_microchip: 'Microchip',
        profile_weight: 'Peso',
        profile_gender: 'Sexo',
        profile_neutered: 'Castrado/Esterilizado',
        profile_allergies: 'Alergias Conocidas',
        profile_diseases: 'Enfermedades Crónicas',
        profile_male: '♂ Macho',
        profile_female: '♀ Hembra',
        profile_yes: 'Sí',
        profile_no: 'No',
        profile_no_allergies: 'Ninguna conocida',
        profile_no_diseases: 'Ninguna registrada',
        profile_no_breed: 'Raza no definida',
        profile_no_vaccines: 'Sin vacunas registradas.',
        profile_no_deworming: 'Sin desparasitaciones registradas.',
        profile_no_history: 'Sin historial de consultas.',
        profile_vaccines: 'Vacunas',
        profile_deworming: 'Desparasitación',
        profile_add: '+ Añadir',
        profile_years: 'Años',
        profile_loading: 'Cargando...',
        profile_error: 'Error al cargar.',
        profile_not_indicated: 'No indicado',

        // Common
        common_save: 'Guardar',
        common_cancel: 'Cancelar',
        common_delete: 'Eliminar',
        common_edit: 'Editar',
        common_loading: 'Cargando...',
        common_error: 'Error',
        common_success: 'Éxito',
        common_profile: 'Mi Perfil',
        common_manage_animals: 'Gestionar Animales',
        common_payments: 'Pagos / Facturación',
        common_settings: 'Configuración',
        common_help: 'Ayuda / Soporte',
        common_sign_out: 'Cerrar Sesión',
        common_new_ticket: 'Nuevo Ticket',
        common_tutor: 'Tutor',
        common_updated: '¡Preferencia actualizada!',
        common_saved: '¡Guardado con éxito!',
        common_pref_updated: '¡Preferencia actualizada!',
        common_today: 'Hoy',
        common_today_consult: 'Consulta Hoy',
        calendar_appointments_for: 'Citas para',
        
        // Modals - Pet
        modal_pet_title: 'Gestionar Mascota',
        modal_pet_name: 'Nombre',
        modal_pet_type: 'Tipo',
        modal_pet_type_select: 'Seleccione el tipo...',
        modal_pet_breed: 'Raza',
        modal_pet_breed_select: 'Seleccione la raza...',
        modal_pet_birth: 'Fecha de Nacimiento',
        modal_pet_weight: 'Peso (kg)',
        modal_pet_gender: 'Sexo',
        modal_pet_neutered: 'Castrado / Esterilizado',
        modal_pet_microchip: 'N.º Microchip',
        modal_pet_photo: 'Foto',
        modal_pet_choose: 'Elegir',
        modal_pet_remove: 'Eliminar',
        modal_pet_allergies: 'Alergias Conocidas',
        modal_pet_allergies_ph: 'Ej: Maní, ciertos antibióticos...',
        modal_pet_diseases: 'Enfermedades Crónicas',
        modal_pet_diseases_ph: 'Ej: Diabetes, Leishmaniosis...',
        btn_save: 'Guardar',

        // Modals - Ticket
        modal_ticket_title: 'Nueva Consulta',
        modal_ticket_which_pet: '¿Qué mascota necesita ayuda hoy?',
        modal_ticket_reason: 'Motivo Principal',
        ticket_reason_select: 'Seleccione un motivo...',
        ticket_reason_vomit: 'Vómitos',
        ticket_reason_skin: 'Problema de Piel',
        ticket_reason_vaccine: 'Vacunación',
        ticket_reason_routine: 'Rutina',
        ticket_reason_other: 'Otro',
        modal_ticket_desc_label: 'Describa lo que sucede con máximo detalle.',
        modal_ticket_desc_ph: 'Ej: ¿Cuándo empezó? ¿Cambió su dieta? ¿Está apático?...',
        modal_ticket_media_label: 'Muéstrenos el problema (Fotos/Videos)',
        modal_ticket_attach: 'Adjuntar Multimedia',
        modal_ticket_date_suggest: '¿Cuándo preferiría ser atendido? (Sugerencia)',
        modal_ticket_date_info: 'Este horario es una sugerencia y requiere confirmación de la clínica.',
        modal_ticket_vet: 'Elija el Veterinario',
        modal_loading_vets: 'Cargando veterinarios...',
        btn_send_ticket: 'Enviar Solicitud',

        // Modals - Event
        modal_event_title: 'Crear Evento de Salud',
        modal_event_which_pet: '¿Para qué Mascota?',
        modal_event_pet_select: 'Seleccione masota...',
        modal_loading_pets: 'Cargando mascotas...',
        modal_event_type: 'Tipo de Evento',
        event_type_vaccine: '🔴 Vacuna (Urgente)',
        event_type_deworming: '🟠 Desparasitación (Atención)',
        event_type_medication: '🟢 Medicación (Tratamiento)',
        event_type_consult: '🔵 Consulta / Zooni Ticket',
        event_type_routine: '🟣 Rutina / Baños',
        modal_event_name: 'Título del Evento',
        modal_event_name_ph: 'Ej: Vacuna contra Rabia, Bravecto...',
        modal_event_start_date: 'Fecha de Inicio',
        modal_event_time: 'Hora (Opcional)',
        modal_event_recurrence: 'Repetición Automática',
        recurrence_none: 'Solo una vez (No repite)',
        recurrence_daily: 'Repetir cada día',
        recurrence_weekly: 'Repetir cada semana',
        recurrence_monthly: 'Repetir cada mes (ej: desparasitante)',
        recurrence_yearly: 'Repetir cada año (ej: vacunas anuales)',
        btn_save_event: 'Guardar en Agenda',

        // Página de Veterinarios
        vet_page_subtitle: 'Busca, guarda favoritos y programa citas con quienes más confías.',
        vet_favourites: 'Favoritos',
        vet_search_ph: 'Buscar por nombre o clínica...',
        vet_all_specs: 'Todas las Especialidades',
        vet_any_status: 'Cualquier Estado',
    }
};

// ── Core i18n Engine ──────────────────────────────────────────
const ZOONI_I18N = {
    currentLang: 'pt',

    /**
     * Apply translations to the current page.
     * Elements with data-i18n="key" get textContent replaced.
     * Elements with data-i18n-placeholder="key" get placeholder replaced.
     * @param {string} lang - 'pt' | 'en' | 'es'
     * @param {boolean} [save=true] - whether to persist to localStorage
     */
    apply(lang, save = true) {
        if (!ZOONI_TRANSLATIONS[lang]) return;
        this.currentLang = lang;

        const dict = ZOONI_TRANSLATIONS[lang];

        // Text content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) el.textContent = dict[key];
        });

        // Placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key] !== undefined) el.placeholder = dict[key];
        });

        // HTML content (for elements that need innerHTML, e.g. with icons inside)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            if (dict[key] !== undefined) el.innerHTML = dict[key];
        });

        // Update <html lang> attribute
        document.documentElement.lang = lang;

        if (save) {
            localStorage.setItem('zooni-lang', lang);
        }
    },

    /**
     * Get a translated string by key.
     * @param {string} key
     * @returns {string}
     */
    t(key) {
        const dict = ZOONI_TRANSLATIONS[this.currentLang] || ZOONI_TRANSLATIONS['pt'];
        return dict[key] || key;
    },

    /**
     * Translate a ticket motivo stored in Portuguese from the DB.
     * @param {string} motivo - Portuguese value from DB
     * @returns {string} Translated label
     */
    translateMotivo(motivo) {
        if (!motivo) return "";
        const mapping = {
            "Vómitos": "motivo_vomitos",
            "Problema de Pele": "motivo_pele",
            "Vacinação": "motivo_vacinacao",
            "Rotina": "motivo_rotina",
            "Outro": "motivo_outro"
        };
        const key = mapping[motivo];
        return key ? (this.t(key) || motivo) : motivo;
    },

    /**
     * Translate an animal type (e.g. Cão, Gato) from ZooniData
     */
    translateType(type) {
        if (!type) return "";
        const lang = this.currentLang;
        if (lang === 'pt') return type;

        const map = {
            "Cão": { en: "Dog", es: "Perro" },
            "Gato": { en: "Cat", es: "Gato" },
            "Ave": { en: "Bird", es: "Ave" },
            "Roedor / Pequeno Mamífero": { en: "Rodent / Small Mammal", es: "Roedor / Mamífero Pequeño" },
            "Réptil / Anfíbio": { en: "Reptile / Amphibian", es: "Reptil / Anfibio" },
            "Cão / Equídeo": { en: "Equine", es: "Equino" },
            "Equídeo": { en: "Equine", es: "Equino" },
            "Outro": { en: "Other", es: "Otro" }
        };
        if (map[type] && map[type][lang]) return map[type][lang];
        return type;
    },

    /**
     * Translate an animal breed stored in Portuguese.
     * @param {string} breed - Portuguese breed from DB
     * @returns {string} Translated breed
     */
    translateBreed(breed) {
        if (!breed) return "";
        const lang = this.currentLang;
        if (lang === 'pt') return breed;

        const map = {
            "Sem Raça Definida (S.R.D.) / Europeu Comum": {
                en: "Mixed Breed / European Shorthair",
                es: "Mestizo / Europeo Común"
            },
            "Sem Raça Definida (S.R.D.) / Rafeiro": {
                en: "Mixed Breed",
                es: "Mestizo"
            },
            "Pastor Alemão": { en: "German Shepherd", es: "Pastor Alemán" },
            "Bulldog Francês": { en: "French Bulldog", es: "Bulldog Francés" },
            "Bulldog Inglês": { en: "English Bulldog", es: "Bulldog Inglés" },
            "Cão da Serra da Estrela": { en: "Estrela Mountain Dog", es: "Perro de la Sierra de la Estrella" },
            "Cão de Água Português": { en: "Portuguese Water Dog", es: "Perro de Agua Portugués" },
            "Lulu da Pomerânia (Spitz Alemão)": { en: "Pomeranian", es: "Pomerania" },
            "Teckel (Cão Salsicha)": { en: "Dachshund", es: "Teckel (Perro Salchicha)" },
            "Dogue Alemão": { en: "Great Dane", es: "Gran Danés" },
            "Galgo Espanhol": { en: "Spanish Greyhound", es: "Galgo Español" },
            "Caniche (Poodle)": { en: "Poodle", es: "Caniche" },
            "Outro (Cão)": { en: "Other (Dog)", es: "Otro (Perro)" },
            "Outro (Gato)": { en: "Other (Cat)", es: "Otro (Gato)" },
            "Outra (Ave)": { en: "Other (Bird)", es: "Otra (Ave)" },
            "Outro (Roedor / Mamífero)": { en: "Other (Rodent / Mammal)", es: "Otro (Roedor / Mamífero)" },
            "Outro (Réptil / Anfíbio)": { en: "Other (Reptile / Amphibian)", es: "Otro (Reptil / Anfibio)" },
            "Outro (Equídeo)": { en: "Other (Equine)", es: "Otro (Equino)" },
            "Desconhecida": { en: "Unknown", es: "Desconocida" },
            "Outro": { en: "Other", es: "Otro" }
        };

        if (map[breed] && map[breed][lang]) return map[breed][lang];
        return breed; // Fallback to original
    },

    /**
     * Initialize — load saved language from localStorage and apply.
     */
    init() {
        const saved = localStorage.getItem('zooni-lang') || 'pt';
        this.apply(saved, false);
    }
};

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ZOONI_I18N.init());
} else {
    ZOONI_I18N.init();
}
