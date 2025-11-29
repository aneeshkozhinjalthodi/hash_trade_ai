import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import TradeIdeas from '../pages/TradeIdeas';
import News from '../pages/News';
import Settings from '../pages/Settings';
import Layout from '../components/layout/Layout';

// --- AUTH HELPERS ---
const isAuthenticated = () => Boolean(localStorage.getItem("token"));

// --- PROTECTED ROUTE ---
const ProtectedRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

// --- PUBLIC ROUTE (prevents logged-in from accessing login/register) ---
const PublicRoute = () => {
    return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* PUBLIC ROUTES */}
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* PROTECTED ROUTES */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/trade-ideas" element={<TradeIdeas />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                </Route>

                {/* CATCH ALL INVALID URLS */}
                <Route
                    path="*"
                    element={
                        isAuthenticated()
                            ? <Navigate to="/dashboard" replace />
                            : <Navigate to="/login" replace />
                    }
                />

            </Routes>
        </BrowserRouter>
    );
};
