import { CONTAINER_SELECTOR, TRENDING, FAVORITES } from '../common/constants.js';
import { fetchTrendingGIFs, fetchGif } from '../requests/request-service.js';
import { toTrendingView } from '../views/home-view.js';
import { showFavorites } from '../views/favorites-view.js';
import { q, setActiveNav } from './helpers.js';

export const loadPage = async (page = '') => {
    switch (page) {
        case TRENDING:
            setActiveNav(TRENDING);
            await renderTrending();
            break;
        case FAVORITES:
            setActiveNav(FAVORITES);
            await showFavorites();
            break;
        default:
            break;
    }
};

const renderTrending = async () => {
    const gifs = await fetchTrendingGIFs();
    q(CONTAINER_SELECTOR).innerHTML = await toTrendingView(gifs);
};
