// components/Button.js
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import AppText from './AppText';
import colors from '../constants/colors';

export default function Button({
  text,
  iconSource, // Prop để truyền source của ảnh
  onPress,
  variant = 'text', // Các giá trị: 'text', 'icon', 'both'
  buttonStyle,
  textStyle,
  iconStyle,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, buttonStyle]}
    >
      {(variant === 'icon' || variant === 'both') && iconSource && (
        <Image
          source={iconSource}
          style={[
            styles.icon,
            iconStyle,
            variant === 'both' && text ? { marginRight: 8 } : {},
          ]}
        />
      )}
      {(variant === 'text' || variant === 'both') && text && (
        <AppText style={[styles.text, textStyle]}>{text}</AppText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', // Để icon và text nằm ngang nếu cả 2 được render
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: '100%',
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'BeVietnamPro-Bold',
    marginBottom: Platform.OS === 'android' ? 3 : 0,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain', // Để đảm bảo ảnh hiển thị đúng kích thước
  },
});
