import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import AppText from '../AppText';
import Button from '../button/Button';
import Solution from './Solution';
import MyMathText from '@components/latex/MyMathText';

export default function DSSection({
  questions,
  answers,
  toggleSolution,
  shownSolutions,
  prefixStatement,
}) {
  return (
    <View style={styles.section}>
      <AppText style={styles.examName}>Phần Đúng sai</AppText>
      <View style={styles.questionList}>
        {questions.map((question, idx) => {
          return (
            <View key={question.id + 'DS'} style={styles.card}>
              {/* Câu hỏi */}
              <AppText style={styles.questionHeader}>Câu {idx + 1}:</AppText>

              <MyMathText statement={question.content} />

              {/* <AppText style={styles.questionContent}>
                {question.content}
              </AppText> */}

              {question.imageUrl && (
                <Image
                  source={{ uri: question.imageUrl }}
                  style={styles.questionImage}
                />
              )}

              {/* Danh sách mệnh đề */}
              <View style={styles.statementList}>
                {question.statements.map((statement, index) => {
                  const userAnswer = answers[statement.id];
                  const isCorrect = userAnswer === statement.isCorrect;

                  return (
                    <View
                      key={statement.id}
                      style={[
                        styles.statementCard,
                        isCorrect
                          ? styles.correctBackground
                          : styles.incorrectBackground,
                      ]}
                    >
                      {/* Mệnh đề + ảnh (nếu có) */}
                      <View style={styles.statementContent}>
                        <AppText style={styles.statementPrefix}>
                          {prefixStatement[index]}
                        </AppText>
                        <View style={styles.statementTextContainer}>
                          <MyMathText statement={statement.content} />

                          {/* <AppText style={styles.statementText}>
                            {statement.content}
                          </AppText> */}
                          
                          {statement.imageUrl && (
                            <Image
                              source={{ uri: statement.imageUrl }}
                              style={styles.statementImage}
                            />
                          )}
                        </View>
                      </View>

                      {/* Trả lời, đáp án, kết quả */}
                      <View style={styles.answerRow}>
                        <AppText style={styles.answerText}>
                          Trả lời:{' '}
                          <AppText style={styles.answerBold}>
                            {userAnswer === true
                              ? 'Đúng'
                              : userAnswer === false
                                ? 'Sai'
                                : 'Không trả lời'}
                          </AppText>
                        </AppText>
                        <AppText style={styles.answerText}>
                          Đáp án:{' '}
                          <AppText style={styles.answerBold}>
                            {statement.isCorrect === true ? 'Đúng' : 'Sai'}
                          </AppText>
                        </AppText>
                        <AppText
                          style={[
                            styles.resultText,
                            isCorrect
                              ? styles.correctText
                              : styles.incorrectText,
                          ]}
                        >
                          {isCorrect ? '✓ Đúng' : '✗ Sai'}
                        </AppText>
                      </View>
                    </View>
                  );
                })}
              </View>

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
  questionHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.ink.darkest,
  },
  questionContent: {
    fontSize: 14,
    color: colors.ink.darker,
    lineHeight: 20,
  },
  questionImage: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
  },
  statementList: {
    flexDirection: 'column',
    gap: 12,
  },
  statementCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  correctBackground: {
    backgroundColor: '#dcfce7',
    borderColor: '#4ade80',
  },
  incorrectBackground: {
    backgroundColor: '#fee2e2',
    borderColor: '#f87171',
  },
  statementContent: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  statementPrefix: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.ink.darkest,
  },
  statementTextContainer: {
    flex: 1,
  },
  statementText: {
    fontSize: 14,
    color: colors.ink.darker,
    lineHeight: 20,
  },
  statementImage: {
    width: '100%',
    height: 150,
    marginTop: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.sky.base,
    resizeMode: 'contain',
  },
  answerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  answerText: {
    fontSize: 14,
    color: colors.ink.darker,
  },
  answerBold: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  resultText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  correctText: {
    color: colors.success,
  },
  incorrectText: {
    color: colors.error,
  },
  solutionButton: {
    alignSelf: 'flex-start',
    width: 160,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
});
