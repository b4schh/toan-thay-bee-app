// api.js
import axios from 'axios';
import Config from 'react-native-config';
import applyRequestInterceptor from './requestInterceptor';
import applyResponseInterceptor from './responseInterceptor';

// Sử dụng biến môi trường hoặc đặt baseURL mặc định phù hợp với backend của bạn
const baseURL = Config.API_URL || 'http://192.168.0.106:3000/api';

const api = axios.create({
  baseURL,
  timeout: 10000,
});

console.log(
  '🚀 Axios Instance cho Mobile đã được khởi tạo với baseURL:',
  baseURL,
);

// Áp dụng interceptor nếu bạn cần xử lý các yêu cầu/phản hồi chung
applyRequestInterceptor(api);
applyResponseInterceptor(api);

export default api;
