import { useEffect, useState } from 'react';
import { newsApi } from '../api/news';
import { Calendar, ExternalLink, Newspaper, TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react';

const News = () => {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Mock news data


    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await newsApi.getLatestNews();
                setNews(data);
                setError(null);
            } catch (err: any) {
                console.error(err);
                setError('Failed to load news. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);
    
    const getSentimentConfig = (sentiment) => {
        switch (sentiment?.toLowerCase()) {
            case 'positive':
                return {
                    color: 'bg-green-500/10 text-green-400 border-green-500/30',
                    icon: TrendingUp,
                    iconColor: 'text-green-400'
                };
            case 'negative':
                return {
                    color: 'bg-red-500/10 text-red-400 border-red-500/30',
                    icon: TrendingDown,
                    iconColor: 'text-red-400'
                };
            default:
                return {
                    color: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
                    icon: Minus,
                    iconColor: 'text-slate-400'
                };
        }
    };

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
                    LIVE UPDATES
                </div>

                {/* Glowing Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Newspaper className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Market News
                            </h2>
                            <p className="text-slate-400 text-sm">Latest updates from the financial world</p>
                        </div>
                    </div>
                </div>

                {/* News Grid */}
                <div className="space-y-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-slate-700/50 border-t-blue-500 rounded-full animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles className="text-blue-400 animate-pulse" size={24} />
                                </div>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-500/20 rounded-full blur-2xl" />
                            <div className="relative bg-red-500/10 backdrop-blur-sm border border-red-500/30 text-red-400 p-6 rounded-xl flex items-center gap-3 shadow-lg">
                                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                                    <span className="text-xl">⚠️</span>
                                </div>
                                <span className="font-medium">{error}</span>
                            </div>
                        </div>
                    ) : news.length === 0 ? (
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
                            <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-16 shadow-2xl text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl mb-6">
                                    <Newspaper className="text-blue-400" size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">No News Available</h3>
                                <p className="text-slate-400">Check back later for the latest market updates.</p>
                            </div>
                        </div>
                    ) : (
                        news.map((item, index) => {
                            const sentimentConfig = getSentimentConfig(item.sentiment_score);
                            const SentimentIcon = sentimentConfig.icon;
                            
                            return (
                                <div key={item.id} className="relative group">
                                    <div className="absolute -top-2 -left-2 w-20 h-20 bg-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                    
                                    <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden">
                                        {/* Decorative gradient bar */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        <div className="p-6">
                                            {/* Header */}
                                            <div className="flex justify-between items-start gap-4 mb-4">
                                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight flex-1">
                                                    {item.title}
                                                </h3>
                                                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border whitespace-nowrap ${sentimentConfig.color}`}>
                                                    <SentimentIcon size={14} />
                                                    <span className="text-xs font-bold">{item.sentiment_score || 'Neutral'}</span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <p className="text-slate-300 leading-relaxed mb-6">
                                                {item.content}
                                            </p>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between text-sm pt-4 border-t border-slate-700/50">
                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center gap-2 text-slate-400">
                                                        <Calendar size={16} className="text-blue-400" />
                                                        <span>
                                                            {new Date(item.published_at).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                                                        <span className="font-medium text-slate-400">{item.source}</span>
                                                    </div>
                                                </div>
                                                
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium transition-colors group/link"
                                                >
                                                    Read More
                                                    <ExternalLink 
                                                        size={16} 
                                                        className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" 
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Load More Button */}
                {news.length > 0 && (
                    <div className="mt-8 text-center">
                        <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/25">
                            Load More News
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;