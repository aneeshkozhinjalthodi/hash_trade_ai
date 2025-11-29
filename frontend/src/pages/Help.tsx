import { BookOpen, TrendingUp, AlertTriangle, Info, Target, Shield, Lightbulb, ChevronRight } from 'lucide-react';

const Help = () => {
    const terms = [
        {
            title: "Symbol & Company Name",
            icon: Info,
            iconColor: "text-blue-400",
            iconBg: "from-blue-500 to-cyan-600",
            description: "The stock ticker symbol (e.g., RELIANCE) and the full name of the company. This identifies which asset the trade idea is for."
        },
        {
            title: "Direction (BUY / SELL)",
            icon: TrendingUp,
            iconColor: "text-green-400",
            iconBg: "from-green-500 to-emerald-600",
            description: "The recommended action. 'BUY' means the AI suggests purchasing the stock, expecting the price to rise. 'SELL' means selling, expecting the price to fall."
        },
        {
            title: "Time Horizon",
            icon: Target,
            iconColor: "text-purple-400",
            iconBg: "from-purple-500 to-pink-600",
            description: "The expected duration of the trade. 'Intraday' means buying and selling within the same day. 'Swing' means holding for a few days to weeks."
        },
        {
            title: "AI Analysis / Explanation",
            icon: Lightbulb,
            iconColor: "text-yellow-400",
            iconBg: "from-yellow-500 to-orange-600",
            description: "The reasoning behind the trade idea. This includes news sentiment, technical indicators (like Moving Averages), and market trends analyzed by the AI."
        },
        {
            title: "Max Qty (Maximum Quantity)",
            icon: AlertTriangle,
            iconColor: "text-orange-400",
            iconBg: "from-orange-500 to-red-600",
            description: "The maximum number of shares the AI recommends buying. This is calculated based on your risk profile and daily loss limits to prevent over-exposure."
        },
        {
            title: "Risk Notes",
            icon: AlertTriangle,
            iconColor: "text-red-400",
            iconBg: "from-red-500 to-pink-600",
            description: "Important warnings about potential risks. This might mention volatility, upcoming earnings reports, or stop-loss suggestions to protect your capital."
        },
        {
            title: "Diversification",
            icon: TrendingUp,
            iconColor: "text-teal-400",
            iconBg: "from-teal-500 to-cyan-600",
            description: "The strategy of spreading your investments across different sectors (e.g., Tech, Pharma, Banking) to reduce risk. 'Don't put all your eggs in one basket'."
        },
        {
            title: "Educational Tip",
            icon: BookOpen,
            iconColor: "text-pink-400",
            iconBg: "from-pink-500 to-purple-600",
            description: "A general trading lesson or best practice related to this specific trade idea, helping you learn while you trade."
        }
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
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
                        <BookOpen className="text-white" size={32} />
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        Understanding Your Trade Cards
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        A simple guide to the terms and data presented in your AI-generated trade ideas.
                    </p>
                </div>

                {/* Terms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {terms.map((term, index) => {
                        const Icon = term.icon;
                        return (
                            <div key={index} className="relative group">
                                <div className="absolute -top-2 -left-2 w-20 h-20 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${term.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                                            <Icon className="text-white" size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                                                {term.title}
                                            </h3>
                                            <p className="text-slate-300 text-sm leading-relaxed">
                                                {term.description}
                                            </p>
                                        </div>
                                        <ChevronRight 
                                            size={20} 
                                            className="text-slate-600 group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" 
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Tips Section */}
                <div className="relative mb-12">
                    <div className="absolute -top-2 -left-2 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
                    
                    <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border-b border-slate-700/50 p-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                                    <Lightbulb className="text-white" size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-white">Quick Trading Tips</h3>
                            </div>
                        </div>
                        
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { tip: "Always use stop-loss orders to limit potential losses", icon: Shield },
                                    { tip: "Never invest more than you can afford to lose", icon: AlertTriangle },
                                    { tip: "Diversify across different sectors and assets", icon: Target },
                                    { tip: "Keep learning and stay updated with market trends", icon: BookOpen },
                                ].map((item, idx) => {
                                    const TipIcon = item.icon;
                                    return (
                                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition-colors">
                                            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                                <TipIcon size={16} className="text-purple-400" />
                                            </div>
                                            <p className="text-slate-300 text-sm">{item.tip}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="relative">
                    <div className="absolute -top-2 -right-2 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
                    
                    <div className="relative bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                <Info className="text-blue-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Important Disclaimer</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    HashTrade AI provides educational trade ideas based on AI analysis. These are not financial mandates.
                                    Always conduct your own research and consult with a qualified financial advisor before making investment decisions.
                                    Trading involves risk and you may lose your entire investment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;