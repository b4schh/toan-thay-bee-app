import AsyncStorage from '@react-native-async-storage/async-storage';
import { setErrorMessage, setLoading, setSuccessMessage } from '../features/state/stateApiSlice';

export const apiHandler = async (dispatch, apiFunc, params, successCallback, useSuccessMessage = true, setDelay = true) => {
    try {
        dispatch(setLoading(true));

        if (setDelay) {
            await new Promise((resolve) => setTimeout(resolve, 500));
        }

        // ✅ Lấy token từ AsyncStorage
        const token = await AsyncStorage.getItem('authToken');
        console.log(token);
        
        if (!token) {
            throw new Error("🚨 Bạn cần đăng nhập trước khi gọi API.");
        }
        
        // ✅ Gọi API và tự chèn token
        const response = await apiFunc(params, token);
        
        if (response.data?.message && useSuccessMessage) {
            dispatch(setSuccessMessage(response.data.message));
        }
        
        if (successCallback) {
            successCallback(response.data);
        }
        return response.data ? response.data : response;
    } catch (error) {
        const errorMsg = error.response ? error.response.data.message : error.message;
        console.error("🚨 Có lỗi xảy ra khi gọi API:", errorMsg);
        dispatch(setErrorMessage(errorMsg));
    } finally {
        dispatch(setLoading(false));
    }
};