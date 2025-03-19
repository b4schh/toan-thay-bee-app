import { View, ScrollView, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function ScrollableCard({ children, cardStyle, contentStyle }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.scrollContainer, cardStyle]}
      contentContainerStyle={[styles.contentContainer, contentStyle]}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 24,
    paddingHorizontal: 20,
    backgroundColor: colors.sky.lightest,
  },
  contentContainer: {
    flexGrow: 1, // Đảm bảo nội dung cuộn được
  },
});
