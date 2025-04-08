import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default function LessonItem({ lesson, onLessonPress }) {
  return (
    <TouchableOpacity
      style={styles.lessonItem}
      onPress={() => onLessonPress(lesson.id)}
    >
      <AppText style={styles.lessonName}>{lesson?.name}</AppText>
      <AppText style={styles.lessonStatus}>Trạng thái: Đã hoàn thành</AppText>
      <View style={styles.progressBar}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  lessonItem: {
    flex: 1,
    gap: 8,
    padding: 12,
    justifyContent: 'center',
    backgroundColor: colors.sky.white,
    borderRadius: 16,
  },
  lessonName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  lessonStatus: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.ink.darker,
  },
  progressBar: {
    borderRadius: 12,
    backgroundColor: 'lightgreen',
    height: 4,
    width: '100%',
  },
});
