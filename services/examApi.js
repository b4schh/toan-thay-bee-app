import api from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllPublicExamAPI = async ({ 
    search = "", 
    currentPage = 1, 
    limit = 10, 
    sortOrder = 'desc' 
}) => {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
        console.error("🚨 Không tìm thấy token! Người dùng chưa đăng nhập.");
        throw new Error("Bạn cần đăng nhập trước khi lấy danh sách đề thi.");
    }
    
    return api.get("/v1/user/exam", {
        params: {
            search: search.trim(), // Trim whitespace từ search term
            page: currentPage,
            limit,
            sortOrder,
        },
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getExamById = async ({ examId }) => {
    const token = await AsyncStorage.getItem('authToken'); // 🔥 Lấy token
    if (!token) {
        console.error("🚨 Không tìm thấy token! Người dùng chưa đăng nhập.");
        throw new Error("Bạn cần đăng nhập trước khi xem chi tiết đề thi.");
    }
    return api.get(`/v1/exams/${examId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
