import { useState } from 'react';
import { UserPlus, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { default: api } = await import('../api/axios');
            await api.post('/auth/register', { email, password });
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
            {/* Animated Stock Market Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                {/* Animated Chart Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                    <defs>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0 }} />
                            <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.8 }} />
                            <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0 }} />
                        </linearGradient>
                    </defs>

                    <path
                        d="M 0 350 Q 200 300, 400 330 T 800 300 L 1200 250 L 1600 290"
                        stroke="url(#grad2)"
                        strokeWidth="3"
                        fill="none"
                        className="animate-pulse"
                    />
                    <path
                        d="M 0 450 Q 200 430, 400 470 T 800 450 L 1200 410 L 1600 430"
                        stroke="url(#grad2)"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.5"
                    />
                </svg>

                {/* Floating Stock Tickers */}
                <div className="absolute top-10 left-10 bg-green-500/10 backdrop-blur-sm border border-green-500/30 px-4 py-2 rounded-lg text-green-400 text-sm font-mono animate-pulse">
                    MSFT +3.12%
                </div>
                <div className="absolute top-20 right-20 bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-lg text-purple-400 text-sm font-mono animate-pulse" style={{ animationDelay: '0.5s' }}>
                    NVDA +7.23%
                </div>
                <div className="absolute bottom-32 left-20 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 px-4 py-2 rounded-lg text-blue-400 text-sm font-mono animate-pulse" style={{ animationDelay: '1s' }}>
                    META +2.45%
                </div>
                <div className="absolute bottom-20 right-32 bg-pink-500/10 backdrop-blur-sm border border-pink-500/30 px-4 py-2 rounded-lg text-pink-400 text-sm font-mono animate-pulse" style={{ animationDelay: '1.5s' }}>
                    NFLX +1.78%
                </div>

                {/* Glowing Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Register Card */}
            <div className="relative z-10 w-full max-w-md">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl" />

                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl">
                    {/* Logo Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
                            <UserPlus className="text-white" size={32} />
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            Join HashTrade AI
                        </h2>
                        <p className="text-slate-400 text-sm mt-2">Start Your Trading Journey Today</p>
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
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                                    placeholder="trader@hashtrade.ai"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                                    placeholder="••••••••••••"
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                Must be at least 8 characters long
                            </p>
                        </div>

                        <div className="flex items-start text-sm">
                            <input
                                type="checkbox"
                                className="mr-2 mt-0.5 rounded bg-slate-800 border-slate-600"
                                required
                            />
                            <label className="text-slate-400">
                                I agree to the{' '}
                                <a href="#" className="text-purple-400 hover:text-purple-300 transition">
                                    Terms of Service
                                </a>
                                {' '}and{' '}
                                <a href="#" className="text-purple-400 hover:text-purple-300 transition">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-purple-500/25"
                        >
                            Create Account
                        </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-700/50">
                        <p className="text-center text-slate-400 text-sm">
                            Already have an account?{' '}
                            <a href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition">
                                Sign In
                            </a>
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="mt-6 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                            <span>Real-time market analysis</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                            <span>AI-powered trade recommendations</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                            <span>Advanced portfolio tracking</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;