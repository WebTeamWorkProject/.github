import { renderSearchItems } from "./events/search-events.js";
import { fetchTrendingGIFs } from "./views/home-view.js";
import { showFavorites } from "./views/favorites-view.js";

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const favoritesLink = document.getElementById('favorites-link');
    const trendingLink = document.getElementById('trending-link');

    if (searchInput) {
        searchInput.addEventListener('keypress', async function (event) {
            if (event.key === 'Enter') {
                const searchTerm = event.target.value.trim();
                if (searchTerm) {
                    await renderSearchItems(searchTerm);
                }
            }
        });
    }

    if (favoritesLink) {
        favoritesLink.addEventListener('click', async function (event) {
            event.preventDefault();
            await showFavorites();
        });
    }

    if (trendingLink) {
        trendingLink.addEventListener('click', async function (event) {
            event.preventDefault();
            await fetchTrendingGIFs();
        });
    }

    // Trigger the trending GIFs to load initially
    fetchTrendingGIFs();
});
