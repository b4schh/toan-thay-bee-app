import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import AppText from '../AppText';
import Button from '../button/Button';
import Solution from './Solution';
import MyMathText from '@components/latex/MyMathText';

export default function TLNSection({
  questions,
  answers,
  toggleSolution,
  shownSolutions,
}) {
  return (
    <View style={styles.section}>
      <AppText style={styles.examName}>Phần Trả lời ngắn</AppText>
      <View style={styles.questionList}>
        {questions.map((question, idx) => {
          const userAnswerRaw = answers[question.id]?.answer || '';
          const userAnswer =
            userAnswerRaw.trim() !== '' ? JSON.parse(userAnswerRaw) : '';
          const isCorrect = answers[question.id]?.result;
          const correctAnswer = question.correctAnswer || '';

          return (
            <View key={question.id + 'TLN'} style={styles.card}>
              {/* Header câu hỏi */}
              <View style={styles.header}>
                <AppText
                  style={[
                    styles.questionNumber,
                    isCorrect === true
                      ? styles.correctText
                      : isCorrect === false
                        ? styles.incorrectText
                        : styles.neutralText,
                  ]}
                >
                  Câu {idx + 1}:
                </AppText>
                {isCorrect === true && (
                  <AppText style={styles.correctIcon}>✓</AppText>
                )}
              </View>

              {/* Nội dung câu hỏi */}
              <MyMathText statement={question.content} />

              {/* <AppText style={styles.questionContent}>
                {question.content}
              </AppText> */}

              {question.imageUrl && (
                <Image
                  source={{ uri: question.imageUrl }}
                  style={styles.image}
                />
              )}

              {/* Câu trả lời của bạn */}
              <View style={styles.answerContainer}>
                <AppText style={styles.answerLabel}>
                  Câu trả lời của bạn:
                </AppText>
                <AppText style={styles.answerText}>
                  {userAnswer !== '' ? userAnswer : 'Chưa trả lời.'}
                </AppText>
              </View>

              {/* Đáp án đúng */}
              {correctAnswer !== '' && (
                <View style={styles.correctAnswerContainer}>
                  <AppText style={styles.correctAnswerLabel}>
                    Đáp án đúng:
                  </AppText>
                  <AppText style={styles.correctAnswerText}>
                    {correctAnswer}
                  </AppText>
                </View>
              )}

              {/* Nút hiển thị/ẩn lời giải */}
              <Button
                text={
                  shownSolutions[question.id]
                    ? 'Ẩn lời giải'
                    : 'Hiển thị lời giải'
                }
                onPress={() => toggleSolution(question.id)}
                style={styles.solutionButton}
              />

              {/* Lời giải */}
              {shownSolutions[question.id] && <Solution question={question} />}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  examName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.ink.darkest,
    marginBottom: 12,
  },
  questionList: {
    flexDirection: 'column',
    gap: 16,
  },
  card: {
    backgroundColor: colors.sky.white,
    padding: 16,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  correctText: {
    color: colors.success,
  },
  incorrectText: {
    color: colors.error,
  },
  neutralText: {
    color: 'orange',
  },
  correctIcon: {
    fontSize: 18,
    color: colors.success,
  },
  questionContent: {
    fontSize: 14,
    color: colors.ink.darker,
    lineHeight: 20,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
  },
  answerContainer: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  answerLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  answerText: {
    fontSize: 14,
    color: '#333',
  },
  correctAnswerContainer: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#dcfce7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4ade80',
  },
  correctAnswerLabel: {
    fontSize: 13,
    color: colors.success,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  correctAnswerText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '600',
  },
  solutionButton: {
    alignSelf: 'flex-start',
    width: 160,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
});
