import { Bell, Search, User, Settings, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth';

const Navbar = () => {
    const [showProfile, setShowProfile] = useState(false);
    const { user } = useAuthStore();


    return (
        <header className="relative h-20 bg-slate-900/80 backdrop-blur-2xl border-b border-slate-700/50 shadow-lg">
            {/* Decorative gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            
            <div className="h-full px-6 flex items-center justify-between">
                {/* Left Section - Welcome Message */}
                <div className="flex items-center gap-4">
                    <div>
                        <p className="text-slate-400 text-sm">Welcome back,</p>
                        <p className="text-white font-semibold text-lg">
                            {user.name || ''}
                        </p>
                    </div>
                </div>

                {/* Center Section - Search Bar */}
                <div className="hidden md:flex flex-1 max-w-xl mx-8">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search stocks, sectors, or analysis..."
                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2.5 pl-10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    </div>
                </div>

                {/* Right Section - Actions */}
                <div className="flex items-center gap-3">
                    {/* Notifications */}
                    <button className="relative p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-blue-500/50 transition-all group">
                        <Bell size={20} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900" />
                    </button>

                    {/* Settings */}
                    <button className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-blue-500/50 transition-all group">
                        <Settings size={20} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                    </button>

                    {/* Divider */}
                    <div className="h-8 w-px bg-slate-700/50" />

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className="flex items-center gap-3 p-2 pr-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-blue-500/50 transition-all"
                        >
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                                {user.email[0].toUpperCase()}
                            </div>
                            <div className="hidden lg:block text-left">
                                <p className="text-white text-sm font-medium">{user.name}</p>
                                <p className="text-slate-400 text-xs">{user.email}</p>
                            </div>
                            <ChevronDown size={16} className={`text-slate-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {showProfile && (
                            <div className="absolute right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                                <div className="p-4 border-b border-slate-700/50 bg-gradient-to-br from-blue-500/10 to-purple-600/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                            {user.email[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">{user.name}</p>
                                            <p className="text-slate-400 text-xs">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-2">
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/50 text-slate-300 hover:text-white transition-all">
                                        <User size={18} />
                                        <span className="text-sm font-medium">My Profile</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/50 text-slate-300 hover:text-white transition-all">
                                        <Settings size={18} />
                                        <span className="text-sm font-medium">Settings</span>
                                    </button>
                                </div>

                                <div className="p-2 border-t border-slate-700/50">
                                    <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all">
                                        <span className="text-sm font-medium">Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden px-6 pb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2 pl-10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                </div>
            </div>
        </header>
    );
};

export default Navbar;