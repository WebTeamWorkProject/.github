import { CONTAINER_SELECTOR, FULL_HEART, EMPTY_HEART } from "../common/constants.js";

function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

function removeFromFavorites(gifId) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.id !== gifId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function showFavorites() {
    const favorites = getFavorites();
    const container = document.querySelector(CONTAINER_SELECTOR);
    container.innerHTML = '';
    favorites.forEach(gif => {
        const gifDiv = document.createElement('div');
        gifDiv.classList.add('gif');
        gifDiv.innerHTML = `
            <div class="gif-container">
                <img src="${gif.images.fixed_height.url}" alt="${gif.title}">
                <div class="fav-btn">
                    <span class="favme active">${FULL_HEART}</span>
                </div>
            </div>
        `;
        container.appendChild(gifDiv);

        gifDiv.querySelector('.favme').addEventListener('click', function() {
            this.classList.remove('active');
            this.textContent = EMPTY_HEART;
            removeFromFavorites(gif.id);
            showFavorites(); // Refresh the favorites list
        });
    });
}