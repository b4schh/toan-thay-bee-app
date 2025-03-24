// Đức
// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import KaTeX from 'react-native-katex';

// function parseTextAndMath(input) {
//   if (!input) return [];

//   // Tách công thức và văn bản thường
//   const parts = input.split(/(\\\[.*?\\\]|\\\(.*?\\\)|\$\$.*?\$\$|\$.*?\$)/g);

//   return parts
//     .map((part, index) => {
//       if (!part.trim()) return null;

//       // Kiểm tra nếu là công thức toán học
//       const mathMatch = part.match(
//         /^(\$\$|\$|\\\[|\\\()(.+?)(\$\$|\$|\\\]|\\\))$/,
//       );

//       if (mathMatch) {
//         return { type: 'math', content: mathMatch[2].trim(), key: index };
//       } else {
//         return { type: 'text', content: part.trim(), key: index };
//       }
//     })
//     .filter(Boolean); // Lọc bỏ phần tử null
// }

// const LatexRenderer = ({ text, style }) => {
//   const elements = parseTextAndMath(text);
//   //   const [loaded, setLoaded] = useState(false);

//   return (
//     <View style={[styles.container, style]}>
//       {elements.map(({ type, content, key }) =>
//         type === 'math' ? (
//           <KaTeX
//             key={key}
//             expression={content}
//             style={[styles.katex, style]}
//             inlineStyle={inlineStyle}
//             displayMode={false}
//             throwOnError={false}
//             errorColor="#f00"
//             macros={{}}
//             colorIsTextColor={false}
//             // onLoad={() => setLoaded(true)}
//             onError={() => {
//               console.error('Error rendering LaTeX');
//               <Text key={key} style={styles.errorText}>
//                 {content}
//               </Text>;
//             }}
//           />
//         ) : (
//           <Text key={key} style={styles.text}>
//             {content}
//           </Text>
//         ),
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   katex: {
//     flex: 1,
//     minHeight: 30,
//     overflow: 'hidden',
//   },
//   container: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 16,
//     color: '#000',
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//   },
// });

// // CSS nội bộ cho WebView của KaTeX
// const inlineStyle = `
// html, body {
//   margin: 0;
//   padding: 0;
//   background-color: transparent;
//   overflow: hidden;
//   touch-action: none;
//   -ms-touch-action: none;
//   -webkit-user-select: none;
//   -webkit-touch-callout: none;
//   -webkit-text-size-adjust: none;
//   -ms-text-size-adjust: none;
//   user-select: none;
//   font-size: 16px;
//   zoom: 1 !important;
// }

// .katex {
//  font-size: 46px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
// `;

// export default LatexRenderer;

// A
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import KaTeX from 'react-native-katex';
import { Text } from 'react-native';

function wrapTextAndExtractMath(input) {
  if (!input) return '';

  // Regex match tất cả biểu thức LaTeX dạng $...$, $$...$$, \(...\), \[...\]
  const parts = input.split(/(\\\[.*?\\\]|\\\(.*?\\\)|\$\$.*?\$\$|\$.*?\$)/g);

  // Duyệt qua từng phần
  const processed = parts.map((part) => {
    if (!part.trim()) return '';

    // Match biểu thức toán học
    const mathMatch = part.match(
      /^(\$\$|\$|\\\[|\\\()(.+?)(\$\$|\$|\\\]|\\\))$/,
    );

    if (mathMatch) {
      return mathMatch[2].trim(); // Lấy nội dung bên trong dấu $ hoặc \(
    } else {
      // Bọc văn bản thường vào \text{}
      return `\\text{${part.trim()}}`;
    }
  });

  return processed.join(' ');
}

const LatexRenderer = ({ text, style }) => {
  const cleanText = wrapTextAndExtractMath(text);

  const [loaded, setLoaded] = useState(false);

  return (
    <KaTeX
      expression={cleanText}
      style={[styles.katex, style]}
      inlineStyle={inlineStyle}
      displayMode={false}
      throwOnError={false}
      errorColor="#f00"
      macros={{}}
      colorIsTextColor={false}
      onLoad={() => setLoaded(true)}
      onError={() => console.error('Error rendering LaTeX')}
    />
  );
};

// Styles cho KaTeX
const styles = StyleSheet.create({
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
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
`;

export default LatexRenderer;

// B
// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import Markdown from 'react-native-markdown-display';
// import KaTeX from 'react-native-katex';

// // Hàm tách và render công thức toán học
// const renderMath = (text) => {
//   if (typeof text !== 'string') return null;
//   const parts = text.split(/(\$\$.*?\$\$|\$.*?\$)/g); // Tách toán tử `$...$` và `$$...$$`

//   return parts.map((part, index) => {
//     if (!part.trim()) return null;

//     // Kiểm tra nếu là công thức toán học
//     const mathMatch = part.match(/^(\$\$|\$)(.+?)(\$\$|\$)$/);
//     if (mathMatch) {
//       return (
//         <KaTeX
//           key={index}
//           expression={mathMatch[2].trim()} // Lấy nội dung bên trong dấu $
//           displayMode={mathMatch[1] === '$$'}
//           throwOnError={false}
//           errorColor="#f00"
//         />
//       );
//     } else {
//       return part; // Trả về nội dung bình thường
//     }
//   });
// };

// const MarkdownRenderer = ({ content }) => {
//   return (
//     <View style={styles.container}>
//       <Markdown
//         style={styles.markdown}
//         rules={{
//           paragraph: (node, children) => {
//             return <View key={node.key}>{renderMath(children[0])}</View>;
//           },
//         }}
//       >
//         {content}
//       </Markdown>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },
//   markdown: {
//     text: {
//       fontSize: 16,
//       color: '#000',
//     },
//   },
// });

// export default MarkdownRenderer;
