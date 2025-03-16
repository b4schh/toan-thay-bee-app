import React from 'react';
import { TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons, Feather } from '@expo/vector-icons'; // Import các thư viện icon
import AppText from './AppText';
import colors from '../constants/colors';

export default function Button({
  text,
  iconSource, // Có thể là tên icon (chuỗi) hoặc ảnh
  iconType = 'MaterialIcons', // Loại icon mặc định (MaterialIcons, FontAwesome, Ionicons,...)
  variant = 'text', // Các giá trị: 'text', 'icon', 'both'
  onPress,
  buttonStyle,
  textStyle,
  iconStyle,
  iconSize = 24, // Kích thước icon mặc định
  iconColor = 'white', // Màu icon mặc định
}) {
  // Kiểm tra iconSource để xác định cách hiển thị icon
  const renderIcon = () => {
    if (!iconSource) return null;

    // Nếu iconSource là một chuỗi (tên icon), sử dụng thư viện icon
    if (typeof iconSource === 'string' && !iconSource.includes('/')) {
      const IconComponent = getIconComponent(iconType);
      return (
        <IconComponent
          name={iconSource}
          size={iconSize}
          color={iconColor}
          style={[styles.icon, iconStyle]}
        />
      );
    }

    // Nếu iconSource là hình ảnh (require hoặc URL), dùng Image
    return (
      <Image
        source={
          typeof iconSource === 'string' ? { uri: iconSource } : iconSource
        }
        style={[
          styles.icon,
          iconStyle,
          variant === 'both' && text ? { marginRight: 8 } : {},
        ]}
      />
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        variant === 'icon' && styles.iconOnly,
        variant === 'text' && styles.textOnly,
        buttonStyle,
      ]}
    >
      {(variant === 'icon' || variant === 'both') && renderIcon()}
      {(variant === 'text' || variant === 'both') && text && (
        <AppText style={[styles.text, textStyle]}>{text}</AppText>
      )}
    </TouchableOpacity>
  );
}

// Hàm chọn loại icon dựa trên iconType
const getIconComponent = (type) => {
  switch (type) {
    case 'FontAwesome':
      return FontAwesome;
    case 'Feather':
      return Feather;
    case 'Ionicons':
      return Ionicons;
    case 'MaterialIcons':
    default:
      return MaterialIcons;
  }
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', // Để icon và text nằm ngang nếu cả 2 được render
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  iconOnly: {
    height: 44,
    width: 44,
  },
  textOnly: {
    width: '100%',
  },
  text: {
    color: colors.sky.white,
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
