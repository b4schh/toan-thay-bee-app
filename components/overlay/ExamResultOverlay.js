import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AppText from '../AppText';
import Button from '../button/Button';
import colors from '../../constants/colors';
import Feather from '@expo/vector-icons/Feather';
import Dialog from '../dialog/Dialog';
import { useRouter } from 'expo-router';

export default function ExamResultOverlay({ visible, onClose, examResult }) {
  const router = useRouter();
  const [isLeaveModalVisible, setLeaveModalVisible] = useState(false);
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').width),
  ).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: Dimensions.get('window').width,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    }
  }, [visible]);

  const handleLeave = () => {
    setLeaveModalVisible(false);
    router.replace('home/');
  };

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <AppText style={styles.title}>CHI TIẾT BÀI LÀM</AppText>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent}></ScrollView>

      <Dialog
        visible={isLeaveModalVisible}
        title="Rời khỏi kết quả?"
        type="custom"
        onClose={() => setLeaveModalVisible(false)}
        actions={[
          {
            text: 'Hủy bỏ',
            onPress: () => setLeaveModalVisible(false),
            style: {
              backgroundColor: colors.sky.base,
              flex: 1,
            },
            textStyle: {
              color: colors.sky.white,
            },
          },
          {
            text: 'Đồng ý',
            onPress: handleLeave,
            style: {
              backgroundColor: colors.success,
              flex: 1,
            },
            textStyle: {
              color: colors.sky.white,
            },
          },
        ]}
      >
        <AppText style={styles.modalMessage}>
          Bạn có muốn rời khỏi trang kết quả?
        </AppText>
      </Dialog>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Đẩy button sang phải
    paddingVertical: 20,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.sky.lighter,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20
  },
});
