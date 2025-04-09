import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default function Solution({ question }) {
  return (
    <View style={styles.solutionContainer}>
      <AppText style={styles.solutionTitle}>Lời giải:</AppText>

      {question.solution && (
        <AppText style={styles.solutionText}>{question.solution}</AppText>
      )}

      {question.solutionImageUrl && (
        <Image
          source={{ uri: question.solutionImageUrl }}
          style={styles.image}
        />
      )}

      {question.solutionUrl && (
        <TouchableOpacity onPress={() => Linking.openURL(question.solutionUrl)}>
          <AppText style={styles.link}>Xem lời giải chi tiết tại đây</AppText>
        </TouchableOpacity>
      )}

      {!question.solution &&
        !question.solutionImageUrl &&
        !question.solutionUrl && (
          <AppText style={styles.noSolutionText}>
            Không có lời giải cho câu hỏi này.
          </AppText>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  solutionContainer: {
    marginTop: 10,
    padding: 12,
    backgroundColor: colors.sky.light,
    borderRadius: 6,
    gap: 8,
  },
  solutionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    marginBottom: 8,
    color: colors.ink.darkest,
  },
  solutionText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.ink.darker,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#999',
    marginTop: 8,
  },
  link: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
    fontSize: 14,
    marginTop: 8,
  },
  noSolutionText: {
    fontSize: 14,
    color: colors.ink.lighter,
    fontStyle: 'italic',
  },
});