import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'BeVietnamPro-Bold': require('../assets/fonts/BeVietnamPro-Bold.ttf'),
    'BeVietnamPro-Medium': require('../assets/fonts/BeVietnamPro-Medium.ttf'),
    'BeVietnamPro-Regular': require('../assets/fonts/BeVietnamPro-Regular.ttf'),
  });
};
