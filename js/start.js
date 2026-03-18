document.addEventListener('DOMContentLoaded', () => {
    const searchInputMain = document.querySelector('.searchInputMain');
    
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

});