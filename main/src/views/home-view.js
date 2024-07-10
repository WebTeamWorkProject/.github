import { apiKey } from "../constants/constants.js";


export async function fetchGIFs(url, containerId) {
    const response = await fetch(url);
    const data = await response.json();
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    data.data.forEach(gif => {
        const gifDiv = document.createElement('div');
        gifDiv.classList.add('gif');
        gifDiv.innerHTML = `<img src="${gif.images.fixed_height.url}" alt="${gif.title}">`;
        container.appendChild(gifDiv);
    });
}

export async function fetchTrendingGIFs() {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10`;
    fetchGIFs(url, 'container');
};