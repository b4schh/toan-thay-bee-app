import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  AppText,
  LoadingOverlay,
  HeaderWithBackButton,
  LearningItem,
  LearningItemContent,
} from '@components/index';
import colors from '../../../../../constants/colors';

const LessonDetail = () => {
  const [openItems, setOpenItems] = useState([]); // ✅ Phải nằm trên cùng, trước khi dùng
  const { lessonId } = useLocalSearchParams();
  const { classDetail } = useSelector((state) => state.classes);
  const router = useRouter();

  const lesson = classDetail.lessons.find((lesson) => lesson.id == lessonId);

  const toggleItem = (id) => {
    setOpenItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  // const extractYouTubeVideoId = (url) => {
  //   const regex =
  //     /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\?&]+)/;
  //   const match = url.match(regex);
  //   return match ? match[1] : null;
  // };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <LoadingOverlay />
      <HeaderWithBackButton
        title={lesson?.name}
        onBackPress={() => router.back()}
      />

      <AppText style={{ fontSize: 18, fontFamily: 'Inter-Medium' }}>
        Nội dung buổi học
      </AppText>

      <View style={styles.itemsContainer}>
        {lesson.learningItems.map((item) => {
          const isOpen = openItems.includes(item.id);
          return (
            <View key={item.id}>
              <LearningItem item={item} isOpen={isOpen} onToggle={toggleItem} />
              {isOpen && <LearningItemContent item={item} router={router} />}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default LessonDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.sky.lightest,
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  itemsContainer: {
    gap: 12,
    marginBottom: 120,
  },
});
