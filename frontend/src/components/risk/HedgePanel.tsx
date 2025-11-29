import React, { useEffect, useState } from 'react';
import { Shield, ArrowRight, TrendingUp } from 'lucide-react';
import { agentApi } from '../../api/agent';

const HedgePanel: React.FC = () => {
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await agentApi.getHedgeSuggestions();
                // Backend returns list of HedgeSuggestion objects
                const mappedSuggestions = data.map((s: any, index: number) => ({
                    id: index,
                    action: s.suggested_action,
                    symbol: s.symbol,
                    quantity: s.quantity,
                    reason: s.rationale,
                    priority: s.priority
                }));
                setSuggestions(mappedSuggestions);
            } catch (error) {
                console.error("Failed to fetch hedges", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-slate-400">Analyzing portfolio for hedges...</div>;

    return (
        <div className="space-y-6">
            <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                    <Shield className="w-6 h-6 text-green-400" />
                    <h2 className="text-xl font-bold text-white">Smart Hedge Suggestions</h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {suggestions.map((suggestion) => (
                        <div key={suggestion.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-blue-500/50 transition-colors group">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center space-x-4">
                                    <div className={`p - 3 rounded - xl ${suggestion.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                                        } `}>
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                                            <span>{suggestion.action.replace('_', ' ')}</span>
                                            <span className="text-slate-500 text-sm">x {suggestion.quantity}</span>
                                        </h3>
                                        <p className="text-slate-400 text-sm mt-1">{suggestion.reason}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <span className="block text-xl font-mono font-bold text-blue-400">{suggestion.symbol}</span>
                                    <span className={`text - xs px - 2 py - 1 rounded - full ${suggestion.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                                        } `}>
                                        {suggestion.priority} PRIORITY
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-700 flex justify-end">
                                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-blue-600/20">
                                    <span>Execute Hedge</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HedgePanel;
