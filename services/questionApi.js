import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllQuestionAPI = ({
  search = '',
  currentPage = 1,
  limit = 10,
  sortOrder = 'asc',
}) => {
  return api.get('/v1/admin/question', {
    params: {
      search,
      page: currentPage,
      limit,
      sortOrder,
    },
  });
};

export const deleteQuestionAPI = (questionId) => {
  return api.delete(`/v1/admin/question/${questionId}`);
};

export const getExamQuestionsAPI = ({
  id,
  search = '',
  currentPage = 1,
  limit = 10,
  sortOrder = 'asc',
}) => {
  return api.get(`/v1/admin/exam/${id}/questions`, {
    params: {
      search,
      page: currentPage,
      limit,
      sortOrder,
    },
  });
};

export const getPublicExamQuestionsAPI = async ({ id }) => {
  const token = await AsyncStorage.getItem('authToken'); // 🔥 Lấy token

  return api.get(`/v1/user/exam/${id}/questions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getQuestionByIdAPI = (id) => {
  return api.get(`/v1/admin/question/${id}`);
};

