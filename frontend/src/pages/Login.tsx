import { useState } from "react";
import { TrendingUp, BarChart3, Lock } from "lucide-react";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
        const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, fetchUser } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Direct axios call or authApi wrapper. I'll use direct axios for simplicity here or create authApi.
            // Let's assume authApi exists or use fetch.
            // I'll use the api instance from axios.ts
            const formData = new URLSearchParams();
            formData.append('username', email);
            formData.append('password', password);

            // Dynamic import to avoid circular dependency if I put it in api/auth.ts
            const { default: api } = await import('../api/axios');

            const response = await api.post('/auth/login', formData, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            login(response.data.access_token);
            await fetchUser();
            navigate('/');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden p-5 m-1">
            {/* Animated Stock Market Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                {/* Animated Chart Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }} />
                            <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                            <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0 }} />
                        </linearGradient>
                    </defs>

                    {/* Animated stock chart line */}
                    <path
                        d="M 0 300 Q 200 250, 400 280 T 800 250 L 1200 200 L 1600 240"
                        stroke="url(#grad1)"
                        strokeWidth="3"
                        fill="none"
                        className="animate-pulse"
                    />
                    <path
                        d="M 0 400 Q 200 380, 400 420 T 800 400 L 1200 360 L 1600 380"
                        stroke="url(#grad1)"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.5"
                    />
                </svg>

                {/* Floating Stock Tickers */}
                <div className="absolute top-10 left-10 bg-green-500/10 backdrop-blur-sm border border-green-500/30 px-4 py-2 rounded-lg text-green-400 text-sm font-mono animate-pulse">
                    AAPL +2.34%
                </div>
                <div className="absolute top-20 right-20 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 px-4 py-2 rounded-lg text-blue-400 text-sm font-mono animate-pulse" style={{ animationDelay: '0.5s' }}>
                    TSLA +5.67%
                </div>
                <div className="absolute bottom-32 left-20 bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-lg text-purple-400 text-sm font-mono animate-pulse" style={{ animationDelay: '1s' }}>
                    GOOGL +1.89%
                </div>
                <div className="absolute bottom-20 right-32 bg-red-500/10 backdrop-blur-sm border border-red-500/30 px-4 py-2 rounded-lg text-red-400 text-sm font-mono animate-pulse" style={{ animationDelay: '1.5s' }}>
                    AMZN -0.45%
                </div>

                {/* Glowing Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />

                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl">
                    {/* Logo Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                            <TrendingUp className="text-white" size={32} />
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            HashTrade AI
                        </h2>
                        <p className="text-slate-400 text-sm mt-2">AI-Powered Stock Market Intelligence</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-6 text-sm flex items-center gap-2">
                            <Lock size={16} />
                            {error}
                        </div>
                    )}

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                                placeholder="trader@hashtrade.ai"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                                placeholder="••••••••••••"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-slate-400 cursor-pointer">
                                <input type="checkbox" className="mr-2 rounded bg-slate-800 border-slate-600" />
                                Remember me
                            </label>
                            <a href="#" className="text-blue-400 hover:text-blue-300 transition">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/25"
                        >
                            Sign In to Trading
                        </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-700/50">
                        <p className="text-center text-slate-400 text-sm">
                            New to HashTrade AI?{" "}
                            <a href="/register" className="text-blue-400 hover:text-blue-300 font-medium transition">
                                Create Account
                            </a>
                        </p>
                    </div>

                    {/* Market Status Badge */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-xs">
                        <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 px-3 py-1.5 rounded-full">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-green-400 font-medium">Markets Open</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-600/50 px-3 py-1.5 rounded-full">
                            <BarChart3 size={12} className="text-slate-400" />
                            <span className="text-slate-400">S&P 500: 4,582.23</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;