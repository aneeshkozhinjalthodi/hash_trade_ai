import api from './axios';

export const agentApi = {
    runAgent: async (goal: string, context: any = {}) => {
        const response = await api.post('/agent/run', { goal, context });
        return response.data;
    },
    getTradeIdeas: async () => {
        const response = await api.get('/agent/ideas');
        return response.data;
    },
    clearTradeIdeas: async () => {
        const response = await api.delete('/agent/ideas');
        return response.data;
    },
    analyzeStock: async (symbol: string) => {
        const response = await api.get(`/agent/analyze/${symbol}`);
        return response.data;
    },
};
