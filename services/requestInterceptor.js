import AsyncStorage from '@react-native-async-storage/async-storage';

const applyRequestInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.request.use(
        async (config) => {
            // Lấy token từ AsyncStorage
            const token = await AsyncStorage.getItem('token');

            // Nếu có token, thêm vào header Authorization
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            console.log('📤 Request:', {
                method: config.method,
                url: config.url,
                headers: config.headers,
                data: config.data,
                params: config.params
            });

            return config;
        },
        (error) => {
            console.error('🚨 Request Error:', error);
            return Promise.reject(error);
        }
    );
};

export default applyRequestInterceptor;
