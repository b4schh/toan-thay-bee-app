import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import colors from '../../constants/colors';

const YouTubePlayer = ({ videoId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <View style={styles.container}>
      {/* Hiển thị ActivityIndicator khi đang tải */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      {/* WebView để hiển thị video */}
      <WebView
        source={{ uri: embedUrl }}
        style={styles.webview}
        allowsFullscreenVideo
        onLoadEnd={() => setIsLoading(false)} // Chỉ ẩn loader khi video tải xong
        onError={(error) => {
          console.error('WebView error:', error);
          setIsLoading(false); // Ẩn loader nếu có lỗi
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative', // Đảm bảo các thành phần con được định vị chính xác
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject, // Đặt ActivityIndicator ở giữa
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Nền mờ để làm nổi bật loader
    zIndex: 1, // Đảm bảo loader nằm trên WebView
  },
});

export default YouTubePlayer;