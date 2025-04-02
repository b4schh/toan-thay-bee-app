import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
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
  } = useLocalSearchParams();

  const examHistory = {
    examName: 'Đề thi Toán học',
    history: [
      { attempt: 1, score: 85, duration: '45', submitTime: '08:30' },
      { attempt: 2, score: 90, duration: '40', submitTime: '09:40' },
      { attempt: 3, score: 88, duration: '35', submitTime: '10:35' },
    ],
  };

  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (router.canGoBack()) {
              router.replace('/practice'); // Quay lại nếu có lịch sử
            } else {
              router.replace('/practice'); // Nếu không có lịch sử, quay về danh sách lớp học
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
              {isDone ? 'Đã làm' : 'Chưa làm'}
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
              },
            });
          }}
        />
      </View>

      <AppText style={{fontSize: 20, fontFamily: 'Inter-Medium'}}>Lịch sử làm bài</AppText>
      <View style={styles.tableContainer}>
        <View style={styles.tableBody}>
          <View style={[styles.row, styles.headerRow]}>
            <AppText style={styles.headerCell}>Lần</AppText>
            <AppText style={styles.headerCell}>Điểm</AppText>
            <AppText style={styles.headerCell}>Thời gian làm</AppText>
            <AppText style={styles.headerCell}>Thời gian nộp</AppText>
          </View>
          {isDone ? (<FlatList
            data={examHistory.history}
            keyExtractor={(item) => item.attempt.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <AppText style={styles.cell}>{item.attempt}</AppText>
                <AppText style={styles.cell}>{item.score}</AppText>
                <AppText style={styles.cell}>{item.duration}</AppText>
                <AppText style={styles.cell}>{item.submitTime}</AppText>
              </View>
            )}
          />) : (<AppText>Không có lịch sử làm bài</AppText>)}
        </View>
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
  tableContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12
  },
  tableBody: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  headerRow: {
    backgroundColor: "#f2f2f2",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});
