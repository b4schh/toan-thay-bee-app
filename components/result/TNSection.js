import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import AppText from '../AppText';
import Solution from './Solution';
import Button from '@components/button/Button';
import MyMathText from '@components/latex/MyMathText';

export default function TNSection({
  questions,
  answers,
  toggleSolution,
  shownSolutions,
  prefixStatement,
}) {
  return (
    <View style={styles.section}>
      <AppText style={styles.title}>Phần Trắc nghiệm</AppText>
      <View style={styles.questionList}>
        {questions.map((question, idx) => {
          const userAnswerId = answers[question.id]?.answer;
          const isCorrect = answers[question.id]?.result;

          return (
            <View key={question.id} style={styles.card}>
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

              {/* Các phương án trả lời */}
              <View style={styles.statementList}>
                {question.statements.map((statement, index) => {
                  const isUserSelected = statement.id == userAnswerId;
                  const isStatementCorrect = statement.isCorrect === true;

                  const statementStyle = [
                    styles.statementText,
                    isStatementCorrect
                      ? styles.correctText
                      : isUserSelected
                        ? styles.incorrectText
                        : styles.defaultText,
                  ];

                  const icon = isStatementCorrect
                    ? '✓'
                    : isUserSelected
                      ? '✗'
                      : null;

                  return (
                    <View key={statement.id} style={styles.statement}>
                      <View style={{ flexDirection: 'row' }}>
                        <AppText
                          style={[styles.statementPrefix, statementStyle]}
                        >
                          {prefixStatement[index]}
                        </AppText>

                        <MyMathText statement={statement.content} />

                        {/* <AppText style={statementStyle}>
                          {statement.content}
                        </AppText> */}
                      </View>
                      
                      {icon && (
                        <AppText style={[styles.statementIcon, statementStyle]}>
                          {icon}
                        </AppText>
                      )}
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
  title: {
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
    gap: 12,
    borderRadius: 8,
    padding: 16,
    backgroundColor: colors.sky.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.sky.base,
    marginTop: 8,
  },
  statementList: {
    flexDirection: 'column',
    gap: 8,
  },
  statement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  statementPrefix: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 4,
  },
  statementText: {
    fontSize: 14,
  },
  statementIcon: {
    fontWeight: 'bold',
  },
  defaultText: {
    color: colors.ink.darkest,
  },
  solutionButton: {
    alignSelf: 'flex-start',
    width: 160,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
});
