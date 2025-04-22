import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AppText } from '@components/index';
import colors from '../../../constants/colors';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color={colors.ink.darker} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Chính sách riêng tư</AppText>
        <View style={styles.placeholder} />
      </View>
      <ScrollView style={styles.content}>
        <AppText style={styles.text}>
          Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Chính sách này giải
          thích cách Toán thầy Bee thu thập, sử dụng và bảo vệ thông tin của bạn
          khi bạn sử dụng ứng dụng học toán của chúng tôi.{'\n\n'}
          <AppText style={styles.sectionTitle}>
            1. Thông tin chúng tôi thu thập
          </AppText>
          {'\n\n'}Khi bạn sử dụng ứng dụng, chúng tôi có thể thu thập các loại
          thông tin sau:
          {'\n\n'}- Thông tin cá nhân (nếu có): Họ tên, địa chỉ email, ngày
          sinh, thông tin đăng nhập.
          {'\n'}- Dữ liệu sử dụng: Bao gồm dữ liệu về tiến độ học tập, số câu
          hỏi đã làm, điểm số và thời gian học.
          {'\n'}- Thông tin thiết bị: Loại thiết bị, hệ điều hành, ngôn ngữ sử
          dụng, và dữ liệu kỹ thuật khác.
          {'\n'}- Cookies hoặc công nghệ tương tự (nếu áp dụng).
          {'\n\n'}
          <AppText style={styles.sectionTitle}>
            2. Mục đích sử dụng thông tin
          </AppText>
          {'\n\n'}Chúng tôi sử dụng thông tin của bạn cho các mục đích sau:
          {'\n\n'}- Cải thiện trải nghiệm học tập và giao diện người dùng.
          {'\n'}- Theo dõi tiến trình học tập để đưa ra đề xuất phù hợp.
          {'\n'}- Gửi thông báo liên quan đến tài khoản hoặc cập nhật ứng dụng.
          {'\n'}- Đảm bảo tính bảo mật và ngăn chặn hành vi gian lận.
          {'\n\n'}
          <AppText style={styles.sectionTitle}>3. Chia sẻ thông tin</AppText>
          {'\n\n'}Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ
          ba, trừ khi:
          {'\n\n'}- Có sự đồng ý của bạn.
          {'\n'}- Theo yêu cầu của pháp luật.
          {'\n'}- Để bảo vệ quyền lợi, tài sản hoặc sự an toàn của người dùng và
          hệ thống.
          {'\n\n'}
          <AppText style={styles.sectionTitle}>4. Bảo mật thông tin</AppText>
          {'\n\n'}Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức hợp lý để
          bảo vệ thông tin của bạn khỏi mất mát, truy cập trái phép hoặc rò rỉ.
          {'\n\n'}Tuy nhiên, không có hệ thống nào an toàn tuyệt đối. Vì vậy,
          chúng tôi không thể đảm bảo 100% thông tin sẽ được bảo mật khỏi mọi
          rủi ro.
          {'\n\n'}
          <AppText style={styles.sectionTitle}>5. Quyền của bạn</AppText>
          {'\n\n'}Bạn có quyền:
          {'\n\n'}- Truy cập và chỉnh sửa thông tin cá nhân của mình.
          {'\n'}- Yêu cầu xóa tài khoản hoặc dữ liệu liên quan.
          {'\n'}- Từ chối nhận thông báo tiếp thị hoặc email quảng cáo (nếu có).
          {'\n\n'}
          <AppText style={styles.sectionTitle}>6. Dành cho trẻ em</AppText>
          {'\n\n'}Ứng dụng có thể được sử dụng bởi học sinh nhỏ tuổi dưới sự
          giám sát của phụ huynh hoặc giáo viên. Chúng tôi không cố tình thu
          thập thông tin cá nhân từ trẻ em mà không có sự đồng ý của người giám
          hộ hợp pháp.
          {'\n\n'}
          <AppText style={styles.sectionTitle}>7. Thay đổi chính sách</AppText>
          {'\n\n'}Chúng tôi có thể cập nhật chính sách này theo thời gian. Khi
          có thay đổi, chúng tôi sẽ thông báo qua ứng dụng hoặc email.
          {'\n\n'}
          <AppText style={styles.sectionTitle}>8. Liên hệ</AppText>
          {'\n\n'}Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào liên quan đến chính
          sách riêng tư, vui lòng liên hệ:
          {'\n\n'}📧 Email: [email@example.com]
          {'\n'}📍 Địa chỉ: [Địa chỉ công ty hoặc nhóm phát triển, nếu có]
        </AppText>
        <View style={{ height: 80 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sky.lightest,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.sky.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.sky.light,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.ink.darker,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 14,
    color: colors.ink.dark,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: colors.ink.darker,
  },
});
