// socketExam.js
import socket from './socket';

/**
 * Join an exam session
 * @param {Object} params - Parameters for joining exam
 * @param {number} params.studentId - Student ID
 * @param {number} params.examId - Exam ID
 * @param {Function} onError - Callback for error handling
 * @returns {Promise} - Promise that resolves when connected
 */
export const joinExam = ({ studentId, examId }, onError) => {
  return new Promise((resolve, reject) => {
    if (!socket.connected) {
      socket.connect();

      socket.once('connect', () => {
        console.log('✅ Socket connected');
        socket.emit('join_exam', {
          studentId,
          examId,
        });
        resolve();
      });

      setTimeout(() => {
        if (!socket.connected) {
          reject(new Error('Không thể kết nối socket.'));
        }
      }, 5000);
    } else {
      socket.emit('join_exam', { studentId, examId });
      resolve();
    }

    socket.once('exam_error', ({ message }) => {
      if (onError) {
        onError(message);
      }
    });
  });
};

/**
 * Submit an exam
 * @param {Object} params - Parameters for submitting exam
 * @param {number} params.attemptId - Attempt ID
 */
export const submitExam = ({ attemptId }) => {
  if (!attemptId) return;
  socket.emit('submit_exam', { attemptId });
};

/**
 * Select an answer for a TN (multiple choice) question
 * @param {Object} params - Answer parameters
 */
export const selectAnswerTN = (params) => {
  socket.emit('select_answer', params);
};

/**
 * Select an answer for a DS (true/false) question
 * @param {Object} params - Answer parameters
 */
export const selectAnswerDS = (params) => {
  socket.emit('select_answer', params);
};

/**
 * Select an answer for a TLN (short answer) question
 * @param {Object} params - Answer parameters
 */
export const selectAnswerTLN = (params) => {
  socket.emit('select_answer', params);
};

/**
 * Setup exam started event listener
 * @param {Function} callback - Callback function when exam starts
 */
export const onExamStarted = (callback) => {
  socket.once('exam_started', callback);
  return () => {
    socket.off('exam_started');
  };
};

/**
 * Setup exam submitted event listener
 * @param {Function} callback - Callback function when exam is submitted
 */
export const onExamSubmitted = (callback) => {
  socket.on('exam_submitted', callback);
  return () => {
    socket.off('exam_submitted');
  };
};

/**
 * Setup submit error event listener
 * @param {Function} callback - Callback function when submit error occurs
 */
export const onSubmitError = (callback) => {
  socket.on('submit_error', callback);
  return () => {
    socket.off('submit_error');
  };
};

/**
 * Setup answer saved event listener
 * @param {Function} callback - Callback function when answer is saved
 */
export const onAnswerSaved = (callback) => {
  socket.on('answer_saved', callback);
  return () => {
    socket.off('answer_saved');
  };
};

/**
 * Setup answer error event listener
 * @param {Function} callback - Callback function when answer error occurs
 */
export const onAnswerError = (callback) => {
  socket.on('answer_error', callback);
  return () => {
    socket.off('answer_error');
  };
};

/**
 * Setup debug listener for all socket events
 * @param {Function} callback - Callback function for any event
 */
export const setupDebugListener = () => {
  socket.onAny((event, ...args) => {
    console.log(`📡 Socket event: ${event}, args`);
    console.log(args);
  });

  return () => {
    socket.offAny();
  };
};

/**
 * Clean up all socket event listeners
 */
export const cleanupSocketListeners = () => {
  socket.off('exam_started');
  socket.off('answer_saved');
  socket.off('answer_error');
  socket.off('exam_submitted');
  socket.off('submit_error');
  socket.offAny();
};