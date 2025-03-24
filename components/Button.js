import React from 'react';
import { TouchableOpacity, StyleSheet, View, Platform } from 'react-native';
import * as Icons from '@expo/vector-icons'; // Import tất cả icon libraries từ expo
import AppText from './AppText';
import colors from '../constants/colors';

const Button = ({
  onPress,
  text, // Nội dung text
  icon, // Tên icon
  iconLibrary = 'Ionicons', // Default là Ionicons
  iconSize = 24, // Kích thước icon, mặc định = 24
  iconColor = colors.sky.white, // Màu icon, mặc định là trắng
  iconComponent,
  style, // Custom style của button
  textStyle, // Custom style của text
  iconStyle, // Custom style của icon
  disabled = false,
  ...props
}) => {
  // Hàm render icon với khả năng chọn library
  const renderIcon = () => {
    if (iconComponent) {
      // Trường hợp sử dụng custom icon component (Ảnh, SVG,...)
      return iconComponent;
    }
    if (icon && Icons[iconLibrary]) {
      const IconComponent = Icons[iconLibrary];
      return (
        <IconComponent
          name={icon}
          size={iconSize}
          color={iconColor}
          style={[styles.icon, iconStyle, text && styles.iconWithText]}
        />
      );
    }
    return null;
  };

  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      <View style={styles.content}>
        {renderIcon()}
        {text && (
          <AppText
            style={[
              styles.text,
              textStyle,
            ]}
          >
            {text}
          </AppText>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Styles cơ bản
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 99,
    // paddingVertical: 12,
    // paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Inter-Medium',
    color: colors.sky.white,
  },
  icon: {
    // Không set color và size ở đây nữa để prop override
  },
  iconWithText: {
    marginRight: 8,
  },
  disabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.8,
  },
});

// Export component
export default Button;
