import { TrendingUp, DollarSign, Activity, BarChart3, ArrowUpRight, ArrowDownRight, Zap, Target } from 'lucide-react';
import { useAuthStore } from '../store/auth';

const Dashboard = () => {
    const { user } = useAuthStore();

    const stats = [
        {
            label: 'Total P&L',
            value: '+₹12,450',
            change: '+5.2%',
            changeType: 'up',
            icon: DollarSign,
            iconBg: 'from-green-500 to-emerald-600',
            glowColor: 'bg-green-500/20'
        },
        {
            label: 'Active Positions',
            value: '4',
            change: '2 New',
            changeType: 'neutral',
            icon: Activity,
            iconBg: 'from-blue-500 to-cyan-600',
            glowColor: 'bg-blue-500/20'
        },
        {
            label: 'Win Rate',
            value: '68%',
            change: '+2.1%',
            changeType: 'up',
            icon: TrendingUp,
            iconBg: 'from-purple-500 to-pink-600',
            glowColor: 'bg-purple-500/20'
        },
    ];

    const recentActivities = [
        { id: 1, action: 'Trade Executed', symbol: 'TATASTEEL', type: 'BUY', qty: 100, price: 124.50, time: '2h ago' },
        { id: 2, action: 'Trade Executed', symbol: 'RELIANCE', type: 'SELL', qty: 50, price: 2850.75, time: '5h ago' },
        { id: 3, action: 'Trade Executed', symbol: 'INFY', type: 'BUY', qty: 75, price: 1520.30, time: '1d ago' },
    ];

    const marketData = [
        { index: 'NIFTY 50', value: '24,850.00', change: '+142.50', percent: '+0.58%', isUp: true },
        { index: 'BANK NIFTY', value: '52,100.00', change: '-85.20', percent: '-0.16%', isUp: false },
        { index: 'SENSEX', value: '81,350.00', change: '+235.80', percent: '+0.29%', isUp: true },
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
            {/* Animated Background */}
            <div className="absolute inset-0">
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
                <div className="absolute top-20 right-20 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 px-4 py-2 rounded-lg text-blue-400 text-sm font-mono animate-pulse" style={{ animationDelay: '0.5s' }}>
                    SENSEX +0.29%
                </div>

                {/* Glowing Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <BarChart3 className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Dashboard
                            </h2>
                            <p className="text-slate-400 text-sm">Welcome back, {user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.label} className="relative group">
                                <div className={`absolute -top-2 -left-2 w-20 h-20 ${stat.glowColor} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                                <div className={`absolute -bottom-2 -right-2 w-20 h-20 ${stat.glowColor} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />

                                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-slate-400 text-sm font-medium mb-2">{stat.label}</p>
                                            <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                {stat.value}
                                            </h3>
                                        </div>
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.iconBg} shadow-lg`}>
                                            <Icon size={24} className="text-white" />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 pt-4 border-t border-slate-700/50">
                                        {stat.changeType === 'up' && (
                                            <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/30 px-2 py-1 rounded-lg">
                                                <ArrowUpRight size={14} className="text-green-400" />
                                                <span className="text-green-400 text-xs font-semibold">{stat.change}</span>
                                            </div>
                                        )}
                                        {stat.changeType === 'down' && (
                                            <div className="flex items-center gap-1 bg-red-500/10 border border-red-500/30 px-2 py-1 rounded-lg">
                                                <ArrowDownRight size={14} className="text-red-400" />
                                                <span className="text-red-400 text-xs font-semibold">{stat.change}</span>
                                            </div>
                                        )}
                                        {stat.changeType === 'neutral' && (
                                            <div className="flex items-center gap-1 bg-blue-500/10 border border-blue-500/30 px-2 py-1 rounded-lg">
                                                <Zap size={14} className="text-blue-400" />
                                                <span className="text-blue-400 text-xs font-semibold">{stat.change}</span>
                                            </div>
                                        )}
                                        <span className="text-slate-500 text-xs">vs last month</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 w-20 h-20 bg-blue-500/20 rounded-full blur-xl" />

                        <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-b border-slate-700/50 p-6">
                                <div className="flex items-center gap-2">
                                    <Activity className="text-blue-400" size={20} />
                                    <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    {recentActivities.map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 hover:border-blue-500/30 transition-all cursor-pointer group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-slate-600/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Target className="text-blue-400" size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                                        {activity.action}: {activity.symbol}
                                                    </p>
                                                    <p className="text-sm text-slate-400">
                                                        <span className={activity.type === 'BUY' ? 'text-green-400' : 'text-red-400'}>
                                                            {activity.type}
                                                        </span> {activity.qty} Qty @ ₹{activity.price}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-sm text-slate-500">{activity.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Market Overview */}
                    <div className="relative">
                        <div className="absolute -top-2 -right-2 w-20 h-20 bg-purple-500/20 rounded-full blur-xl" />

                        <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border-b border-slate-700/50 p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="text-purple-400" size={20} />
                                    <h3 className="text-xl font-bold text-white">Market Overview</h3>
                                </div>
                                <p className="text-slate-400 text-sm">
                                    Markets showing strong momentum. Tech sector leading gains with institutional support.
                                </p>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    {marketData.map((market, index) => (
                                        <div
                                            key={index}
                                            className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 hover:border-purple-500/30 transition-all"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-slate-400 text-sm font-medium">{market.index}</p>
                                                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${market.isUp
                                                        ? 'bg-green-500/10 border border-green-500/30'
                                                        : 'bg-red-500/10 border border-red-500/30'
                                                    }`}>
                                                    {market.isUp ? (
                                                        <ArrowUpRight size={14} className="text-green-400" />
                                                    ) : (
                                                        <ArrowDownRight size={14} className="text-red-400" />
                                                    )}
                                                    <span className={`text-xs font-semibold ${market.isUp ? 'text-green-400' : 'text-red-400'
                                                        }`}>
                                                        {market.percent}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-baseline gap-2">
                                                <p className="text-2xl font-bold text-white">{market.value}</p>
                                                <p className={`text-sm font-medium ${market.isUp ? 'text-green-400' : 'text-red-400'
                                                    }`}>
                                                    {market.change}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Quick Action */}
                                <div className="mt-6 pt-6 border-t border-slate-700/50">
                                    <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-purple-500/25">
                                        View Detailed Analysis
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;