import { create } from 'zustand';
import api from '../api/axios';

interface User {
    id: number;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    login: (token: string) => {
        localStorage.setItem('token', token);
        set({ token, isAuthenticated: true });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ token: null, user: null, isAuthenticated: false });
    },
    fetchUser: async () => {
        try {
            const response = await api.get('/auth/me');
            set({ user: response.data });
        } catch (error) {
            console.error('Failed to fetch user', error);
            set({ token: null, user: null, isAuthenticated: false });
            localStorage.removeItem('token');
        }
    },
}));
