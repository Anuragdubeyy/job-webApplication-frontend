import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Login } from '../../api/login';
import { LoginInput } from '../../schema/AuthSchema';

// Interface for user information
export interface LoginInfo {
  id: string;
  name: string;
  email: string;
  mobile: string;
  isActive: string;
  isDelete: string;
  image: string;
  role: string;
  userType: string;
  created_at: string;
  updated_at: string;
}

// State interface
interface ILoginState {
  accessToken: string;
  loggedInUser: {
    adminId: string;
    email: string;
  };
  key: string;
  allLoginList: LoginInfo[];
  isLoginLoading: boolean;
  isLoginMessage: string;
  selectedLoginId: string;
}

// Initial state
const initialState: ILoginState = {
  accessToken: '',
  loggedInUser: {
    adminId: '',
    email: '',
  },
  key: '',
  allLoginList: [],
  isLoginLoading: false,
  isLoginMessage: '',
  selectedLoginId: '',
};

// Async thunk for login
export const getAdminAsync = createAsyncThunk(
  "auth/login",
  async (email: LoginInput) => {
    const res: any = await Login(email);
    return res.data;
  }
);

// Slice definition
const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getAccessToken: (state, action) => {
      state.accessToken = action.payload.access_token;
    },
    getLoggesInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminAsync.pending, state => {
        state.isLoginLoading = true;
      })
      .addCase(getAdminAsync.fulfilled, (state, action) => {
        const { user } = action.payload;

        state.accessToken = user.access_token;
        state.loggedInUser = {
          adminId: user._id,
          email: user.email,
        };
        state.allLoginList = [user];
        state.isLoginLoading = false;
        state.selectedLoginId = user._id;

        // Debugging purpose: Consider removing this in production
        console.log(action.payload);
      })
      .addCase(getAdminAsync.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.isLoginMessage = action.error.message || 'Login failed';
      });
  },
});

// Selectors
export const selectAllLoginInfoList = (state: RootState) =>
  state.authState.allLoginList;

export const selectLoginId = (state: RootState) =>
  state.authState.selectedLoginId;

export const selectLoginInfoMessage = (state: RootState) =>
  state.authState.isLoginMessage;

// Export actions and reducer
export const { getAccessToken, getLoggesInUser } = login.actions;

export default login.reducer;
