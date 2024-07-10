import { apiKey } from "../common/constants.js";
import { fetchGIFs } from "./home-view.js";

export async function searchGIFs() {
    const searchInput = document.getElementById('search');
    const query = searchInput.value;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=10`;
    fetchGIFs(url, 'container');
    searchInput.value = '';
}