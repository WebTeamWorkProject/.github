import { toGIFsView } from "../views/movie-views.js";
import { CONTAINER_SELECTOR } from "../common/constants.js";
import { q } from "./helpers.js";
import { loadSearchGifs } from "../requests/request-service.js";

export const renderSearchItems = async (searchTerm) => {
    if (searchTerm) {
        const gifs = await loadSearchGifs(searchTerm);
        const container = q(CONTAINER_SELECTOR);
        container.innerHTML = await toGIFsView(gifs.data);
    }
};
