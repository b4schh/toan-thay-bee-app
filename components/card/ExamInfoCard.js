import React from 'react';
import { View, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import AppText from '../AppText';
import Button from '../button/Button';
import colors from '../../constants/colors';

export default function ExamInfoCard({ examDetail, onStartExam }) {
  return (
    <View style={styles.infoCard}>
      <AppText style={styles.nameCard}>{examDetail?.name}</AppText>
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
            {examDetail?.testDuration ? `${examDetail?.testDuration} phút` : 'Không có'}
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
              <TouchableOpacity onPress={() => Linking.openURL(examDetail?.solutionUrl)}>
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
  nameCard: {
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: colors.ink.darker,
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