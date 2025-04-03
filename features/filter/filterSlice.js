import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  screens: {
    exam: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      limit: 10,
      search: '',
      sortOrder: 'desc',
    },
    class: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      limit: 10,
      search: '',
      sortOrder: 'desc',
    },
    exam_history: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      limit: 10,
      search: '',
      sortOrder: 'desc',
    }
    // Thêm các màn hình khác nếu cần
  },
  isAddView: false,
  isFilterView: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setScreenSearch: (state, action) => {
      const { screen, search } = action.payload;
      state.screens[screen].search = search.trim();
      state.screens[screen].currentPage = 1;
    },

    setScreenCurrentPage: (state, action) => {
      const { screen, page } = action.payload;
      state.screens[screen].currentPage = page;
    },

    setScreenTotalPages: (state, action) => {
      const { screen, totalPages } = action.payload;
      state.screens[screen].totalPages = totalPages;
    },

    setScreenTotalItems: (state, action) => {
      const { screen, totalItems } = action.payload;
      state.screens[screen].totalItems = totalItems;
    },

    setScreenLimit: (state, action) => {
      const { screen, limit } = action.payload;
      state.screens[screen].limit = limit;
      state.screens[screen].currentPage = 1;
    },

    setScreenSortOrder: (state, action) => {
      const { screen } = action.payload;
      state.screens[screen].sortOrder = state.screens[screen].sortOrder === 'asc' ? 'desc' : 'asc';
      state.screens[screen].currentPage = 1;
    },

    setIsAddView: (state, action) => {
      state.isAddView = action.payload;
    },

    setIsFilterView: (state, action) => {
      state.isFilterView = action.payload;
    },

    resetScreenFilters: (state, action) => {
      const { screen } = action.payload;
      state.screens[screen] = {
        ...initialState.screens[screen]
      };
    },
  },
});

export const {
  setScreenSearch,
  setScreenCurrentPage,
  setScreenTotalPages,
  setScreenTotalItems,
  setScreenLimit,
  setScreenSortOrder,
  setIsAddView,
  setIsFilterView,
  resetScreenFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
