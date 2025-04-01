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
import TabNavigation from '../../../components/TabNavigation';
import LoadingOverlay from '../../../components/overlay/LoadingOverlay';
import Pagination from '../../../components/Pagination';
import colors from '../../../constants/colors';
import { fetchPublicExams } from '../../../features/exam/examSlice';

const useFilteredExam = (exams, grade) => {
  return useMemo(() => {
    if (grade === 'all') return exams;
    return exams.filter((exam) => exam.class === grade.replace('grade_', ''));
  }, [exams, grade]);
};

// Thêm hàm debounce ở đầu file
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export default function PracticeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedGrade, setSelectedGrade] = useState('all');

  const { loading } = useSelector((state) => state.states);
  const { exams } = useSelector((state) => state.exams);
  const { screens } = useSelector((state) => state.filter);
  const examScreen = screens.exam;
  const { search, currentPage, limit, totalItems, sortOrder } = examScreen;

  console.log(`Search Exam: ${search}
    Current Page: ${currentPage}
    Limit: ${limit}
    Total Items: ${totalItems}
    Sort Order: ${sortOrder}`);

  const filteredExam = useFilteredExam(exams, selectedGrade);

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

  const tabs = useMemo(
    () => [
      { id: 'all', label: 'Tất cả' },
      { id: 'grade_10', label: 'Lớp 10' },
      { id: 'grade_11', label: 'Lớp 11' },
      { id: 'grade_12', label: 'Lớp 12' },
    ],
    [],
  );

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
          onPress={() => console.log('Filter Clicked!')}
        />
      </View>

      <TabNavigation
        tabs={tabs}
        selectedTab={selectedGrade}
        onTabPress={setSelectedGrade}
      />

      {/* Danh sách lớp học dạng lưới */}
      <FlatList
        data={filteredExam}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.classList}
        columnWrapperStyle={styles.classRow}
        ListEmptyComponent={
          <AppText style={styles.emptyText}>Không có đề thi nào</AppText>
        }
        ListFooterComponent={
          filteredExam.length > 0 && (
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
});
