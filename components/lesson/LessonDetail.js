import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Icons from '@expo/vector-icons';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default LessonDetail = ({ lesson }) => {
  return (
    <View style={styles.content}>
      {lesson.learningItems.map((item, index) => (
        <View style={styles.row} key={index}>
          {item.typeOfLearningItem === 'DOC' ? (
            <>
              <Icons.Feather name="book" size={20} color={colors.ink.darker} />
              <AppText style={styles.text}>{item.name}</AppText>
            </>
          ) : item.typeOfLearningItem === 'VID' ? (
            <>
              <Icons.Feather name="youtube" size={20} color={colors.ink.darker} />
              <AppText style={styles.text}>{item.name}</AppText>
            </>
          ) : (
            <>
              <Icons.Ionicons
                name="document-text-outline"
                size={20}
                color={colors.ink.darker}
              />
              <AppText style={styles.text}>{item.name}</AppText>
            </>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  text: {
    fontFamily: 'Inter-Medium',
    marginLeft: 10,
    fontSize: 16,
    color: colors.ink.darker,
  },
});