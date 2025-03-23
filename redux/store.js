import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import classReducer from '../features/class/classSlice';
import filterReducer from '../features/filter/filterSlice';
import examReducer from '../features/exam/examSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    class: classReducer,
    filter: filterReducer,
    exam: examReducer,
  },
});