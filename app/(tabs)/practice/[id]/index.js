import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  LoadingOverlay,
  HeaderWithBackButton,
  ExamInfoCard,
  ExamHistory,
} from '@components/index';
import colors from '../../../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicExamById } from '../../../../features/exam/examSlice';
import { fetchAttemptByStudentId } from '../../../../features/attempt/attemptSlice';

export default function ExamDetailScreen() {
  const { id } = useLocalSearchParams();
  const { examDetail } = useSelector((state) => state.exams);

  const router = useRouter();
  const dispatch = useDispatch();

  const { attempts } = useSelector((state) => state.attempts);

  useEffect(() => {
    console.log('examDetail', examDetail);
  }, [examDetail]);

  useEffect(() => {
    dispatch(fetchAttemptByStudentId({ examId: id }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchPublicExamById({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    console.log('examDetail', examDetail);
  }, [examDetail]);

  return (
    <View style={styles.container}>
      <LoadingOverlay />
      <HeaderWithBackButton
        title={examDetail?.name}
        onBackPress={() => router.replace('/practice')}
      />
      <View style={styles.content}>
        <ExamInfoCard
          examDetail={examDetail}
          onStartExam={() => router.push(`/exam/${id}/do-exam`)}
        />
        <ExamHistory
          attempts={attempts}
          onViewResult={(attemptId) => router.push(`/exam/${attemptId}/result`)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.sky.lightest,
    padding: 20,
    gap: 10,
  },
});
