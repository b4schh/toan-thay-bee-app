import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import colors from '../../../../constants/colors';
import AppText from '../../../../components/AppText';
import Button from '../../../../components/button/Button';
import { useDispatch } from 'react-redux';
import { fetchPublicQuestionsByExamId } from '../../../../features/question/questionSlice';

export default function ExamDetailScreen() {
  const {
    id,
    name,
    createdAt,
    isDone,
    testDuration,
    passRate,
    deadline = null,
  } = useLocalSearchParams();

  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
          <Feather name="arrow-left" size={20} color={colors.ink.darkest} />
        </TouchableOpacity>
        <AppText style={styles.headerText}>{name}</AppText>
      </View>
      <View style={styles.infoCard}>
        <AppText style={styles.nameCard}>{name}</AppText>
        <View style={styles.bodyTextContainer}>
          <View style={styles.rowText}>
            <AppText style={styles.bodyText}>Ngày đăng</AppText>
            <AppText style={styles.bodyText}>{createdAt}</AppText>
          </View>
          <View style={styles.rowText}>
            <AppText style={styles.bodyText}>Hạn chót</AppText>
            <AppText style={styles.bodyText}>Không có</AppText>
          </View>
          <View style={styles.rowText}>
            <AppText style={styles.bodyText}>Trạng thái</AppText>
            <AppText style={styles.bodyText}>
              {isDone ? 'Chưa làm' : 'Đã làm'}
            </AppText>
          </View>
          <View style={styles.rowText}>
            <AppText style={styles.bodyText}>Thời gian làm bài</AppText>
            <AppText style={styles.bodyText}>
              {testDuration ? `${testDuration} phút` : 'Không có'}
            </AppText>
          </View>
          <View style={styles.rowText}>
            <AppText style={styles.bodyText}>Tỉ lệ đạt</AppText>
            <AppText style={styles.bodyText}>
              {passRate ? `${passRate}%` : 'Không có'}
            </AppText>
          </View>
        </View>
        <Button
          text={'Bắt đầu làm bài'}
          onPress={() => {
            router.push({
              pathname: `/exam/${id}/do-exam`,
              params: {
                name: name,
                testDuration: testDuration
              },
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sky.lightest,
    padding: 20,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  headerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
  },
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
