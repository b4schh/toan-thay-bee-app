import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as questionApi from '../../services/questionApi';
import {
  setCurrentPage,
  setTotalPages,
  setTotalItems,
} from '../filter/filterSlice';
import { apiHandler } from '../../utils/apiHandler';
import { setExam } from '../exam/examSlice';

export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async ({ search, currentPage, limit, sortOrder }, { dispatch }) => {
    return await apiHandler(
      dispatch,
      questionApi.getAllQuestionAPI,
      { search, currentPage, limit, sortOrder },
      (data) => {
        dispatch(setCurrentPage(data.currentPage));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setTotalItems(data.totalItems));
      },
      true,
      false,
    );
  },
);

export const fetchExamQuestions = createAsyncThunk(
  'questions/fetchExamQuestions',
  async ({ id, search, currentPage, limit, sortOrder }, { dispatch }) => {
    return await apiHandler(
      dispatch,
      questionApi.getExamQuestionsAPI,
      { id, search, currentPage, limit, sortOrder },
      (data) => {
        dispatch(setCurrentPage(data.currentPage));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setTotalItems(data.totalItems));
        dispatch(setExam(data.exam));
      },
      true,
      false,
    );
  },
);

export const fetchPublicQuestionsByExamId = createAsyncThunk(
  'exams/fetchPublicQuestionsByExamId',
  async (id, { dispatch }) => {
    return await apiHandler(
      dispatch,
      questionApi.getPublicExamQuestionsAPI,
      { id },
      (data) => {
        dispatch(setExam(data.exam));
      },
      true,
      false,
    );
  },
);

export const fetchQuestionById = createAsyncThunk(
  'questions/fetchQuestionById',
  async (id, { dispatch }) => {
    return await apiHandler(
      dispatch,
      questionApi.getQuestionByIdAPI,
      id,
      () => {},
      true,
      false,
    );
  },
);



const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    question: null,
  },
  reducers: {
    resetDetailView: (state) => {
      state.question = null;
    },
    setDetailView: (state, action) => {
      state.isDetailView = true;
    },
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.questions = [];
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        if (action.payload) {
          state.questions = action.payload.data;
        }
      })
      .addCase(fetchExamQuestions.fulfilled, (state, action) => {
        if (action.payload) {
          state.questions = action.payload.data;
        }
      })
      .addCase(fetchQuestionById.pending, (state) => {
        state.question = null;
      })
      .addCase(fetchQuestionById.fulfilled, (state, action) => {
        if (action.payload) {
          state.question = action.payload.data;
        }
      })
      .addCase(fetchPublicQuestionsByExamId.pending, (state, action) => {
        state.questions = [];
      })
      .addCase(fetchPublicQuestionsByExamId.fulfilled, (state, action) => {
        if (action.payload) {
          state.questions = action.payload.questions;
        }
      });
  },
});

export const { setQuestion, setQuestions } = questionSlice.actions;
export default questionSlice.reducer;
