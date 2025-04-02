import { View, StyleSheet, Linking, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import colors from '../../../../constants/colors';
import AppText from '../../../../components/AppText';
import Button from '../../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicExamById } from '../../../../features/exam/examSlice';
import { useEffect } from 'react';
import { fetchAttemptByStudentId } from '../../../../features/attempt/attemptSlice';

export default function ExamDetailScreen() {
  const { id } = useLocalSearchParams();
  const { exam } = useSelector((state) => state.exams);
  const router = useRouter();
  const dispatch = useDispatch();
  const { attempts } = useSelector((state) => state.attempts);

  useEffect(() => {
    if (!exam) return
    dispatch(fetchAttemptByStudentId({ examId: exam?.id }));
  }, [dispatch, exam]);


  useEffect(() => {
    if (!id) return
    dispatch(fetchPublicExamById({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    console.log('exam', exam);
  }, [exam]);

  return (
    <ScrollView style={styles.container}>
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
        <AppText style={styles.headerText}>{exam?.name}</AppText>
      </View>
      <View style={styles.infoCard}>
        <AppText style={styles.nameCard}>{exam?.name}</AppText>
        <View style={styles.bodyTextContainer}>
          <View style={styles.rowText}>
            <AppText style={styles.bodyText}>Ngày đăng</AppText>
            <AppText style={styles.bodyText}>{new Date(exam?.createdAt).toLocaleDateString('vi-VN')}</AppText>
          </View>
          <View style={styles.rowText}>
            <AppText style={styles.bodyText}>Trạng thái</AppText>
            <AppText style={styles.bodyText}>
              {exam?.isDone ? 'Đã làm' : 'Chưa làm'}
            </AppText>
          </View>
          <View style={styles.rowText}>
            <AppText style={styles.bodyText}>Thời gian làm bài</AppText>
            <AppText style={styles.bodyText}>
              {exam?.testDuration ? `${exam?.testDuration} phút` : 'Không có'}
            </AppText>
          </View>
          <View style={styles.rowText}>
            <AppText style={styles.bodyText}>Tỉ lệ đạt</AppText>
            <AppText style={styles.bodyText}>
              {exam?.passRate ? `${exam?.passRate}%` : 'Không có'}
            </AppText>
          </View>
          {exam?.isDone && (
            <View style={styles.rowText}>
              <AppText style={styles.bodyText}>Link lời giải</AppText>
              {exam?.solutionUrl ? (
                <TouchableOpacity onPress={() => Linking.openURL(exam?.solutionUrl)}>
                  <AppText style={[styles.bodyText, { color: 'blue', textDecorationLine: 'underline' }]}>
                    Bấm vào đây để xem
                  </AppText>
                </TouchableOpacity>
              ) : (
                <AppText style={styles.bodyText}>Không có</AppText>
              )}
            </View>
          )}
        </View>
        <Button
          text={'Bắt đầu làm bài'}
          onPress={() => {
            router.push({
              pathname: `/exam/${id}/do-exam`,
            });
          }}
        />


      </View>
      <AppText style={{ fontSize: 20, fontFamily: 'Inter-Medium' }}>Lịch sử làm bài</AppText>
      <View style={styles.tableContainer}>
        <View style={styles.tableBody}>
          <View style={[styles.row, styles.headerRow]}>
            <AppText style={styles.headerCell}>#</AppText>
            <AppText style={styles.headerCell}>Điểm</AppText>
            <AppText style={styles.headerCell}>Thời gian làm</AppText>
            <AppText style={styles.headerCell}>Thời gian nộp</AppText>
          </View>
          {exam?.isDone ? (<FlatList
            data={attempts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  router.push(`/exam/${item.id}/result`);
                }}
              >
                <View style={styles.row}>
                  <AppText style={styles.cell}>{item.id}</AppText>
                  <AppText style={styles.cell}>{item.score}</AppText>
                  <AppText style={styles.cell}>{item.duration}</AppText>
                  <AppText style={styles.cell}>{new Date(item.endTime).toLocaleString('vi-VN')}</AppText>
                </View>
              </TouchableOpacity>
            )}

          />) : (<AppText>Không có lịch sử làm bài</AppText>)}
        </View>
      </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
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

  // Style cho bảng
  tableContainer: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 12,
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
