import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import classReducer from '../features/class/classSlice';
import filterReducer from '../features/filter/filterSlice';
import examReducer from '../features/exam/examSlice';
import questionReducer from '../features/question/questionSlice';
import answerReducer from '../features/answer/answerSlice';
import stateReducer from '../features/state/stateApiSlice';
import attemptReducer from '../features/attempt/attemptSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    classes: classReducer,
    exams: examReducer,
    questions: questionReducer,
    answers: answerReducer,
    filter: filterReducer,
    states: stateReducer,
    attempts: attemptReducer,
  },
});