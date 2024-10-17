import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    isLoggedIn: false,
    userLoading: false,  // Added userLoading state
    tokenLoading: false,  // If you have a separate token loading state
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.isLoggedIn = true;  // Set isLoggedIn to true when accessToken is set
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      state.isLoggedIn = false;
    },
    authUserLoading: (state, action) => {
      const { payload } = action;
      state.userLoading = payload?.loading;  
    },
    toggleUserLoading: (state) => {
      state.userLoading = !state.userLoading;  
    },
    authUserLogout(state) {
      state.accessToken = null;
      state.isLoggedIn = false; 
    },
  },
});

export const { setAccessToken, clearAccessToken,authUserLogout, authUserLoading, toggleUserLoading } = authSlice.actions;
export default authSlice.reducer;
