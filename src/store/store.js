import { configureStore } from "@reduxjs/toolkit";
import { adminAuthSlice, alertMessageSlice, cartSlice, productsAdminSlice, productsUserSlice, promoSlice, userAuthSlice } from "./slices";
import { categorySlice } from "./slices/categorySlice";

export const store = configureStore({
    reducer: {
        userAuth: userAuthSlice.reducer,
        productsUser: productsUserSlice.reducer,
        category: categorySlice.reducer,
        promo: promoSlice.reducer,
        alertMessage: alertMessageSlice.reducer,
        adminAuth: adminAuthSlice.reducer,
        productAdmin: productsAdminSlice.reducer,
        cart: cartSlice.reducer,
    },
});