// components/ClassCard.js
import React, { memo } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Button from '../button/Button';
import AppText from '../AppText';
import colors from '../../constants/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const getRandomColor = () => {
  const colorPalette = ['#D04848', '#FDE767', '#F3B95F', '#6895D2', '#337357'];
  return colorPalette[Math.floor(Math.random() * colorPalette.length)];
};

// Thêm hàm helper để chuyển đổi ngày
const getFullDayOfWeek = (shortDay) => {
  const dayMapping = {
    T2: 'Thứ Hai',
    T3: 'Thứ Ba',
    T4: 'Thứ Tư',
    T5: 'Thứ Năm',
    T6: 'Thứ Sáu',
    T7: 'Thứ Bảy',
    CN: 'Chủ Nhật',
  };
  return dayMapping[shortDay] || shortDay;
};

// Thêm hàm helper để format thời gian học
const getTimeDisplay = (dayOfWeek, studyTime) => {
  if (!dayOfWeek && !studyTime) {
    return 'Thời gian không xác định';
  }

  const parts = [];
  if (dayOfWeek) {
    parts.push(getFullDayOfWeek(dayOfWeek));
  }
  if (studyTime) {
    parts.push(studyTime);
  }
  return parts.join(', ');
};

const ClassCard = ({
  name,
  dayOfWeek,
  studyTime,
  lessonCount,
  studentCount,
  status,
  onPressJoin,
  variant = 'large', // 'large' cho trang chủ, 'small' cho mục đích khác
}) => {
  const isPending = status === 'WS';

  // Chọn style dựa trên variant
  const cardStyle = variant === 'large' ? styles.cardLarge : styles.cardSmall;
  const headerStyle =
    variant === 'large' ? styles.headerLarge : styles.headerSmall;
  const nameStyle = variant === 'large' ? styles.nameLarge : styles.nameSmall;
  const bodyStyle = variant === 'large' ? styles.bodyLarge : styles.bodySmall;
  const timeStyle = variant === 'large' ? styles.timeLarge : styles.timeSmall;
  const lessonStyle =
    variant === 'large' ? styles.lessonLarge : styles.lessonSmall;
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
      {/* Header với tên lớp */}
      <View style={[styles.headerBase, headerStyle]}>
        <AppText style={[styles.nameBase, nameStyle]} numberOfLines={2}>
          {name ? name : 'Không có tên'}
        </AppText>
      </View>

      <View style={[styles.bodyBase, bodyStyle]}>
        <AppText style={[styles.timeBase, timeStyle]}>
          {getTimeDisplay(dayOfWeek, studyTime)}
        </AppText>
        <AppText style={[styles.lessonBase, lessonStyle]}>
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
  headerBase: {
    backgroundColor: '#6895D2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameBase: {
    fontFamily: 'iCielBCCubano',
    color: colors.sky.white,
    textAlign: 'center',
    elevation: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
    padding: 8,
  },
  bodyBase: {
    flex: 1,
    justifyContent: 'center',
  },
  timeBase: {
    fontFamily: 'Inter-Medium',
    color: colors.ink.darker,
    lineHeight: 22,
  },
  lessonBase: {
    fontFamily: 'Inter-Medium',
    color: colors.ink.darker,
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
  headerLarge: {
    height: 140,
  },
  nameLarge: {
    fontSize: 24,
  },
  bodyLarge: {
    gap: 4,
  },
  timeLarge: {
    fontSize: 16,
  },
  lessonLarge: {
    fontSize: 16,
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
  headerSmall: {
    height: 100, // Giảm chiều cao ảnh
  },
  nameSmall: {},
  bodySmall: {},
  timeSmall: {
    fontSize: 12, // Giảm font size
  },
  lessonSmall: {
    fontSize: 12,
  },
  buttonSmall: {
    width: '100%', // Giảm width của button
  },
  membersTextSmall: {
    fontSize: 10, // Giảm font size
  },
});
