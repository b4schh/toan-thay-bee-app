import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';

export default function ExamOverviewScreen() {
  const router = useRouter();
  const { id, name, sectionIndexParam, questionIndexParam } =
    useLocalSearchParams();

  // Lấy danh sách câu hỏi và đáp án từ Redux
  const { questions } = useSelector((state) => state.questions);
  const { answers } = useSelector((state) => state.answers);

  // Phân loại câu hỏi theo loại (có thể thay đổi tiêu đề nếu cần)
  const tnQuestions = questions?.filter((q) => q.typeOfQuestion === 'TN') || [];
  const dsQuestions = questions?.filter((q) => q.typeOfQuestion === 'DS') || [];
  const tlnQuestions =
    questions?.filter((q) => q.typeOfQuestion === 'TLN') || [];

  const sections = [
    { type: 'TN', questions: tnQuestions, title: 'Phần Trắc Nghiệm' },
    { type: 'DS', questions: dsQuestions, title: 'Phần Đúng Sai' },
    { type: 'TLN', questions: tlnQuestions, title: 'Phần Trả Lời Ngắn' },
  ].filter((s) => s.questions.length > 0);

  // Chuyển đổi param thành số
  const currentSectionIndex = sectionIndexParam
    ? Number(sectionIndexParam)
    : -1;
  const currentQuestionIndex = questionIndexParam
    ? Number(questionIndexParam)
    : -1;

  // Hàm xác định trạng thái và màu của ô câu hỏi
  const getQuestionStatusColor = (q, sectionIndex, questionIndex) => {
    const isCurrentQuestion =
      sectionIndex === currentSectionIndex &&
      questionIndex === currentQuestionIndex;

    if (isCurrentQuestion) {
      return 'yellow'; // Đang làm
    }

    if (q.typeOfQuestion === 'DS') {
      const allAnswered = q.statements.every((statement) =>
        answers.hasOwnProperty(statement.id),
      );
      return allAnswered ? 'lightgreen' : 'lightcoral'; // Đã làm hoặc Chưa làm
    } else if (q.typeOfQuestion === 'TLN') {
      const answer = answers[q.id];
      const isValidAnswer =
        answer && typeof answer === 'string' && answer.trim().length > 0;
      return isValidAnswer ? 'lightgreen' : 'lightcoral'; // Đã làm hoặc Chưa làm
    } else {
      return answers[q.id] ? 'lightgreen' : 'lightcoral'; // Đã làm hoặc Chưa làm (TN)
    }
  };

  // Tính toán số liệu thống kê (không xử lý "chưa lưu" vì chưa có logic cụ thể)
  const stats = sections.reduce(
    (acc, section, sIndex) => {
      section.questions.forEach((q, qIndex) => {
        const color = getQuestionStatusColor(q, sIndex, qIndex);
        if (color === 'lightgreen') acc.done += 1;
        else if (color === 'yellow') acc.inProgress += 1;
        else if (color === 'lightcoral') acc.notDone += 1;
        // Chưa lưu sẽ được thêm sau nếu có logic cụ thể
      });
      return acc;
    },
    { done: 0, inProgress: 0, notDone: 0, notSaved: 0 },
  );

  // Hàm tính số thứ tự cho câu hỏi dựa trên vị trí section và vị trí câu trong section
  const getQuestionNumber = (sectionIndex, questionIndex) => {
    let count = 0;
    for (let i = 0; i < sectionIndex; i++) {
      count += sections[i].questions.length;
    }
    return count + questionIndex + 1;
  };

  // Khi ấn vào một ô câu, điều hướng về do-exam và truyền sectionIndex và questionIndex
  const goToQuestion = (sectionIndex, questionIndex) => {
    router.push({
      pathname: `/exam/${id}/do-exam`,
      params: {
        id,
        name,
        sectionIndexParam: sectionIndex,
        questionIndexParam: questionIndex,
      },
    });
  };

  // Đóng overview và quay lại câu hỏi hiện tại
  const closeOverview = () => {
    console.log(
      'Closing overview - Section:',
      currentSectionIndex,
      'Question:',
      currentQuestionIndex,
    );
    // Quay lại màn hình trước đó trong stack (DoExamScreen)
    router.back();
  };

  if (!questions || questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Không có câu hỏi</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Tiêu đề đề thi và nút đóng */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{name?.toUpperCase() || 'Không có đề'}</Text>
        <TouchableOpacity style={styles.closeButton} onPress={closeOverview}>
          <Text style={styles.closeButtonText}>Đóng</Text>
        </TouchableOpacity>
      </View>

      {/* Hiển thị danh sách các phần và câu hỏi với số thứ tự tính từ tổng số */}
      {sections.map((section, sIndex) => (
        <View key={section.type} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{section.title}:</Text>
          <View style={styles.questionsRow}>
            {section.questions.map((q, qIndex) => {
              const bgColor = getQuestionStatusColor(q);
              const questionNumber = getQuestionNumber(sIndex, qIndex);
              return (
                <TouchableOpacity
                  key={q.id}
                  style={[styles.questionBox, { backgroundColor: bgColor }]}
                  onPress={() => goToQuestion(sIndex, qIndex)}
                >
                  <Text>{questionNumber}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}

      {/* Chú thích màu sắc với số liệu trong ô vuông */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'lightgreen' }]}>
            <Text style={styles.legendNumber}>{stats.done}</Text>
          </View>
          <Text>Đã làm</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'yellow' }]}>
            <Text style={styles.legendNumber}>{stats.inProgress}</Text>
          </View>
          <Text>Đang làm</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'lightcoral' }]}>
            <Text style={styles.legendNumber}>{stats.notDone}</Text>
          </View>
          <Text>Chưa làm</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'gray' }]}>
            <Text style={styles.legendNumber}>{stats.notSaved}</Text>
          </View>
          <Text>Chưa lưu</Text>
        </View>
      </View>

      {/* Nút nộp bài / rời khỏi (demo) */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'blue' }]}>
          <Text style={styles.buttonText}>Nộp bài</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'gray' }]}>
          <Text style={styles.buttonText}>Rời khỏi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  closeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ff4444', // Màu đỏ nhạt cho nút đóng
    borderRadius: 4,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionContainer: { marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  questionsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  questionBox: {
    width: 40,
    height: 40,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    borderRadius: 4,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
