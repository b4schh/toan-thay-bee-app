// components/TextInputField.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AppText from '../AppText';
import colors from '../../constants/colors';

export default function TextInputField({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  containerStyle,
  typeField = 'text',
  labelStyle,
  inputStyle,
  ...props
}) {
  const [secureText, setSecureText] = useState(typeField === 'password');

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <AppText style={[styles.label, labelStyle]}>{label}</AppText>}
      <View>
        <TextInput
          style={[styles.input, inputStyle]}
          typeField={typeField}
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.ink.light}
          secureTextEntry={typeField === 'password' ? secureText : false}
          {...props}
        />

        {typeField === 'password' && (
          <TouchableOpacity
            onPress={toggleSecureText}
            style={styles.toggleButton}
          >
            <AppText style={styles.toggleButtonText}>
              {secureText ? 'Hiện' : 'Ẩn'}
            </AppText>
          </TouchableOpacity>
        )}
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
