import { View, Text, ScrollView, StyleSheet } from 'react-native';
import LatexRenderer from '../../../components/latex/LatexRenderer';

const copy = String.raw`Cho hàm số bậc ba $y=f(x)=-x^3+3 x^2+2$.`;
const latex = "c = \\pm\\sqrt{a^2 + b^2}";
const markdownContent = `Cho hình hộp \\( A B C D \\cdot A^{\\prime} B^{\\prime} C^{\\prime} D^{\\prime} \\) (minh họa như hình bên). Phát biểu nào sau đây là đúng?`;

export default function DocsScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      {/* <MathJaxSvg
        fontSize={16}
        color="black"
        fontCache={true}
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          flexShrink: 1,
        }}
      >
        {`<p>When \\(a \\ne 0\\), there are <u>two solutions</u> to \\(ax^2 + bx + c = 0\\) <span style="color:red;">and</span> they are $$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$</p>`}
      </MathJaxSvg> */}
      <LatexRenderer text={copy}/>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  katex: {},
});
