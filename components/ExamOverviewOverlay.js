import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';
import Feather from '@expo/vector-icons/Feather';
import AppText from './AppText';
import Button from './Button';
import CustomModal from './CustomModal';
import { useRouter } from 'expo-router';

export default function ExamOverviewOverlay({
  sections,
  answers,
  currentSectionIndex,
  currentQuestionIndex,
  onSelectQuestion,
  onClose,
}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  // Lấy thời gian từ Redux store
  const { timeLeft } = useSelector(state => state.exams);

  const handleLeave = () => {
    router.replace('home/'); // Thay 'Home' bằng tên màn hình bạn muốn chuyển đến
  };

  const handleSubmit = () => {
    alert('Hết giờ! Bài thi đã được nộp tự động.');
    router.replace('home/');
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const screenWidth = Dimensions.get('window').width;
  const numColumns = 6;
  const boxSize = (screenWidth - (numColumns - 1) * 8 - 60) / numColumns; // Trừ đi margin và padding tổng

  // Hàm kiểm tra trạng thái "đã làm" thực tế của câu hỏi
  const isQuestionDone = (q) => {
    if (q.typeOfQuestion === 'TN') {
      return !!answers[q.id]; // Có đáp án được chọn
    } else if (q.typeOfQuestion === 'DS') {
      return q.statements.every((statement) =>
        answers.hasOwnProperty(statement.id),
      ); // Tất cả statement đều có đáp án
    } else if (q.typeOfQuestion === 'TLN') {
      const answer = answers[q.id];
      return answer && typeof answer === 'string' && answer.trim().length > 0; // Có dữ liệu không rỗng
    }
    return false;
  };

  // Hàm xác định màu sắc hiển thị của ô câu hỏi
  const getQuestionStatusColor = (q, sectionIndex, questionIndex) => {
    const isCurrentQuestion =
      sectionIndex === currentSectionIndex &&
      questionIndex === currentQuestionIndex;
    if (isCurrentQuestion) return colors.warning; // Câu đang làm

    const isDone = isQuestionDone(q);
    return isDone ? colors.success : colors.sky.white; // Đã làm hoặc Chưa làm
    // Lưu ý: "Chưa lưu" không được áp dụng ở đây vì chưa có logic cụ thể
  };

  // Tính toán số liệu thống kê
  const stats = sections.reduce(
    (acc, section, sIndex) => {
      section.questions.forEach((q, qIndex) => {
        const isDone = isQuestionDone(q);
        const isCurrent =
          sIndex === currentSectionIndex && qIndex === currentQuestionIndex;

        if (isDone) acc.done += 1; // Đã làm (dựa trên trạng thái thực tế)
        if (isCurrent) acc.inProgress += 1; // Đang làm
        if (!isDone && !isCurrent) acc.notDone += 1; // Chưa làm
        // Chưa lưu giữ nguyên 0 vì chưa có logic cụ thể
      });
      return acc;
    },
    { done: 0, inProgress: 0, notDone: 0, notSaved: 0 },
  );

  // Hàm tính số thứ tự câu hỏi
  const getQuestionNumber = (sectionIndex, questionIndex) => {
    let count = 0;
    for (let i = 0; i < sectionIndex; i++) {
      count += sections[i].questions.length;
    }
    return count + questionIndex + 1;
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.headerContainer}>
        <AppText style={styles.title}>TIẾN ĐỘ LÀM BÀI</AppText>
        <AppText style={styles.timer}>⏳ {formatTime(timeLeft)}</AppText>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {sections.map((section, sIndex) => (
        <View key={section.type} style={styles.sectionContainer}>
          <AppText style={styles.sectionTitle}>{section.title}:</AppText>
          <View style={styles.questionsRow}>
            {section.questions.map((q, qIndex) => {
              const bgColor = getQuestionStatusColor(q, sIndex, qIndex);
              const questionNumber = getQuestionNumber(sIndex, qIndex);
              return (
                <TouchableOpacity
                  key={q.id}
                  style={[
                    styles.questionBox,
                    {
                      width: boxSize,
                      height: boxSize,
                      backgroundColor: bgColor,
                    },
                  ]}
                  onPress={() => onSelectQuestion(sIndex, qIndex)}
                >
                  <AppText style={{ fontFamily: 'Inter-Medium' }}>
                    {questionNumber}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}

      {/* Chú thích màu sắc với số liệu */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendColor, { backgroundColor: colors.success }]}
          >
            <AppText style={styles.legendNumber}>{stats.done}</AppText>
          </View>
          <AppText style={{ fontFamily: 'Inter-Medium' }}>Đã làm</AppText>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendColor, { backgroundColor: colors.warning }]}
          >
            <AppText style={styles.legendNumber}>{stats.inProgress}</AppText>
          </View>
          <AppText style={{ fontFamily: 'Inter-Medium' }}>Đang làm</AppText>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendColor, { backgroundColor: colors.sky.white }]}
          >
            <AppText style={styles.legendNumber}>{stats.notDone}</AppText>
          </View>
          <AppText style={{ fontFamily: 'Inter-Medium' }}>Chưa làm</AppText>
        </View>
        {/* <View style={styles.legendItem}>
          <View
            style={[styles.legendColor, { backgroundColor: colors.sky.base }]}
          >
            <AppText style={styles.legendNumber}>{stats.notSaved}</AppText>
          </View>
          <AppText style={{ fontFamily: 'Inter-Medium' }}>Chưa lưu</AppText>
        </View> */}
      </View>

      <View style={styles.bottomButtons}>
        <Button
          text="Rời khỏi"
          style={[styles.button, { backgroundColor: colors.danger }]}
          onPress={() => setModalVisible(true)}
        />
        <Button text="Nộp bài" style={styles.button} />
      </View>

      {/* Modal xác nhận */}
      <CustomModal
        visible={isModalVisible}
        title="Bạn muốn thoát?"
        onClose={() => setModalVisible(false)}
        actions={[
          {
            text: 'Hủy bỏ',
            onPress: () => setModalVisible(false),
            style: { backgroundColor: colors.sky.base },
          },
          {
            text: 'Chắc chắn',
            onPress: handleLeave,
            style: { backgroundColor: colors.danger },
          },
        ]}
      >
        <AppText>Quá trình làm bài của bạn sẽ bị hủy bỏ</AppText>
      </CustomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timer: {
    fontSize: 18,
    color: colors.danger,
    fontFamily: 'Inter-Bold',
    marginHorizontal: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  questionsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  questionBox: {
    // width: boxSize,
    // height: boxSize,
    marginRight: 10,
    marginBottom: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, // Thêm viền để ô trắng dễ nhìn hơn
    borderColor: '#ccc',
  },
  legendContainer: {
    flexWrap: 'wrap',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 8,
  },
  legendColor: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 4,
    borderWidth: 1, // Thêm viền cho ô trắng
    borderColor: '#ccc',
  },
  legendNumber: {
    color: '#000',
    fontFamily: 'Inter-Medium',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 12,
  },
  button: {
    flex: 1,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
