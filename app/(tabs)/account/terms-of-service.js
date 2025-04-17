import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AppText from '../../../components/AppText';
import colors from '../../../constants/colors';

export default function TermsOfServiceScreen() {
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
        <AppText style={styles.headerTitle}>Điều khoản sử dụng</AppText>
        <View style={styles.placeholder} />
      </View>
      <ScrollView style={styles.content}>
        <AppText style={styles.text}>
          Chào mừng bạn đến với ứng dụng Toán Thầy Bee! Khi sử dụng ứng dụng
          này, bạn đồng ý tuân thủ các điều khoản sau. Vui lòng đọc kỹ trước khi
          sử dụng.{'\n\n'}
          <AppText style={styles.sectionTitle}>1. Chấp nhận điều khoản</AppText>
          {'\n\n'}Bằng việc truy cập hoặc sử dụng ứng dụng Toán Thầy Bee, bạn
          xác nhận rằng bạn đã đọc, hiểu và đồng ý bị ràng buộc bởi các điều
          khoản sử dụng này. Nếu bạn không đồng ý, vui lòng không tiếp tục sử
          dụng ứng dụng.
          {'\n\n'}
          <AppText style={styles.sectionTitle}>2. Quyền sở hữu</AppText>
          {'\n\n'}Tất cả nội dung trong ứng dụng bao gồm nhưng không giới hạn:
          văn bản, hình ảnh, bài giảng, câu hỏi, thiết kế, mã nguồn... đều thuộc
          quyền sở hữu của Toán Thầy Bee và được bảo vệ bởi luật
          bản quyền.
          {'\n\n'}Bạn không được sao chép, phân phối, chỉnh sửa hoặc sử dụng cho
          mục đích thương mại nếu không có sự cho phép bằng văn bản của chúng
          tôi.
          {'\n\n'}
          <AppText style={styles.sectionTitle}>
            3. Quyền và trách nhiệm người dùng
          </AppText>
          {'\n\n'}Khi sử dụng ứng dụng, bạn cam kết:
          {'\n\n'}- Cung cấp thông tin chính xác khi đăng ký và sử dụng.
          {'\n'}- Không sử dụng ứng dụng cho mục đích gian lận, phá hoại hoặc
          gây ảnh hưởng xấu đến người khác.
          {'\n'}- Không xâm phạm quyền riêng tư, bản quyền hoặc các quyền hợp
          pháp khác của bất kỳ cá nhân hay tổ chức nào.
          {'\n\n'}Nếu bạn vi phạm các điều khoản trên, chúng tôi có quyền đình
          chỉ hoặc chấm dứt tài khoản của bạn mà không cần thông báo trước.
          {'\n\n'}
          <AppText style={styles.sectionTitle}>4. Tài khoản và bảo mật</AppText>
          {'\n\n'}Bạn có trách nhiệm giữ an toàn cho tài khoản của mình, bao gồm
          cả thông tin đăng nhập. Chúng tôi không chịu trách nhiệm nếu có thiệt
          hại xảy ra do việc chia sẻ hoặc để lộ thông tin tài khoản.
          {'\n\n'}
          <AppText style={styles.sectionTitle}>5. Sửa đổi và cập nhật</AppText>
          {'\n\n'}Chúng tôi có quyền thay đổi hoặc cập nhật các điều khoản sử
          dụng bất kỳ lúc nào. Khi có thay đổi, chúng tôi sẽ thông báo trong ứng
          dụng hoặc qua email.
          {'\n\n'}Việc bạn tiếp tục sử dụng ứng dụng sau khi điều khoản được cập
          nhật đồng nghĩa với việc bạn đồng ý với những thay đổi đó.
          {'\n\n'}
          <AppText style={styles.sectionTitle}>6. Miễn trừ trách nhiệm</AppText>
          {'\n\n'}Ứng dụng được cung cấp “như hiện có”. Chúng tôi không đảm bảo
          rằng ứng dụng sẽ luôn hoạt động không có lỗi, hoặc phù hợp với tất cả
          nhu cầu của bạn.
          {'\n\n'}Chúng tôi không chịu trách nhiệm về các thiệt hại trực tiếp
          hay gián tiếp phát sinh từ việc sử dụng ứng dụng.
          {'\n\n'}
          <AppText style={styles.sectionTitle}>7. Luật áp dụng</AppText>
          {'\n\n'}Các điều khoản này được điều chỉnh và giải thích theo pháp
          luật của nước Cộng hoà Xã hội Chủ nghĩa Việt Nam.
          {'\n\n'}
          <AppText style={styles.sectionTitle}>8. Liên hệ</AppText>
          {'\n\n'}Mọi thắc mắc, góp ý hoặc yêu cầu liên quan đến điều khoản sử
          dụng, vui lòng liên hệ:
          {'\n\n'}📧 Email: [email@example.com]
          {'\n'}📍 Địa chỉ: [Địa chỉ công ty hoặc nhóm phát triển]
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
