import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ScrollableCard from '../../../../components/ScrollableCard';
import colors from '../../../../constants/colors';
import AppText from '../../../../components/AppText';
import Button from '../../../../components/Button';
import Slideshow from '../../../../components/Slideshow';
import LessonDropdown from '../../../../components/lesson/LessonDropdown';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonLearningItemByClassId } from '../../../../features/class/classSlice';

const images = [];

export default function ClassroomIntro() {
  const router = useRouter();
  const dispatch = useDispatch();

  const class_code = useLocalSearchParams().id;
  
  useEffect(() => {
    console.log("Class ID:", class_code);

    if (class_code) {
      dispatch(fetchLessonLearningItemByClassId({ class_code }));
    }
  }, [class_code]);
  const { classDetail } = useSelector((state) => state.classes);
  
  // useEffect(() => console.log('Lessons:', classDetail), [classDetail]);

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
      <Slideshow images={[]} />

      <ScrollableCard contentStyle={styles.contentStyle}>
        <AppText style={styles.title}>{classDetail?.name}</AppText>

        <View style={styles.membersContainer}>
          <FontAwesomeIcon name="user" size={16} color={colors.sky.dark} />
          <AppText style={styles.membersTextBase}>
            {classDetail?.studentCount} thành viên
          </AppText>
        </View>

        <AppText style={styles.subTitle}>Mô tả lớp</AppText>

        <AppText style={styles.description}>{classDetail?.description}</AppText>

        <AppText style={styles.subTitle}>Nội dung lớp học</AppText>

        <View style={{ paddingVertical: 10, gap: 10 }}>
          {classDetail?.lessonCount === 0 ? (
            <AppText style={styles.emptyText}>Lớp học chưa có nội dung</AppText>
          ) : (
            classDetail?.lessons?.map((lesson) => (
              <LessonDropdown key={lesson.id} lesson={lesson} />
            ))
          )}
        </View>

        <Button
          style={{ marginBottom: 100 }}
          text={
            classDetail?.userStatus === 'WS' ? 'Đang chờ phê duyệt' : 'Vào lớp'
          }
          disabled={classDetail?.userStatus === 'WS'}
          onPress={() => router.push(`/classroom/${class_code}/detail`)}
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
  emptyText: {
    textAlign: 'center',
  },
});
