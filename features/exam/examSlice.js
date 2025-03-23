import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllExamsByUser, getExamById } from '../../services/examApi';
import { apiHandler } from '../../utils/apiHandler';
import {
  setCurrentPage,
  setTotalPages,
  setTotalItems,
} from '../filter/filterSlice';

export const fetchExamsByUser = createAsyncThunk(
  'exam/fetchExamsByUser',
  async ({ search, currentPage, limit, sortOrder }, { dispatch }) => {
    return await apiHandler(
      dispatch,
      getAllExamsByUser,
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

// 🔥 Fetch chi tiết đề thi
export const fetchExamDetail = createAsyncThunk(
  'exam/fetchExamDetail',
  async ({ examId }, { dispatch }) => {
    return await apiHandler(
      dispatch,
      getExamById,
      { examId },
      () => {},
      false,
      false,
    );
  },
);

// 📌 Khởi tạo state ban đầu
const initialState = {
  exams: [],
  examDetail: null,
};

// 🎯 Exam Slice
const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setExams: (state, action) => {
      state.exams = action.payload;
    },
    setExamDetail: (state, action) => {
      state.examDetail = action.payload;
      F;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExamsByUser.pending, (state) => {
        state.exams = [];
      })
      .addCase(fetchExamsByUser.fulfilled, (state, action) => {
        state.exams = action.payload.data;
      })
      .addCase(fetchExamDetail.pending, (state) => {
        state.examDetail = null;
      })
      .addCase(fetchExamDetail.fulfilled, (state, action) => {
        state.examDetail = action.payload.data;
      });
  },
});

// 🎯 Export actions & reducer
export const { setExams, setExamDetail } = examSlice.actions;
export default examSlice.reducer;
