import { Stack } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '../redux/store';
import * as SplashScreen from 'expo-splash-screen';
import { loadFonts } from '../utils/fonts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { setRouter } from '../services/RouterService';
import { checkLogin } from '../features/auth/authSlice';
import { View } from 'react-native';

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
  const { user } = useSelector((state) => state.auth);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Giữ splash screen cho đến khi mọi thứ sẵn sàng
        await SplashScreen.preventAutoHideAsync();

        // Load fonts và các tài nguyên khác
        const fontsLoaded = await loadFonts();
        if (!fontsLoaded) {
          throw new Error('Không thể load fonts');
        }

        // Thêm delay nhỏ để đảm bảo animations mượt mà
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (e) {
        console.warn('Error loading app resources:', e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                // Prevent going back to auth screens
                gestureEnabled: false,
                // Disable Android back button
                headerBackVisible: false,
                // Prevent horizontal swipe gesture
                gestureDirection: 'horizontal',
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)/login" />
          </>
        )}
      </Stack>
    </View>
  );
}
