import api from './api';

export const getAllClassesByUser = async (
  { search = '', currentPage = 1, limit = 10, sortOrder = 'asc' },
  token,
) => {
  return api.get('/v1/user/class/joined', {
    params: {
      search,
      page: currentPage,
      limit,
      sortOrder,
    },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getDetailClassByUser = async ({ class_code }, token) => {
  return api.get(`/v1/user/class/${class_code}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getLessonLearningItemByClassId = async ({ class_code }, token) => {
  return api.get(`v1/user/class/${class_code}/lesson/learning-item`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getDataForLearning = async ({ class_code }, token) => {
  return api.get(`v1/user/class/${class_code}/learning`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const joinClassByCode = async ({ class_code }, token) => {
  return api.post(`/v1/user/class/${class_code}/join`, { class_code }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};