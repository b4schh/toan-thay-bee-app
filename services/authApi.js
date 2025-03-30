// src/services/authAPI.js
import api from './api';

// Gọi API đăng ký
export const registerAPI = (userData) =>
  api.post('/v1/user/register', userData);

// Gọi API đăng nhập
export const loginAPI = (credentials) =>
  api.post('/v1/user/login', credentials);

// Gọi API đăng xuất
export const logoutAPI = async (_, token) => {
  return api.post('/v1/user/logout', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkLoginAPI = async (_, token) => {
  return api.get('/v1/user/check-login', {
    headers: {
      Authorization: `Bearer ${token}`, // nếu dùng token
    },
  });
};
