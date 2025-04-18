import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import classReducer from '../features/class/classSlice';
import filterReducer from '../features/filter/filterSlice';
import examReducer from '../features/exam/examSlice';
import questionReducer from '../features/question/questionSlice';
import answerReducer from '../features/answer/answerSlice';
import stateReducer from '../features/state/stateApiSlice';
import codeReducer from '../features/code/codeSlice';
import attemptReducer from '../features/attempt/attemptSlice';
import articleReducer from '../features/article/articleSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    classes: classReducer,
    exams: examReducer,
    questions: questionReducer,
    answers: answerReducer,
    filter: filterReducer,
    states: stateReducer,
    codes: codeReducer,
    attempts: attemptReducer,
    articles: articleReducer,
  },
});
