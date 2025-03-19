import { Stack, Slot } from 'expo-router';
import React, { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { loadFonts } from '../utils/fonts';
import { Provider, useSelector } from 'react-redux';
import { store } from '../redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';

// Ngăn splash screen tự động ẩn
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <React.StrictMode>
          <AppContent />
        </React.StrictMode>
      </SafeAreaProvider>
    </Provider>
  );
}

function AppContent() {
  const user = useSelector((state) => state.auth.user);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadAssets() {
      try {
        await loadFonts();
      } catch (e) {
        console.warn('Lỗi khi tải assets:', e);
      } finally {
        setIsReady(true);
      }
    }
    loadAssets();
  }, []);

  // Chỉ ẩn SplashScreen sau khi component render xong
  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#253F61" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="index" options={{ title: 'Trang chủ' }} />
          <Stack.Screen name="(auth)/login" options={{ title: 'Đăng nhập' }} />
          <Stack.Screen name="(auth)/signup" options={{ title: 'Đăng ký' }} />
        </>
      )}
    </Stack>
  );
}
