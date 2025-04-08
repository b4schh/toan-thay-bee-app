import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from '../AppText'; // Đường dẫn tới AppText
import colors from '../../constants/colors'; // Đường dẫn tới colors

export default function HeaderWithBackButton({ title, onBackPress }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Feather name="arrow-left" size={20} color={colors.ink.darkest} />
      </TouchableOpacity>
      <AppText style={styles.headerText}>{title}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
    borderRadius: 20,
    zIndex: 10,
  },
  headerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: colors.ink.darkest,
  },
});