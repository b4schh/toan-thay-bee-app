import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Feather } from '@expo/vector-icons';

const LessonDetail = () => {
  const { id, lessonId } = useLocalSearchParams();
  const [openSection, setOpenSection] = useState(null);

  const router = useRouter();

  const sections = [
    { key: "theory", title: "Lý thuyết", content: "Nội dung lý thuyết..." },
    { key: "videos", title: "Bài giảng", content: "Video bài giảng..." },
    { key: "exercises", title: "Bài tập", content: "Danh sách bài tập..." },
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

      <Text>Buổi học {lessonId} của {id}</Text>
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