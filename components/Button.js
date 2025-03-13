// components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const Button = ({
  text,
  iconSource, // Prop để truyền source của ảnh
  onPress,
  variant = 'text', // Các giá trị: 'text', 'icon', 'both'
  buttonStyle,
  textStyle,
  iconStyle,
}) => {
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
        <Text style={[styles.text, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', // Để icon và text nằm ngang nếu cả 2 được render
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 48,
    paddingHorizontal: 12,
    // paddingVertical: 16,
    borderRadius: 999,
    backgroundColor: '#253F61',
    marginHorizontal: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'BeVietnamPro-Bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain', // Để đảm bảo ảnh hiển thị đúng kích thước
  },
});

export default Button;
