import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicQuestionsByExamId } from '../../../features/question/questionSlice';
import {
  LatexRenderer,
  AppText,
  Button,
  ExamOverviewOverlay,
  ExamHeader,
  QuestionContent,
  QuestionStatements,
} from '@components/index';

import colors from '../../../constants/colors';
import socket from '../../../services/socket';
import { fetchAnswersByAttempt } from '../../../features/answer/answerSlice';

export default function DoExamScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { questions } = useSelector((state) => state.questions);
  const { answers } = useSelector((state) => state.answers);
  const { exam } = useSelector((state) => state.exams);
  console.log('Exam 1:', exam);
  console.log('exam.testDuration 1:', exam?.testDuration);
  const examRef = useRef(exam);

  // Cập nhật ref mỗi khi exam thay đổi
  useEffect(() => {
    examRef.current = exam;
  }, [exam]);

  const [isStarted, setIsStarted] = useState(false);
  const [isOverviewVisible, setIsOverviewVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [attemptId1, setAttemptId1] = useState(null);
  const [answerTN, setAnswerTN] = useState([]);
  const [answerTLN, setAnswerTLN] = useState([]);
  const [answerDS, setAnswerDS] = useState({});

  const [saveQuestion, setSaveQuestion] = useState(new Set());
  const [errorQuestion, setErrorQuestion] = useState(new Set());

  const tnQuestions = questions?.filter((q) => q.typeOfQuestion === 'TN') || [];
  const dsQuestions = questions?.filter((q) => q.typeOfQuestion === 'DS') || [];
  const tlnQuestions =
    questions?.filter((q) => q.typeOfQuestion === 'TLN') || [];
  const [tlnInput, setTlnInput] = useState('');

  const sections = [
    { type: 'TN', questions: tnQuestions, title: 'Phần Trắc Nghiệm' },
    { type: 'DS', questions: dsQuestions, title: 'Phần Đúng Sai' },
    { type: 'TLN', questions: tlnQuestions, title: 'Phần Trả Lời Ngắn' },
  ].filter((section) => section.questions.length > 0); // Lọc các phần có câu hỏi

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentSection = sections[currentSectionIndex] || { questions: [] };
  const currentQuestion = currentSection.questions[currentQuestionIndex] || {};

  const isFirstQuestion =
    currentSectionIndex === 0 && currentQuestionIndex === 0;

  const isLastQuestion =
    currentSectionIndex === sections.length - 1 &&
    currentQuestionIndex === currentSection.questions.length - 1;

  useEffect(() => {
    if (!user) {
      Alert.alert('Lỗi', 'Vui lòng đăng nhập để làm bài');
      router.replace('/login');
      return;
    }
  }, [user]);

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentSectionIndex > 0) {
      const prevSectionIndex = currentSectionIndex - 1;
      const prevSection = sections[prevSectionIndex];
      setCurrentSectionIndex(prevSectionIndex);
      setCurrentQuestionIndex(prevSection.questions.length - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min} phút ${sec} giây`;
  };

  const addQuestion = (questionId) => {
    setSaveQuestion((prev) => new Set(prev).add(Number(questionId)));
  };

  const addErrorQuestion = (questionId) => {
    setErrorQuestion((prev) => new Set(prev).add(Number(questionId)));
  };

  const removeQuestion = (questionId) => {
    setSaveQuestion((prev) => {
      const updated = new Set(prev);
      updated.delete(questionId);
      return updated;
    });
  };

  const removeErrorQuestion = (questionId) => {
    setErrorQuestion((prev) => {
      const updated = new Set(prev);
      updated.delete(questionId);
      return updated;
    });
  };

  const getQuestionNumber = () => {
    let count = 0;
    for (let i = 0; i < currentSectionIndex; i++) {
      count += sections[i].questions.length;
    }
    return count + currentQuestionIndex + 1;
  };

  const handleAutoSubmit = () => {
    if (!attemptId1 && !exam?.testDuration) return;
    setSaveQuestion(new Set());
    setErrorQuestion(new Set());
    socket.emit('submit_exam', { attemptId: attemptId1 });
  };

  const handleSubmit = () => {
    if (!attemptId1) return;
    socket.emit('submit_exam', { attemptId: attemptId1 });
  };

  const handleStartExam = () => {
    if (!user) {
      Alert.alert('Lỗi', 'Vui lòng đăng nhập để làm bài');
      router.replace('/login');
      return;
    }

    if (!socket.connected) {
      socket.connect();

      socket.once('connect', () => {
        console.log('✅ Socket connected');
        socket.emit('join_exam', {
          studentId: user.id,
          examId: id,
        });
      });

      setTimeout(() => {
        if (!socket.connected) {
          Alert.alert('Lỗi', 'Không thể kết nối socket.');
        }
      }, 5000);
    } else {
      socket.emit('join_exam', { studentId: user.id, examId: id });
    }

    socket.once('exam_error', ({ message }) => {
      alert('Lỗi', message);
      router.replace('/home');
    });
  };

  const handleSelectAnswerTN = (questionId, statementId, type) => {
    const payload = {
      attemptId: attemptId1,
      questionId,
      answerContent: statementId,
      studentId: user.id, // nếu cần xác định user
      type,
      examId: id,
      name: user.lastName + ' ' + user.firstName,
    };
    const newAnswer = {
      questionId,
      answerContent: statementId,
      typeOfQuestion: type,
    };
    setAnswerTN((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, newAnswer];
    });

    socket.emit('select_answer', payload);
  };

  const handleSelectAnswerDS = (questionId, statementId, selectedAnswer) => {
    setAnswerDS((prev) => {
      const currentAnswers = prev[questionId] || [];

      const existing = currentAnswers.find(
        (ans) => ans.statementId === statementId,
      );

      // 🔁 Nếu đáp án đã giống thì không gửi lại
      if (existing && existing.answer === selectedAnswer) {
        return prev;
      }

      const updatedAnswers = currentAnswers.map((ans) =>
        ans.statementId === statementId
          ? { ...ans, answer: selectedAnswer }
          : ans,
      );

      // Nếu chưa có statement này
      if (!existing) {
        updatedAnswers.push({ statementId, answer: selectedAnswer });
      }

      const newState = {
        ...prev,
        [questionId]: updatedAnswers,
      };

      // ✨ Gửi toàn bộ lên server
      socket.emit('select_answer', {
        questionId,
        answerContent: newState[questionId],
        studentId: user.id,
        attemptId: attemptId1,
        type: 'DS',
        examId: id,
        name: user.lastName + ' ' + user.firstName,
      });

      return newState;
    });
  };

  const handleSelectQuestion = (sectionIndex, questionIndex) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentQuestionIndex(questionIndex);
    setIsOverviewVisible(false); // Đóng overlay sau khi chọn câu hỏi
  };

  const handleSelectAnswerTLN = (questionId, answerContent, type) => {
    const trimmed = answerContent?.trim(); // Xóa khoảng trắng đầu và cuối

    if (!trimmed) return; // Nếu không có nội dung thì không gửi

    // Kiểm tra nếu nội dung giống với trước đó thì không cần gửi
    const existing = answerTLN.find((a) => a.questionId === questionId);
    if (existing?.answerContent === trimmed) return;

    // Cập nhật local state
    const newAnswer = {
      questionId,
      answerContent: trimmed,
      typeOfQuestion: type,
    };
    setAnswerTLN((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, newAnswer];
    });

    // Emit socket
    const payload = {
      attemptId: attemptId1,
      questionId,
      answerContent: trimmed,
      studentId: user.id,
      type,
      examId: id,
      name: user.lastName + ' ' + user.firstName,
    };
    socket.emit('select_answer', payload);
  };

  useEffect(() => {
    const defaultValue =
      answerTLN.find((a) => a.questionId === currentQuestion.id)
        ?.answerContent || '';
    setTlnInput(defaultValue);
  }, [currentQuestion.id]);

  useEffect(() => {
    if (answers) {
      setAnswerTN(answers.filter((answer) => answer.typeOfQuestion === 'TN'));
      setAnswerTLN(answers.filter((answer) => answer.typeOfQuestion === 'TLN'));

      const answerDS = {};
      answers.forEach((answer) => {
        if (answer.typeOfQuestion === 'DS' && answer.answerContent) {
          try {
            if (!answer.answerContent) return;
            const parsed = JSON.parse(answer.answerContent);
            answerDS[answer.questionId] = parsed;
          } catch (err) {
            console.error('Lỗi parse DS answerContent:', err);
          }
        }
      });
      setAnswerDS(answerDS);
    }
  }, [answers]);

  useEffect(() => {
    answerTN?.map((answer) => {
      if (answer.answerContent) {
        addQuestion(answer.questionId);
      }
    });
    answerTLN?.map((answer) => {
      if (answer.answerContent) {
        addQuestion(answer.questionId);
      }
    });
    Object.keys(answerDS)?.forEach((questionId) => {
      const answers = answerDS[questionId];
      if (answers.length === 4) {
        addQuestion(questionId);
      }
    });
  }, [answerTN, answerTLN, answerDS]);

  useEffect(() => {
    if (remainingTime <= 0) return handleAutoSubmit();
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [remainingTime]);

  useEffect(() => {
    if (!exam) return;

    socket.once('exam_started', ({ attemptId, startTime }) => {
      const currentExam = examRef.current;
      console.log('Exam 2:', currentExam);
      console.log('exam.testDuration 2:', currentExam?.testDuration);

      try {
        if (currentExam?.testDuration && startTime) {
          const start = new Date(startTime);
          const now = new Date();
          const elapsedSeconds = Math.floor((now - start) / 1000);
          const totalSeconds = currentExam.testDuration * 60;
          const remaining = Math.max(totalSeconds - elapsedSeconds, 0);
          setRemainingTime(remaining);
        }
      } catch (err) {
        console.error('Lỗi khi tính toán thời gian còn lại:', err);
      }
      setAttemptId1(attemptId);
      if (attemptId) {
        dispatch(fetchAnswersByAttempt(attemptId));
      }
      setIsStarted(true);
      if (id) {
        dispatch(fetchPublicQuestionsByExamId(id));
      }
    });
    return () => {
      socket.off('exam_started');
    };
  }, []);

  useEffect(() => {
    socket.on('exam_submitted', ({ message, attemptId }) => {
      console.log('Bài thi đã được nộp:', message);
      alert(message);
      setSaveQuestion(new Set());
      setErrorQuestion(new Set());
      if (!attemptId) return;
      router.replace(`/exam/${attemptId}/result`);
    });
    if (isStarted) {
      socket.on('submit_error', ({ message }) => {
        alert(message);
      });
    }

    socket.on('answer_saved', ({ questionId }) => {
      addQuestion(questionId);
      removeErrorQuestion(questionId);
    });

    socket.on('answer_error', ({ questionId, message }) => {
      addErrorQuestion(questionId);
      removeQuestion(questionId);
    });

    return () => {
      socket.off('answer_saved');
      socket.off('answer_error');
      socket.off('exam_submitted');
      socket.off('submit_error');
    };
  }, []);

  useEffect(() => {
    console.log('Đã lưu câu hỏi:', Array.from(saveQuestion));
    console.log('Đã lưu câu hỏi lỗi:', Array.from(errorQuestion));
  }, [saveQuestion, errorQuestion]);

  return (
    <View style={styles.mainContainer}>
      {!isStarted ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Bạn sẵn sàng bắt đầu bài thi?
          </Text>
          <Button
            text="Bắt đầu làm bài"
            onPress={handleStartExam}
            style={{ width: '80%' }}
          />
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 50 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Tên đề, thời gian, menu icon */}
          {/* <View style={styles.headerContainer}>
            <AppText
              style={styles.examName}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {exam?.name.toUpperCase()}
            </AppText>
            <Text style={styles.timer}>{formatTime(remainingTime)} phút</Text>
            <Button
              icon="menu"
              iconLibrary="Feather"
              iconColor={colors.ink.darkest}
              style={[
                {
                  width: 'auto',
                  height: 'auto',
                  backgroundColor: 'transparent',
                  marginTop: 3,
                },
              ]}
              onPress={() => setIsOverviewVisible(true)} // Mở overlay
            />
          </View> */}
          <ExamHeader
            examName={exam.name}
            remainingTime={formatTime(remainingTime)}
            onMenuPress={() => setIsOverviewVisible(true)}
          />

          {/* Button chuyển câu */}
          <View style={styles.navigationContainer}>
            <Button
              text="Câu trước"
              style={[
                styles.navButton,
                isFirstQuestion && styles.disabledButton,
              ]}
              onPress={goToPrevious}
              disabled={isFirstQuestion}
            />
            <Button
              text="Câu tiếp theo"
              style={[
                styles.navButton,
                isLastQuestion && styles.disabledButton,
              ]}
              onPress={goToNext}
              disabled={isLastQuestion}
            />
          </View>

          {/* Câu hỏi */}
          <QuestionContent
            sectionTitle={currentSection?.title}
            questionNumber={getQuestionNumber()}
            questionContent={currentQuestion?.content}
            questionImage={currentQuestion?.imageUrl}
          />
          
          {/* Lựa chọn */}
          <QuestionStatements
            type={currentSection?.type}
            question={currentQuestion}
            answerTN={answerTN}
            answerDS={answerDS}
            onSelectAnswerTN={handleSelectAnswerTN}
            onSelectAnswerDS={handleSelectAnswerDS}
            onSelectAnswerTLN={handleSelectAnswerTLN}
            tlnInput={tlnInput}
            setTlnInput={setTlnInput}
          />
        </ScrollView>
      )}

      <ExamOverviewOverlay
        visible={isOverviewVisible}
        sections={sections}
        answers={answers}
        remainingTime={formatTime(remainingTime)}
        currentSectionIndex={currentSectionIndex}
        currentQuestionIndex={currentQuestionIndex}
        onSelectQuestion={handleSelectQuestion}
        onClose={() => setIsOverviewVisible(false)}
        handleSubmit={handleSubmit}
        saveQuestion={saveQuestion}
        errorQuestion={errorQuestion} // Truyền vào danh sách câu hỏi đã lưu
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between', // Đẩy button sang phải
    marginVertical: 12,
  },
  examName: {
    flex: 1,
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.ink.darkest,
    textAlign: 'left',
    lineHeight: 30,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  navButton: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.ink.darkest,
    textAlign: 'center',
    marginBottom: 4,
  },
  questionNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.ink.darkest,
  },
  questionContent: {
    fontSize: 18,
    color: colors.ink.darker,
    marginVertical: 4,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.ink.darkest,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    color: colors.ink.darker,
  },
  dsContainer: {
    gap: 12,
  },
  trueFalseContainer: {
    gap: 10,
  },
  statementText: {
    fontSize: 18,
    color: colors.ink.darker,
  },
  trueFalseButtons: {
    flexDirection: 'row',
  },
  trueFalseButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.ink.darker,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
});
