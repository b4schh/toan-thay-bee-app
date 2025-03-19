import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const ClassroomDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  console.log('Chi tiết lớp:', id);

  const lessons = [
    { lessonId: '1', title: 'Buổi 1: Đạo hàm' },
    { lessonId: '2', title: 'Buổi 2: Nguyên hàm' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          router.back();
        }}
      >
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      {lessons.map((lesson) => (
        <Pressable
          key={lesson.lessonId}
          onPress={() => router.push(`/classroom/${id}/${lesson.lessonId}`)}
        >
          <Text>{lesson.title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ClassroomDetail;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 100
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
});
