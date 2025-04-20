import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { API_URL } from '../constant';
import { getLoggesInUser } from '../store/slices/login';
import axios from 'axios';

interface ILoginProps {
  email: string;
  password: string;
}

export const Login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: ILoginProps, { dispatch }) => {
    try {
      const response = await axios.post(API_URL.GET_ADMING_LOGIN, { email, password });

      // Extract the token and user data from the response
      const { token, user } = response.data;

      if (!user || !user.id) {
        throw new Error("User data is not available");
      }

      const { id, name, mobile, role } = user;

      // Store tokens and user information in localStorage
      localStorage.setItem('jobToken', token);
      localStorage.setItem('LoginEmail', email);
      localStorage.setItem('userId', id);
      localStorage.setItem('role', role);
      localStorage.setItem('userName', name);
      localStorage.setItem('userMobile', mobile);

      // Dispatch the user data to Redux store
      dispatch(getLoggesInUser(user));

      // Show a success toast
      toast.success('Login Successful', { autoClose: 1200 });

      return response.data;
    } catch (error: any) {
      // Show an error toast if login fails
      toast.error(error.response?.data?.message || 'Login failed', { autoClose: 3000 });
      throw error;
    }
  }
);
