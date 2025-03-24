import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import KaTeX from 'react-native-katex';

const LatexRenderer = ({ text, style }) => {
  // Kiểm tra nếu text rỗng thì trả về null
  if (!text) return null;

  // Chuyển đổi \( ... \) thành $ ... $ và \[ ... \] thành $$ ... $$
  const formattedText = text
    .replace(/\\\(/g, '$') // Thay \( thành $
    .replace(/\\\)/g, '$') // Thay \) thành $
    .replace(/\\\[/g, '$$') // Thay \[ thành $$
    .replace(/\\\]/g, '$$'); // Thay \] thành $$

  // Phân tách chuỗi thành các phần văn bản và LaTeX
  const elements = formattedText.split(/(\$\$.*?\$\$|\$.*?\$)/).map((part, index) => {
    if (part.startsWith('$$') && part.endsWith('$$')) {
      // Hiển thị công thức dạng khối (block)
      return (
        <KaTeX
          key={index}
          expression={part.slice(2, -2)}
          style={styles.blockMath}
          displayMode={true} // Hiển thị dạng khối
          inlineStyle={{ fontSize: 20 }}
        />
      );
    } else if (part.startsWith('$') && part.endsWith('$')) {
      // Hiển thị công thức nội dòng (inline)
      return (
        <KaTeX
          key={index}
          expression={part.slice(1, -1)}
          style={styles.inlineMath}
          displayMode={false} // Hiển thị nội dòng
        />
      );
    } else {
      // Hiển thị văn bản thường
      return <Text key={index} style={styles.text}>{part}</Text>;
    }
  });

  return <View style={[styles.container, style]}>{elements}</View>;
};

// Styles cho component
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  inlineMath: {
    marginHorizontal: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden', // Tắt scroll

  },
  blockMath: {
    // backgroundColor: 'transparent',
    marginVertical: 10,
    width: '100%', // Chiếm toàn bộ chiều ngang
    overflow: 'hidden', // Tắt scroll
  },
});

export default LatexRenderer;