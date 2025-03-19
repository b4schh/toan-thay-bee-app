import { View, ScrollView, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function ScrollableCard({ children, style }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.scrollContainer, style]}
      contentContainerStyle={styles.contentContainer}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 20,
    backgroundColor: colors.sky.lightest,
  },
  contentContainer: {
    flexGrow: 1, // Đảm bảo nội dung cuộn được
  },
});
