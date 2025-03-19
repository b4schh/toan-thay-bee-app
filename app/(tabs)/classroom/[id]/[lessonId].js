import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

const LessonDetail = () => {
  const { id, lessonId } = useLocalSearchParams();
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    { key: "theory", title: "Lý thuyết", content: "Nội dung lý thuyết..." },
    { key: "materials", title: "Tài liệu", content: "Danh sách tài liệu..." },
    { key: "exercises", title: "Bài tập", content: "Danh sách bài tập..." },
  ];

  return (
    <View>
      <Text>Buổi học {lessonId} của lớp {id}</Text>
      {sections.map((section) => (
        <View key={section.key}>
          <Pressable onPress={() => setOpenSection(openSection === section.key ? null : section.key)}>
            <Text>{section.title}</Text>
          </Pressable>
          {openSection === section.key && <Text>{section.content}</Text>}
        </View>
      ))}
    </View>
  );
};

export default LessonDetail;
