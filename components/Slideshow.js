import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import colors from '../constants/colors';

const { width } = Dimensions.get('window');

export default function Slideshow({ images = [] }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef(null);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
  );

  const handleScroll = (event) => {
    if (!event?.nativeEvent?.contentOffset) return;
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slideIndex);
  };

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dotStyle,
              { opacity: index === activeSlide ? 1 : 0.4 },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: width,
    height: 200,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginHorizontal: 5,
  },
});
