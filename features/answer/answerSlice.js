import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiHandler } from '../../utils/apiHandler';
import {
  getAnswersByAttemptAPI,
  getQuestionAndAnswersByAttemptAPI,
} from '../../services/answerApi';
import { setQuestions } from '../question/questionSlice';
import { setExam } from '../exam/examSlice';

export const fetchQuestionAndAnswersByAttempt = createAsyncThunk(
  'answers/fetchQuestionAndAnswersByAttempt',
  async ({ attemptId }, { dispatch }) => {
    return await apiHandler(
      dispatch,
      getQuestionAndAnswersByAttemptAPI,
      { attemptId },
      (data) => {
        dispatch(setQuestions(data.data.questions));
        dispatch(setExam(data.data.exam));
      },
      true,
      false,
    );
  },
);

export const fetchAnswersByAttempt = createAsyncThunk(
  'answers/fetchAnswersByAttempt',
  async (attemptId, { dispatch }) => {
    return await apiHandler(
      dispatch,
      getAnswersByAttemptAPI,
      { attemptId },
      () => {},
      true,
      false,
    );
  },
);

const answerSlice = createSlice({
  name: 'answers',
  initialState: {
    answers: [],
    score: null,
    startTime: null,
    endTime: null,
  },
  reducers: {
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswersByAttempt.pending, (state) => {
        state.answers = [];
      })
      .addCase(fetchAnswersByAttempt.fulfilled, (state, action) => {
        if (action.payload) {
          state.answers = action.payload.data;
        }
      })
      .addCase(fetchQuestionAndAnswersByAttempt.pending, (state) => {
        state.answers = [];
        state.score = null;
      })
      .addCase(fetchQuestionAndAnswersByAttempt.fulfilled, (state, action) => {
        if (action.payload) {
          state.answers = action.payload.data.answers;
          state.score = action.payload.data.score;
          state.startTime = action.payload.data.startTime;
          state.endTime = action.payload.data.endTime;
        }
      });
  },
});

export const { setAnswers } = answerSlice.actions;
export default answerSlice.reducer;
