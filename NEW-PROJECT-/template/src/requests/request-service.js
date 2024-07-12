import { apiKey } from '../common/constants.js';

export const loadCategories = async () => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/categories?api_key=${apiKey}`);
    const category = await response.json();
    return category.data;
};

export const loadCategory = async (id = null) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/categories/${id}?api_key=${apiKey}`);
    const category = await response.json();
    return category.data;
};

export const loadSearchGifs = async (searchTerm = '') => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=25`);
    const gifSearch = await response.json();
    return gifSearch.data;
};

export const fetchGif = async (id) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}`);
    const gifById = await response.json();
    return gifById.data;
};

export const fetchTrendingGIFs = async () => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10`);
    const trendingGifs = await response.json();
    return trendingGifs.data;
};
