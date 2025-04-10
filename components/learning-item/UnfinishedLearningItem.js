import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default function UnfinishedLearningItem({ item }) {
  const router = useRouter();

  // Check if item is valid
  if (!item) {
    return null;
  }

  const handlePress = () => {
    // Navigate to the lesson containing this learning item
    if (item.lessonId && item.classCode) {
      router.push({
        pathname: `/classroom/${item.classCode}/${item.lessonId}`,
      });
    }
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handlePress}>
      <View style={styles.contentContainer}>
        {/* Icon based on learning item type */}
        {item.typeOfLearningItem === 'DOC' ? (
          <Ionicons
            name="document-text-outline"
            size={20}
            color={colors.ink.darker}
          />
        ) : item.typeOfLearningItem === 'VID' ? (
          <Feather name="youtube" size={20} color={colors.ink.darker} />
        ) : (
          <Feather name="book" size={20} color={colors.ink.darker} />
        )}

        {/* Learning item details */}
        <View style={styles.textContainer}>
          <AppText style={styles.itemName} numberOfLines={1}>{item.name || 'Unnamed item'}</AppText>
          {/* <AppText style={styles.className} numberOfLines={1}>{item.className || 'Unknown class'}</AppText> */}
        </View>
      </View>

      {/* Mark as done button */}

      <View style={styles.yellowIndicator} />
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
  itemName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.ink.darker,
  },
  yellowIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.warning,
    marginRight: 4,
  },
  className: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: colors.ink.light,
    marginTop: 2,
  },
  markButton: {
    padding: 8,
  },
});
