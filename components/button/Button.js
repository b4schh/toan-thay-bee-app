import React from 'react';
import { TouchableOpacity, StyleSheet, View, Platform } from 'react-native';
import * as Icons from '@expo/vector-icons'; // Import tất cả icon libraries từ expo
import AppText from '../AppText';
import colors from '../../constants/colors';

const Button = ({
  onPress,
  text, // Nội dung text
  icon, // Tên icon
  iconLibrary = 'Ionicons', // Default là Ionicons
  iconSize = 24, // Kích thước icon, mặc định = 24
  iconColor, // Màu icon
  iconComponent,
  style, // Custom style của button
  textStyle, // Custom style của text
  iconStyle, // Custom style của icon
  disabled = false,
  ...props
}) => {
  // Xác định màu icon và text dựa trên style của button
  const isWhiteBackground = style?.backgroundColor === colors.sky.white;
  const defaultIconColor = isWhiteBackground ? colors.primary : colors.sky.white;
  const finalIconColor = iconColor || defaultIconColor;

  // Xác định màu text mặc định dựa trên nền
  const defaultTextStyle = isWhiteBackground ? { color: colors.primary } : { color: colors.sky.white };
  const finalTextStyle = [styles.text, defaultTextStyle, textStyle];
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
          color={finalIconColor}
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
        {text && <AppText style={finalTextStyle}>{text}</AppText>}
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
    width: '100%',
    height: 48,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Inter-Medium',
    color: colors.sky.white,
    fontSize: 16,
  },
  icon: {
    // Không set color và size ở đây nữa để prop override
  },
  iconWithText: {
    marginRight: 8,
  },
  disabled: {
    backgroundColor: "#CCC",
    opacity: 0.8,
  },
});

// Export component
export default Button;
