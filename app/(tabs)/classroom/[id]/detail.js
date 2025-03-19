import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const ClassroomDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  console.log("Chi tiết lớp:", id);
  
  const lessons = [
    { lessonId: "1", title: "Buổi 1: Giới thiệu" },
    { lessonId: "2", title: "Buổi 2: Cấu trúc dự án" },
  ];

  return (
    <View>
      {lessons.map((lesson) => (
        <Pressable key={lesson.lessonId} onPress={() => router.push(`/classroom/${id}/${lesson.lessonId}`)}>
          <Text>{lesson.title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ClassroomDetail;
