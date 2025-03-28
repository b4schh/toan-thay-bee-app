import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiHandler } from '../../utils/apiHandler';
import { getAnswersByAttemptAPI } from '../../services/answerApi';

// export const fetchAnswersByAttempt = createAsyncThunk(
//     "answers/fetchAnswersByAttempt",
//     async (attemptId, { dispatch }) => {
//         return await apiHandler(dispatch, getAnswersByAttemptAPI, { attemptId }, () => { }, true, false);
//     }
// );

// const answerSlice = createSlice({
//     name: "answers",
//     initialState: {
//         answers: [],

//     },
//     reducers: {
//         setAnswers: (state, action) => {
//             state.answers = action.payload;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchAnswersByAttempt.pending, (state) => {
//                 state.answers = [];
//             })
//             .addCase(fetchAnswersByAttempt.fulfilled, (state, action) => {
//                 if (action.payload) {
//                     state.answers = action.payload.data;
//                 }
//             })
//     },
// });

// export const { setAnswers } = answerSlice.actions;
// export default answerSlice.reducer;

// export const fetchAnswersByAttempt = createAsyncThunk(
//   'answers/fetchAnswersByAttempt',
//   async (attemptId, { dispatch }) => {
//     return await apiHandler(
//       dispatch,
//       getAnswersByAttemptAPI,
//       { attemptId },
//       () => {},
//       true,
//       false,
//     );
//   },
// );

// const answerSlice = createSlice({
//   name: 'answers',
//   initialState: {
//     // Chuyển sang object để dễ cập nhật đáp án cho từng câu
//     answers: {},
//   },
//   reducers: {
//     // Cập nhật đáp án cho một câu hỏi cụ thể
//     setAnswer: (state, action) => {
//       const { questionId, answerValue } = action.payload;
//       state.answers[questionId] = answerValue;
//     },
//     // Cập nhật toàn bộ đáp án (nếu cần)
//     setAnswers: (state, action) => {
//       // Giả sử action.payload là object { [questionId]: answerValue }
//       state.answers = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAnswersByAttempt.pending, (state) => {
//         state.answers = {};
//       })
//       .addCase(fetchAnswersByAttempt.fulfilled, (state, action) => {
//         if (action.payload) {
//           // Nếu API trả về mảng, bạn có thể chuyển đổi sang object theo questionId
//           // Ví dụ:
//           // state.answers = action.payload.data.reduce((acc, cur) => {
//           //   acc[cur.questionId] = cur.answerValue;
//           //   return acc;
//           // }, {});
//           // Nếu API đã trả về object, chỉ cần gán trực tiếp:
//           state.answers = action.payload.data;
//         }
//       });
//   },
// });

// export const { setAnswer, setAnswers } = answerSlice.actions;
// export default answerSlice.reducer;

export const fetchAnswersByAttempt = createAsyncThunk(
  'answers/fetchAnswersByAttempt',
  async (attemptId, { dispatch }) => {
    return await apiHandler(
      dispatch,
      getAnswersByAttemptAPI,
      { attemptId },
      () => {},
      true,
      false,
    );
  },
);

const answerSlice = createSlice({
  name: 'answers',
  initialState: {
    answers: {}, // Object chứa đáp án, key có thể là questionId hoặc statementId
  },
  reducers: {
    // Cập nhật đáp án cho một câu hỏi hoặc statement cụ thể
    setAnswer: (state, action) => {
      const { questionId, statementId, answerValue } = action.payload;
      // Nếu có statementId (dành cho DS), dùng nó làm key
      // Nếu không, dùng questionId (dành cho TN, TLN)
      const key = statementId || questionId;
      state.answers[key] = answerValue;
    },
    // Cập nhật toàn bộ đáp án (nếu cần)
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswersByAttempt.pending, (state) => {
        state.answers = {};
      })
      .addCase(fetchAnswersByAttempt.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          // Giả sử API trả về mảng các đáp án với cấu trúc { questionId, statementId, answerValue }
          state.answers = action.payload.data.reduce((acc, answer) => {
            const key = answer.statementId || answer.questionId;
            acc[key] = answer.answerValue;
            return acc;
          }, {});
        }
      });
  },
});

export const { setAnswer, setAnswers } = answerSlice.actions;
export default answerSlice.reducer;