import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllClassesByUser } from "../../services/classApi";
import { apiHandler } from "../../utils/apiHandler";
import { setCurrentPage, setTotalPages, setTotalItems } from "../filter/filterSlice";

export const fetchClassesByUser = createAsyncThunk(
    "class/fetchClassesByUser",
    async ({ search, currentPage, Limit, sortOrder }, { dispatch }) => {
        return await apiHandler(dispatch, getAllClassesByUser, { search, currentPage, Limit, sortOrder }, (data) => {
            dispatch(setCurrentPage(data.currentPage));
            dispatch(setTotalPages(data.totalPages));
            dispatch(setTotalItems(data.totalItems));
        }, true, false);
    }
)

const initialState = {
    classes: [],
    classDetail: null,
};

const classSlice = createSlice({
    name: "class",
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
            .addCase(fetchClassesByUser.fulfilled, (state, action) => {
                state.classes = action.payload.data;
            })
    }
});

export const { setClasses, setClassDetail } = classSlice.actions;
export default classSlice.reducer;