import { searchGIFs } from "./views/search-view.js";
import { fetchTrendingGIFs } from "./views/home-view.js";

document.getElementById('search').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchGIFs();
    }
});

document.getElementById('home-link').addEventListener('click', function (event) {
    event.preventDefault();
    fetchTrendingGIFs();
});

document.addEventListener('DOMContentLoaded', fetchTrendingGIFs);