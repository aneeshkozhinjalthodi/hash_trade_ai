import { useEffect, useState } from 'react';
import { TrendingUp, AlertTriangle, BookOpen, Sparkles, Trash2, PlusCircle, Calendar, Target, Shield } from 'lucide-react';
import { agentApi } from '../api/agent';

const TradeIdeas = () => {
    const [ideas, setIdeas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const data = await agentApi.getTradeIdeas();
                setIdeas(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchIdeas();
    }, []);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            await agentApi.runAgent('Generate bulk ideas for top 10 stocks', {});
            const data = await agentApi.getTradeIdeas();
            setIdeas(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const handleClearAll = () => {
        if (window.confirm('Are you sure you want to clear all ideas?')) {
            setLoading(true);
            setTimeout(() => {
                setIdeas([]);
                setLoading(false);
            }, 500);
        }
    };

    // Group ideas by date
    const groupedIdeas = ideas.reduce((groups: Record<string, any[]>, idea) => {
        const date = new Date(idea.created_at).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(idea);
        return groups;
    }, {} as Record<string, any[]>);

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
                    BANKNIFTY +0.89%
                </div>

                {/* Glowing Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <Sparkles className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    AI Trade Ideas
                                </h2>
                                <p className="text-slate-400 text-sm">AI-powered swing trading opportunities</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleClearAll}
                                disabled={loading || ideas.length === 0}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                <Trash2 size={18} />
                                Clear All
                            </button>
                            <button
                                onClick={handleGenerate}
                                disabled={loading}
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/25 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Analyzing Market...
                                    </>
                                ) : (
                                    <>
                                        <PlusCircle size={18} />
                                        Generate New Idea
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Trade Ideas */}
                <div className="space-y-10">
                    {Object.entries(groupedIdeas).map(([date, groupIdeas]) => (
                        <div key={date} className="space-y-6">
                            {/* Date Header */}
                            <div className="flex items-center gap-3">
                                <Calendar className="text-blue-400" size={20} />
                                <h3 className="text-lg font-semibold text-slate-300">{date}</h3>
                                <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
                            </div>

                            {/* Ideas Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {groupIdeas.map((idea) => (
                                    <div key={idea.id} className="relative group">
                                        <div className="absolute -top-2 -left-2 w-20 h-20 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                                            {/* Header */}
                                            <div className="flex justify-between items-start mb-5">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                            {idea.symbol}
                                                        </h3>
                                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${idea.direction === 'BUY'
                                                                ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                                                                : 'bg-red-500/10 text-red-400 border border-red-500/30'
                                                            }`}>
                                                            {idea.direction}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-400">{idea.company_name}</p>
                                                </div>
                                                <div className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-600/50 px-2.5 py-1 rounded-lg">
                                                    <Target size={12} className="text-slate-400" />
                                                    <span className="text-xs font-medium text-slate-400">{idea.time_horizon}</span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                                                    <TrendingUp size={18} className="mt-0.5 flex-shrink-0 text-blue-400" />
                                                    <div>
                                                        <p className="text-xs font-semibold text-blue-400 mb-1">ANALYSIS</p>
                                                        <p className="text-sm text-slate-300 leading-relaxed">{idea.explanation}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                                                    <AlertTriangle size={18} className="mt-0.5 flex-shrink-0 text-yellow-400" />
                                                    <div>
                                                        <p className="text-xs font-semibold text-yellow-400 mb-1">RISK MANAGEMENT</p>
                                                        <p className="text-sm text-slate-300 leading-relaxed">{idea.risk_notes}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/5 border border-purple-500/10">
                                                    <BookOpen size={18} className="mt-0.5 flex-shrink-0 text-purple-400" />
                                                    <div>
                                                        <p className="text-xs font-semibold text-purple-400 mb-1">LEARNING TIP</p>
                                                        <p className="text-sm text-slate-300 italic leading-relaxed">{idea.educational_tip}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer Badge */}
                                            <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-center gap-2">
                                                <Shield size={12} className="text-slate-500" />
                                                <span className="text-xs text-slate-500">AI-Generated Trade Idea</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {ideas.length === 0 && (
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />

                            <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-16 shadow-2xl text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl mb-6">
                                    <Sparkles className="text-blue-400" size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">No Trade Ideas Yet</h3>
                                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                                    Start by generating AI-powered trade ideas based on real-time market analysis and technical indicators.
                                </p>
                                <button
                                    onClick={handleGenerate}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/25"
                                >
                                    <PlusCircle size={20} />
                                    Generate First Idea
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TradeIdeas;