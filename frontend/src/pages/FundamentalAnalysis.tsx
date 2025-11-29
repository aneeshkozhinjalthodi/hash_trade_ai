import { useState } from 'react';
import { Search, FileText, Briefcase, TrendingUp, BarChart3, Target, Award, AlertCircle } from 'lucide-react';

const FundamentalAnalysis = () => {
    const [symbol, setSymbol] = useState('');
    const [analysis, setAnalysis] = useState<{ symbol: string; analysis: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAnalyze = () => {
        if (!symbol) return;

        setLoading(true);
        setError('');
        setAnalysis(null);

        // Simulate API call
        setTimeout(() => {
            setAnalysis({
                symbol: symbol,
                analysis: `# Executive Summary

The fundamental analysis of **${symbol}** reveals a company with strong market positioning and solid financial metrics. The stock demonstrates robust growth potential backed by consistent revenue expansion and improving operational efficiency.

## Financial Performance

The company has shown **impressive revenue growth** of 23% YoY, with EBITDA margins expanding to 18.5%. Net profit has increased by 31%, indicating strong operational leverage and cost management.

### Key Metrics:
- **P/E Ratio**: 24.5x (Industry Average: 21.2x)
- **ROE**: 18.7%
- **Debt-to-Equity**: 0.45
- **Free Cash Flow**: ₹2,340 Cr

## Business Analysis

The company operates in a high-growth sector with significant tailwinds. Market share has expanded from 12% to 15% over the past year, demonstrating competitive strength and execution capability.

### Strengths:
- Strong brand recognition and customer loyalty
- Diversified revenue streams across multiple segments
- Experienced management team with proven track record
- Robust R&D pipeline with innovative products

### Risks:
- Increasing competition from new market entrants
- Regulatory changes in key markets
- Currency fluctuation exposure
- Supply chain dependencies

## Valuation

At current levels, the stock trades at a **premium valuation** compared to peers, justified by superior growth metrics and market positioning. The DCF-based fair value suggests **moderate upside** from current levels.

## Investment Recommendation

**HOLD** - The stock shows strong fundamentals but current valuation limits immediate upside. Consider accumulating on dips below ₹1,450 levels for long-term wealth creation.`
            });
            setLoading(false);
        }, 2000);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAnalyze();
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

                <div className="absolute top-20 right-20 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 px-4 py-2 rounded-lg text-blue-400 text-sm font-mono animate-pulse" style={{ animationDelay: '0.5s' }}>
                    SENSEX +0.89%
                </div>
                <div className="absolute bottom-32 left-20 bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-lg text-purple-400 text-sm font-mono animate-pulse" style={{ animationDelay: '1s' }}>
                    BANK NIFTY +2.15%
                </div>

                {/* Glowing Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <TrendingUp className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Fundamental Analysis Agent
                            </h2>
                            <p className="text-slate-400 text-sm">AI-Powered Deep Dive into Company Fundamentals</p>
                        </div>
                    </div>
                </div>

                {/* Search Card */}
                <div className="relative mb-8">
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />

                    <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={symbol}
                                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter Stock Symbol (e.g., RELIANCE, INFY, TCS)"
                                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-6 py-4 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-lg"
                                />
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            </div>
                            <button
                                onClick={handleAnalyze}
                                disabled={loading || !symbol}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Analyzing...
                                    </span>
                                ) : (
                                    'Analyze Stock'
                                )}
                            </button>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-6 pt-6 border-t border-slate-700/50 flex flex-wrap items-center justify-center gap-3 text-xs">
                            <div className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-600/50 px-3 py-1.5 rounded-full">
                                <BarChart3 size={12} className="text-slate-400" />
                                <span className="text-slate-400">S&P 500: 4,582.23</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 px-3 py-1.5 rounded-full">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-green-400 font-medium">Markets Open</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-600/50 px-3 py-1.5 rounded-full">
                                <Target size={12} className="text-slate-400" />
                                <span className="text-slate-400">Real-time Analysis</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-8 bg-red-500/10 backdrop-blur-sm border border-red-500/30 text-red-400 p-4 rounded-xl flex items-center gap-3 shadow-lg">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                {/* Analysis Results */}
                {analysis && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        {/* Main Analysis Card */}
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />

                            <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                                {/* Header */}
                                <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-b border-slate-700/50 p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                <FileText className="text-white" size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white">
                                                    Analysis Report: <span className="text-blue-400">{analysis.symbol}</span>
                                                </h3>
                                                <p className="text-slate-400 text-sm">Comprehensive Fundamental Analysis</p>
                                            </div>
                                        </div>
                                        <div className="bg-slate-800/50 border border-slate-600/50 px-4 py-2 rounded-lg">
                                            <span className="text-slate-400 text-xs">Generated by</span>
                                            <div className="text-blue-400 font-semibold">AI Agent</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Analysis Content */}
                                <div className="p-8">
                                    <div className="prose prose-invert max-w-none">
                                        {analysis.analysis.split('\n').map((line: string, idx: number) => {
                                            if (line.startsWith('# ')) {
                                                return <h1 key={idx} className="text-3xl font-bold text-white mb-4 mt-8 first:mt-0">{line.replace('# ', '')}</h1>;
                                            } else if (line.startsWith('## ')) {
                                                return <h2 key={idx} className="text-2xl font-bold text-blue-400 mb-3 mt-6">{line.replace('## ', '')}</h2>;
                                            } else if (line.startsWith('### ')) {
                                                return <h3 key={idx} className="text-xl font-semibold text-purple-400 mb-2 mt-4">{line.replace('### ', '')}</h3>;
                                            } else if (line.startsWith('- ')) {
                                                return <li key={idx} className="text-slate-300 ml-4">{line.replace('- ', '')}</li>;
                                            } else if (line.trim() === '') {
                                                return <br key={idx} />;
                                            } else {
                                                return <p key={idx} className="text-slate-300 leading-relaxed mb-4">{line}</p>;
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Data Sources Card */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="relative">
                                <div className="absolute -top-2 -left-2 w-20 h-20 bg-blue-500/20 rounded-full blur-xl" />
                                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-6 shadow-xl">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Briefcase className="text-blue-400" size={20} />
                                        <h4 className="text-lg font-semibold text-white">Data Sources Used</h4>
                                    </div>
                                    <ul className="space-y-3">
                                        {[
                                            { label: 'Company Filings & Results', color: 'bg-green-400' },
                                            { label: 'Earnings Call Transcripts', color: 'bg-blue-400' },
                                            { label: 'Shareholding Patterns', color: 'bg-purple-400' },
                                            { label: 'Bulk / Block Deals', color: 'bg-pink-400' },
                                            { label: 'Sector Fundamentals', color: 'bg-yellow-400' }
                                        ].map((source, idx) => (
                                            <li key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer">
                                                <div className={`w-2 h-2 ${source.color} rounded-full flex-shrink-0`} />
                                                <span className="text-slate-300 text-sm">{source.label}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute -top-2 -right-2 w-20 h-20 bg-purple-500/20 rounded-full blur-xl" />
                                <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-6 shadow-xl">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Award className="text-purple-400" size={20} />
                                        <h4 className="text-lg font-semibold text-white">Analysis Features</h4>
                                    </div>
                                    <ul className="space-y-3">
                                        {[
                                            'Financial Metrics Analysis',
                                            'Business Model Evaluation',
                                            'Competitive Positioning',
                                            'Risk Assessment',
                                            'Valuation & Recommendation'
                                        ].map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer">
                                                <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                                                <span className="text-slate-300 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FundamentalAnalysis;