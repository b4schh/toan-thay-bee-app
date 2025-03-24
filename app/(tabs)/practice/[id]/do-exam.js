import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicQuestionsByExamId } from '../../../../features/question/questionSlice';
import { fetchAnswersByAttempt } from '../../../../features/answer/answerSlice';
import { getAnswersByAttemptAPI } from '../../../../services/answerApi';
import { EXAM_QUESTION_DATA } from '../../../../const_data/exam-question-data';
import colors from '../../../../constants/colors';
import LatexRenderer from '../../../../components/latex/LatexRenderer';
import AppText from '../../../../components/AppText';

export default function DoExamScreen() {
  const { id, name } = useLocalSearchParams();
  const dispatch = useDispatch();

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    dispatch(fetchPublicQuestionsByExamId(id));
  }, [dispatch, id]);

  // Lấy danh sách câu hỏi từ Redux store
  const { questions } = useSelector((state) => state.questions);

  // Phân loại câu hỏi theo typeOfQuestion
  const tnQuestions = questions
    ? questions.filter((q) => q.typeOfQuestion === 'TN')
    : [];
  const dsQuestions = questions
    ? questions.filter((q) => q.typeOfQuestion === 'DS')
    : [];
  const tlnQuestions = questions
    ? questions.filter((q) => q.typeOfQuestion === 'TLN')
    : [];

  useEffect(() => console.log('Trac nghiem', tnQuestions), [tnQuestions]);
  useEffect(() => console.log('Dung sai', dsQuestions), [dsQuestions]);
  useEffect(() => console.log('Tra loi ngan', tlnQuestions), [tlnQuestions]);

  // Tạo danh sách các phần và câu hỏi
  const sections = [
    { type: 'TN', questions: tnQuestions, title: 'Phần Trắc Nghiệm' },
    { type: 'DS', questions: dsQuestions, title: 'Phần Đúng Sai' },
    { type: 'TLN', questions: tlnQuestions, title: 'Phần Trả Lời Ngắn' },
  ].filter((section) => section.questions.length > 0); // Lọc các phần có câu hỏi

  // State quản lý câu hỏi hiện tại
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Lưu đáp án người dùng chọn

  // Log để kiểm tra dữ liệu (có thể xóa sau khi debug xong)
  useEffect(() => {
    console.log('Danh sách câu hỏi', questions);
  }, [questions]);

  // Kiểm tra nếu chưa có dữ liệu
  if (!questions || questions.length === 0) {
    return (
      <View style={styles.container}>
        <AppText>Đang tải câu hỏi...</AppText>
      </View>
    );
  }

  // Tính số thứ tự câu hỏi
  const getQuestionNumber = () => {
    let count = 0;
    for (let i = 0; i < currentSectionIndex; i++) {
      count += sections[i].questions.length;
    }
    return count + currentQuestionIndex + 1;
  };

  // Lấy câu hỏi hiện tại
  const currentSection = sections[currentSectionIndex];
  const currentQuestion = currentSection.questions[currentQuestionIndex];

  // Xử lý chọn đáp án cho TN
  const handleSelectAnswer = (statementId) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: statementId,
    });
  };

  // Xử lý chọn Đúng/Sai cho DS
  const handleSelectTrueFalse = (statementId, value) => {
    setAnswers({
      ...answers,
      [statementId]: value,
    });
  };

  // Xử lý nhập đáp án cho TLN
  const handleInputAnswer = (text) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: text,
    });
  };

  // Điều hướng câu hỏi
  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(
        sections[currentSectionIndex - 1].questions.length - 1,
      );
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  // Kiểm tra có thể điều hướng không
  const isFirstQuestion =
    currentSectionIndex === 0 && currentQuestionIndex === 0;
  const isLastQuestion =
    currentSectionIndex === sections.length - 1 &&
    currentQuestionIndex === currentSection.questions.length - 1;

  console.log("Ket qua", answers);
  
  return (
    <ScrollView style={styles.container}>
      <AppText style={styles.examName}>{name.toUpperCase()}</AppText>
      {/* Nút điều hướng */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, isFirstQuestion && styles.disabledButton]}
          onPress={goToPrevious}
          disabled={isFirstQuestion}
        >
          <AppText>Câu trước</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, isLastQuestion && styles.disabledButton]}
          onPress={goToNext}
          disabled={isLastQuestion}
        >
          <AppText>Câu tiếp theo</AppText>
        </TouchableOpacity>
      </View>

      {/* Hiển thị tên phần */}
      <AppText style={styles.sectionTitle}>{currentSection.title}</AppText>
      {/* Hiển thị số thứ tự câu */}
      <AppText style={styles.questionNumber}>Câu {getQuestionNumber()} (ID {currentQuestion.id}):</AppText>
      {/* Hiển thị đề bài */}
      <AppText style={styles.questionContent}>{currentQuestion.content}</AppText>

      {/* Hiển thị tùy theo loại câu hỏi */}
      {currentSection.type === 'TN' && (
        <View>
          {currentQuestion.statements.map((statement) => (
            <TouchableOpacity
              key={statement.id}
              style={styles.optionContainer}
              onPress={() => handleSelectAnswer(statement.id)}
            >
              <View style={styles.radioCircle}>
                {answers[currentQuestion.id] === statement.id && (
                  <View style={styles.selectedCircle} />
                )}
              </View>
              <AppText style={styles.optionText}>{statement.content}</AppText>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {currentSection.type === 'DS' && (
        <View>
          {currentQuestion.statements.map((statement) => (
            <View key={statement.id} style={styles.trueFalseContainer}>
              <AppText style={styles.statementText}>{statement.content}</AppText>
              <View style={styles.trueFalseButtons}>
                <TouchableOpacity
                  style={[
                    styles.trueFalseButton,
                    answers[statement.id] === true && styles.selectedButton,
                  ]}
                  onPress={() => handleSelectTrueFalse(statement.id, true)}
                >
                  <AppText>Đúng</AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.trueFalseButton,
                    answers[statement.id] === false && styles.selectedButton,
                  ]}
                  onPress={() => handleSelectTrueFalse(statement.id, false)}
                >
                  <AppText>Sai</AppText>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {currentSection.type === 'TLN' && (
        <TextInput
          style={styles.input}
          placeholder="Nhập đáp án"
          value={answers[currentQuestion.id] || ''}
          onChangeText={handleInputAnswer}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 100
  },
  examName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  questionNumber: { fontSize: 18, fontWeight: 'bold' },
  questionContent: { fontSize: 16, marginVertical: 10 },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  optionText: { fontSize: 16 },
  trueFalseContainer: { marginVertical: 10 },
  statementText: { fontSize: 16 },
  trueFalseButtons: { flexDirection: 'row', marginTop: 5 },
  trueFalseButton: {
    padding: 10,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 5,
  },
  selectedButton: { backgroundColor: '#d3d3d3' },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: { padding: 10, backgroundColor: '#e0e0e0', borderRadius: 5 },
  disabledButton: { backgroundColor: '#a0a0a0' },
});
