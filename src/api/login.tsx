// Login.ts (Login logic)
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { API_URL } from '../constant';
import { getLoggesInUser } from '../store/slices/login';
import axios from 'axios';
// import { handleLogout } from '../store/slices/auth';

interface ILoginProps {
  email: string;
  password: string;
}

export const Login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: ILoginProps, { dispatch }) => {
    try {
      const response = await axios.post(API_URL.GET_ADMING_LOGIN, { email, password });
      const { user } = response.data;

      if (!user || !user._id) {
        throw new Error("User data is not available");
      }

      const { _id, access_token, role } = user;

      // Store tokens in localStorage
      localStorage.setItem('jobToken', access_token);
      localStorage.setItem('LoginEmail', email);
      localStorage.setItem('userId', _id);
      localStorage.setItem('role', role);

      dispatch(getLoggesInUser(user));

      toast.success('Login Successful', { autoClose: 1200 });

      return response.data;
    } catch (error: any) {
      toast.error(error.message || 'Login failed', { autoClose: 3000 });
      throw error;
    }
  }
);

