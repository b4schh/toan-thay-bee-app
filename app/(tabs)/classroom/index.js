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
import ClassCard from '../../../components/card/ClassCard';
import SearchBar from '../../../components/SearchBar';
import AppText from '../../../components/AppText';
import Button from '../../../components/Button';
import TabNavigation from '../../../components/TabNavigation';
import CustomModal from '../../../components/CustomModal';
import colors from '../../../constants/colors';
import { fetchClassesByUser, joinClass } from '../../../features/class/classSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from '../../../components/LoadingOverlay';

// Hook lọc dữ liệu
const useFilteredClasses = (classes, status) => {
  return useMemo(() => {
    if (status === 'all') return classes;
    return classes.filter((item) =>
      status === 'joined'
        ? item.studentClassStatus === 'JS'
        : item.studentClassStatus === 'WS',
    );
  }, [classes, status]);
};

export default function ClassroomScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isJoining, setIsJoining] = useState(false);
  // console.log('Tab hiện tại:', selectedStatus);

  const { classes } = useSelector((state) => state.classes);

  const dispatch = useDispatch();
  
  const filteredClasses = useFilteredClasses(classes, selectedStatus);
  
  // const { search, currentPage, limit, totalItems, sortOrder } = useSelector(
  //   (state) => state.filter,
  // );
  // useEffect(() => {
  //   if (
  //     search !== undefined &&
  //     currentPage !== undefined &&
  //     limit !== undefined &&
  //     sortOrder !== undefined
  //   ) {
  //     dispatch(fetchClassesByUser({ search, currentPage, limit, sortOrder }));
  //   }
  // }, [search, currentPage, limit, sortOrder]);

  useEffect(() => {
    console.log('Classes:', classes);
  }, [classes]);

  const router = useRouter();

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
    const class_code = classCode
    console.log('📌 Mã lớp học trước khi gửi:', class_code); // Kiểm tra giá trị classCode
    
    if (!classCode.trim()) {
      alert('⚠️ Vui lòng nhập mã lớp học!');
      return;
    }

    setIsJoining(true);

    dispatch(joinClass({ class_code }))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          alert('🎉 Tham gia lớp học thành công!');
          setModalVisible(false);
          setClassCode('');
        } else {
          alert('❌ Mã lớp học không hợp lệ hoặc có lỗi xảy ra!');
        }
      })
      .finally(() => {
        setIsJoining(false);
      });
  }, [classCode, dispatch]);

  // Render item cho FlatList
  const renderClassItem = useCallback(
    ({ item }) => (
      <ClassCard
        name={item.name}
        studentCount={item.studentCount}
        lessonCount={item.lessonCount}
        status={item.studentClassStatus}
        onPressJoin={() => {
          console.log('Vào lớp có id:', item.id);
          
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <LoadingOverlay/>
      <View style={styles.container}>
        {/* Header */}
        <AppText style={styles.header}>Lớp của bạn</AppText>

        {/* Ô tìm kiếm và các nút bên cạnh */}
        <View style={styles.row}>
          <SearchBar />

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
          <Button
            iconComponent={
              <Image
                source={require('../../../assets/icons/filter-icon.png')}
                style={{ width: 24, height: 24 }}
              />
            }
            style={[styles.button, { backgroundColor: colors.sky.white }]}
            onPress={() => console.log('Filter Clicked!')}
          />
        </View>

        {/* Navigation Bar */}
        <TabNavigation
          tabs={tabs}
          selectedTab={selectedStatus}
          onTabPress={setSelectedStatus}
        />

        {/* Danh sách lớp học dạng lưới */}
        <FlatList
          data={filteredClasses}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.classList}
          columnWrapperStyle={styles.classRow}
          ListEmptyComponent={
            <AppText style={styles.emptyText}>Không có lớp nào</AppText>
          }
          renderItem={renderClassItem}
          showsVerticalScrollIndicator={false}
        />

        {/* Modal nhập mã lớp học */}
        <CustomModal
          visible={modalVisible}
          title="Nhập mã lớp học"
          onClose={() => setModalVisible(false)}
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
            style={styles.input}
            placeholder="Nhập mã..."
            value={classCode}
            onChangeText={setClassCode}
          />
        </CustomModal>
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
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
});
