import api from './api';

export const getAttemptsByExamIdApi = async (
  { examId, currentPage },
  token,
) => {
  const response = await api.get(`/v1/user/attempt/exam/${examId}`, {
    params: {
      page: currentPage,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//
export const getAttemptByStudentIdApi = async ({ examId }, token) => {
  return await api.get(`/v1/user/attempt/exam/${examId}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAttemptCompletedApi = async (_, token) => {
  return await api.get(`/v1/user/attempt`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};