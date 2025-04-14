
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiHandler } from "../../utils/apiHandler";
import { getAttemptsByExamIdApi, getAttemptByStudentIdApi, getAttemptCompletedApi } from "../../services/attemptApi";
// import { setCurrentPage, setLimit, setTotalItems } from "../filter/filterSlice";

export const fetchAttemptsByExamId = createAsyncThunk(
    "attempts/fetchAttemptsByExamId",
    async ({ examId, currentPage }, { dispatch }) => {
        return await apiHandler(dispatch, getAttemptsByExamIdApi, { examId, currentPage }, (data) => {
            // dispatch(setCurrentPage(data.currentPage));
            // dispatch(setTotalItems(data.totalItems));
            // dispatch(setLimit(data.limit));
        }, true, false);
    }
);

export const fetchAttemptByStudentId = createAsyncThunk(
    "attempts/fetchAttemptByStudentId",
    async ({ examId }, { dispatch }) => {
        return await apiHandler(dispatch, getAttemptByStudentIdApi, { examId }, (data) => {
            // dispatch(setCurrentPage(1));
            // dispatch(setLimit(10));
        }, true, false);
    }
);

export const fetchAttemptCompleted = createAsyncThunk(
    "attempts/fetchAttemptCompleted",
    async (_, { dispatch }) => {
        return await apiHandler(dispatch, getAttemptCompletedApi, null, (data) => {
            // dispatch(setCurrentPage(1));
            // dispatch(setLimit(10));
        }, true, false);
    }
);

const attemptSlice = createSlice({
    name: "attempts",
    initialState: {
        attempts: [],
    },
    reducers: {
        setAttempts: (state, action) => {
            state.attempts = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAttemptsByExamId.pending, (state) => {
                state.attempts = [];
            })
            .addCase(fetchAttemptsByExamId.fulfilled, (state, action) => {
                if (action.payload) {
                    state.attempts = action.payload.attempts;
                }
            })
            .addCase(fetchAttemptByStudentId.pending, (state) => {
                state.attempts = [];
            })
            .addCase(fetchAttemptByStudentId.fulfilled, (state, action) => {
                if (action.payload) {
                    state.attempts = action.payload.data;
                }
            })
            .addCase(fetchAttemptCompleted.pending, (state) => {
                state.attempts = [];
            })
            .addCase(fetchAttemptCompleted.fulfilled, (state, action) => {
                if (action.payload) {
                    state.attempts = action.payload.data.attempts;
                    console.log("attempts", action.payload.data.attempts);
                }
            });
    },
});

export const { setAttempts } = attemptSlice.actions;
export default attemptSlice.reducer;