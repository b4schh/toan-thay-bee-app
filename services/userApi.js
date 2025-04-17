import api from "./api";

export const getAllUsersAPI = ({ search = "", currentPage = 1, limit = 10, sortOrder = 'desc' }) => {
    return api.get("/v1/admin/user", {
        params: {
            search,
            page: currentPage,
            limit,
            sortOrder,
        }
    });
};

export const getUserByIdAPI = (id) => {
    return api.get(`/v1/admin/user/${id}`);
};

export const putUserAPI = ({id , user}) => {
    return api.put(`/v1/admin/user/${id}`, user);
}

export const putUserTypeAPI = ({id , type}) => {
    return api.put(`/v1/admin/user/${id}/user-type`, {userType: type});
}

export const putUserStatusAPI = ({id , status}) => {
    return api.put(`/v1/admin/user/${id}/status`, {status});
}

// Đổi mật khẩu người dùng
export const changePasswordAPI = ({ oldPassword, newPassword, confirmPassword }) => {
    return api.put('/v1/user/password', {
        oldPassword,
        newPassword,
        confirmPassword,
    });
};

// Đổi avatar người dùng
export const changeAvatarAPI = (formData) => {
    // formData là FormData chứa file avatar
    return api.put('/v1/user/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};