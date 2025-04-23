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
import {
  ArticleCard,
  AppText,
  EmptyView,
  Pagination,
  LoadingOverlay,
  SearchBar,
  Button,
  Dialog,
  Dropdown,
} from '@components/index';
import colors from '../../../constants/colors';
import { fetchAllArticle } from '../../../features/article/articleSlice';
import { fetchCodesByType } from '../../../features/code/codeSlice';

export default function DocsScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Lấy từ Redux
  const { loading } = useSelector((state) => state.states);
  const { articles } = useSelector((state) => state.articles);
  const { screens } = useSelector((state) => state.filter);
  const articleScreen = screens.article;
  const { search, currentPage, limit, totalPages, sortOrder } = articleScreen;

  // State
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Thêm state và options cho filters
  const [filterDialogVisible, setFilterDialogVisible] = useState(false);
  const [articleTypeFilters, setArticleTypeFilters] = useState([]); // Mảng rỗng
  const [gradeFilters, setGradeFilters] = useState(null); // Giá trị đơn lẻ
  const [chapterFilters, setChapterFilters] = useState([]); // Mảng rỗng

  const { codes } = useSelector((state) => state.codes);

  useEffect(() => {
    // dispatch(fetchCodesByType(['article type', 'grade', 'chapter']));

    if (
      !codes ||
      !codes['article type'] ||
      !codes['grade'] ||
      !codes['chapter']
    ) {
      dispatch(fetchCodesByType(['article type', 'grade', 'chapter']));
    }
  }, [dispatch, codes]);

  //   console.log(`
  // Article Type: ${articleTypeFilters}
  // Grade: ${gradeFilters}
  // Chapter: ${chapterFilters}`);

  // console.log("Article type code:", codes['article type']);
  // console.log("Grade code:", codes['grade']);
  // console.log('Chapter code:', codes['chapter']);

  // console.log(
  //   'Chapter filtered:',
  //   chapterCodes.filter((chapter) => chapter.code.startsWith(gradeFilters)),
  // );

  // Thêm hàm xử lý áp dụng filter
  const handleApplyFilters = () => {
    dispatch(
      fetchAllArticle({
        search,
        currentPage: 1, // Reset về trang 1 khi tìm kiếm
        limit,
        sortOrder,
        articleType: articleTypeFilters,
        grade: gradeFilters,
        chapter: chapterFilters,
      }),
    );
    console.log(`
Article Type: ${JSON.stringify(articleTypeFilters)}
Grade: ${JSON.stringify(gradeFilters)}
Chapter: ${JSON.stringify(chapterFilters)}`);

    setFilterDialogVisible(false);
  };

  // Function to fetch articles
  const fetchArticles = useCallback(async () => {
    try {
      setError(null);
      dispatch(
        fetchAllArticle({
          search,
          currentPage: 1, // Reset về trang 1 khi tìm kiếm
          limit,
          sortOrder,
          articleType: articleTypeFilters,
        grade: gradeFilters,
        chapter: chapterFilters,
        }),
      );
    } catch (err) {
      setError('Không thể tải bài viết. Vui lòng thử lại sau.');
      console.error('Error fetching articles:', err);
    }
  }, [dispatch, search, currentPage, limit, articleTypeFilters, gradeFilters, chapterFilters]);

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);
      setError(null);
      try {
        dispatch(
          fetchAllArticle({
            search,
            currentPage: 1,
            limit,
            sortOrder,
          }),
        );
      } catch (err) {
        setError('Không thể tải dữ liệu');
      } finally {
        // setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchArticles();
    setIsRefreshing(false);
  }, [fetchArticles]);

  // Handle page change
  const handlePageChange = useCallback(
    (page) => {
      dispatch(
        fetchAllArticle({
          search,
          currentPage: page,
          limit,
        }),
      );
    },
    [dispatch, search, limit],
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

  if (
    !codes ||
    !codes['grade'] ||
    !codes['article type'] ||
    !codes['chapter']
  ) {
    return <LoadingOverlay />;
  }

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
          <SearchBar placeholder="Tìm kiếm bài viết..." screen="article" />

          {/* Nút filter */}
          <Button
            iconComponent={
              <Image
                source={require('../../../assets/icons/filter-icon-primary.png')}
                style={{ width: 24, height: 24 }}
              />
            }
            style={styles.button}
            onPress={() => setFilterDialogVisible(true)}
          />
        </View>
        {/* Articles List */}

        <Dialog
          visible={filterDialogVisible}
          title="Bộ lọc"
          onClose={() => setFilterDialogVisible(false)}
          actions={[
            {
              text: 'Đặt lại',
              onPress: () => {
                setGradeFilters(null);
                setChapterFilters([]);
                setArticleTypeFilters([]);
              },
              style: styles.resetButton,
              textStyle: styles.resetButtonText,
            },
            {
              text: 'Áp dụng',
              onPress: handleApplyFilters,
              style: styles.applyButton,
            },
          ]}
        >
          <View style={styles.filterContent}>
            <Dropdown
              label="Danh mục"
              options={codes['article type']}
              value={articleTypeFilters || []}
              onChange={(codes) => setArticleTypeFilters(codes)}
              placeholder="Chọn danh mục"
              multiSelect={true} // Cho phép chọn nhiều
            />
            <Dropdown
              label="Lớp"
              options={codes['grade']}
              value={gradeFilters}
              onChange={(code) => setGradeFilters(code)}
              placeholder="Chọn lớp"
              multiSelect={false} // Chỉ chọn một
            />
            <Dropdown
              label="Chương"
              options={
                gradeFilters && codes['chapter']
                  ? codes['chapter'].filter((chapter) =>
                      chapter.code.startsWith(gradeFilters),
                    )
                  : [] // Không hiển thị chương nếu chưa chọn lớp
              }
              value={chapterFilters || []}
              onChange={(codes) => setChapterFilters(codes)}
              placeholder={gradeFilters ? 'Chọn chương' : 'Vui lòng chọn lớp!'}
              multiSelect={true} // Cho phép chọn nhiều
              disabled={!gradeFilters || !codes?.chapter} // Vô hiệu hóa nếu chưa chọn lớp
            />
          </View>
        </Dialog>

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
              loadingMessage="Đang tải bài viết..."
              emptyMessage="Không có bài viết nào"
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
  },
  paginationContainer: {
    marginTop: 16,
  },
  filterContent: {
    width: '100%',
    gap: 10,
  },
  resetButton: {
    backgroundColor: colors.sky.white,
    borderWidth: 1,
    borderColor: colors.primary.default,
    flex: 1,
  },
  resetButtonText: {
    color: colors.primary,
  },
  applyButton: {
    flex: 1,
  },
});
