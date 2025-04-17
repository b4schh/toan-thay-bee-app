import { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import {
  ArticleCard,
  AppText,
  EmptyView,
  Pagination,
  LoadingOverlay,
  SearchBar,
  Button,
} from '@components/index';
import { fetchAllArticle } from '../../../features/article/articleSlice';
import colors from '../../../constants/colors';

export default function DocsScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Get data from Redux store
  const { articles } = useSelector((state) => state.articles);
  const { loading } = useSelector((state) => state.states);
  const { search, currentPage, limit, totalPages } = useSelector(
    (state) => state.filter.screens.article,
  );

  // Local state
  const [searchQuery, setSearchQuery] = useState(search || '');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch articles
  const fetchArticles = useCallback(async () => {
    try {
      setError(null);
      await dispatch(
        fetchAllArticle({
          search: searchQuery,
          currentPage,
          limit,
        }),
      );
    } catch (err) {
      setError('Không thể tải bài viết. Vui lòng thử lại sau.');
      console.error('Error fetching articles:', err);
    }
  }, [dispatch, searchQuery, currentPage, limit]);

  // Fetch articles on component mount and when pagination changes
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchArticles();
    setIsRefreshing(false);
  }, [fetchArticles]);

  // Handle search
  const handleSearch = useCallback(() => {
    dispatch(
      fetchAllArticle({
        search: searchQuery,
        currentPage: 1, // Reset to first page when searching
        limit,
      }),
    );
  }, [dispatch, searchQuery, limit]);

  // Handle page change
  const handlePageChange = useCallback(
    (page) => {
      dispatch(
        fetchAllArticle({
          search: searchQuery,
          currentPage: page,
          limit,
        }),
      );
    },
    [dispatch, searchQuery, limit],
  );

  // Render article item
  const renderArticleItem = useCallback(
    ({ item }) => {
      return (
        <ArticleCard
          article={item}
          onPress={(article) => router.push(`/article/${article.id}`)}
        />
      );
    },
    [router],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <LoadingOverlay />

        {/* Header */}
        <AppText style={styles.header}>Bài viết</AppText>

        {/* Search Bar */}

        <View style={styles.row}>
          <SearchBar
            // value={searchQuery}
            // onChangeText={setSearchQuery}
            // onSubmitEditing={handleSearch}
            placeholder="Tìm kiếm bài viết..."
            screen="article"
          />

          {/* Nút filter */}
          <Button
            iconComponent={
              <Image
                source={require('../../../assets/icons/filter-icon-primary.png')}
                style={{ width: 24, height: 24 }}
              />
            }
            style={styles.button}
            onPress={() => console.log('Filter Clicked!')}
          />
        </View>
        {/* Articles List */}
        <FlatList
          data={articles}
          numColumns={2}
          renderItem={renderArticleItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.articleList}
          columnWrapperStyle={styles.articleRow}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            <EmptyView
              onRefresh={handleRefresh}
              isLoading={loading}
              error={error}
              message="Không có bài viết nào"
            />
          }
          ListFooterComponent={
            articles.length > 0 && (
              <View style={styles.paginationContainer}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </View>
            )
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sky.lightest,
    padding: 20,
    gap: 10,
    paddingBottom: 80,
  },
  header: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: colors.ink.darkest,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    width: 48,
    borderRadius: 18,
  },
  articleList: {
    gap: 0,
  },
  articleRow: {
    justifyContent: 'space-between',
    // marginBottom: 10,
    gap: 10,
  },
  paginationContainer: {
    marginTop: 16,
  },
});
