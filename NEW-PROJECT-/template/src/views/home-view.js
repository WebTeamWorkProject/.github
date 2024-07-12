import { apiKey } from "../common/constants.js";
import { toggleFavoriteStatus, renderFavoriteStatus, copyGifToFavorites } from "../events/favorites-events.js";

export const toTrendingView = async (gifs) => {
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
        <div id="trending">
            <h1>Trending GIFs</h1>
            <div class="content">
                ${gifHtml.join('')}
            </div>
        </div>
    `;
};

export async function fetchGIFs(url, containerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        if (response.status === 429) {
            container.innerHTML = '<p>API rate limit exceeded. Please try again later.</p>';
            return;
        }

        const gifHtmlPromises = data.data.map(async (gif) => {
            const favoriteStatus = await renderFavoriteStatus(gif.id);
            return `
                <div class="gif-container" data-gif-id="${gif.id}">
                    <img src="${gif.images.fixed_height.url}" alt="${gif.title}">
                    <span class="favorite" data-gif-id="${gif.id}">${favoriteStatus}</span>
                </div>
            `;
        });

        const gifHtml = await Promise.all(gifHtmlPromises);
        container.innerHTML = gifHtml.join('');

        container.querySelectorAll('.favorite').forEach((favoriteSpan) => {
            favoriteSpan.addEventListener('click', async () => {
                const gifId = favoriteSpan.getAttribute('data-gif-id');
                await toggleFavoriteStatus(gifId);
                favoriteSpan.innerHTML = await renderFavoriteStatus(gifId);
                if (favoriteSpan.innerHTML === '❤') { // Use the full heart constant
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
    } catch (error) {
        console.error('Failed to fetch GIFs:', error);
        const container = document.getElementById(containerId);
        container.innerHTML = '<p>Failed to load GIFs. Please try again later.</p>';
    }
}

export async function fetchTrendingGIFs() {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10`;
    await fetchGIFs(url, 'container');
}
