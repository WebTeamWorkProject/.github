import { getFavorites } from "../data/favorites.js";
import { renderFavoriteStatus, toggleFavoriteStatus } from "../events/favorites-events.js";

export async function showFavorites() {
    const favorites = await getFavorites();
    const container = document.getElementById('favorites-container');
    container.innerHTML = '';

    if (favorites.length === 0) {
        container.innerHTML = '<p>No favorites yet. Add some GIFs to favorites to see them here.</p>';
        return;
    }

    for (const gifId of favorites) {
        const gif = await fetchGif(gifId);
        const gifDiv = document.createElement('div');
        gifDiv.classList.add('gif-container');
        gifDiv.setAttribute('data-gif-id', gifId);
        gifDiv.innerHTML = `
            <img src="${gif.images.fixed_height.url}" alt="${gif.title}">
            <span class="favorite" data-gif-id="${gif.id}">${await renderFavoriteStatus(gif.id)}</span>
        `;
        container.appendChild(gifDiv);

        const favoriteSpan = gifDiv.querySelector('.favorite');
        favoriteSpan.addEventListener('click', async () => {
            await toggleFavoriteStatus(gif.id);
            favoriteSpan.innerHTML = await renderFavoriteStatus(gif.id);
            if (favoriteSpan.innerHTML === '♡') { // Use the empty heart constant
                container.removeChild(gifDiv);
            }
        });
    }
}
