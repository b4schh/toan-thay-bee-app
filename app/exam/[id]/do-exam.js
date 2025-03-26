import React, { useEffect, useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicQuestionsByExamId } from '../../../features/question/questionSlice';
import { setAnswer } from '../../../features/answer/answerSlice';
import LatexRenderer from '../../../components/latex/LatexRenderer';
import AppText from '../../../components/AppText';
import Button from '../../../components/Button';
import ExamOverviewOverlay from '../../../components/ExamOverviewOverlay';
import colors from '../../../constants/colors';

export default function DoExamScreen() {
  const router = useRouter();
  const { id, name, sectionIndexParam, questionIndexParam } =
    useLocalSearchParams();
  const dispatch = useDispatch();

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    dispatch(fetchPublicQuestionsByExamId(id));
  }, [dispatch, id]);

  // Lấy danh sách câu hỏi từ Redux store
  const { questions } = useSelector((state) => state.questions);
  // Lấy state answers từ Redux thay vì local state
  const { answers } = useSelector((state) => state.answers);

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
  // Dùng param nếu có, nếu không thì mặc định 0
  const [currentSectionIndex, setCurrentSectionIndex] = useState(
    sectionIndexParam ? Number(sectionIndexParam) : 0,
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    questionIndexParam ? Number(questionIndexParam) : 0,
  );

  const [isOverviewVisible, setIsOverviewVisible] = useState(false); // State để hiển thị overlay

  // Log để kiểm tra dữ liệu (có thể xóa sau khi debug xong)
  useEffect(() => {
    console.log('Ket qua', answers);
  }, [answers]);

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

  const handleSelectQuestion = (sectionIndex, questionIndex) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentQuestionIndex(questionIndex);
    setIsOverviewVisible(false); // Đóng overlay sau khi chọn câu hỏi
  };

  // --- Sửa hàm xử lý chọn đáp án: sử dụng dispatch để cập nhật Redux ---
  // Xử lý chọn đáp án cho TN
  const handleSelectAnswer = (statementId) => {
    dispatch(
      setAnswer({ questionId: currentQuestion.id, answerValue: statementId }),
    );
  };

  // Xử lý chọn Đúng/Sai cho DS
  const handleSelectTrueFalse = (statementId, value) => {
    dispatch(setAnswer({ statementId, answerValue: value }));
  };
  // Xử lý nhập đáp án cho TLN
  const handleInputAnswer = (text) => {
    dispatch(setAnswer({ questionId: currentQuestion.id, answerValue: text }));
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

  return (
    <View style={{ flex: 1 }}>
      {/* Nút chuyển sang trang ExamOverview */}
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          {/* Tên đề */}
          <AppText
            style={styles.examName}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {name.toUpperCase()}
          </AppText>
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
        </View>

        {/* Nút điều hướng */}
        <View style={styles.navigationContainer}>
          <Button
            text="Câu trước"
            style={[styles.navButton, isFirstQuestion && styles.disabledButton]}
            onPress={goToPrevious}
            disabled={isFirstQuestion}
          />
          <Button
            text="Câu tiếp theo"
            style={[styles.navButton, isLastQuestion && styles.disabledButton]}
            onPress={goToNext}
            disabled={isLastQuestion}
          />
        </View>

        {/* Hiển thị tên phần */}
        <AppText style={styles.sectionTitle}>{currentSection.title}</AppText>
        {/* Hiển thị số thứ tự câu */}
        <AppText style={styles.questionNumber}>
          Câu {getQuestionNumber()} (ID {currentQuestion.id}):
        </AppText>
        {/* Hiển thị đề bài */}
        <AppText style={styles.questionContent}>
          {currentQuestion.content}
        </AppText>

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
          <View style={styles.dsContainer}>
            {currentQuestion.statements.map((statement, index) => (
              <View key={statement.id} style={styles.trueFalseContainer}>
                <AppText
                  style={styles.statementText}
                >{`${index + 1}. ${statement.content}`}</AppText>
                <View style={styles.trueFalseButtons}>
                  <Button
                    text="Đúng"
                    textStyle={[
                      answers[statement.id] !== true && styles.buttonText,
                    ]}
                    style={[
                      styles.trueFalseButton,
                      answers[statement.id] === true && styles.selectedButton,
                    ]}
                    onPress={() => handleSelectTrueFalse(statement.id, true)}
                  />
                  <Button
                    text="Sai"
                    textStyle={[
                      answers[statement.id] !== false && styles.buttonText,
                    ]}
                    style={[
                      styles.trueFalseButton,
                      answers[statement.id] === false && styles.selectedButton,
                    ]}
                    onPress={() => handleSelectTrueFalse(statement.id, false)}
                  />
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
      {/* Overlay ExamOverview */}

      <Modal
        visible={isOverviewVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsOverviewVisible(false)}
      >
        <View style={styles.overlayContainer}>
          <ExamOverviewOverlay
            sections={sections}
            answers={answers}
            currentSectionIndex={currentSectionIndex}
            currentQuestionIndex={currentQuestionIndex}
            onSelectQuestion={handleSelectQuestion}
            onClose={() => setIsOverviewVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
  // selectedText: {
  //   color: '#fff', // Màu chữ khi được chọn
  // },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
});
