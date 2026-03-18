document.addEventListener('DOMContentLoaded', () => {

    // ---Live Search e FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    const searchInput = document.querySelector('.searchInput');

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

    // Funciona ao clicar no botão (mouse ou Touch)
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
});