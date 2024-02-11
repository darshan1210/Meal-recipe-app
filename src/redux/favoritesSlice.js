
import { createSlice } from '@reduxjs/toolkit';

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        addToFavorites: (state, action) => {
            return [...state, action.payload];
        },
        removeFromFavorites: (state, action) => {
            return state.filter((meal) => meal.idMeal !== action.payload.idMeal);
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites;

export default favoritesSlice.reducer;
