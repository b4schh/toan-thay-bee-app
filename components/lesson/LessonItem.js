import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default function LessonItem({ lesson, onLessonPress }) {
  const learningItemCountDone = lesson?.learningItems?.filter(
    (item) => item.studyStatuses?.[0]?.isDone,
  ).length;

  const progress = lesson?.learningItemCount
    ? (learningItemCountDone / lesson.learningItemCount) * 100
    : 0;

  return (
    <TouchableOpacity
      style={styles.lessonItem}
      onPress={() => onLessonPress(lesson.id)}
    >
      <AppText style={styles.lessonName}>{lesson?.name}</AppText>
      <AppText style={styles.lessonStatus}>
        Số mục học tập: {learningItemCountDone}/{lesson?.learningItemCount}
      </AppText>
      {
        lesson?.learningItemCount > 0 && (
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                { width: `${progress}%` }
              ]}
            />
          </View>
        )
      }

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
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: colors.sky.lighter,
    borderRadius: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 12,
  },
});
