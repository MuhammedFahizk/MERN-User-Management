import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    isLoggedIn: false,
    user_loading: false,
    token_loading: false,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
    authUserLoading(state, action) {
      const { payload } = action;
      return {
        ...state,
        user_loading: payload?.loading,
      };
    },
  },
});

export const { setAccessToken, clearAccessToken, authUserLoading } = authSlice.actions;
export default authSlice.reducer;
