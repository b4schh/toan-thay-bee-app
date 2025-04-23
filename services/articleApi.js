import api from './api';

export const getAllArticleAPI = async (data, token) => {
    const { 
        search = '', 
        currentPage = 1, 
        limit = 10, 
        sortOrder = 'desc',
        articleType = [],
        grade = null,
        chapter = []
    } = data || {};

    return await api.get('/v1/user/article', {
        params: {
            search,
            page: currentPage,
            limit,
            sortOrder,
            articleType,
            grade,
            chapter
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export const getArticleByIdAPI = async (data, token) => {
    const { id } = data;
    if (!id) {
        throw new Error('ID bài viết không hợp lệ');
    }

    return await api.get(`/v1/user/article/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
