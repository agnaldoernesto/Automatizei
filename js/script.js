document.addEventListener('DOMContentLoaded', () => {

    // --- FAQ Accordion e Live Search ---
    const faqItems = document.querySelectorAll('.faq-item');
    const searchInput = document.getElementById('searchInput');

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

    // Função de pesquisa
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const searchText = e.target.value.toLowerCase();

            faqItems.forEach(item => {
                const questionText = item.querySelector('h4').textContent.toLowerCase();
                const answerText = item.querySelector('.faq-answer p').textContent.toLowerCase();

                if (questionText.includes(searchText) || answerText.includes(searchText)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // --- Lógica para alternar o tema claro/escuro ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Função para atualizar o ícone
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

    // Carrega o tema salvo no localStorage ou detecta a preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    } else if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
    } else {
        // Se não houver tema salvo, verifica a preferência do sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.classList.add('dark-theme');
        }
    }

    // Define o atributo data-theme ao carregar a página
    body.setAttribute('data-theme', body.classList.contains('dark-theme') ? 'dark' : 'light');

    // Atualiza o ícone ao carregar a página
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
});