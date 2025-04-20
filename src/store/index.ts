import { create } from 'zustand';
import {  User } from '../types';
import { configureStore } from '@reduxjs/toolkit';
import * as reducers from './slices/index';

interface Store {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const store = configureStore({
  reducer: {
      apiMessage: reducers.apiMessage,
      authState: reducers.authState,
      loader: reducers.loader,
      job: reducers.job,
      EmployerJob: reducers.EmployerJob,
      
  }
})

export const useStore = create<Store>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));


export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;