import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Feather, Ionicons } from '@expo/vector-icons';
import AppText from '../AppText';
import colors from '../../constants/colors';
import { markLearningItem } from '../../features/class/classSlice';

export default function LearningItem({ item, isOpen, onToggle }) {
  const dispatch = useDispatch();

  // Check if studyStatuses exists and has at least one item
  const hasStatus = item.studyStatuses && item.studyStatuses.length > 0;
  const isDone = hasStatus ? item.studyStatuses[0].isDone : false;
  const studyTime = hasStatus ? item.studyStatuses[0].studyTime : 0;


  return (
    <View>
      <TouchableOpacity style={styles.item} onPress={() => onToggle(item.id)}>
        {isOpen ? (
          <Feather name="chevron-down" size={16} color="black" />
        ) : (
          <Feather name="chevron-right" size={16} color="black" />
        )}
        {item.typeOfLearningItem === 'DOC' ? (
          <>
            <Ionicons
              name="document-text-outline"
              size={20}
              color={colors.ink.darker}
            />
            <AppText style={styles.text}>Lý thuyết</AppText>
          </>
        ) : item.typeOfLearningItem === 'VID' ? (
          <>
            <Feather name="youtube" size={20} color={colors.ink.darker} />
            <AppText style={styles.text}>Video</AppText>
          </>
        ) : (
          <>
            <Feather name="book" size={20} color={colors.ink.darker} />
            <AppText style={styles.text}>Bài tập</AppText>
          </>
        )}

        <View style={styles.spacer} />

        {hasStatus && (
          <View>
            {isDone ? (
              <View style={styles.studyTimeContainer}>
                <Feather name="check-circle" size={20} color={colors.success} />
                <AppText style={styles.studyTimeText}>{new Date(studyTime).toLocaleTimeString('vi-VN', {year: 'numeric', month: 'numeric', day: 'numeric' ,hour: 'numeric', minute: 'numeric' })}</AppText>
              </View>
            ) : (
              <View style={styles.studyTimeContainer}>
                <View style={styles.yellowIndicator} />
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 1,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.ink.darker,
  },
  spacer: {
    flex: 1,
  },
  studyTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yellowIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.warning,
    marginRight: 4,
  },
  studyTimeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: colors.ink.dark,
  },
});