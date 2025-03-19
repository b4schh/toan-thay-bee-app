import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import colors from '../constants/colors';

const { width } = Dimensions.get('window');

const defaultImage = require('../assets/images/default-image.jpg');

export default function Slideshow({ images = [] }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef(null);

  const imageList = images.length > 0 ? images : [defaultImage];

  const renderItem = ({ item }) => (
    <Image
      source={typeof item === 'string' ? { uri: item } : item} // ✅ Hỗ trợ cả URL và require()
      style={styles.image}
      resizeMode="cover"
    />
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
        data={imageList}
        renderItem={renderItem}
        keyExtractor={(index) => index.toString()}
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
    paddingVertical: 0,
  },
  image: {
    width: width,
    height: 250,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -50,
    marginBottom: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.sky.white,
    marginHorizontal: 5,
  },
});
