import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';
import LatexRenderer from '../../../utils/LatexRenderer';

const markdownContent = `
Câu 13. Cho hàm số bậc ba $y=f(x)=-x^3+3 x^2+2$.
a) Tập xác định của hàm số là $\mathscr{D}=\mathbb{R}$.
b) Đạo hàm của hàm số là $y^{\prime}=-3 x^2+6 x$.
c) Hàm số đồng biến trên khoảng $(-\infty ; 0)$ và $(2 ;+\infty)$.
d) Tâm đối xứng của đồ thị hàm số $y=f(x)$ là $I(1 ; 4)$.
`;

export default function DocsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LatexRenderer text={markdownContent} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  content: {
    padding: 20,
  },
  katex: {
    marginVertical: 10,
  },
});