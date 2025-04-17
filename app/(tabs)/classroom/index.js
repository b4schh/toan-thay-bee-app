import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ClassCard,
  SearchBar,
  AppText,
  Button,
  TabNavigation,
  Dialog,
  Pagination,
  LoadingOverlay,
} from '@components/index';
import colors from '../../../constants/colors';
import {
  fetchClassesByUser,
  joinClass,
} from '../../../features/class/classSlice';
import {
  setScreenTotalItems,
  setScreenCurrentPage,
} from '../../../features/filter/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

// Hook lọc dữ liệu và phân trang
const useFilteredClasses = (classes, status, search, currentPage, limit) => {
  return useMemo(() => {
    // 1. Lọc theo status
    let filteredData =
      status === 'all'
        ? classes
        : classes.filter((item) =>
            status === 'joined'
              ? item.studentClassStatus === 'JS'
              : item.studentClassStatus === 'WS',
          );

    // 2. Lọc theo search
    if (search) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // 3. Tính toán phân trang
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (currentPage - 1) * limit;
    const paginatedData = filteredData.slice(startIndex, startIndex + limit);

    return {
      paginatedClasses: paginatedData,
      totalItems,
      totalPages,
    };
  }, [classes, status, search, currentPage, limit]);
};

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
    {!isLoading && error && (
      <Button text="Tải lại" onPress={onRefresh} style={styles.refreshButton} />
    )}
  </View>
);

export default function ClassroomScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [successDialogVisible, setSuccessDialogVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { classes } = useSelector((state) => state.classes);
  // const filteredClasses = useFilteredClasses(classes, selectedStatus);
  const { screens } = useSelector((state) => state.filter);
  const classScreen = screens.class;
  const { search, currentPage, limit } = classScreen;

  // Sử dụng hook đã sửa
  const { paginatedClasses, totalItems, totalPages } = useFilteredClasses(
    classes,
    selectedStatus,
    search,
    currentPage,
    limit,
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        dispatch(
          fetchClassesByUser({
            search,
            currentPage: 1,
            limit,
          }),
        );
      } catch (err) {
        setError('Không thể tải dữ liệu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Thêm hàm refresh data
  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      dispatch(
        fetchClassesByUser({
          search,
          currentPage,
          limit,
        }),
      );
    } catch (err) {
      setError('Không thể tải dữ liệu. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  }, [search, currentPage, limit]);

  // Cấu hình tabs
  const tabs = useMemo(
    () => [
      { id: 'all', label: 'Tất cả' },
      { id: 'joined', label: 'Đã tham gia' },
      { id: 'pending', label: 'Đang chờ phê duyệt' },
    ],
    [],
  );

  // Xử lý sự kiện tham gia lớp
  const handleJoin = useCallback(() => {
    if (!classCode.trim()) {
      alert('⚠️ Vui lòng nhập mã lớp học!');
      return;
    }

    dispatch(
      joinClass({
        class_code: classCode,
        onSuccess: () => {
          setClassCode(''); // Reset form
          setModalVisible(false); // Đóng modal nhập mã
          setSuccessDialogVisible(true); // Hiển thị dialog thành công
        },
      }),
    );
  }, [classCode, dispatch]);

  // Render item cho FlatList
  const renderClassItem = useCallback(
    ({ item }) => (
      <ClassCard
        name={item.name}
        dayOfWeek={item.dayOfWeek}
        studyTime={item.studyTime}
        studentCount={item.studentCount}
        lessonCount={item.lessonCount}
        status={item.studentClassStatus}
        onPressJoin={() => {
          router.push({
            pathname: `/classroom/${item.class_code}/`,
            params: {
              id: item.id,
            },
          });
        }}
        variant="small"
      />
    ),
    [],
  );

  // Cập nhật lại handlePageChange
  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage === currentPage) return;
      if (newPage < 1 || newPage > totalPages) return;

      dispatch(
        setScreenCurrentPage({
          screen: 'class',
          page: newPage,
        }),
      );
    },
    [currentPage, totalPages],
  );

  // Thêm useEffect để cập nhật totalItems khi filtered data thay đổi
  useEffect(() => {
    dispatch(
      setScreenTotalItems({
        screen: 'class',
        totalItems,
      }),
    );
  }, [totalItems]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <LoadingOverlay />
      <View style={styles.container}>
        {/* Header */}
        <AppText style={styles.header}>Lớp của bạn</AppText>

        {/* Ô tìm kiếm và các nút bên cạnh */}
        <View style={styles.row}>
          <SearchBar placeholder="Tìm kiếm lớp học..." screen="class" />

          {/* Nút tham gia lớp học */}
          <Button
            icon="plus"
            iconLibrary="FontAwesome5"
            iconSize={24}
            style={styles.button}
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </View>

        {/* Hiển thị lỗi nếu có */}
        {
          <>
            {/* Navigation Bar */}
            <TabNavigation
              tabs={tabs}
              selectedTab={selectedStatus}
              onTabPress={setSelectedStatus}
            />

            {/* Danh sách lớp học dạng lưới */}
            <FlatList
              data={paginatedClasses}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.classList}
              columnWrapperStyle={styles.classRow}
              ListEmptyComponent={
                <EmptyView
                  onRefresh={handleRefresh}
                  isLoading={isLoading}
                  error={error}
                  message={
                    search ? 'Không tìm thấy lớp học' : 'Chưa có lớp học nào'
                  }
                />
              }
              ListFooterComponent={
                paginatedClasses.length > 0 && (
                  <View style={styles.paginationContainer}>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </View>
                )
              }
              renderItem={renderClassItem}
              showsVerticalScrollIndicator={false}
              refreshing={isLoading}
              onRefresh={handleRefresh}
            />
          </>
        }

        {/* Modal nhập mã lớp học */}
        <Dialog
          visible={modalVisible}
          title="Nhập mã lớp học"
          onClose={() => setModalVisible(false)}
          type="custom"
          actions={[
            {
              text: 'Hủy',
              onPress: () => setModalVisible(false),
              style: [styles.modalButton, styles.cancelButton],
              textStyle: styles.cancelText,
            },
            {
              text: 'Tham gia',
              onPress: handleJoin,
              style: styles.modalButton,
            },
          ]}
        >
          <TextInput
            value={classCode}
            onChangeText={setClassCode}
            placeholder="Nhập mã lớp học"
            style={styles.input}
          />
        </Dialog>
      </View>

      {/* Dialog thông báo thành công */}
      <Dialog
        visible={successDialogVisible}
        title="Bạn đã tham gia lớp học thành công"
        message="Vui lòng chờ giáo viên phê duyệt"
        type="alert"
        onClose={() => setSuccessDialogVisible(false)}
      />
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    flex: 1,
    width: '100%',
  },
  cancelButton: {
    backgroundColor: colors.sky.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  cancelText: {
    color: colors.primary,
  },
  classList: {
    gap: 0,
  },
  classRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    color: colors.ink.dark,
  },
  refreshButton: {
    marginTop: 12,
    paddingHorizontal: 24,
  },
  paginationContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
});
