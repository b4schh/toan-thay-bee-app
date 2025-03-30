import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import LatexRenderer from '../../../components/latex/LatexRenderer';
import MarkdownRenderer from '../../../components/latex/MarkdownRenderer';
import KaTeX from 'react-native-katex';

import Markdown from 'react-native-markdown-display';

import MathJax from 'react-native-mathjax';

const markdown = `
# Công thức toán học trong Markdown

Đây là công thức inline: $E=mc^2$

Đây là công thức block:

$$\int_{a}^{b} x^2 dx$$
`;

const mathText = '$O x$'; // \\
const statement = '$$V=\\pi^{2} \\int_{a}^{b} f(x) d x$$.';

const question = `Cho hàm số \( y=f(x) \) liên tục, nhận giá trị dương trên đoạn \( [a ; b] \). Xét hình phẳng \( (H) \) giới hạn bởi đồ thị hàm số \( y=f(x) \), trục hoành và hai đường thẳng \( x=a, x=b \). Khối tròn xoay được tạo thành khi quay hình phẳng \( (H) \) quanh trục \( O x \) có thể tích là:`;

export default function DocsScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={{ padding: 20 }}>
        <MathJax
          html={statement}
          mathJaxOptions={{
            messageStyle: 'none',
            extensions: ['tex2jax.js'],
            jax: ['input/TeX', 'output/HTML-CSS'],
            tex2jax: {
              inlineMath: [['$', '$']],
              displayMath: [['$$', '$$']],
              processEscapes: true,
            },
            TeX: {
              extensions: ['AMSmath.js', 'AMSsymbols.js'],
            },
          }}
          style={{
            // width: 100,
            // backgroundColor: "transparent", // Làm nền trong suốt
            display: 'inline-block', // Chiều rộng vừa với công thức
            // alignSelf: "center", // Căn giữa
          }}
        />
        <MarkdownRenderer markdown={markdown} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  math: {
    marginVertical: 10,
  },
  katex: {
    flex: 1,
  },
});

// CSS nội bộ cho WebView của KaTeX
const inlineStyle = `
html, body {
  margin: 0;
  padding: 0;
  background-color: #fafafa;
  overflow: hidden;
  touch-action: none;
  -ms-touch-action: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-text-size-adjust: none;
  -ms-text-size-adjust: none;
  user-select: none;
  font-size: 16px;
  zoom: 1 !important;
}

.katex {
  font-size: 40px;
  width: 100%;
  height: auto;
  display: block;
  word-wrap: break-word;
  white-space: normal;
  text-align: left;
}
`;
