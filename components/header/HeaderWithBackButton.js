import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from '../AppText'; // Đường dẫn tới AppText
import colors from '../../constants/colors'; // Đường dẫn tới colors

export default function HeaderWithBackButton({ title, onBackPress }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Feather name="arrow-left" size={24} color={colors.ink.darkest} />
      </TouchableOpacity>
      <AppText style={styles.headerText}>{title}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.sky.white,
    // borderBottomWidth: 1,
    // borderBottomColor: colors.sky.light,
    elevation: 2,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.ink.darkest,
  },
});