// components/ClassCard.js
import React, { memo } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Button from '../Button';
import AppText from '../AppText';
import colors from '../../constants/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

// Hàm so sánh props để tối ưu memo
const ClassCard = ({
  imageSource,
  name = 'Tên lớp không xác định',
  time = 'Không có thời gian',
  lessonCount,
  studentCount,
  status,
  onPressJoin,
  variant = 'large', // 'large' cho trang chủ, 'small' cho mục đích khác
}) => {
  const router = useRouter();

  const isPending = status === 'WS';

  // Chọn style dựa trên variant
  const cardStyle = variant === 'large' ? styles.cardLarge : styles.cardSmall;
  const imageStyle =
    variant === 'large' ? styles.imageLarge : styles.imageSmall;
  const nameStyle = variant === 'large' ? styles.nameLarge : styles.nameSmall;
  const detailStyle =
    variant === 'large' ? styles.detailLarge : styles.detailSmall;
  const buttonStyle =
    variant === 'large' ? styles.buttonLarge : styles.buttonSmall;
  const membersTextStyle =
    variant === 'large' ? styles.membersTextLarge : styles.membersTextSmall;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPressJoin}
      style={[styles.cardBase, cardStyle]}
    >
      <Image
        source={imageSource || require('../../assets/images/default-image.jpg')}
        style={[styles.imageBase, imageStyle]}
        resizeMode="cover"
      />
      <View style={styles.body}>
        <AppText style={[styles.nameBase, nameStyle]} numberOfLines={1}>
          {name}
        </AppText>
        {/* <AppText style={[styles.detailBase, detailStyle]}>{time}</AppText> */}

        <AppText style={[styles.detailBase, detailStyle]}>
          {lessonCount} buổi học
        </AppText>
      </View>
      <View style={styles.footer}>
        {isPending ? (
          <Button
            text="Đang chờ phê duyệt"
            style={[styles.buttonBase, buttonStyle]}
            textStyle={styles.buttonText}
            disabled
          />
        ) : (
          <>
            <Button
              text="Vào học"
              style={[styles.buttonBase, buttonStyle]}
              textStyle={styles.buttonText}
              onPress={onPressJoin || (() => console.log('Vào học'))}
            />
            {variant === 'large' && (
              <View style={styles.membersContainer}>
                <FontAwesomeIcon
                  name="user"
                  size={14}
                  color={colors.sky.dark}
                />
                <AppText style={[styles.membersTextBase, membersTextStyle]}>
                  {studentCount} thành viên
                </AppText>
              </View>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ClassCard;

const styles = StyleSheet.create({
  // Style chung
  cardBase: {
    backgroundColor: colors.sky.white,
    borderRadius: 12,
    padding: 12,
  },
  imageBase: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#EAF2FF',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  nameBase: {
    fontFamily: 'Inter-Bold',
    color: colors.ink.darkest,
    lineHeight: 22,
  },
  detailBase: {
    fontFamily: 'Inter-Medium',
    color: colors.sky.dark,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonBase: {
    height: 36,
  },
  buttonText: {
    fontSize: 12,
  },
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  membersTextBase: {
    fontFamily: 'Inter-Medium',
    color: colors.sky.dark,
  },

  // Style cho phiên bản lớn (trang chủ)
  cardLarge: {
    width: 220,
    height: 280,
  },
  imageLarge: {
    height: 140,
  },
  nameLarge: {
    fontSize: 18,
  },
  detailLarge: {
    fontSize: 14,
  },
  buttonLarge: {
    width: 80,
  },
  membersTextLarge: {
    fontSize: 12,
  },

  // Style cho phiên bản nhỏ
  cardSmall: {
    width: 168, // Nhỏ hơn phiên bản lớn
    height: 220, // Nhỏ hơn phiên bản lớn
  },
  imageSmall: {
    height: 100, // Giảm chiều cao ảnh
  },
  classNameSmall: {
    fontSize: 16, // Giảm font size
  },
  detailSmall: {
    fontSize: 12, // Giảm font size
  },
  buttonSmall: {
    width: '100%', // Giảm width của button
  },
  membersTextSmall: {
    fontSize: 10, // Giảm font size
  },
});
