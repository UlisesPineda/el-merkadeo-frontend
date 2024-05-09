import { createSlice } from '@reduxjs/toolkit';

export const productsAdminSlice = createSlice({
   name: 'productsAdmin',
   initialState: {
      isLoadAdminProds: false,
      adminProducts: [],
      adminImages: [],
      isEdit: false,
      isEditData: false,
   },
    reducers: {
        onSearchProduct: ( state, { payload } ) => {
            state.isLoadAdminProds = true;
            state.isEdit = false;
            state.adminProducts = payload;
            state.adminImages = [];
            state.isEditData = false;
        },
        onAddImageProduct: ( state, { payload } ) => {
            state.isLoadAdminProds = true;
            state.isEdit = true;
            state.adminProducts = payload[0];
            state.adminImages = payload[1];
            state.isEditData = false; 
        },
        onEditStateProduct: ( state, { payload } ) => {
            state.isLoadAdminProds = true;
            state.isEdit = true;
            state.adminProducts = payload[0];
            state.adminImages = payload[1];
            state.isEditData = false; 
        },
        onEditDataProduct: ( state, { payload } ) => {
            state.isLoadAdminProds = true;
            state.isEdit = true;
            state.adminProducts = payload[0];
            state.adminImages = payload[1];
            state.isEditData = true;             
        },
        onClearSearch: ( state ) => {
            state.isLoadAdminProds = false;
            state.isEdit = true;
            state.adminProducts = [];
            state.adminImages = [];
            state.isEditData = false;
        },
    },
});

export const { 
    onSearchProduct,
    onAddImageProduct,
    onEditStateProduct,
    onClearSearch,
    onEditDataProduct,
 } = productsAdminSlice.actions;