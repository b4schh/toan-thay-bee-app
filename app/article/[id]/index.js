import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  Text,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleById } from '../../../features/article/articleSlice';
import {
  AppText,
  HeaderWithBackButton,
  LoadingOverlay,
  Button,
  MyMathText
} from '@components/index';
import colors from '../../../constants/colors';
import { Feather } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import MathJax from 'react-native-mathjax';

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { article } = useSelector((state) => state.articles);
  const { loading } = useSelector((state) => state.states);
  const [error, setError] = useState(null);
  const [processedContent, setProcessedContent] = useState([]);

  // Hàm xử lý nội dung bài viết, tách công thức toán học và Markdown
  const processArticleContent = useCallback((content) => {
    if (!content) return [];

    // Regex để tìm công thức toán học trong $$ $$ hoặc $ $
    const mathRegex = /\$\$(.*?)\$\$|\$(.*?)\$/gs;

    let lastIndex = 0;
    const parts = [];
    let match;

    // Tìm tất cả các công thức toán học trong nội dung
    while ((match = mathRegex.exec(content)) !== null) {
      // Thêm phần Markdown trước công thức toán học
      if (match.index > lastIndex) {
        parts.push({
          type: 'markdown',
          content: content.substring(lastIndex, match.index),
        });
      }

      // Thêm công thức toán học
      const formula = match[0];
      parts.push({
        type: 'math',
        content: formula,
      });

      lastIndex = match.index + formula.length;
    }

    // Thêm phần Markdown còn lại sau công thức toán học cuối cùng
    if (lastIndex < content.length) {
      parts.push({
        type: 'markdown',
        content: content.substring(lastIndex),
      });
    }

    return parts;
  }, []);

  // Xử lý nội dung bài viết khi article thay đổi
  useEffect(() => {
    if (article && article.content) {
      const parts = processArticleContent(article.content);
      setProcessedContent(parts);
    }
  }, [article, processArticleContent]);

  const fetchArticleDetail = useCallback(async () => {
    try {
      setError(null);
      const result = await dispatch(fetchArticleById({ id }));
      if (!result.payload || !result.payload.data) {
        setError('Không tìm thấy bài viết hoặc có lỗi xảy ra.');
      }
    } catch (err) {
      setError('Không thể tải bài viết. Vui lòng thử lại sau.');
      console.error('Error fetching article:', err);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      fetchArticleDetail();
    }
  }, [id, fetchArticleDetail]);

  // Format date to display
  const formatDate = (dateString) => {
    if (!dateString) return 'Không có ngày';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingOverlay />
        <AppText>Đang tải bài viết...</AppText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <HeaderWithBackButton title="Lỗi" onBackPress={() => router.back()} />
        <AppText style={styles.errorText}>{error}</AppText>
        <Button text="Thử lại" onPress={fetchArticleDetail} />
      </View>
    );
  }

  if (!article) {
    return (
      <View style={styles.errorContainer}>
        <HeaderWithBackButton
          title="Không tìm thấy"
          onBackPress={() => router.back()}
        />
        <AppText style={styles.errorText}>Không tìm thấy bài viết</AppText>
        <Button text="Quay lại" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LoadingOverlay />
      <HeaderWithBackButton
        title={article.title}
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {article.imageUrl && (
          <Image source={{ uri: article.imageUrl }} style={styles.image} />
        )}

        <View style={styles.content}>
          <AppText style={styles.title}>{article.title}</AppText>

          <View style={styles.metaInfo}>
            {article.author && (
              <View style={styles.metaItem}>
                <Feather name="user" size={16} color={colors.ink.light} />
                <AppText style={styles.metaText}>{article.author}</AppText>
              </View>
            )}

            <View style={styles.metaItem}>
              <Feather name="calendar" size={16} color={colors.ink.light} />
              <AppText style={styles.metaText}>
                {formatDate(article.createdAt)}
              </AppText>
            </View>
          </View>

          {article.description && (
            <AppText style={styles.description}>{article.description}</AppText>
          )}

          {article.content && (
            <View style={styles.markdownContainer}>
              {processedContent.map((part, index) => {
                if (part.type === 'markdown') {
                  return (
                    <Markdown
                      key={`markdown-${index}`}
                      style={markdownStyles}
                      mergeStyle={true}
                      rules={{
                        image: (node, _children, _parent, styles) => {
                          return (
                            <Image
                              key={node.key}
                              style={styles.image}
                              source={{ uri: node.attributes.src }}
                              resizeMode="contain"
                            />
                          );
                        },
                      }}
                      onLinkPress={(url) => {
                        Linking.openURL(url);
                        return false;
                      }}
                    >
                      {part.content}
                    </Markdown>
                  );
                } else if (part.type === 'math') {
                  return (
                    <View key={`math-${index}`} style={styles.mathContainer}>
                      <MathJax
                        html={part.content}
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
                        style={styles.mathJaxContent}
                      />
                    </View>
                  );
                }
                return null;
              })}
            </View>

            // <MyMathText statement={article.content}/>
          )}

          {article.sourceUrl && (
            <Button
              text="Xem nguồn bài viết"
              icon="external-link"
              iconLibrary="Feather"
              onPress={() => Linking.openURL(article.sourceUrl)}
              style={styles.sourceButton}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

// Styles cho Markdown
const markdownStyles = {
  body: {
    color: colors.ink.darker,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  heading1: {
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
    color: colors.ink.darkest,
  },
  heading2: {
    fontSize: 22,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
    color: colors.ink.darkest,
  },
  heading3: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
    color: colors.ink.darkest,
  },
  heading4: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
    color: colors.ink.darkest,
  },
  heading5: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
    fontFamily: 'Inter-Bold',
    color: colors.ink.darkest,
  },
  heading6: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 6,
    fontFamily: 'Inter-Bold',
    color: colors.ink.darkest,
  },
  paragraph: {
    marginVertical: 8,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    color: colors.ink.darker,
  },
  link: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  blockquote: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    paddingLeft: 16,
    marginLeft: 0,
    marginVertical: 12,
    fontStyle: 'italic',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 12,
    borderRadius: 8,
  },
  list_item: {
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet_list: {
    marginVertical: 8,
  },
  ordered_list: {
    marginVertical: 8,
  },
  code_inline: {
    backgroundColor: colors.sky.lighter,
    color: colors.primary,
    fontFamily: 'monospace',
    borderRadius: 4,
    paddingHorizontal: 4,
  },
  code_block: {
    backgroundColor: colors.sky.lighter,
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    fontFamily: 'monospace',
  },
  hr: {
    backgroundColor: colors.sky.dark,
    height: 1,
    marginVertical: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: colors.sky.dark,
    borderRadius: 8,
    marginVertical: 12,
  },
  thead: {
    backgroundColor: colors.sky.lighter,
  },
  th: {
    padding: 8,
    fontFamily: 'Inter-Bold',
  },
  td: {
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: colors.sky.dark,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sky.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.sky.lightest,
  },
  errorContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.sky.lightest,
    gap: 16,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.warning,
    textAlign: 'center',
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: colors.ink.darkest,
  },
  metaInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: colors.ink.light,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: colors.ink.darker,
    lineHeight: 24,
    marginTop: 8,
  },
  markdownContainer: {
    // marginTop: 16,
  },
  mathContainer: {
    marginVertical: 8,
    width: '100%',
  },
  sourceButton: {
    marginTop: 24,
    marginBottom: 40,
  },
});
