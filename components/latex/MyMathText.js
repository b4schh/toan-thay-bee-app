import { View } from 'react-native';
import MathJax from 'react-native-mathjax';

export default function MyMathText({ statement }) {
  return (
    // <View style={{ flex: 1, width: '100%' }}>
    <MathJax
      key={statement}
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
      style={
        {
          flex: 1,
          backgroundColor: 'transparent', // Làm nền trong suốt
        }
      }
    />
    // </View>
  );
}
