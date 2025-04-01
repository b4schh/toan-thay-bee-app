const applyResponseInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.response.use(
        (response) => {
            console.log('📥 Response:', {
                url: response.config?.url,
                status: response.status,
                data: response.data,
                headers: response.headers,
            });

            return response;
        },
        (error) => {
            const status = error?.response?.status;
            const errorData = error?.response?.data;
            const requestURL = error?.config?.url;

            console.error('🚨 Response Error:', {
                status,
                url: requestURL,
                error: errorData || error.message,
            });

            if (status === 401) {
                console.warn('🔒 Unauthorized! Redirecting to login...');
                redirectToLogin(); // RouterService gọi router.replace('/login') chẳng hạn
            }

            return Promise.reject(error);
        }
    );
};

export default applyResponseInterceptor;
