import api from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllClassesByUser = async ({ search = "", currentPage = 1, limit = 10, sortOrder = 'asc' }) => {
    const token = await AsyncStorage.getItem('authToken'); // 🔥 Lấy token
    if (!token) {
        console.error("🚨 Không tìm thấy token! Người dùng chưa đăng nhập.");
        throw new Error("Bạn cần đăng nhập trước khi lấy danh sách lớp.");
    }
    return api.get("/v1/user/class/joined", {
        params: { search, page: currentPage, limit, sortOrder },
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getDetailClassByUser = async ({ classId }) => {
    const token = await AsyncStorage.getItem('authToken'); // 🔥 Lấy token
    if (!token) {
        console.error("🚨 Không tìm thấy token! Người dùng chưa đăng nhập.");
        throw new Error("Bạn cần đăng nhập trước khi lấy danh sách lớp.");
    }
    return api.get(`/v1/user/class/${classId}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
}