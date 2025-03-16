import React, { memo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from './Button';
import AppText from './AppText';
import colors from '../constants/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const ClassCard = ({
  imageSource,
  className,
  time,
  sessions,
  membersCount,
  onPressJoin,
}) => {
  return (
    <View style={styles.card}>
      {/* Ảnh lớp học */}
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Nội dung */}
      <View style={styles.body}>
        <Text style={styles.className} numberOfLines={1}>{className}</Text>
        <Text style={styles.detail}>{time}</Text>
        <Text style={styles.detail}>{sessions} buổi học</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          text="Vào học"
          onPress={onPressJoin || (() => console.log('Vào học'))}
        />
        <View style={styles.membersContainer}>
          <FontAwesomeIcon name="user" size={14} color={colors.sky.dark} />
          <AppText style={styles.membersText}>{membersCount} thành viên</AppText>
        </View>
      </View>
    </View>
  );
};

export default memo(ClassCard);

const styles = StyleSheet.create({
  card: {
    width: 220,
    height: 280,
    backgroundColor: colors.sky.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    elevation: 2, // Bóng trên Android
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12, // Bo góc hình ảnh
    backgroundColor: '#EAF2FF',
  },
  body: {
    paddingVertical: 12,
    justifyContent: 'center',
    flex: 1,
  },
  className: {
    fontSize: 18,
    fontFamily: 'BeVietnamPro-Bold',
    color: '#202325',
    lineHeight: 22,
  },
  detail: {
    fontFamily: 'BeVietnamPro-Medium',
    fontSize: 14,
    color: colors.sky.dark,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    width: 80, // tăng một chút để hiển thị text rõ ràng
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'BeVietnamPro-Medium',
    fontSize: 14,
  },
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  membersText: {
    fontSize: 12,
    color: colors.sky.dark,
  },
});
