// ═══════════════════════════════════════════════════════
// Zooni — Theme Loader (run EARLY in <head> to avoid FOUC)
// Reads 'zooni-theme' from localStorage and sets data-theme
// ═══════════════════════════════════════════════════════
(function () {
    window.applyZooniTheme = function(theme) {
        // Force light mode on veterinarian pages
        if (window.location.pathname.includes('_veterinario')) {
            document.documentElement.removeAttribute('data-theme');
            return;
        }

        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (theme === 'auto' || theme === 'system') {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    };

    const saved = localStorage.getItem('zooni-theme') || 'light';
    window.applyZooniTheme(saved);
})();
