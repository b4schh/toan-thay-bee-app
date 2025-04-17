import AsyncStorage from '@react-native-async-storage/async-storage';

let routerInstance = null;

export const setRouter = (router) => {
  routerInstance = router;
};

export const redirectToLogin = () => {
  console.warn('🔒 Unauthorized! Redirecting to login...');
  if (routerInstance) {
    routerInstance.replace('/login');
  } else {
    console.warn('⚠️ Router chưa sẵn sàng!');
  }
};