// File: app/(tabs)/practice/[id]/exam-overview.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';

export default function ExamOverviewScreen() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams();

  // Lấy danh sách câu hỏi và đáp án từ Redux
  const { questions } = useSelector((state) => state.questions);
  const { answers } = useSelector((state) => state.answers);

  // Phân loại câu hỏi theo loại (có thể thay đổi tiêu đề nếu cần)
  const tnQuestions = questions?.filter((q) => q.typeOfQuestion === 'TN') || [];
  const dsQuestions = questions?.filter((q) => q.typeOfQuestion === 'DS') || [];
  const tlnQuestions = questions?.filter((q) => q.typeOfQuestion === 'TLN') || [];

  const sections = [
    { type: 'TN', questions: tnQuestions, title: 'Phần Trắc Nghiệm' },
    { type: 'DS', questions: dsQuestions, title: 'Phần Đúng Sai' },
    { type: 'TLN', questions: tlnQuestions, title: 'Phần Trả Lời Ngắn' },
  ].filter((s) => s.questions.length > 0);

  // Hàm xác định màu của ô câu hỏi dựa trên đáp án (đã làm hay chưa)
  const getQuestionStatusColor = (q) => {
    return answers[q.id] ? 'lightgreen' : 'lightcoral';
  };

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
      pathname: '/(tabs)/practice/[id]/do-exam',
      params: {
        id,
        name,
        sectionIndexParam: sectionIndex,
        questionIndexParam: questionIndex,
      },
    });
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
      {/* Tiêu đề đề thi */}
      <Text style={styles.title}>{name?.toUpperCase() || 'Không có đề'}</Text>
      
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

      {/* Chú thích màu sắc */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'lightgreen' }]} />
          <Text>Đã làm</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'lightcoral' }]} />
          <Text>Chưa làm</Text>
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
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
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
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  legendColor: {
    width: 20,
    height: 20,
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
