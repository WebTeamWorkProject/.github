import { renderFavoriteStatus, toggleFavoriteStatus, copyGifToFavorites } from "../events/favorites-events.js";

export const toGIFsView = async (gifs) => {
    const gifHtmlPromises = gifs.map(async (gif) => {
        const favoriteStatus = await renderFavoriteStatus(gif.id);
        return `
            <div class="gif-container" data-gif-id="${gif.id}">
                <img src="${gif.images.fixed_height.url}" alt="${gif.title}">
                <span class="favorite" data-gif-id="${gif.id}">${favoriteStatus}</span>
            </div>
        `;
    });

    const gifHtml = await Promise.all(gifHtmlPromises);
    return `
        <div id="search-results">
            <h1>Search Results</h1>
            <div class="content">
                ${gifHtml.join('')}
            </div>
        </div>
    `;
};

export const renderSearchItems = async (searchTerm) => {
    const gifs = await loadSearchGifs(searchTerm);
    const container = document.querySelector('#container');
    container.innerHTML = await toGIFsView(gifs.data);

    container.querySelectorAll('.favorite').forEach((favoriteSpan) => {
        favoriteSpan.addEventListener('click', async () => {
            const gifId = favoriteSpan.getAttribute('data-gif-id');
            await toggleFavoriteStatus(gifId);
            favoriteSpan.innerHTML = await renderFavoriteStatus(gifId);
            if (favoriteSpan.innerHTML === FULL_HEART) {
                await copyGifToFavorites(gifId);
            } else {
                const favoritesContainer = document.getElementById('favorites-container');
                const gifDiv = favoritesContainer.querySelector(`[data-gif-id="${gifId}"]`);
                if (gifDiv) {
                    favoritesContainer.removeChild(gifDiv);
                }
            }
        });
    });
};
