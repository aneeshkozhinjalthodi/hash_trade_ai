import api from './axios';

export const newsApi = {
    getLatestNews: async () => {
        const response = await api.get('/news/latest');
        return response.data;
    },
};
