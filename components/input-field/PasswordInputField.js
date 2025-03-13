// components/PasswordInputField.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default function PasswordInputField({
  label,
  placeholder,
  value,
  onChangeText,
  containerStyle,
  ...props
}) {
  const [secureText, setSecureText] = useState(true);

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.ink.light}
          secureTextEntry={secureText}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
        <TouchableOpacity
          onPress={toggleSecureText}
          style={styles.toggleButton}
        >
          <AppText style={styles.toggleButtonText}>
            {secureText ? 'Hiện' : 'Ẩn'}
          </AppText>
        </TouchableOpacity>
      </View>
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
  inputContainer: {
    position: 'relative',
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
  toggleButton: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  toggleButtonText: {
    color: colors.primary,
    fontFamily: 'BeVietnamPro-Medium',
    fontSize: 14,
  },
});
