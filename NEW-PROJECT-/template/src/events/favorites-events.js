import { EMPTY_HEART, FULL_HEART } from '../common/constants.js';
import { addFavorite, getFavorites, removeFavorite } from '../data/favorites.js';
import { fetchGif } from '../requests/request-service.js';

export const toggleFavoriteStatus = async (gifId) => {
    const favorites = await getFavorites();
    if (favorites.includes(gifId)) {
        await removeFavorite(gifId);
    } else {
        await addFavorite(gifId);
    }
};

export const renderFavoriteStatus = async (gifId) => {
    const favorites = await getFavorites();
    return favorites.includes(gifId) ? FULL_HEART : EMPTY_HEART;
};

export const copyGifToFavorites = async (gifId) => {
    const gif = await fetchGif(gifId);
    const container = document.getElementById('favorites-container');
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
        if (favoriteSpan.innerHTML === EMPTY_HEART) {
            container.removeChild(gifDiv);
        }
    });
};
