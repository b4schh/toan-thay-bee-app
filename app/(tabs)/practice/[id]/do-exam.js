// File: app/(tabs)/practice/[id]/do-exam.js

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
import { setAnswer } from '../../../../features/answer/answerSlice'; // Import action của Redux
import AppText from '../../../../components/AppText';

export default function DoExamScreen() {
  const router = useRouter();
  const { id, name, sectionIndexParam, questionIndexParam } = useLocalSearchParams();
  const dispatch = useDispatch();

  // Fetch câu hỏi khi component mount
  useEffect(() => {
    dispatch(fetchPublicQuestionsByExamId(id));
  }, [dispatch, id]);

  // Lấy danh sách câu hỏi từ Redux store
  const { questions } = useSelector((state) => state.questions);
  // Lấy state answers từ Redux thay vì local state
  const { answers } = useSelector((state) => state.answers);

  // Phân loại câu hỏi theo loại
  const tnQuestions = questions?.filter((q) => q.typeOfQuestion === 'TN') || [];
  const dsQuestions = questions?.filter((q) => q.typeOfQuestion === 'DS') || [];
  const tlnQuestions = questions?.filter((q) => q.typeOfQuestion === 'TLN') || [];

  const sections = [
    { type: 'TN', questions: tnQuestions, title: 'Phần Trắc Nghiệm' },
    { type: 'DS', questions: dsQuestions, title: 'Phần Đúng Sai' },
    { type: 'TLN', questions: tlnQuestions, title: 'Phần Trả Lời Ngắn' },
  ].filter((s) => s.questions.length > 0);

  // Dùng param nếu có, nếu không thì mặc định 0
  const [currentSectionIndex, setCurrentSectionIndex] = useState(
    sectionIndexParam ? Number(sectionIndexParam) : 0
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    questionIndexParam ? Number(questionIndexParam) : 0
  );

  // Hiển thị loading nếu chưa có dữ liệu
  if (!questions || questions.length === 0) {
    return (
      <View style={styles.container}>
        <AppText>Đang tải câu hỏi...</AppText>
      </View>
    );
  }

  // Hàm tính số thứ tự câu hỏi
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

  // --- Sửa hàm xử lý chọn đáp án: sử dụng dispatch để cập nhật Redux ---

  // Cho câu trắc nghiệm
  const handleSelectAnswer = (statementId) => {
    dispatch(setAnswer({ questionId: currentQuestion.id, answerValue: statementId }));
  };

  // Cho câu đúng/sai
  const handleSelectTrueFalse = (statementId, value) => {
    dispatch(setAnswer({ questionId: currentQuestion.id, answerValue: value }));
  };

  // Cho câu trả lời ngắn
  const handleInputAnswer = (text) => {
    dispatch(setAnswer({ questionId: currentQuestion.id, answerValue: text }));
  };

  // --- Các hàm điều hướng câu hỏi ---
  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(sections[currentSectionIndex - 1].questions.length - 1);
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

  const isFirstQuestion =
    currentSectionIndex === 0 && currentQuestionIndex === 0;
  const isLastQuestion =
    currentSectionIndex === sections.length - 1 &&
    currentQuestionIndex === currentSection.questions.length - 1;

  return (
    <View style={{ flex: 1 }}>
      {/* Nút chuyển sang trang ExamOverview */}
      <View style={styles.overviewButtonContainer}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/(tabs)/practice/[id]/exam-overview',
              params: { id, name },
            })
          }
          style={styles.overviewButton}
        >
          <Text style={styles.overviewButtonText}>Xem chi tiết bài kiểm tra</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <AppText style={styles.examName}>{name?.toUpperCase() || ''}</AppText>

        {/* Điều hướng câu hỏi */}
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

        {/* Hiển thị tên phần và số thứ tự câu */}
        <AppText style={styles.sectionTitle}>{currentSection.title}</AppText>
        <AppText style={styles.questionNumber}>
          Câu {getQuestionNumber()} (ID {currentQuestion.id}):
        </AppText>
        <AppText style={styles.questionContent}>{currentQuestion.content}</AppText>

        {/* Hiển thị đáp án theo loại câu hỏi */}
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
                      answers[currentQuestion.id] === true && styles.selectedButton,
                    ]}
                    onPress={() => handleSelectTrueFalse(statement.id, true)}
                  >
                    <AppText>Đúng</AppText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.trueFalseButton,
                      answers[currentQuestion.id] === false && styles.selectedButton,
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 100,
  },
  examName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 10,
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
  navButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  disabledButton: { backgroundColor: '#a0a0a0' },
  overviewButtonContainer: {
    alignItems: 'flex-end',
    padding: 10,
  },
  overviewButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  overviewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
