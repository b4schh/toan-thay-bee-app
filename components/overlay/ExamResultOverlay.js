import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AppText from '../AppText';
import Button from '../button/Button';
import Dialog from '../dialog/Dialog';
import colors from '../../constants/colors';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

export default function ExamResultOverlay({
  visible,
  onClose,
  questionTN,
  questionDS,
  questionTLN,
  answersTNTLN,
  answersDS,
}) {
  const router = useRouter();
  const [isLeaveModalVisible, setLeaveModalVisible] = useState(false);
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').width),
  ).current;

  const { score, startTime, endTime } = useSelector((state) => state.answers);

  const optionTn = ['A', 'B', 'C', 'D'];

  const getDurationText = () => {
    if (!startTime || !endTime) return 'Không xác định';

    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end - start;

    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);

    return `${minutes} phút ${seconds} giây`;
  };

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: Dimensions.get('window').width,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    }
  }, [visible]);

  const handleLeave = () => {
    setLeaveModalVisible(false);
    router.replace('home/');
  };

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <AppText style={styles.title}>CHI TIẾT BÀI LÀM</AppText>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={{}}>
          <View style={styles.topContainer}>
            <View style={styles.scoreContainer}>
              <AppText style={styles.score}>
                {score || score == '0' ? score + '/10' : 'Không có điểm'}
              </AppText>
            </View>
            <View style={styles.detailContainer}>
              <AppText style={styles.detail}>
                Thời gian làm bài: {getDurationText()}
              </AppText>
              <AppText style={styles.detail}>
                Thời gian nộp bài:{' '}
                {new Date(endTime).toLocaleString('vi-VN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </AppText>
            </View>
          </View>

          <View style={{ marginTop: 12 }}>
            <AppText
              style={{
                fontSize: 18,
                fontFamily: 'Inter-Medium',
                colors: colors.ink.darkest,
                marginBottom: 12,
              }}
            >
              Bài làm
            </AppText>

            <View style={{padding: 12, borderWidth: 1, borderColor: '#B8BBC2', borderRadius: 8}}>
              {/* Header bảng (ẩn cột 1) */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingBottom: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View style={{ width: 30 }} />
                <AppText
                  style={{ flex: 2, fontWeight: 'bold', textAlign: 'center' }}
                >
                  Câu
                </AppText>
                <AppText
                  style={{ flex: 1.5, fontWeight: 'bold', textAlign: 'center' }}
                >
                  Chọn
                </AppText>
                <AppText
                  style={{ flex: 1.5, fontWeight: 'bold', textAlign: 'center' }}
                >
                  Đáp án
                </AppText>
              </View>

              <AppText
                style={{
                  flex: 1,
                  fontFamily: 'Inter-Bold',
                  marginVertical: 12,
                }}
              >
                Phần Trắc nghiệm
              </AppText>

              {questionTN.map((question, index) => {
                const userAnswerObj = answersTNTLN[question.id]?.answer;
                const isCorrect = answersTNTLN[question.id]?.result;
                const order =
                  question.statements.find(
                    (statement) => statement.id == userAnswerObj,
                  )?.order || 0;

                const userAnswerText =
                  typeof userAnswerObj === 'object'
                    ? userAnswerObj?.answer
                    : JSON.parse(userAnswerObj || '{}')?.answer;

                const correctStatement = question.statements.find(
                  (s) => s.isCorrect,
                );
                const correctAnswer = correctStatement
                  ? correctStatement.order
                  : '---';

                return (
                  <View
                    key={question.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottomWidth: 1,
                      borderColor: '#ddd',
                      paddingVertical: 10,
                    }}
                  >
                    {/* Cột 1: Đúng / Sai */}
                    <View style={{ width: 30, alignItems: 'center' }}>
                      <AppText style={{ fontSize: 16 }}>
                        {isCorrect ? '✅' : '❌'}
                      </AppText>
                    </View>

                    {/* Cột 2: Nội dung câu hỏi */}
                    <View
                      style={{
                        flex: 2,
                        paddingHorizontal: 4,
                        alignItems: 'center',
                      }}
                    >
                      <AppText
                        numberOfLines={2}
                        style={{ textAlign: 'center' }}
                      >
                        {index + 1}
                      </AppText>
                    </View>

                    {/* Cột 3: Trả lời */}
                    <View
                      style={{
                        flex: 1.5,
                        paddingHorizontal: 4,
                        alignItems: 'center',
                      }}
                    >
                      <AppText style={{ textAlign: 'center' }}>
                        {optionTn[order - 1] || '---'}
                      </AppText>
                    </View>

                    {/* Cột 4: Đáp án đúng */}
                    <View
                      style={{
                        flex: 1.5,
                        paddingHorizontal: 4,
                        alignItems: 'center',
                      }}
                    >
                      <AppText style={{ textAlign: 'center' }}>
                        {optionTn[correctAnswer - 1]}
                      </AppText>
                    </View>
                  </View>
                );
              })}

              <AppText
                style={{
                  flex: 1,
                  fontFamily: 'Inter-Bold',
                  marginVertical: 12,
                }}
              >
                Phần Đúng sai
              </AppText>

              {questionDS.map((question, index) => {
                // Lấy toàn bộ mệnh đề trong 1 câu để tính đúng/sai
                const userAnswers = question.statements.map(
                  (statement) => answersDS[statement.id],
                );
                const correctAnswers = question.statements.map(
                  (s) => s.isCorrect,
                );

                // Một câu đúng khi tất cả mệnh đề đều đúng
                const isCorrect =
                  userAnswers.length === correctAnswers.length &&
                  userAnswers.every((ans, i) => ans === correctAnswers[i]);

                // Lấy mảng "Chọn" và "Đáp án" dạng ['Đ', 'S', '-', ...]
                const userTextArr = question.statements.map((statement) =>
                  answersDS[statement.id] === true
                    ? 'Đ'
                    : answersDS[statement.id] === false
                      ? 'S'
                      : '-',
                );
                const correctTextArr = question.statements.map((s) =>
                  s.isCorrect ? 'Đ' : 'S',
                );

                return (
                  <View
                    key={question.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottomWidth: 1,
                      borderColor: '#ddd',
                      paddingVertical: 10,
                    }}
                  >
                    {/* Cột 1: Kết quả ✅ / ❌ */}
                    <View style={{ width: 30, alignItems: 'center' }}>
                      <AppText style={{ fontSize: 18, textAlign: 'center' }}>
                        {isCorrect ? '✅' : '❌'}
                      </AppText>
                    </View>

                    {/* Cột 2: Số câu */}
                    <View
                      style={{
                        flex: 2,
                        paddingHorizontal: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <AppText
                        style={{ fontWeight: '500', textAlign: 'center' }}
                      >
                        {index + 1}
                      </AppText>
                    </View>

                    {/* Cột 3: Trả lời */}
                    <View
                      style={{
                        flex: 1.5,
                        paddingHorizontal: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <AppText style={{ textAlign: 'center' }}>
                        {userTextArr.join(' ')}
                      </AppText>
                    </View>

                    {/* Cột 4: Đáp án */}
                    <View
                      style={{
                        flex: 1.5,
                        paddingHorizontal: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <AppText style={{ textAlign: 'center' }}>
                        {correctTextArr.join(' ')}
                      </AppText>
                    </View>
                  </View>
                );
              })}

              <AppText
                style={{
                  flex: 1,
                  fontFamily: 'Inter-Bold',
                  marginVertical: 12,
                }}
              >
                Phần Trả lời ngắn
              </AppText>

              {questionTLN.map((question, index) => {
                const userAnswerObj =
                  answersTNTLN[question.id]?.answer.replace(/"/g, '') || '---';
                const isCorrect = answersTNTLN[question.id]?.result;

                return (
                  <View
                    key={question.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottomWidth: 1,
                      borderColor: '#ddd',
                      paddingVertical: 10,
                    }}
                  >
                    {/* Cột 1: Đúng / Sai */}
                    <View style={{ width: 30, alignItems: 'center' }}>
                      <AppText style={{ fontSize: 18 }}>
                        {isCorrect ? '✅' : '❌'}
                      </AppText>
                    </View>

                    {/* Cột 2: Nội dung câu hỏi */}
                    <View
                      style={{
                        flex: 2,
                        paddingHorizontal: 4,
                        alignItems: 'center',
                      }}
                    >
                      <AppText
                        numberOfLines={2}
                        style={{ textAlign: 'center' }}
                      >
                        {index + 1}
                      </AppText>
                    </View>

                    {/* Cột 3: Trả lời */}
                    <View
                      style={{
                        flex: 1.5,
                        paddingHorizontal: 4,
                        alignItems: 'center',
                      }}
                    >
                      <AppText style={{ textAlign: 'center' }}>
                        {userAnswerObj || '---'}
                      </AppText>
                    </View>

                    {/* Cột 4: Đáp án đúng */}
                    <View
                      style={{
                        flex: 1.5,
                        paddingHorizontal: 4,
                        alignItems: 'center',
                      }}
                    >
                      <AppText style={{ textAlign: 'center' }}>
                        {question.correctAnswer}
                      </AppText>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      <Dialog
        visible={isLeaveModalVisible}
        title="Rời khỏi kết quả?"
        type="custom"
        onClose={() => setLeaveModalVisible(false)}
        actions={[
          {
            text: 'Hủy bỏ',
            onPress: () => setLeaveModalVisible(false),
            style: {
              backgroundColor: colors.sky.base,
              flex: 1,
            },
            textStyle: {
              color: colors.sky.white,
            },
          },
          {
            text: 'Đồng ý',
            onPress: handleLeave,
            style: {
              backgroundColor: colors.success,
              flex: 1,
            },
            textStyle: {
              color: colors.sky.white,
            },
          },
        ]}
      >
        <AppText style={styles.modalMessage}>
          Bạn có muốn rời khỏi trang kết quả?
        </AppText>
      </Dialog>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Đẩy button sang phải
    paddingVertical: 20,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.sky.lighter,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  scrollContent: {
    padding: 20,
  },
  topContainer: {
    // backgroundColor: colors.primary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B8BBC2',
  },
  scoreContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#4facfe',
    paddingVertical: 36,
  },
  score: {
    fontSize: 40,
    fontFamily: 'iCielBCCubano',
    color: colors.sky.white,
    textAlign: 'center',
    elevation: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  detailContainer: {
    paddingVertical: 28,
    paddingHorizontal: 24,
  },
  detail: {
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
});
