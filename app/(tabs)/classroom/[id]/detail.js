import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataForLearning } from '../../../../features/class/classSlice';
import {
  AppText,
  LessonItem,
  LoadingOverlay,
  HeaderWithBackButton,
  SearchBar,
} from '@components/index';
import colors from '../../../../constants/colors';

const ClassroomDetail = () => {
  const class_code = useLocalSearchParams().id;
  const { dataLearning } = useSelector((state) => state.classes);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchDataForLearning({ class_code }));
  }, [dispatch, class_code]);

  const handleLessonPress = (lessonId) => {
    router.push(`/classroom/${class_code}/${lessonId}`);
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay />

      <HeaderWithBackButton
        title={dataLearning?.name || 'Chi tiết lớp học'}
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainerContent}
      >
        <AppText style={{ fontSize: 18, fontFamily: 'Inter-Medium' }}>
          Danh sách buổi học
        </AppText>

        {dataLearning?.lessons?.map((lesson, index) => (
          <LessonItem
            key={index}
            lesson={lesson}
            onLessonPress={handleLessonPress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ClassroomDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.sky.lightest,
    flex: 1,
    gap: 16,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  scrollContainerContent: {
    gap: 8,
  },
  searchBar: {
    height: 40,
    borderRadius: 8,
    alignSelf: 'stretch',
  },
});
