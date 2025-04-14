import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default function CompletedTestItem({ attempt }) {
  const router = useRouter();
  
  // Check if attempt is valid
  if (!attempt) {
    return null;
  }
  
  const handlePress = () => {
    // Navigate to the attempt result
    if (attempt.id) {
        router.push(`/exam/${attempt.id}/result`);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handlePress}>
      <View style={styles.contentContainer}>
        <Feather name="file-text" size={20} color={colors.ink.darker} />
        
        <View style={styles.textContainer}>
          <AppText style={styles.examName} numberOfLines={1}>
            {attempt.exam.name || 'Unnamed exam'}
          </AppText>
          <AppText style={styles.completedDate} numberOfLines={1}>
            {formatDate(attempt.endTime)}
          </AppText>
        </View>
      </View>
      
      <View style={styles.scoreContainer}>
        <AppText style={styles.scoreText}>
          {attempt.score !== undefined ? `${attempt.score}/${attempt.totalScore || 10}` : 'N/A'}
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
  completedDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.ink.light,
    marginTop: 2,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scoreText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: colors.success,
  },
});