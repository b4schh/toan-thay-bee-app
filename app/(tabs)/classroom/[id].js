import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ScrollableCard from '../../../components/ScrollableCard';
import colors from '../../../constants/colors';
import AppText from '../../../components/AppText';
import Button from '../../../components/Button';
import Slideshow from '../../../components/Slideshow';
import SessionDropdown from '../../../components/session/SessionDropdown';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons';

const images = [];

export default function ClassroomIntro() {
  const router = useRouter();

  const {
    id = '',
    className = '',
    time = '',
    sessionCount = 0,
    membersCount = 0,
    description = '',
    status = '',
    sessions = '[]',
  } = useLocalSearchParams();

  console.log('Giới thiệu lớp:', id);
  const sessionDetail = sessions ? JSON.parse(sessions) : [];

  console.log('Session:', sessionDetail);

  console.log(`Thông tin lớp: 
id: ${id}
className: ${className}
time: ${time}
sessionCount: ${sessionCount}
membersCount: ${membersCount}
description: ${description}
status: ${status}`);

  return (
    <View style={{ flex: 1 }}>
      {/* Nút quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          if (router.canGoBack()) {
            router.back(); // Quay lại nếu có lịch sử
          } else {
            router.replace('/classroom'); // Nếu không có lịch sử, quay về danh sách lớp học
          }
        }}
      >
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      {/* Slideshow */}
      <Slideshow images={images} />

      <ScrollableCard contentStyle={styles.contentStyle}>
        <AppText style={styles.title}>{className}</AppText>

        <View style={styles.membersContainer}>
          <FontAwesomeIcon name="user" size={16} color={colors.sky.dark} />
          <AppText style={styles.membersTextBase}>
            {membersCount} thành viên
          </AppText>
        </View>

        <AppText style={styles.subTitle}>Mô tả lớp</AppText>

        <AppText style={styles.description}>{description}</AppText>

        <AppText style={styles.subTitle}>Nội dung lớp học</AppText>

        <View style={{ paddingVertical: 10, gap: 10 }}>
          {sessionDetail.map((session) => (
            <SessionDropdown key={session.id} session={session} />
          ))}
        </View>

        <Button
          style={{ marginBottom: 100 }}
          text={status === 'pending' ? 'Đang chờ phê duyệt' : 'Vào lớp'}
          disabled={status === 'pending'}
          onPress={() => router.push(`/classroom/${id}/detail`)}
        />
      </ScrollableCard>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {},
  contentStyle: {
    gap: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
  },
  subTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.sky.dark,
  },
  description: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.sky.darkest,
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
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
});
