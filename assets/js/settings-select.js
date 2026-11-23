/**
 * Settings sub-menu → combo box (mobile).
 * Builds a <select> from the buttons inside `.settings-nav` and keeps it in
 * sync with the existing switchSection() logic. The select is only visible on
 * small screens (see theme.css); the original vertical menu is kept elsewhere.
 */
(function () {
    function init() {
        const nav = document.querySelector('.settings-nav');
        if (!nav || nav.dataset.selectReady) return;
        nav.dataset.selectReady = '1';

        const buttons = Array.from(nav.querySelectorAll('.settings-nav-item'));
        if (!buttons.length) return;

        const wrap = document.createElement('div');
        wrap.className = 'settings-nav-select-wrap';
        wrap.innerHTML = '<i class="fa-solid fa-list-ul settings-nav-select-icon"></i>' +
            '<select class="settings-nav-select" aria-label="Secção das definições"></select>' +
            '<i class="fa-solid fa-chevron-down settings-nav-select-arrow"></i>';
        const select = wrap.querySelector('select');
        nav.parentNode.insertBefore(wrap, nav);
        nav.classList.add('has-select');

        function labelOf(btn) {
            return btn.textContent.replace(/\s+/g, ' ').trim();
        }

        function buildOptions() {
            const current = buttons.findIndex(b => b.classList.contains('active'));
            select.innerHTML = '';
            buttons.forEach((btn, i) => {
                const opt = document.createElement('option');
                opt.value = i;
                opt.textContent = labelOf(btn);
                select.appendChild(opt);
            });
            select.value = current >= 0 ? current : 0;
        }

        function syncFromButtons() {
            const current = buttons.findIndex(b => b.classList.contains('active'));
            if (current >= 0 && String(current) !== select.value) select.value = current;
        }

        select.addEventListener('change', () => {
            const btn = buttons[parseInt(select.value, 10)];
            if (btn) btn.click(); // reuses each page's own switchSection()
        });

        // Refresh labels (language changes) whenever the user opens the select
        ['mousedown', 'focus', 'touchstart'].forEach(ev =>
            select.addEventListener(ev, () => {
                const sel = select.value;
                buildOptions();
                select.value = sel;
            }, { passive: true })
        );

        // Keep the select in sync if the section is changed some other way
        const observer = new MutationObserver(syncFromButtons);
        buttons.forEach(b => observer.observe(b, { attributes: true, attributeFilter: ['class'] }));

        buildOptions();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
