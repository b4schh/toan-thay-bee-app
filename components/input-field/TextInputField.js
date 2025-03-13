// components/TextInputField.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default function TextInputField({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  containerStyle,
  ...props
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.ink.light}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: 'BeVietnamPro-Medium',
    color: colors.ink.darkest,
    marginBottom: 12,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.ink.light,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
  },
});
