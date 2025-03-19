import { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import ClassCard from '../../components/ClassCard';
import ScrollableCard from '../../components/ScrollableCard';
import Button from '../../components/Button';
import AppText from '../../components/AppText';
import TabNavigation from '../../components/TabNavigation';
import colors from '../../constants/colors';

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState('pending_assignments');

  console.log('Tab hiện tại:', selectedTab);

  const TabContent = useMemo(
    () => ({
      pending_assignments: (
        <AppText style={styles.contentText}>📚 Bài tập chưa nộp</AppText>
      ),
      unread_documents: (
        <AppText style={styles.contentText}>⭐ Tài liệu chưa xem</AppText>
      ),
      saved_exams: <AppText style={styles.contentText}>📌 Đề đã lưu</AppText>,
      exam_history: (
        <AppText style={styles.contentText}>🕚 Lịch sử làm bài</AppText>
      ),
    }),
    [selectedTab],
  );

  const classes = [
    {
      id: 1,
      imageSource: '',
      className: 'Lớp Đại 12A',
      time: 'Thứ Hai, 19h30 - 21h30',
      sessions: 12,
      membersCount: 86,
    },
    {
      id: 2,
      imageSource: '',
      className: 'Lớp Hình 12A',
      time: 'Thứ Ba, 19h30 - 21h30',
      sessions: 16,
      membersCount: 68,
    },
  ];

  const renderClassItem = useCallback(
    ({ item }) => (
      <ClassCard
        imageSource={item.imageSource}
        className={item.className}
        time={item.time}
        sessions={item.sessions}
        membersCount={item.membersCount}
        onPressJoin={() => {
          // Xử lý khi bấm nút "Vào học"
          console.log('Vào học');
        }}
      />
    ),
    [],
  );
  return (
    <View style={styles.container}>
      {/* Button */}
      <View style={styles.buttonContainer}>
        <Button
          icon="menu"
          iconLibrary="Feather"
          iconColor={colors.sky.white}
          style={[{ width: 'auto', height: 'auto' }]}
          onPress={() => console.log('Menu Clicked!')}
        />
        <View style={styles.buttonContainerRight}>
          <Button
            icon="search"
            iconLibrary="Feather"
            iconColor={colors.primary}
            style={[
              styles.button,
              { paddingHorizontal: 0, paddingVertical: 0 },
            ]}
            onPress={() => console.log('Menu Clicked!')}
          />
          <Button
            icon="bell"
            iconLibrary="Feather"
            iconColor={colors.primary}
            style={[
              styles.button,
              { paddingHorizontal: 0, paddingVertical: 0 },
            ]}
            onPress={() => console.log('Menu Clicked!')}
          />
        </View>
      </View>

      {/* Header */}
      <View style={styles.headerContainer}>
        <AppText style={[styles.headerText, { fontSize: 18 }]}>
          Chào mừng!
        </AppText>
        <AppText style={[styles.headerText, { fontSize: 24 }]}>
          Nguyễn Minh Đức
        </AppText>
      </View>

      {/* Nội dung có thể scroll */}
      <ScrollableCard>
        {/* Body */}
        <View style={styles.card}>
          <View style={styles.section}>
            <AppText style={styles.title}>Lớp học gần đây</AppText>
            <View style={{ paddingVertical: 10 }}>
              <FlatList
                data={classes}
                renderItem={renderClassItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 16 }}
                pagingEnabled={false}
              />
            </View>
          </View>

          <View style={styles.section}>
            <AppText style={styles.title}>Tổng quan</AppText>

            {/* Navigation Bar */}
            <TabNavigation
              tabs={[
                { id: 'pending_assignments', label: 'Bài tập chưa nộp' },
                { id: 'unread_documents', label: 'Tài liệu chưa xem' },
                { id: 'saved_exams', label: 'Đề đã lưu' },
                { id: 'exam_history', label: 'Lịch sử làm bài' },
              ]}
              selectedTab={selectedTab}
              onTabPress={setSelectedTab}
            />

            {/* Nội dung hiển thị bên dưới */}
            <View style={[styles.contentContainer]}>
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
              {TabContent[selectedTab] || (
                <AppText style={styles.contentText}>Không có dữ liệu</AppText>
              )}
            </View>
          </View>
        </View>
      </ScrollableCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 0,
  },
  button: {
    backgroundColor: colors.sky.white,
    width: 48,
    height: 48,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  buttonContainerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerContainer: {
    gap: 4,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontFamily: 'BeVietnamPro-Bold',
    color: colors.sky.white,
  },
  card: {
    flexGrow: 1,
    paddingBottom: 128,
  },
  title: {
    fontFamily: 'BeVietnamPro-Bold',
    color: colors.ink.darkest,
    fontSize: 18,
  },
  section: {
    gap: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.sky.lightest,
  },
  contentText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'BeVietnamPro-Medium',
    color: colors.ink.darkest,
  },
});
