import { useState } from 'react';
import { 
    LayoutDashboard, 
    TrendingUp, 
    Newspaper, 
    Settings, 
    LogOut, 
    HelpCircle, 
    Menu, 
    FileText,
    ChevronRight,
    Zap,
    BarChart3
} from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const [isMinimized, setIsMinimized] = useState(false);
    const location = useLocation();
    const { logout } = useAuthStore();

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/', color: 'text-blue-400' },
        { icon: TrendingUp, label: 'Trade Ideas', path: '/ideas', color: 'text-purple-400' },
        { icon: FileText, label: 'Fundamental Analysis', path: '/analysis', color: 'text-cyan-400' },
        { icon: Newspaper, label: 'Market News', path: '/news', color: 'text-green-400' },
        { icon: HelpCircle, label: 'Help & Guide', path: '/help', color: 'text-yellow-400' },
        { icon: Settings, label: 'Settings', path: '/settings', color: 'text-slate-400' },
    ];


    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            console.log('Logging out...');
            // Add your logout logic here
        }
    };

    return (
        <aside className={`
            h-screen ${isMinimized ? 'w-20' : 'w-72'} 
            bg-slate-900/95 backdrop-blur-2xl 
            border-r border-slate-700/50
            flex flex-col
            transition-all duration-300 ease-in-out
            relative
            shadow-2xl
        `}>
            {/* Decorative gradient line */}
            <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent" />
            
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-transparent opacity-50" />

            {/* Header/Logo Section */}
            <div className={`relative p-6 border-b border-slate-700/50 ${isMinimized ? 'px-4' : ''}`}>
                <div className="flex items-center justify-between">
                    {!isMinimized ? (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <TrendingUp className="text-white" size={22} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    HashTrade AI
                                </h1>
                                <p className="text-xs text-slate-500">Smart Trading Platform</p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mx-auto">
                            <TrendingUp className="text-white" size={22} />
                        </div>
                    )}
                    
                    {!isMinimized && (
                        <button
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors border border-slate-700/50 hover:border-blue-500/50"
                            title="Collapse sidebar"
                        >
                            <Menu size={18} className="text-slate-400" />
                        </button>
                    )}
                </div>
                
                {isMinimized && (
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="mt-4 w-full p-2 rounded-lg hover:bg-slate-800/50 transition-colors border border-slate-700/50 hover:border-blue-500/50"
                        title="Expand sidebar"
                    >
                        <Menu size={18} className="text-slate-400 mx-auto" />
                    </button>
                )}
            </div>

            {/* Navigation Items */}
            <nav className="relative flex-1 p-4 overflow-y-auto">
                <div className="space-y-2">
<nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center ${isMinimized ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors w-full ${isActive(item.path)
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                        title={isMinimized ? item.label : ''}
                    >
                        <item.icon size={20} />
                        {!isMinimized && <span>{item.label}</span>}
                    </Link>
                ))}
            </nav>
                </div>

                {/* Market Status Card */}
                {!isMinimized && (
                    <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 relative overflow-hidden">
                        {/* Animated pulse */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/20 rounded-full blur-2xl animate-pulse" />
                        
                        <div className="relative">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-green-400 font-semibold text-sm">Markets Open</span>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-xs">NIFTY 50</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-white font-semibold text-sm">24,850</span>
                                        <span className="text-green-400 text-xs">+0.58%</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-xs">SENSEX</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-white font-semibold text-sm">81,350</span>
                                        <span className="text-green-400 text-xs">+0.29%</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400 text-xs">BANK NIFTY</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-white font-semibold text-sm">52,100</span>
                                        <span className="text-red-400 text-xs">-0.16%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Stats for Minimized View */}
                {isMinimized && (
                    <div className="mt-6 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                            <BarChart3 size={18} className="text-green-400" />
                        </div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                )}

                {/* AI Features Badge */}
                {!isMinimized && (
                    <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-1">
                            <Zap size={16} className="text-purple-400" />
                            <span className="text-purple-400 font-semibold text-xs">AI Features</span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed">
                            Advanced AI-powered analysis and predictions
                        </p>
                    </div>
                )}
            </nav>

            {/* Logout Section */}
            <div className="relative p-4 border-t border-slate-700/50">
                <button
                    onClick={handleLogout}
                    className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl
                        text-slate-400 hover:text-red-400 
                        hover:bg-red-500/10 hover:border-red-500/30
                        transition-all border border-transparent
                        ${isMinimized ? 'justify-center' : ''}
                    `}
                    title={isMinimized ? 'Logout' : ''}
                >
                    <LogOut size={20} />
                    {!isMinimized && <span className="font-medium">Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;