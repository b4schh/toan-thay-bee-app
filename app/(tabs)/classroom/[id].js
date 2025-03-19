import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ScrollableCard from '../../../components/ScrollableCard';
import colors from '../../../constants/colors';
import AppText from '../../../components/AppText';
import Button from '../../../components/Button';

const { width } = Dimensions.get('window');

const images = [
  'https://play-lh.googleusercontent.com/Pa-a2bjkeMukSGVY4o2KFyPSdBNie0yCM64OAMIWXoJ-5n9Ur1bRM-ujG9RhARareXQ=w648-h364-rw',
  'https://hobiverse.com.vn/cdn/shop/articles/goku-dragon-ball_thumbnail_hobi_82cdb25dc32a4b4ca1ba9cd98097f375.jpg?v=1716179415',
  'https://phunuso.mediacdn.vn/603486343963435008/2025/2/23/-17402828863971610280648.jpg',
];

export default function ClassroomIntro() {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  const router = useRouter();

  const {
    id = '',
    className = '',
    time = '',
    sessionCount = 0,
    membersCount = 0,
    description = '',
    status = '',
    sessions = '[]',
  } = useLocalSearchParams();

  console.log('Giới thiệu lớp:', id);
  const sessionDetail = sessions ? JSON.parse(sessions) : [];

  console.log('Session:', sessionDetail);

  console.log(`Thông tin lớp: 
id: ${id}
className: ${className}
time: ${time}
sessionCount: ${sessionCount}
membersCount: ${membersCount}
description: ${description}
status: ${status}`);

  return (
    <View style={{ flex: 1, backgroundColor: 'lightblue' }}>
      {/* Slideshow */}
      <View style={styles.carouselContainer}>
      </View>

      <ScrollableCard style={{ flex: 1 }}>
        <AppText>{className}</AppText>
        <AppText>{className}</AppText>
        <AppText>{className}</AppText>
        <AppText>{className}</AppText>
        <AppText>{className}</AppText>
        <AppText>{className}</AppText>
        <Button
          text={status === 'pending' ? 'Đang chờ phê duyệt' : 'Vào lớp'}
          disabled={status === 'pending'}
          onPress={() => router.push(`/classroom/${id}/detail`)}
        />
      </ScrollableCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sky.lightest,
  },
  carouselContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: width * 0.8,
    height: 200,
    borderRadius: 10,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: -10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  scrollableCard: {
    flex: 1,
  },
});

