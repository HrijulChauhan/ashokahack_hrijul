import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (restaurantId) => {
        setFavorites((prev) =>
            prev.includes(restaurantId)
                ? prev.filter((id) => id !== restaurantId)
                : [...prev, restaurantId]
        );
    };

    const isFavorite = (restaurantId) => favorites.includes(restaurantId);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
