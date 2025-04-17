import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiHandler } from "../../utils/apiHandler";
import { setScreenCurrentPage, setScreenTotalPages, setScreenTotalItems } from '../filter/filterSlice';

import { getAllArticleAPI, getArticleByIdAPI } from "../../services/articleApi";

export const fetchAllArticle = createAsyncThunk(
    "articles/fetchAllArticle",
    async (data, { dispatch }) => {
        return await apiHandler(dispatch, getAllArticleAPI, data, (response) => {
            if (response && response.pagination) {
                dispatch(setScreenCurrentPage({ screen: 'article', page: response.pagination.currentPage }));
                dispatch(setScreenTotalPages({ screen: 'article', totalPages: response.pagination.totalPages }));
                dispatch(setScreenTotalItems({ screen: 'article', totalItems: response.pagination.total }));
            }
        }, true, false);
    }
);

export const fetchArticleById = createAsyncThunk(
    "articles/fetchArticleById",
    async (id, { dispatch }) => {
        return await apiHandler(dispatch, getArticleByIdAPI, id, (data) => {
        }, true, false);
    }
);

const articleSlice = createSlice({
    name: "articles",
    initialState: {
        articles: [],
        article: null,
    },
    reducers: {
        setArticle: (state, action) => {
            state.article = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllArticle.pending, (state) => {
                state.articles = [];
            })
            .addCase(fetchAllArticle.fulfilled, (state, action) => {
                if (action.payload) {
                    state.articles = action.payload.data;
                }
            })
            .addCase(fetchArticleById.pending, (state) => {
                state.article = null;
            })
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                if (action.payload) {
                    state.article = action.payload.data;
                }
            });
    },
});

export const { setArticle } = articleSlice.actions;
export default articleSlice.reducer;
