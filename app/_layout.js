import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { store } from '../redux/store';
import * as SplashScreen from 'expo-splash-screen';
import { loadFonts } from '../utils/fonts';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Ngăn splash screen tự động ẩn
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

function AppContent() {
  const user = useSelector((state) => state.auth.user);
  const [isReady, setIsReady] = useState(false);
  const [appRendered, setAppRendered] = useState(false);

  useEffect(() => {
    async function loadAssets() {
      try {
        await loadFonts();
        console.log('Fonts loaded successfully!');
      } catch (e) {
        console.warn('Lỗi khi tải assets:', e);
      } finally {
        setIsReady(true);
      }
    }
    loadAssets();
  }, []);

  useEffect(() => {
    setAppRendered(true); // Đánh dấu rằng App đã render xong
  }, []);

  // Chỉ ẩn SplashScreen sau khi component render xong
  useEffect(() => {
    if (isReady && appRendered) {
      SplashScreen.hideAsync();
    }
  }, [isReady, appRendered]);

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
        <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="index" options={{ title: 'Trang chủ' }} />
          <Stack.Screen name="(auth)/login" options={{ title: 'Đăng nhập' }} />
        </>
      )}
    </Stack>
  );
}
