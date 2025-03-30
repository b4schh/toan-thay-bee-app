import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as ClassAPI from '../../services/classApi';
import { apiHandler } from '../../utils/apiHandler';
import {
  setCurrentPage,
  setTotalPages,
  setTotalItems,
} from '../filter/filterSlice';

export const fetchClassesByUser = createAsyncThunk(
  'classes/fetchClassesByUser',
  async ({ search, currentPage, limit, sortOrder }, { dispatch }) => {
    return await apiHandler(
      dispatch,
      ClassAPI.getAllClassesByUser,
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

export const fetchDetailClassByUser = createAsyncThunk(
  'classes/fetchDetailClassByUser',
  async ({ class_code }, { dispatch }) => {
    return await apiHandler(
      dispatch,
      ClassAPI.getDetailClassByUser,
      { class_code },
      () => {},
      false,
      false,
    );
  },
);

export const fetchLessonLearningItemByClassId = createAsyncThunk(
  'classes/fetchLessonLearningItemByClassId',
  async ({ class_code }, { dispatch }) => {
    return await apiHandler(
      dispatch,
      ClassAPI.getLessonLearningItemByClassId,
      { class_code },
      () => {},
      false,
      false,
    );
  },
);

export const fetchDataForLearning = createAsyncThunk(
  'classes/fetchDataForLearning',
  async ({ class_code }, { dispatch }) => {
    return await apiHandler(
      dispatch,
      ClassAPI.getDataForLearning,
      { class_code },
      () => {},
      false,
      false,
    );
  },
);

export const joinClass = createAsyncThunk(
  'classes/joinClass',
  async ({ class_code }, { dispatch, getState }) => {
    return await apiHandler(
      dispatch,
      ClassAPI.joinClassByCode,
      { class_code },
      () => {
        dispatch(fetchClassesByUser(getState().filter)); // Load lại danh sách lớp học
      },
      false,
      false
    );
  }
);

const initialState = {
  classes: [],
  classDetail: null,
};

const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
    setClassDetail: (state, action) => {
      state.classDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassesByUser.pending, (state, action) => {
        state.classes = [];
      })
      .addCase(fetchClassesByUser.fulfilled, (state, action) => {
        console.log('Data:', action.payload);
        if (action.payload) {
          state.classes = action.payload.data;
        }
      })
      .addCase(fetchDetailClassByUser.pending, (state, action) => {
        state.classDetail = null;
      })
      .addCase(fetchDetailClassByUser.fulfilled, (state, action) => {
        state.classDetail = action.payload.data;
      })
      .addCase(fetchLessonLearningItemByClassId.pending, (state, action) => {
        state.classDetail = null;
      })
      .addCase(fetchLessonLearningItemByClassId.fulfilled, (state, action) => {
        state.classDetail = action.payload.data;
      })
      .addCase(fetchDataForLearning.pending, (state, action) => {
        state.classDetail = null;
      })
      .addCase(fetchDataForLearning.fulfilled, (state, action) => {
        state.classDetail = action.payload.data;
      })
      // .addCase(joinClass.pending, (state) => {
      //   state.isJoining = true;
      // })
      .addCase(joinClass.fulfilled, (state) => {
        state.classDetail.userStatus === 'JS'
      })
  },
});

export const { setClasses, setClassDetail } = classSlice.actions;
export default classSlice.reducer;
