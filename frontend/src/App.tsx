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

function App() {
    const { isAuthenticated, fetchUser } = useAuthStore();

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
                <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />

                <Route element={<Layout />}>
                    <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/dashboard" element={<Navigate to="/" replace />} />
                    <Route path="/ideas" element={isAuthenticated ? <TradeIdeas /> : <Navigate to="/login" />} />
                    <Route path="/news" element={isAuthenticated ? <News /> : <Navigate to="/login" />} />
                    <Route path="/analysis" element={isAuthenticated ? <FundamentalAnalysis /> : <Navigate to="/login" />} />
                    <Route path="/help" element={isAuthenticated ? <Help /> : <Navigate to="/login" />} />
                    <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
