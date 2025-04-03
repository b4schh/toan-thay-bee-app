import { useState, useMemo, useCallback, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import ClassCard from '../../../components/card/ClassCard';
import ScrollableCard from '../../../components/ScrollableCard';
import Button from '../../../components/button/Button';
import AppText from '../../../components/AppText';
import TabNavigation from '../../../components/TabNavigation';
import LoadingOverlay from '../../../components/overlay/LoadingOverlay';
import colors from '../../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassesByUser } from '../../../features/class/classSlice';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState('pending_assignments');
  const { user } = useSelector((state) => state.auth);
  const { classes } = useSelector((state) => state.classes);
  const { loading } = useSelector((state) => state.states);
  const { search, currentPage, limit, totalItems, sortOrder } = useSelector(
    (state) => state.filter,
  );

  useEffect(() => {
      dispatch(
        fetchClassesByUser({
          search,
          currentPage: 1,
          limit,
        }),
      );
    }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (user) {
      dispatch(fetchClassesByUser());
    } else {
      router.replace('/login');
    }
    setRefreshing(false);
  }, [dispatch]);

  // Lọc ra các lớp đã tham gia
  const filteredClasses = useMemo(() => {
    if (!Array.isArray(classes)) return [];

    return classes.filter(
      (item) => item && item.studentClassStatus === 'JS', // Fix typo: studenrClassStatus -> studentClassStatus
    );
  }, [classes]);

  const TabContent = useMemo(
    () => ({
      // pending_assignments: (
      //   <AppText style={styles.contentText}>Chưa có dữ liệu</AppText>
      // ),
      // unread_documents: (
      //   <AppText style={styles.contentText}>Chưa có dữ liệu</AppText>
      // ),
      // saved_exams: <AppText style={styles.contentText}>📌 Đề đã lưu</AppText>,
      // exam_history: (
      //   <AppText style={styles.contentText}>Chưa có dữ liệu</AppText>
      // ),
    }),
    [selectedTab],
  );

  const renderClassItem = useCallback(({ item }) => {
    return (
      <ClassCard
        name={item.name}
        dayOfWeek={item.dayOfWeek}
        studyTime={item.studyTime}
        lessonCount={item.lessonCount}
        studentCount={item.studentCount}
        onPressJoin={() => {
          router.replace({
            pathname: `/classroom/${item.class_code}/`,
            params: {
              id: item.id,
            },
          });
        }}
      />
    );
  }, []);
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
            icon="bell"
            iconLibrary="Feather"
            iconColor={colors.primary}
            iconSize={18}
            style={[
              styles.button,
              { paddingHorizontal: 0, paddingVertical: 0 },
            ]}
            onPress={() => console.log('Notify Clicked!')}
          />
        </View>
      </View>

      {/* Header */}
      <View style={styles.headerContainer}>
        <AppText style={[styles.headerText, { fontSize: 18 }]}>
          Chào mừng!
        </AppText>
        <AppText style={[styles.headerText, { fontSize: 24 }]}>
          {user?.lastName} {user?.firstName}
        </AppText>
      </View>

      {/* Nội dung có thể scroll */}
      <ScrollableCard
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {/* Body */}
        <View style={styles.card}>
          <View style={styles.section}>
            <AppText style={styles.title}>Truy cập nhanh</AppText>
            <View>
              {!loading ? (
                Array.isArray(classes) && classes.length > 0 ? (
                  <FlatList
                    data={filteredClasses}
                    renderItem={renderClassItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 16 }}
                    pagingEnabled={false}
                  />
                ) : (
                  <AppText style={styles.emptyText}>
                    Chưa có lớp học nào
                  </AppText>
                )
              ) : (
                <AppText style={styles.loadingText}>Đang tải lớp học</AppText>
              )}
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
                <AppText style={styles.contentText}>Chưa xử lý</AppText>
              )}
            </View>
          </View>
        </View>
      </ScrollableCard>

      <LoadingOverlay />
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
    width: 36,
    height: 36,
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
    fontFamily: 'Inter-Bold',
    color: colors.sky.white,
  },
  loadingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    textAlign: 'center',
    color: colors.ink.darkest,
  },
  emptyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    textAlign: 'center',
    color: colors.ink.darkest,
  },
  card: {
    flexGrow: 1,
    gap: 12,
    paddingBottom: 128,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.ink.darkest,
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
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    textAlign: 'center',
    color: colors.ink.darkest,
  },
});
