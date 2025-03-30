import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import KaTeX from 'react-native-katex';
import { Text } from 'react-native';

function wrapTextAndExtractMath(input) {
  if (!input) return '';

  // Regex match tất cả biểu thức LaTeX dạng $...$, $$...$$, \(...\), \[...\]
  const parts = input.split(/(\\\[.*?\\\]|\\\(.*?\\\)|\$\$.*?\$\$|\$.*?\$)/g);

  console.log('Parts:', parts);

  // Duyệt qua từng phần
  const processed = parts.map((part) => {
    if (!part.trim()) return '';

    // Match biểu thức toán học
    const mathMatch = part.match(
      /^(\$\$|\$|\\\[|\\\()(.+?)(\$\$|\$|\\\]|\\\))$/,
    );
    console.log('Math Match:', mathMatch);

    if (mathMatch) {
      console.log('Math Match trim:', mathMatch);

      return mathMatch[2].trim(); // Lấy nội dung bên trong dấu $ hoặc \(
    } else {
      console.log('Text', mathMatch);
      // Bọc văn bản thường vào \text{}
      return `\\text{${part.trim()} }`;
    }
  });

  return processed.join(' ');
}

const LatexRenderer = ({ text, style }) => {
  const cleanText = wrapTextAndExtractMath(text);

  console.log("Clean Text:", cleanText);
  
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
  font-size: 40px;
  width: 100%;
  height: auto;
  display: block;
  word-wrap: break-word;
  white-space: normal;
  text-align: left;
}
`;

export default LatexRenderer;
