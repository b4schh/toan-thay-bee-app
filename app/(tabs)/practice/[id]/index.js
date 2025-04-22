import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  LoadingOverlay,
  HeaderWithBackButton,
  ExamInfoCard,
  ExamHistory,
  Dialog,
} from '@components/index';
import colors from '../../../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicExamById, saveExamForUser } from '../../../../features/exam/examSlice';
import { fetchAttemptByStudentId } from '../../../../features/attempt/attemptSlice';

export default function ExamDetailScreen() {
  const { id } = useLocalSearchParams();
  const { examDetail } = useSelector((state) => state.exams);

  const router = useRouter();
  const dispatch = useDispatch();

  const { attempts } = useSelector((state) => state.attempts);

  // Dialog state
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

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

  const handleBookmarkPress = () => {
    dispatch(saveExamForUser({ examId: id }))
      .unwrap()
      .then((response) => {
        // Show success dialog
        const isSaved = response.data.isSave;
        setDialogTitle('Thành công');
        setDialogMessage(isSaved ? 'Lưu đề thi thành công' : 'Bỏ lưu đề thi thành công');
        setDialogVisible(true);
      })
      .catch((error) => {
        // Show error dialog
        setDialogTitle('Lỗi');
        setDialogMessage(error.message || 'Đã xảy ra lỗi khi lưu đề thi');
        setDialogVisible(true);
      });
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

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
          onBookmarkPress={handleBookmarkPress}
        />
        <ExamHistory
          attempts={attempts}
          onViewResult={(attemptId) => router.push(`/exam/${attemptId}/result`)}
        />
      </View>

      {/* Dialog for notifications */}
      <Dialog
        visible={dialogVisible}
        title={dialogTitle}
        message={dialogMessage}
        type="alert"
        onClose={closeDialog}
      />
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
