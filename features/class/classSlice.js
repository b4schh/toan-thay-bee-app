import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as ClassAPI from '../../services/classApi';
import { apiHandler } from '../../utils/apiHandler';
import {
  setScreenCurrentPage,
  setScreenTotalPages,
  setScreenTotalItems,
} from '../filter/filterSlice';

export const fetchClassesByUser = createAsyncThunk(
  'classes/fetchClassesByUser',
  async ({ search, currentPage, limit, sortOrder }, { dispatch }) => {
    return await apiHandler(
      dispatch,
      ClassAPI.getAllClassesByUser,
      { search, currentPage, limit, sortOrder },
      () => {
        // dispatch(
        //   setScreenCurrentPage({ screen: 'class', page: data.currentPage }),
        // );
        // dispatch(
        //   setScreenTotalPages({ screen: 'class', totalPages: data.totalPages }),
        // );
        // dispatch(
        //   setScreenTotalItems({ screen: 'class', totalItems: data.totalItems }),
        // );
      },
      true,
      false,
    );
  },
);

// Hàm này dùng trong HomeScreen để chỉ lấy ra các lớp đã join
export const fetchJoinedClasses = createAsyncThunk(
  'class/fetchJoinedClasses',
  async () => {
    try {
      const response = await api.get('/v1/user/class/joined'); // endpoint mới
      return response.data;
    } catch (error) {
      throw error;
    }
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
  async ({ class_code, onSuccess }, { dispatch, getState }) => {
    return await apiHandler(
      dispatch,
      ClassAPI.joinClassByCode,
      { class_code },
      () => {
        if (onSuccess) {
          onSuccess();
        }
        const { screens } = getState().filter;
        const { search, currentPage, limit, sortOrder } = screens.class;
        dispatch(fetchClassesByUser({ search, currentPage, limit, sortOrder }));
      },
      true,
      true,
    );
  },
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
      // .addCase(joinClass.fulfilled, (state) => {
      //   state.classDetail.userStatus === 'JS'
      // })
      // ...existing extra reducers
      .addCase(fetchJoinedClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJoinedClasses.fulfilled, (state, action) => {
        state.joinedClasses = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchJoinedClasses.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setClasses, setClassDetail } = classSlice.actions;
export default classSlice.reducer;
