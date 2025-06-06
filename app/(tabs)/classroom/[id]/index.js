import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  AppText,
  Button,
  ScrollableCard,
  Slideshow,
  LessonDropdown,
  LoadingOverlay,
} from '@components/index';
import colors from '../../../../constants/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonLearningItemByClassId } from '../../../../features/class/classSlice';

export default function ClassroomIntro() {
  const router = useRouter();
  const dispatch = useDispatch();

  const class_code = useLocalSearchParams().id;

  useEffect(() => {
    if (class_code) {
      dispatch(fetchLessonLearningItemByClassId({ class_code }));
    }
  }, [class_code]);
  const { classDetail } = useSelector((state) => state.classes);

  return (
    <View style={{ flex: 1 }}>
      <LoadingOverlay />

      {/* Nút quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          router.replace('/classroom');
        }}
      >
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      {/* Slideshow */}
      <Slideshow
        images={classDetail?.slide?.slideImages?.map((img) => img.imageUrl)}
      />

      <ScrollableCard contentStyle={styles.contentStyle}>
        <AppText style={styles.title}>{classDetail?.name}</AppText>
        <AppText style={{ fontSize: 18, fontFamily: 'Inter-Medium' }}>
          Mã lớp học: {classDetail?.class_code}
        </AppText>

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
