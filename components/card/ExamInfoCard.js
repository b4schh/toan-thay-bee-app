import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import AppText from '../AppText';
import Button from '../button/Button';
import colors from '../../constants/colors';
import { FontAwesome } from '@expo/vector-icons';

export default function ExamInfoCard({
  examDetail,
  onStartExam,
  onBookmarkPress,
}) {
  const [isBookmarked, setIsBookmarked] = useState(examDetail?.isSave || false);

  // Update local state when examDetail changes
  useEffect(() => {
    if (examDetail) {
      setIsBookmarked(examDetail.isSave || false);
    }
  }, [examDetail]);

  const handleBookmarkPress = () => {
    // Toggle local state immediately for instant UI feedback
    setIsBookmarked(!isBookmarked);
    // Call the parent component's handler
    onBookmarkPress();
  };
  return (
    <View style={styles.infoCard}>
      <View style={styles.headerContainer}>
        <AppText style={styles.nameCard}>{examDetail?.name}</AppText>
        {onBookmarkPress && (
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={handleBookmarkPress}
          >
            <FontAwesome
              name={isBookmarked ? 'bookmark' : 'bookmark-o'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.bodyTextContainer}>
        <View style={styles.rowText}>
          <AppText style={styles.bodyText}>Ngày đăng</AppText>
          <AppText style={styles.bodyText}>
            {new Date(examDetail?.createdAt).toLocaleDateString('vi-VN')}
          </AppText>
        </View>
        <View style={styles.rowText}>
          <AppText style={styles.bodyText}>Trạng thái</AppText>
          <AppText style={styles.bodyText}>
            {examDetail?.isDone ? 'Đã làm' : 'Chưa làm'}
          </AppText>
        </View>
        <View style={styles.rowText}>
          <AppText style={styles.bodyText}>Thời gian làm bài</AppText>
          <AppText style={styles.bodyText}>
            {examDetail?.testDuration
              ? `${examDetail?.testDuration} phút`
              : 'Không có'}
          </AppText>
        </View>
        <View style={styles.rowText}>
          <AppText style={styles.bodyText}>Tỉ lệ đạt</AppText>
          <AppText style={styles.bodyText}>
            {examDetail?.passRate ? `${examDetail?.passRate}%` : 'Không có'}
          </AppText>
        </View>

        {examDetail?.isDone && (
          <View style={styles.rowText}>
            <AppText style={styles.bodyText}>Link lời giải</AppText>
            {examDetail?.solutionUrl ? (
              <TouchableOpacity
                onPress={() => Linking.openURL(examDetail?.solutionUrl)}
              >
                <AppText
                  style={[
                    styles.bodyText,
                    { color: 'blue', textDecorationLine: 'underline' },
                  ]}
                >
                  Bấm vào đây để xem
                </AppText>
              </TouchableOpacity>
            ) : (
              <AppText style={styles.bodyText}>Không có</AppText>
            )}
          </View>
        )}
      </View>
      <Button text={'Bắt đầu làm bài'} onPress={onStartExam} />
    </View>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    justifyContent: 'center',
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: colors.sky.white,
    gap: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameCard: {
    flex: 1,
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: colors.ink.darker,
  },
  bookmarkButton: {
    padding: 5,
  },
  bodyTextContainer: {
    gap: 4,
  },
  rowText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyText: {
    color: colors.ink.darker,
    fontFamily: 'Inter-Medium',
  },
});
