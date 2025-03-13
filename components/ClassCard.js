import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// Nếu dùng icon, bạn có thể cài đặt và import từ react-native-vector-icons
// import Icon from 'react-native-vector-icons/FontAwesome';

export default function ClassCard({
  imageSource, // đường dẫn hoặc require() của ảnh
  className, // tên lớp (VD: "Lớp Đại 12A")
  time, // thời gian (VD: "Thứ Hai, 19h30 - 21h30")
  sessions, // số buổi học (VD: 12)
  membersCount, // số lượng thành viên (VD: 86)
  onPressJoin, // hàm gọi khi bấm vào nút "Vào học"
}) {
  return (
    <View style={styles.card}>
      {/* Ảnh đại diện cho lớp học */}
      <Image source={imageSource} style={styles.image} />

      {/* Tên lớp */}
      <Text style={styles.className}>{className}</Text>

      {/* Thời gian lớp */}
      <Text style={styles.time}>{time}</Text>

      {/* Số buổi học */}
      <Text style={styles.sessions}>{sessions} buổi</Text>

      {/* Khu vực footer: nút "Vào học" và số thành viên */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.joinButton} onPress={onPressJoin}>
          <Text style={styles.joinButtonText}>Vào học</Text>
        </TouchableOpacity>

        {/* Số lượng thành viên */}
        <View style={styles.membersContainer}>
          {/* Nếu có icon, bạn có thể dùng:
              <Icon name="users" size={16} color="#000" /> 
             Hoặc thay thế bằng Image/Text tùy ý. 
          */}
          <Text style={styles.membersText}>{membersCount} thành viên</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    height: 280,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    // Shadow iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation Android
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#EAF2FF', // placeholder nếu ảnh chưa load
  },
  className: {
    width: '100%',
    color: '#202325',
    fontSize: 18,
    fontFamily: 'BeVietnamPro-Bold',
    lineHeight: 18,
    wordWrap: 'break-word',
  },
  time: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  sessions: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  joinButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  membersText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
  },
});
