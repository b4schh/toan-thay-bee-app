import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  ExamCard,
  SearchBar,
  AppText,
  Button,
  Dialog,
  Dropdown,
  LoadingOverlay,
  Pagination,
} from '@components/index';
import colors from '../../../constants/colors';
import { fetchPublicExams } from '../../../features/exam/examSlice';
import { fetchCodesByType } from '../../../features/code/codeSlice';

// Thêm component EmptyView
const EmptyView = ({ onRefresh, isLoading, error, message }) => (
  <View style={styles.emptyContainer}>
    <AppText style={styles.emptyText}>
      {isLoading
        ? 'Đang tải...'
        : error
          ? 'Tải dữ liệu không thành công'
          : message}
    </AppText>
    {!isLoading &&
      (error ? (
        <Button
          text="Tải lại"
          onPress={onRefresh}
          style={styles.refreshButton}
        />
      ) : null)}
  </View>
);

export default function PracticeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { loading } = useSelector((state) => state.states);
  const { exams } = useSelector((state) => state.exams);
  const { screens } = useSelector((state) => state.filter);
  const examScreen = screens.exam;
  const { search, currentPage, limit, totalItems, sortOrder } = examScreen;

  const { codes } = useSelector((state) => state.codes);

  useEffect(() => {
    // dispatch(fetchCodesByType(['exam type', 'grade', 'chapter']));

    if (!codes || !codes['exam type'] || !codes['grade'] || !codes['chapter']) {
      dispatch(fetchCodesByType(['exam type', 'grade', 'chapter']));
    }
  }, [dispatch, codes]);

  // console.log('Code practice:', codes);
  // console.log('Type of exam code:', typeOfExamCodes);
  // console.log('Grade code:', gradeCodes);
  // console.log('Chapter code:', chapterCodes);

  // Thêm state và options cho filters
  const [filterDialogVisible, setFilterDialogVisible] = useState(false);
  const [gradeFilters, setGradeFilters] = useState(null);
  const [chapterFilters, setChapterFilters] = useState([]);
  const [typeOfExamFilters, setTypeOfExamFilters] = useState([]);

  // Thêm hàm xử lý áp dụng filter
  const handleApplyFilters = () => {
    dispatch(
      fetchPublicExams({
        search,
        currentPage: 1, // Reset về trang 1 khi tìm kiếm
        limit,
        sortOrder,
        grade: gradeFilters,
        typeOfExam: typeOfExamFilters,
        chapter: chapterFilters,
      }),
    );
    console.log(`
Grade: ${JSON.stringify(gradeFilters)}
Type of Exam: ${JSON.stringify(typeOfExamFilters)}
Chapter: ${JSON.stringify(chapterFilters)}`);

    setFilterDialogVisible(false);
  };

  // Thêm hàm refresh data
  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      dispatch(
        fetchPublicExams({
          search,
          currentPage: 1,
          limit,
          sortOrder,
        }),
      );
    } catch (err) {
      setError('Không thể tải dữ liệu');
    } finally {
      setIsLoading(false);
    }
  }, [search, currentPage, limit]);

  // Thêm useEffect để fetch data lần đầu
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        dispatch(
          fetchPublicExams({
            search,
            currentPage: 1,
            limit,
            sortOrder,
          }),
        );
      } catch (err) {
        setError('Không thể tải dữ liệu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);

  const renderExamItem = useCallback(
    ({ item }) => (
      <ExamCard
        name={item.name}
        imageUrl={item.imageUrl}
        onPress={() =>
          router.push({
            pathname: `/practice/${item.id}`,
            params: {
              name: item.name,
              createdAt: item.createdAt,
              isDone: item.isDone,
              testDuration: item.testDuration,
              passRate: item.passRate,
            },
          })
        }
      />
    ),
    [],
  );

  // Thêm hàm xử lý thay đổi trang
  const handlePageChange = useCallback(
    (newPage) => {
      dispatch(
        fetchPublicExams({
          search,
          currentPage: newPage,
          limit,
          sortOrder,
        }),
      );
    },
    [search, limit, sortOrder],
  );

  if (!codes || !codes['grade'] || !codes['exam type'] || !codes['chapter']) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <AppText style={styles.header}>Luyện đề</AppText>
      <View style={styles.row}>
        <SearchBar placeholder="Tìm kiếm đề thi..." screen="exam" />

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
              setTypeOfExamFilters([]);
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
            label="Lớp"
            options={codes['grade']}
            value={gradeFilters}
            onChange={(code) => setGradeFilters(code)}
            placeholder="Chọn lớp"
            multiSelect={false}
          />
          <Dropdown
            label="Loại đề thi"
            options={codes['exam type']}
            value={typeOfExamFilters}
            onChange={(code) => setTypeOfExamFilters(code)}
            placeholder="Chọn loại đề thi"
            multiSelect={true}
          />
          <Dropdown
            label="Chương"
            options={codes['chapter']}
            value={chapterFilters}
            onChange={(code) => setChapterFilters(code)}
            placeholder="Chọn chương"
            multiSelect={true}
          />
        </View>
      </Dialog>

      {/* Danh sách lớp học dạng lưới */}
      <FlatList
        data={exams}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.classList}
        columnWrapperStyle={styles.classRow}
        ListEmptyComponent={
          <EmptyView
            onRefresh={handleRefresh}
            isLoading={isLoading}
            error={error}
            message="Không có đề thi"
          />
        }
        ListFooterComponent={
          exams.length > 0 && (
            <View style={styles.paginationContainer}>
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalItems / limit)}
                onPageChange={handlePageChange}
              />
            </View>
          )
        }
        renderItem={renderExamItem}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        onRefresh={handleRefresh}
      />

      {/* Overlay loading mờ (hiển thị nếu loading=true) */}
      {loading && <LoadingOverlay />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sky.lightest,
    padding: 20,
    gap: 10,
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
  classList: {
    gap: 0,
  },
  classRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
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
