import * as Font from 'expo-font';

export const loadFonts = async () => {
  try {
    await Font.loadAsync({
      'Inter-Bold': require('../assets/fonts/Inter_24pt-Bold.ttf'),
      'Inter-BoldItalic': require('../assets/fonts/Inter_24pt-BoldItalic.ttf'),
      'Inter-Italic': require('../assets/fonts/Inter_24pt-Italic.ttf'),
      'Inter-Medium': require('../assets/fonts/Inter_24pt-Medium.ttf'),
      'Inter-MediumItalic': require('../assets/fonts/Inter_24pt-MediumItalic.ttf'),
      'Inter-Regular': require('../assets/fonts/Inter_24pt-Regular.ttf'),
      'iCielBCCubano': require('../assets/fonts/iCielBCCubano-Normal.otf'),
    });
    return true;
  } catch (error) {
    console.error('Error loading fonts:', error);
    return false;
  }
};
