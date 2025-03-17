import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Image,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ClassCard from '../../components/ClassCard';
import SearchBar from '../../components/SearchBar';
import AppText from '../../components/AppText';
import Button from '../../components/Button';
import TabNavigation from '../../components/TabNavigation';
import colors from '../../constants/colors';

const CLASS_DATA = [
  {
    id: 1,
    imageSource: '',
    className: 'Lớp Đại 12A',
    time: 'Thứ Hai, 19h30 - 21h30',
    sessions: 12,
    membersCount: 86,
    status: 'Đã tham gia',
  },
  {
    id: 2,
    imageSource: '',
    className: 'Lớp Đại 12B',
    time: 'Thứ Ba, 19h30 - 21h30',
    sessions: 16,
    membersCount: 68,
    status: 'Đang chờ phê duyệt',
  },
  {
    id: 3,
    imageSource: '',
    className: 'Lớp Hình 12B',
    time: 'Thứ Ba, 19h30 - 21h30',
    sessions: 16,
    membersCount: 68,
    status: 'Đang chờ phê duyệt',
  },
  {
    id: 4,
    imageSource: '',
    className: 'Lớp Hình 12A',
    time: 'Thứ Ba, 19h30 - 21h30',
    sessions: 12,
    membersCount: 68,
    status: 'Đã tham gia',
  },
];

// Hàm lọc dữ liệu
const filterClasses = (classes, status) => {
  if (status === 'all') return classes;
  return classes.filter((item) =>
    status === 'joined'
      ? item.status === 'Đã tham gia'
      : item.status === 'Đang chờ phê duyệt',
  );
};

export default function ClassroomScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Sử dụng useMemo để tối ưu hiệu suất lọc dữ liệu
  const filteredClasses = useMemo(
    () => filterClasses(CLASS_DATA, selectedStatus),
    [selectedStatus],
  );

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
  const handleJoinClass = () => {
    console.log('Mã lớp học:', classCode);
    setModalVisible(false);
    setClassCode('');
  };

  // Render item cho FlatList
  const renderClassItem = ({ item }) => (
    <ClassCard
      imageSource={item.imageSource}
      className={item.className}
      sessions={item.sessions}
      membersCount={item.membersCount}
      status={item.status}
      onPressJoin={() => alert(`Vào học ${item.className}`)}
      variant="small"
    />
  );

  console.log('Tab hiện tại:', selectedStatus);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              icon="plus"
              iconComponent={
                <Image
                  source={require('../../assets/icons/filter-icon.png')}
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
          />

          {/* Modal nhập mã lớp học */}
          <Modal visible={modalVisible} transparent animationType="fade">
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Nhập mã lớp học</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập mã..."
                  value={classCode}
                  onChangeText={setClassCode}
                />
                <View style={styles.buttonRow}>
                  <Button
                    text={'Hủy'}
                    textStyle={styles.cancelText}
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setModalVisible(false)}
                  />
                  <Button
                    text={'Tham gia'}
                    style={styles.modalButton}
                    onPress={handleJoinClass}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    color: colors.ink.darkest,
    fontSize: 28,
    fontFamily: 'BeVietnamPro-Bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
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
    fontWeight: 'bold',
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
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
