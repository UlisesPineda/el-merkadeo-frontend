import { createSlice } from '@reduxjs/toolkit';

export const adminAuthSlice = createSlice({
   name: 'adminAuth',
   initialState: {
      isAdminAuth: localStorage.getItem('isAdminAuth'),
      adminUser: {},
   },
   reducers: {
      onLoginAdmin: ( state, { payload } ) => {
         state.isAdminAuth = true;
         state.adminUser = payload;
      },
      onLogoutAdmin: ( state ) => {
        state.isAdminAuth = false;
        state.adminUser = {}
      },
   }
});

export const { 
    onLoginAdmin,
    onLogoutAdmin,
 } = adminAuthSlice.actions;