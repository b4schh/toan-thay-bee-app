// app/_layout.js
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { View, Animated, Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { loadFonts } from '../utils/fonts';

// Ngăn tự động ẩn splash screen
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useAuth();
  const [isReady, setIsReady] = useState(false);

  // Thêm state để kiểm soát hiển thị overlay animation
  const [showSplashAnimation, setShowSplashAnimation] = useState(true);

  // Giá trị Animated cho scale và opacity
  const scaleAnim = useRef(new Animated.Value(0)).current; // Ban đầu logo nhỏ
  const fadeAnim = useRef(new Animated.Value(1)).current; // Ban đầu full hiển thị

  useEffect(() => {
    async function loadAssets() {
      try {
        await loadFonts();
      } catch (e) {
        console.warn('Lỗi khi tải assets:', e);
      } finally {
        setIsReady(true);
        // Sau khi hoàn thành, ẩn splash screen
        await SplashScreen.hideAsync();
      }
    }
    loadAssets();
  }, []);

  if (!isReady) {
    // Khi assets chưa tải xong, trả về null để không render gì,
    // Splash screen vẫn được hiển thị.
    return null;
  }

  // if (!isReady) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="#000" />
  //     </View>
  //   );
  // }

  return user ? (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{}} />
    </Stack>
  ) : (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen name="(auth)/login" options={{}} />
      <Stack.Screen name="(auth)/signup" options={{}} />
    </Stack>
  );
}
