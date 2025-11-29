import React, { useEffect, useState } from 'react';
import { AlertTriangle, TrendingDown, ShieldCheck } from 'lucide-react';
import { agentApi } from '../../api/agent';

const RiskOverview: React.FC = () => {
    const [riskData, setRiskData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await agentApi.getRiskOverview();
                setRiskData(data);
            } catch (error) {
                console.error("Failed to fetch risk overview", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-slate-400">Loading risk data...</div>;
    if (!riskData) return <div className="text-red-400">Failed to load risk data.</div>;

    const pnlPercentage = Math.abs(riskData.currentPnL / riskData.dailyLossLimit) * 100;
    const drawdownPercentage = (riskData.currentDrawdown / riskData.maxDrawdown) * 100;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Loss Limit Card */}
            <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Daily Loss Limit</h3>
                        <p className="text-sm text-slate-400">Reset at 00:00 UTC</p>
                    </div>
                    <div className={`p - 2 rounded - lg ${riskData.status === 'WARNING' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'} `}>
                        {riskData.status === 'WARNING' ? <AlertTriangle className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                    </div>
                </div>

                <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-300">Current Loss</span>
                    <span className="text-red-400 font-mono">-${Math.abs(riskData.currentPnL)}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-4 mb-2 overflow-hidden">
                    <div
                        className={`h - full rounded - full transition - all duration - 500 ${pnlPercentage > 80 ? 'bg-red-500' : 'bg-blue-500'} `}
                        style={{ width: `${Math.min(pnlPercentage, 100)}% ` }}
                    ></div>
                </div>

                <div className="flex justify-between text-xs text-slate-500">
                    <span>0%</span>
                    <span>Limit: ${riskData.dailyLossLimit}</span>
                </div>

                {pnlPercentage > 80 && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <span className="text-sm text-red-200">Danger Zone: You are approaching your daily loss limit.</span>
                    </div>
                )}
            </div>

            {/* Max Drawdown Card */}
            <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Max Drawdown</h3>
                        <p className="text-sm text-slate-400">Peak-to-Trough Decline</p>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                        <TrendingDown className="w-6 h-6" />
                    </div>
                </div>

                <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-300">Current Drawdown</span>
                    <span className="text-orange-400 font-mono">-${riskData.currentDrawdown}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-4 mb-2 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-orange-500 transition-all duration-500"
                        style={{ width: `${Math.min(drawdownPercentage, 100)}% ` }}
                    ></div>
                </div>

                <div className="flex justify-between text-xs text-slate-500">
                    <span>0%</span>
                    <span>Max: ${riskData.maxDrawdown}</span>
                </div>
            </div>
        </div>
    );
};

export default RiskOverview;
