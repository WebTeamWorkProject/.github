import { apiKey, FULL_HEART, EMPTY_HEART } from "../common/constants.js";

function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

function saveToFavorites(gif) {
    const favorites = getFavorites();
    favorites.push(gif);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function removeFromFavorites(gifId) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.id !== gifId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function isFavorite(gifId) {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === gifId);
}

export async function fetchGIFs(url, containerId) {
    const response = await fetch(url);
    const data = await response.json();
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    data.data.forEach(gif => {
        const isFav = isFavorite(gif.id);
        const gifDiv = document.createElement('div');
        gifDiv.classList.add('gif');
        gifDiv.innerHTML = `
            <div class="gif-container">
                <img src="${gif.images.fixed_height.url}" alt="${gif.title}">
                <div class="fav-btn">
                    <span class="favme ${isFav ? 'active' : ''}">${isFav ? FULL_HEART : EMPTY_HEART}</span>
                </div>
            </div>
        `;
        container.appendChild(gifDiv);

        gifDiv.querySelector('.favme').addEventListener('click', function() {
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.textContent = FULL_HEART;
                saveToFavorites(gif);
            } else {
                this.textContent = EMPTY_HEART;
                removeFromFavorites(gif.id);
            }
        });
    });
}

export async function fetchTrendingGIFs() {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10`;
    fetchGIFs(url, 'container');
}