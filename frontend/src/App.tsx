import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import TradeIdeas from './pages/TradeIdeas';
import News from './pages/News';
import Help from './pages/Help';
import Settings from './pages/Settings';
import FundamentalAnalysis from './pages/FundamentalAnalysis';
import LandingPage from './pages/LandingPage';

function App() {
    const { isAuthenticated, fetchUser } = useAuthStore();

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path='/' element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" />} />
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
                <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />

                {/* Protected routes */}
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/ideas" element={isAuthenticated ? <TradeIdeas /> : <Navigate to="/login" />} />
                    <Route path="/news" element={isAuthenticated ? <News /> : <Navigate to="/login" />} />
                    <Route path="/analysis" element={isAuthenticated ? <FundamentalAnalysis /> : <Navigate to="/login" />} />
                    <Route path="/help" element={isAuthenticated ? <Help /> : <Navigate to="/login" />} />
                    <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
                </Route>

                {/* Redirect root to appropriate page based on auth status */}
                <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />} />
            </Routes>
        </Router>
    );
}

export default App;