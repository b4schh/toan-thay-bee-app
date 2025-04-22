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
  Button
} from '@components/index';
import colors from '../../../constants/colors';
import { Feather } from '@expo/vector-icons';

import { WebView } from 'react-native-webview';
// Import a simple markdown-to-html converter
import marked from 'marked';

const MathMarkdownViewer = ({ content, style }) => {
  const [height, setHeight] = useState(1);

  // Convert markdown to HTML
  const processContent = (content) => {
    try {
      // Replace math delimiters before processing markdown
      // This ensures that math formulas are recognized by MathJax
      let processedContent = content;

      // Replace inline math: \( ... \) with $ ... $
      processedContent = processedContent.replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$');

      // Replace display math: \[ ... \] with $$ ... $$
      processedContent = processedContent.replace(/\\\[([\s\S]*?)\\\]/g, '$$$$1$$');

      // Process the markdown to HTML
      return marked.parse(processedContent);
    } catch (error) {
      console.error('Error processing markdown:', error);
      return content; // Return original content if processing fails
    }
  };

  const wrapHTML = (bodyContent) => {
    // Convert markdown to HTML before wrapping
    const htmlContent = processContent(bodyContent);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            font-size: 16px;
            color: black;
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          }
          p {
            margin: 0.8em 0;
            line-height: 1.5;
          }
          h1, h2, h3, h4, h5, h6 {
            margin-top: 1.2em;
            margin-bottom: 0.6em;
            font-weight: bold;
            color: #333;
          }
          h1 { font-size: 1.8em; }
          h2 { font-size: 1.6em; }
          h3 { font-size: 1.4em; }
          h4 { font-size: 1.2em; }
          h5 { font-size: 1.1em; }
          h6 { font-size: 1em; }
          a { color: #0066cc; text-decoration: underline; }
          img { max-width: 100%; border-radius: 4px; margin: 1em 0; }
          ul, ol { padding-left: 2em; margin: 0.8em 0; }
          li { margin: 0.3em 0; }
          blockquote {
            border-left: 4px solid #ddd;
            padding-left: 1em;
            margin-left: 0;
            color: #666;
          }
          code {
            background-color: #f5f5f5;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: monospace;
          }
          pre {
            background-color: #f5f5f5;
            padding: 1em;
            border-radius: 5px;
            overflow-x: auto;
          }
          pre code {
            background-color: transparent;
            padding: 0;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f5f5f5;
          }
          .MathJax_Display {
            text-align: center !important;
            display: block !important;
            margin: 1em 0 !important;
          }
        </style>

        <script type="text/x-mathjax-config">
          MathJax.Hub.Config({
            messageStyle: 'none',
            extensions: ['tex2jax.js'],
            jax: ['input/TeX', 'output/HTML-CSS'],
            tex2jax: {
              inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
              displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
              processEscapes: true,
            },
            TeX: {
              extensions: ['AMSmath.js', 'AMSsymbols.js']
            }
          });

          MathJax.Hub.Queue(function () {
            var height = document.documentElement.scrollHeight;
            window.ReactNativeWebView.postMessage(String(height));
          });
        </script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js"></script>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;
  };

  return (
    <View style={[{ height }, style]}>
      <WebView
        scrollEnabled={false}
        originWhitelist={['*']}
        source={{ html: wrapHTML(content) }}
        onMessage={(event) => setHeight(Number(event.nativeEvent.data))}
      />
    </View>
  );
};


export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { article } = useSelector((state) => state.articles);
  const { loading } = useSelector((state) => state.states);
  const [error, setError] = useState(null);



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
            <MathMarkdownViewer content={article.content} style={styles.mathViewer} />
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
  mathViewer: {
    width: '100%',
    marginVertical: 8,
  },
  sourceButton: {
    marginTop: 24,
    marginBottom: 40,
  },
});
