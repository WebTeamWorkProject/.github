// data/gifs.js

import { apiKey } from '../common/constants.js';

export async function getCategories() {
  const response = await fetch(`https://api.giphy.com/v1/gifs/categories?api_key=${apiKey}`);
  const categories = await response.json();
  return categories.data;
}

export async function getGetGifsGeneralInfo() {
  const response = await fetch(`https://api.giphy.com/v1/gifs?api_key=${apiKey}`);
  const gifsInfo = await response.json();
  return gifsInfo.data;
}

export async function getGifById(gifId) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/${gifId}?api_key=${apiKey}`);
  const gif = await response.json();
  return gif.data;
}

export async function getCategory(categoryId) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/categories/${categoryId}?api_key=${apiKey}`);
  const category = await response.json();
  return category.data;
}

export async function searchGifs(searchTerm) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=25`);
  const gifs = await response.json();
  return gifs.data;
}
