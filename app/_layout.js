// app/_layout.js
import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { loadFonts } from '../utils/fonts';
import { Provider, useSelector } from 'react-redux';
import { store } from '../redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';

// Ngăn tự động ẩn splash screen
SplashScreen.preventAutoHideAsync();

export default function Layout() {
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

  useEffect(() => {
    async function loadAssets() {
      try {
        await loadFonts();
      } catch (e) {
        console.warn('Lỗi khi tải assets:', e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    loadAssets();
  }, []);

  if (!isReady) {
    // Hiển thị loading khi chưa sẵn sàng
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#253F61" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="(tabs)" options={{}} />
      ) : (
        <>
          <Stack.Screen name="index" options={{}} />
          <Stack.Screen name="(auth)/login" options={{}} />
          <Stack.Screen name="(auth)/signup" options={{}} />
        </>
      )}
    </Stack>
  );
}
