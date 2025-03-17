import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ClassCard from '../../components/ClassCard';

const allClasses = [
  { id: 1, name: "ĐẠI 12A", time: "Thứ Hai, 19h30 - 21h30", sessions: 12, membersCount: 86, status: "Vào học" },
  { id: 2, name: "ĐẠI 12B", time: "Thứ Ba, 19h30 - 21h30", sessions: 10, membersCount: 74, status: "Đang chờ phê duyệt" },
  { id: 3, name: "HÌNH 12A", time: "Thứ Tư, 19h30 - 21h30", sessions: 15, membersCount: 65, status: "Đang chờ phê duyệt" },
  { id: 4, name: "HÌNH 12B", time: "Thứ Năm, 19h30 - 21h30", sessions: 14, membersCount: 90, status: "Vào học" },
  { id: 5, name: "LÝ 12A", time: "Thứ Sáu, 19h30 - 21h30", sessions: 16, membersCount: 78, status: "Vào học" },
  { id: 6, name: "LÝ 12B", time: "Thứ Bảy, 19h30 - 21h30", sessions: 13, membersCount: 82, status: "Đang chờ phê duyệt" },
];

export default function ClassroomScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");

  const filteredClasses = allClasses.filter((classItem) => {
    if (selectedStatus === "Tất cả") return true;
    if (selectedStatus === "Đã tham gia") return classItem.status === "Vào học";
    if (selectedStatus === "Đang chờ phê duyệt") return classItem.status === "Đang chờ phê duyệt";
    return false;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Lớp của bạn</Text>

      {/* Ô tìm kiếm và các nút bên cạnh */}
      <View style={styles.row}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" style={{ marginRight: 5 }} />
          <TextInput style={{ flex: 1 }} placeholder="Tìm kiếm..." />
        </View>

        {/* Nút tham gia lớp học */}
        <TouchableOpacity style={styles.circleButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>

        {/* Nút cài đặt */}
        <TouchableOpacity onPress={() => console.log("Bấm nút cài đặt")}>
          <Ionicons name="settings" size={40} color="black" style={styles.iconButton} />
        </TouchableOpacity>
      </View>

      {/* Các nút trạng thái */}
      <View style={styles.statusContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["Tất cả", "Đã tham gia", "Đang chờ phê duyệt"].map((status) => (
            <TouchableOpacity 
              key={status}
              style={[
                styles.statusButton,
                selectedStatus === status && styles.selectedStatusButton,
              ]}
              onPress={() => setSelectedStatus(status)}
            >
              <Text style={[
                  styles.statusText,
                  selectedStatus === status && styles.selectedStatusText,
                ]}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Danh sách lớp học dạng lưới */}
      <View style={styles.classContainer}>
        <FlatList
          data={filteredClasses}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.classList}
          columnWrapperStyle={styles.classRow}
          renderItem={({ item }) => (
            <View style={styles.classItem}>
              <ClassCard
                imageSource={null}
                className={item.name}
                time={item.time}
                sessions={item.sessions}
                membersCount={item.membersCount}
                joinText={item.status === "Đang chờ phê duyệt" ? "Đang chờ phê duyệt" : "Vào học"}
                disabled={item.status === "Đang chờ phê duyệt"}
                buttonStyle={item.status === "Đang chờ phê duyệt" ? styles.disabledButton : styles.activeButton}
                onPressJoin={item.status === "Đang chờ phê duyệt" ? null : () => alert(`Vào học ${item.name}`)}
              />
            </View>
          )}
        />
      </View>

      {/* Modal nhập mã lớp học */}
      <Modal visible={modalVisible} transparent animationType="slide">
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
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() => {
                  console.log("Mã lớp học:", classCode);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Tham gia</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 30, fontWeight: "bold", marginBottom: 20 },
  row: { flexDirection: "row", alignItems: "center" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 40,
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  circleButton: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: "#253F61",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  iconButton: { marginLeft: 10 },
  statusContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  statusButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    marginHorizontal: 5,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  selectedStatusButton: { backgroundColor: "#253F61" },
  statusText: { fontSize: 16, color: "black", textAlign: "center" },
  selectedStatusText: { color: "white", fontWeight: "bold" },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "gray",
    borderRadius: 5,
    alignItems: "center",
    marginRight: 5,
  },
  joinButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#253F61",
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  classContainer: { flex: 1, paddingVertical: 5 },
  classList: { paddingHorizontal: 5 },
  classRow: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  classItem: {
    width: "45%", // giảm kích thước xuống 45%
    marginBottom: 10,
  },
  activeButton: {
    backgroundColor: "#253F61",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});
