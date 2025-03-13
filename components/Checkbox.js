import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppText from './AppText';

export default function Checkbox({ label, checked, onToggle }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
        <View style={[styles.checkbox, checked && styles.checked]} />
      </TouchableOpacity>
      <AppText style={styles.label}>{label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    backgroundColor: 'transparent',
  },
  checked: {
    backgroundColor: '#253F61',
  },
  label: {
    fontSize: 14,
    color: '#000',
  },
});
