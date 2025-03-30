import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../redux/store';
import * as SplashScreen from 'expo-splash-screen';
import { loadFonts } from '../utils/fonts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { setRouter } from '../services/RouterService';
import { checkLogin } from '../features/auth/authSlice';

// Ngăn splash screen tự động ẩn
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    setRouter(router); // ✅ gán router toàn cục khi App mount
  }, [router]);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

function AppContent() {
  // const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
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
