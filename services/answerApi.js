import api from './api';

export const getAnswersByAttemptAPI = ({ attemptId }, token) => {
  return api.get(`/v1/user/answer/attempt/${attemptId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getQuestionAndAnswersByAttemptAPI = ({ attemptId }, token) => {
  return api.get(`/v1/user/answer/attempt/${attemptId}/questions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
