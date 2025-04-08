import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default function LearningItem({ item, isOpen, onToggle }) {
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
});
