import { useState } from 'react';
import { User, Mail, Shield, Save, Bell, Lock, Palette, Globe, Check, SlidersHorizontal } from 'lucide-react';
import { useAuthStore } from '../store/auth';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const { user } = useAuthStore();

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'preferences', label: 'Preferences', icon: Palette },
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
                </svg>

                {/* Glowing Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <SlidersHorizontal className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Settings
                            </h2>
                            <p className="text-slate-400 text-sm">Manage your account and preferences</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Tabs Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="relative">
                            <div className="absolute -top-2 -left-2 w-20 h-20 bg-blue-500/20 rounded-full blur-xl" />

                            <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-4 shadow-xl">
                                <div className="space-y-2">
                                    {tabs.map((tab) => {
                                        const Icon = tab.icon;
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`
                                                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                                                    transition-all duration-200 group
                                                    ${isActive
                                                        ? 'bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/30 text-white'
                                                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent'
                                                    }
                                                `}
                                            >
                                                <Icon size={18} className={isActive ? 'text-blue-400' : ''} />
                                                <span className="font-medium text-sm">{tab.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        <div className="relative">
                            <div className="absolute -top-2 -right-2 w-24 h-24 bg-purple-500/20 rounded-full blur-xl" />

                            <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
                                {/* Profile Tab */}
                                {activeTab === 'profile' && (
                                    <>
                                        <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-b border-slate-700/50 p-6">
                                            <h3 className="text-xl font-bold text-white">Profile Information</h3>
                                            <p className="text-slate-400 text-sm mt-1">Manage your personal information and account details</p>
                                        </div>

                                        <div className="p-6 space-y-6">
                                            {/* Profile Picture */}
                                            <div className="flex items-center gap-6">
                                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                                                    {user?.email?.[0]?.toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <button className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                                                        Change Avatar
                                                    </button>
                                                    <p className="text-slate-500 text-xs mt-2">JPG, PNG or GIF. Max 2MB</p>
                                                </div>
                                            </div>

                                            {/* Name Field */}
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    defaultValue={user?.name || ''}
                                                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                                                />
                                            </div>

                                            {/* Email Field */}
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                                    <Mail size={16} className="text-blue-400" />
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    value={user?.email || ''}
                                                    disabled
                                                    className="w-full bg-slate-800/30 border border-slate-600/30 rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed"
                                                />
                                                <p className="text-slate-500 text-xs mt-2">Email cannot be changed</p>
                                            </div>

                                            {/* Role Badge */}
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                                    <Shield size={16} className="text-purple-400" />
                                                    Account Role
                                                </label>
                                                <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-600/50 px-4 py-2.5 rounded-xl">
                                                    {user?.is_superuser ? (
                                                        <>
                                                            <div className="w-2 h-2 bg-purple-400 rounded-full" />
                                                            <span className="text-purple-400 font-semibold text-sm">Super Admin</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                                            <span className="text-blue-400 font-semibold text-sm">Trader</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Save Button */}
                                            <div className="pt-4 border-t border-slate-700/50">
                                                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/25">
                                                    <Save size={18} />
                                                    Update Profile
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Notifications Tab */}
                                {activeTab === 'notifications' && (
                                    <>
                                        <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-b border-slate-700/50 p-6">
                                            <h3 className="text-xl font-bold text-white">Notification Preferences</h3>
                                            <p className="text-slate-400 text-sm mt-1">Choose what notifications you want to receive</p>
                                        </div>

                                        <div className="p-6 space-y-4">
                                            {[
                                                { label: 'Trade Idea Alerts', desc: 'Get notified when new AI trade ideas are generated' },
                                                { label: 'Market News Updates', desc: 'Receive updates about important market news' },
                                                { label: 'Price Alerts', desc: 'Get notified when stocks reach target prices' },
                                                { label: 'Email Notifications', desc: 'Receive email summaries of your activity' },
                                            ].map((item, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-colors">
                                                    <div>
                                                        <p className="text-white font-medium">{item.label}</p>
                                                        <p className="text-slate-400 text-sm">{item.desc}</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" defaultChecked={idx < 2} />
                                                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-600"></div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* Security Tab */}
                                {activeTab === 'security' && (
                                    <>
                                        <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-b border-slate-700/50 p-6">
                                            <h3 className="text-xl font-bold text-white">Security Settings</h3>
                                            <p className="text-slate-400 text-sm mt-1">Manage your password and security options</p>
                                        </div>

                                        <div className="p-6 space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="Enter current password"
                                                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="Enter new password"
                                                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="Confirm new password"
                                                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                                                />
                                            </div>
                                            <div className="pt-4 border-t border-slate-700/50">
                                                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/25">
                                                    <Lock size={18} />
                                                    Update Password
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Preferences Tab */}
                                {activeTab === 'preferences' && (
                                    <>
                                        <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-b border-slate-700/50 p-6">
                                            <h3 className="text-xl font-bold text-white">Application Preferences</h3>
                                            <p className="text-slate-400 text-sm mt-1">Customize your trading experience</p>
                                        </div>

                                        <div className="p-6 space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                                    <Palette size={16} className="text-purple-400" />
                                                    Theme
                                                </label>
                                                <select className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition">
                                                    <option>Dark Mode (Current)</option>
                                                    <option>Light Mode</option>
                                                    <option>Auto (System)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                                    <Globe size={16} className="text-blue-400" />
                                                    Language
                                                </label>
                                                <select className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition">
                                                    <option>English (US)</option>
                                                    <option>हिन्दी</option>
                                                    <option>తెలుగు</option>
                                                </select>
                                            </div>
                                            <div className="pt-4 border-t border-slate-700/50">
                                                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/25">
                                                    <Check size={18} />
                                                    Save Preferences
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;