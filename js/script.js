document.addEventListener('DOMContentLoaded', () => {

    // --- FAQ Accordion e Live Search ---
    const faqItems = document.querySelectorAll('.faq-item');
    const searchInput = document.querySelector('.searchInput');
    const searchInputMain = document.querySelector('.searchInputMain');

    // Lógica do Accordion (Suporte)
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question) {
            question.addEventListener('click', () => {
                const icon = question.querySelector('.toggle-icon');

                // Fecha todos os outros itens FAQ abertos
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.toggle-icon');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = null;
                            otherAnswer.style.padding = '0 30px';
                        }
                        if (otherIcon) {
                            otherIcon.classList.remove('fa-chevron-up');
                            otherIcon.classList.add('fa-chevron-down');
                        }
                    }
                });

                // Alterna o item FAQ clicado
                if (answer) {
                    if (answer.style.maxHeight) {
                        answer.style.maxHeight = null;
                        answer.style.padding = '0 30px';
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    } else {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        answer.style.padding = '0 20px';
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                    }
                }
            });
        }
    });

    // Pesquisa na página de Suporte
    if (searchInput) {
        const noResultsFaq = document.getElementById('no-results-faq');

        searchInput.addEventListener('keyup', (e) => {
            const searchText = e.target.value.toLowerCase();
            let foundAny = false;

            faqItems.forEach(item => {
                const questionText = item.querySelector('h4').textContent.toLowerCase();
                const answerText = item.querySelector('.faq-answer p').textContent.toLowerCase();

                if (questionText.includes(searchText) || answerText.includes(searchText)) {
                    item.style.display = 'block';
                    foundAny = true;
                } else {
                    item.style.display = 'none';
                }
            });

            // Exibe ou esconde a mensagem de erro
            noResultsFaq.style.display = foundAny ? 'none' : 'block';
        });
    }

    // --- Lógica de Posicionamento ao Pesquisar (Suporte) ---
    const searchButton = document.querySelector('.searchButton');
    const faqSection = document.getElementById('faq-section');

    // Função única para fazer o scroll
    const scrollToFaqs = () => {
        if (faqSection) {
            faqSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Funciona ao clicar no botão (Rato ou Touch)
    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault(); // Evita qualquer comportamento padrão
            scrollToFaqs();
        });
    }

    // Funciona ao pressionar Enter no teclado
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                scrollToFaqs();
            }
        });
    }

    // Pesquisa na página Início
    if (searchInputMain) {
        const noResultsMain = document.getElementById('no-results-main');

        searchInputMain.addEventListener('keyup', (e) => {
            const searchTextMain = e.target.value.toLowerCase();
            const toolCards = document.querySelectorAll('.tool-item');
            let foundAny = false;

            toolCards.forEach(item => {
                const cardText = item.textContent.toLowerCase();
                if (cardText.includes(searchTextMain)) {
                    item.style.display = 'block';
                    foundAny = true;
                } else {
                    item.style.display = 'none';
                }
            });

            // Exibe ou esconde a mensagem de erro
            noResultsMain.style.display = foundAny ? 'none' : 'block';
        });
    }

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

    // --- Botão de voltar ao topo (scroll-to-top) ---
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