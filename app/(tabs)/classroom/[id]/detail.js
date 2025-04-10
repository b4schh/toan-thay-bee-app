import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataForLearning } from '../../../../features/class/classSlice';
import { Feather } from '@expo/vector-icons';
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
  const { classDetail } = useSelector((state) => state.classes);
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
        title={classDetail?.name || 'Chi tiết lớp học'}
        onBackPress={() => router.back()}
      />

      {/* <View style={styles.searchBar}>
        <SearchBar />
      </View> */}

      <AppText style={{ fontSize: 18, fontFamily: 'Inter-Medium' }}>
        Danh sách buổi học
      </AppText>

      <View>
        <ScrollView contentContainerStyle={styles.scrollContainerContent}>
          {classDetail?.lessons?.map((lesson, index) => (
            <LessonItem
              key={index}
              lesson={lesson}
              onLessonPress={handleLessonPress}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ClassroomDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.sky.lightest,
    flex: 1,
    padding: 20,
    gap: 16,
  },
  scrollContainerContent: {
    flexDirection: 'column',
    gap: 8,
  },
  searchBar: {
    height: 40,
    borderRadius: 8,
    alignSelf: 'stretch',
  },
});
