import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticleById } from '../../../features/article/articleSlice';
import {
  AppText,
  HeaderWithBackButton,
  LoadingOverlay,
  Button,
  MathMarkdownViewer,
} from '@components/index';
import colors from '../../../constants/colors';
import { Feather } from '@expo/vector-icons';

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
            <MathMarkdownViewer
              content={article.content}
              style={styles.mathViewer}
            />
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
