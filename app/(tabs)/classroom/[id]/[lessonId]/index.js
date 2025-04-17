import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  const { dataLearning } = useSelector((state) => state.classes);
  const router = useRouter();

  const lesson = dataLearning.lessons.find((lesson) => lesson.id == lessonId);

  const toggleItem = (id) => {
    setOpenItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay />

      <HeaderWithBackButton
        title={lesson?.name}
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainerContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText style={{ fontSize: 18, fontFamily: 'Inter-Medium' }}>
          Nội dung buổi học
        </AppText>

        <View style={styles.itemsContainer}>
          {lesson.learningItems.map((item) => {
            const isOpen = openItems.includes(item.id);
            return (
              <View key={item.id}>
                <LearningItem
                  item={item}
                  isOpen={isOpen}
                  onToggle={toggleItem}
                />
                {isOpen && <LearningItemContent item={item} router={router} />}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default LessonDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    backgroundColor: colors.sky.lightest,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  scrollContainerContent: {
    gap: 8,
  },
  itemsContainer: {
    gap: 12,
    marginBottom: 120,
  },
});
