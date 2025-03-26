import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataForLearning } from '../../../../features/class/classSlice';
import { Feather } from '@expo/vector-icons';
import colors from '../../../../constants/colors';
import SearchBar from '../../../../components/SearchBar';
import AppText from '../../../../components/AppText';

const ClassroomDetail = () => {
  const class_code = useLocalSearchParams().id;
  const { classDetail } = useSelector((state) => state.classes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataForLearning({ class_code }));
  }, [dispatch, class_code]);

  const router = useRouter();

  return (
    <ScrollView
      style={styles.frameParent}
      contentContainerStyle={styles.frameContainerContent}
    >
      <View style={styles.chevronLeftParent}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <AppText style={styles.lpI12a}>{classDetail?.name}</AppText>
      </View>

      <View style={styles.barsSearchBars}>
        <SearchBar />
      </View>

      <View style={styles.danhSchBuiHcParent}>
        <AppText style={[styles.danhSchBui, styles.bui1OClr]}>
          Danh sách buổi học
        </AppText>
        {classDetail?.lessons?.map((lesson, index) => (
          <TouchableOpacity
            key={index}
            style={styles.parentShadowBox}
            onPress={() =>
              router.push(`/classroom/${class_code}/${lesson?.id}`)
            }
          >
            <AppText style={[styles.bui1O, styles.bui1OClr]}>
              {lesson?.name}
            </AppText>
            <AppText style={[styles.trngThi, styles.bui1OClr]}>
              Trạng thái: Đã hoàn thành
            </AppText>
            <View style={styles.viewsProgressBarsFullwid}>
              <View style={[styles.indicator, styles.indicatorPosition]} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ClassroomDetail;

const styles = StyleSheet.create({
  frameContainerContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 16,
  },
  bui1OClr: {
    color: '#202325',
  },
  indicatorPosition: {
    backgroundColor: '#23c16b',
    left: '0%',
    bottom: '0%',
    top: '0%',
    height: '100%',
    position: 'absolute',
  },
  lpI12a: {
    color: '#090a0a',
    width: 280,
    textAlign: 'left',
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    alignItems: 'center',
  },
  chevronLeftParent: {
    flexDirection: 'row',
    gap: 10,
  },
  search: {
    left: 36,
    fontSize: 16,
    lineHeight: 16,
    fontFamily: 'Inter-Regular',
    width: 282,
    color: '#6c7072',
    textAlign: 'left',
  },
  icon: {
    left: 8,
    overflow: 'hidden',
  },
  barsSearchBars: {
    height: 40,
    borderRadius: 8,
    alignSelf: 'stretch',
  },
  danhSchBui: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    alignSelf: 'stretch',
  },
  bui1O: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  trngThi: {
    fontSize: 12,
  },
  indicator: {
    right: '0%',
    width: '100%',
  },
  viewsProgressBarsFullwid: {
    borderRadius: 12,
    backgroundColor: '#e3e5e5',
    height: 4,
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  parentShadowBox: {
    flex: 1,
    gap: 10,
    padding: 12,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 1,
  },
  danhSchBuiHcParent: {
    gap: 8,
    alignSelf: 'stretch',
  },
  frameParent: {
    backgroundColor: '#f7f9fa',
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 20,
  },
});
