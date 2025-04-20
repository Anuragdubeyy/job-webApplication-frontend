// auth.ts (Redux Slice for handling logout)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: any;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

// Handle logout: Clear local storage and update Redux state
export const handleLogout = () => (dispatch: any) => {
  localStorage.clear(); // Clear all localStorage items
  dispatch(logout()); // Update the Redux state to reflect the user is logged out
};

export default authSlice.reducer;
