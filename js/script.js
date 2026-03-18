document.addEventListener('DOMContentLoaded', () => {

    //  Lógica para alternar o tema claro/escuro 
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    function updateToggleIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (!icon) return;

        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    } else if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.classList.add('dark-theme');
        }
    }

    body.setAttribute('data-theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
    updateToggleIcon(body.getAttribute('data-theme'));

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const newTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleIcon(newTheme);
        });
    }

    // --- Botão de voltar ao topo ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    function handleScroll() {
        if (!scrollTopBtn) return;
        const showAfter = 300;
        if (window.scrollY > showAfter) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', (e) => {
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) {
                window.scrollTo(0, 0);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
});