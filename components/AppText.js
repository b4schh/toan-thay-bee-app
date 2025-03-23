// components/AppText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function AppText({ children, style, ...props }) {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter-Regular', // Mặc định là hệ thống nếu không truyền
    fontSize: 16, // Mặc định 16 nếu không truyền
    textAlignVertical: 'center',
    color: colors.ink.darkest, // Mặc định màu đen nếu không truyền
  },
});
