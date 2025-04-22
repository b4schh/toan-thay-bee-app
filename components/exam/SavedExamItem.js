import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from '../AppText';
import colors from '../../constants/colors';
import { useRouter } from 'expo-router';

export default function SavedExamItem({ exam }) {
  const router = useRouter();

  // Handle case where exam might be null or undefined
  if (!exam) {
    return null;
  }

  const handlePress = () => {
    router.push(`/practice/${exam.id}`);
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handlePress}>
      <View style={styles.contentContainer}>
        <Feather name="bookmark" size={20} color={colors.primary} />

        <View style={styles.textContainer}>
          <AppText style={styles.examName} numberOfLines={1}>
            {exam.name || 'Đề thi chưa có tên'}
          </AppText>
          <AppText style={styles.examInfo} numberOfLines={1}>
            {exam.testDuration ? `${exam.testDuration} phút` : 'Không giới hạn thời gian'}
          </AppText>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <AppText style={styles.statusText}>
          {exam.isDone ? 'Đã làm' : 'Chưa làm'}
        </AppText>
        <Feather name="chevron-right" size={16} color={colors.ink.light} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: colors.sky.white,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  textContainer: {
    flex: 1,
  },
  examName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.ink.darker,
  },
  examInfo: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.ink.light,
    marginTop: 2,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.ink.light,
  },
});