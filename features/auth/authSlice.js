import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginAPI,
  registerAPI,
  logoutAPI,
  checkLoginAPI,
} from '../../services/authApi';
import { setErrorMessage } from '../state/stateApiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiHandler } from '../../utils/apiHandler';

// Thunk đăng nhập
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await loginAPI(credentials);
      const { user, token } = response.data; // API trả về { user }

      // Lưu token vào AsyncStorage với key 'token'
      if (token) {
        await AsyncStorage.setItem('authToken', token);
      }
      return user;
    } catch (error) {
      const errorMsg = error.response.status || 'Đăng nhập thất bại';
      dispatch(setErrorMessage(errorMsg));
      return rejectWithValue(errorMsg);
    }
  },
);

// Thunk kiểm tra đăng nhập
export const checkLogin = createAsyncThunk(
  'auth/checkLogin',
  async (_, { dispatch }) => {
    return await apiHandler(dispatch, checkLoginAPI, null, null, false);
  },
);

// Thunk đăng ký
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await registerAPI(userData);
      const { user } = response.data;
      return user;
    } catch (error) {
      const errorMsg = error.response?.data.message || 'Đăng ký thất bại';
      dispatch(setErrorMessage(errorMsg));
      return rejectWithValue(errorMsg);
    }
  },
);

// Thunk đăng xuất
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    return await apiHandler(dispatch, logoutAPI, null, null, false);
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false, // Đang load thông tin đăng nhập, đăng ký hay checkLogin
    isChecking: true, // Dùng để biết lần đầu checkLogin có đang chạy không
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isChecking = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })

      // Xử lý checkLogin
      .addCase(checkLogin.pending, (state) => {
        state.loading = true;
        state.isChecking = true;
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isChecking = false;
        state.user = action.payload;
      })
      .addCase(checkLogin.rejected, (state) => {
        state.loading = false;
        state.isChecking = false;
        state.user = null;
      })

      // Xử lý register
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })

      // Xử lý logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
