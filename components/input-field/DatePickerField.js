import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import AppText from '../AppText';

const DatePickerField = ({ label, value, onChange, disabled = false, style }) => {
  const [showPicker, setShowPicker] = useState(false);

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Toggle date picker visibility
  const toggleDatePicker = () => {
    if (disabled) return;
    setShowPicker(!showPicker);
  };

  // Handle date change
  const handleChange = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    
    // Hide picker on iOS after selection
    if (Platform.OS === 'ios') {
      setShowPicker(false);
    } else {
      // On Android, hide picker after selection
      setShowPicker(false);
    }
    
    onChange(currentDate);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      
      <TouchableOpacity 
        style={[styles.inputContainer, disabled && styles.inputDisabled]} 
        onPress={toggleDatePicker}
        disabled={disabled}
      >
        <AppText style={styles.dateText}>{formatDate(value)}</AppText>
        <Feather name="calendar" size={16} color={disabled ? colors.ink.dark : colors.primary} />
      </TouchableOpacity>
      
      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          maximumDate={new Date()}
          minimumDate={new Date(1950, 0, 1)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: colors.ink.darker,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.sky.base,
    borderRadius: 8,
    backgroundColor: colors.sky.white,
  },
  inputDisabled: {
    backgroundColor: colors.sky.lightest,
    borderColor: colors.sky.light,
  },
  dateText: {
    fontSize: 16,
    color: colors.ink.dark,
  },
});

export default DatePickerField;

