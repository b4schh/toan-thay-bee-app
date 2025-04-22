import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllPublicExamAPI = async (data, token) => {
  if (!token) {
    throw new Error('Bạn cần đăng nhập trước khi lấy danh sách đề thi.');
  }

  return api.get('/v1/user/exam', {
    params: data,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getExamById = async ({ examId }, token) => {
  if (!token) {
    throw new Error('Bạn cần đăng nhập trước khi xem chi tiết đề thi.');
  }
  return api.get(`/v1/exams/${examId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getSavedExams = async (_, token) => {
  if (!token) {
    throw new Error('Bạn cần đăng nhập trước khi lấy danh sách đề thi.');
  }
  return api.get(`/v1/user/exam/saved`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getExamPublic = ({ id }, token) => {
  return api.get(`/v1/user/exam/${id}`, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });
}

export const saveExamForUserAPI = async ({ examId }, token) => {
  if (!token) {
    throw new Error('Bạn cần đăng nhập trước khi lưu đề thi.');
  }
  return api.post('/v1/user/save-exam', { examId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};