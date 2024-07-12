let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

export const addFavorite = async (gifId) => {
    if (favorites.find(id => id === gifId)) {
        return;
    }
    favorites.push(gifId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const removeFavorite = async (gifId) => {
    favorites = favorites.filter(id => id !== gifId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const getFavorites = async () => [...favorites];
