import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import ExamCard from '../../../components/card/ExamCard';
import SearchBar from '../../../components/SearchBar';
import AppText from '../../../components/AppText';
import Button from '../../../components/button/Button';
import Dialog from '../../../components/dialog/Dialog';
import Dropdown from '../../../components/dropdown/Dropdown';
import LoadingOverlay from '../../../components/overlay/LoadingOverlay';
import Pagination from '../../../components/Pagination';
import colors from '../../../constants/colors';
import { fetchPublicExams } from '../../../features/exam/examSlice';
import { fetchCodesByType } from '../../../features/code/codeSlice';

// const useFilteredExam = (exams, grade) => {
//   return useMemo(() => {
//     if (grade === 'all') return exams;
//     return exams.filter((exam) => exam.class === grade.replace('grade_', ''));
//   }, [exams, grade]);
// };

// Thêm hàm debounce ở đầu file
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Thêm component EmptyView
const EmptyView = ({ onRefresh, isLoading, message }) => (
  <View style={styles.emptyContainer}>
    <AppText style={styles.emptyText}>
      {isLoading ? 'Đang tải...' : message}
    </AppText>
    {!isLoading && (
      <Button
        text="Tải lại"
        onPress={onRefresh}
        style={styles.refreshButton}
        loading={isLoading}
      />
    )}
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

  // const { code } = useSelector((state) => state.code);

  useEffect;
  console.log(`Search Exam: ${search}
    Current Page: ${currentPage}
    Limit: ${limit}
    Total Items: ${totalItems}
    Sort Order: ${sortOrder}`);

  // Thêm state và options cho filters
  const [filterDialogVisible, setFilterDialogVisible] = useState(false);
  const [filters, setFilters] = useState([]);

  const classOptions = [
    { code: '10', description: 'Lớp 10' },
    { code: '11', description: 'Lớp 11' },
    { code: '12', description: 'Lớp 12' },
  ];

  const typeOptions = [
    { code: 'midterm', description: 'Giữa kỳ' },
    { code: 'final', description: 'Cuối kỳ' },
    { code: 'practice', description: 'Luyện tập' },
  ];

  const chapterOptions = [
    { code: '1', description: 'Chương 1' },
    { code: '2', description: 'Chương 2' },
    { code: '3', description: 'Chương 3' },
    // Thêm các chương khác
  ];

  // Thêm hàm xử lý áp dụng filter
  const handleApplyFilters = () => {
    // TODO: Xử lý logic filter ở đây
    console.log('Applied filters:', filters);
    setFilterDialogVisible(false);
  };

  const handleFilterChange = (code, type) => {
    if (!code) {
      // Remove filter if code is empty
      setFilters(filters.filter((f) => f.type !== type));
      return;
    }

    // Check if filter type already exists
    const filterIndex = filters.findIndex((f) => f.type === type);

    if (filterIndex >= 0) {
      // Update existing filter
      const newFilters = [...filters];
      newFilters[filterIndex] = { type, code };
      setFilters(newFilters);
    } else {
      // Add new filter
      setFilters([...filters, { type, code }]);
    }
  };

  // Thêm hàm refresh data
  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      dispatch(
        fetchPublicExams({
          search,
          currentPage: 1, // Reset về trang 1 khi tìm kiếm
          limit,
          sortOrder,
        }),
      );
    } catch (err) {
      setError('Không thể tải dữ liệu. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  }, [search, currentPage, limit]);

  // Thêm useEffect với debounce để xử lý tìm kiếm
  useEffect(() => {
    const fetchData = debounce(() => {
      if (
        search !== undefined &&
        currentPage !== undefined &&
        limit !== undefined &&
        sortOrder !== undefined
      ) {
        dispatch(
          fetchPublicExams({
            search,
            currentPage: 1, // Reset về trang 1 khi tìm kiếm
            limit,
            sortOrder,
          }),
        );
      }
    }, 500); // Đợi 500ms sau khi người dùng ngừng gõ

    fetchData();

    return () => {
      clearTimeout(fetchData);
    };
  }, [search, limit, sortOrder]);

  useEffect(() => {
    console.log('Exams:', exams);
  }, [exams]);

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
            onPress: () => setFilters([]),
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
            options={classOptions}
            value={
              filters.find((filter) => filter.type === 'class')?.code || ''
            }
            onChange={(code) => handleFilterChange(code, 'class')}
            placeholder="Chọn lớp"
          />
          <Dropdown
            label="Loại đề thi"
            options={typeOptions}
            value={
              filters.find((filter) => filter.type === 'typeOfExam')?.code || ''
            }
            onChange={(code) => handleFilterChange(code, 'typeOfExam')}
            placeholder="Chọn loại đề thi"
          />
          <Dropdown
            label="Chương"
            options={chapterOptions}
            value={
              filters.find((filter) => filter.type === 'chapter')?.code || ''
            }
            onChange={(code) => handleFilterChange(code, 'chapter')}
            placeholder="Chọn chương"
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
            message={search ? 'Không tìm thấy đề thi' : 'Chưa có đề thi nào'}
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
