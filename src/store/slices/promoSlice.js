import { createSlice } from '@reduxjs/toolkit';

export const promoSlice = createSlice({
   name: 'promo',
   initialState: {
      isLoadedPromos: false,
      promos: [],
   },
   reducers: {
      onLoadedPromos: ( state, { payload } ) => {
        state.isLoadedPromos = true;
        state.promos = payload;
      },
      onAddedPromo: ( state, { payload } ) => {
        state.isLoadedPromos = true;
        state.promos = [...state.promos, payload];
      },
   }
});

export const { 
    onLoadedPromos,
    onAddedPromo,
} = promoSlice.actions;