import React, { useEffect, useState } from 'react';
import { Eye, TrendingUp, Users } from 'lucide-react';
import { agentApi } from '../../api/agent';

const IntegrityScanner: React.FC = () => {
    const [alerts, setAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Scanning a default watchlist for demo
                const data = await agentApi.scanFraud('RELIANCE');
                // Backend returns list of FraudAlert objects
                const mappedAlerts = data.map((a: any, index: number) => ({
                    id: index,
                    type: a.alert_type,
                    symbol: 'RELIANCE', // Hardcoded for this call
                    details: a.details,
                    risk_level: a.risk_level,
                    evidence: a.evidence
                }));
                setAlerts(mappedAlerts);
            } catch (error) {
                console.error("Failed to scan for fraud", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-slate-400">Scanning market integrity...</div>;

    return (
        <div className="space-y-6">
            <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                    <Eye className="w-6 h-6 text-pink-400" />
                    <h2 className="text-xl font-bold text-white">Market Integrity Scanner</h2>
                </div>

                <div className="space-y-4">
                    {alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={`p - 6 rounded - xl border flex flex - col md: flex - row items - start md: items - center space - y - 4 md: space - y - 0 md: space - x - 6 ${alert.risk_level === 'CRITICAL'
                                ? 'bg-red-500/10 border-red-500/30'
                                : 'bg-pink-500/10 border-pink-500/30'
                                } `}
                        >
                            <div className={`p - 3 rounded - full ${alert.risk_level === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-pink-500/20 text-pink-400'
                                } `}>
                                {alert.type === 'PUMP_DUMP' ? <TrendingUp className="w-6 h-6" /> : <Users className="w-6 h-6" />}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <h3 className="text-lg font-bold text-white">{alert.type.replace('_', ' & ')}</h3>
                                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-sm font-mono">
                                        {alert.symbol}
                                    </span>
                                    <span className={`text - xs font - bold px - 2 py - 1 rounded - full ${alert.risk_level === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-pink-500/20 text-pink-400'
                                        } `}>
                                        {alert.risk_level} RISK
                                    </span>
                                </div>
                                <p className="text-slate-300">{alert.details}</p>

                                {/* Evidence Tags */}
                                <div className="flex gap-2 mt-3">
                                    {Object.entries(alert.evidence).map(([key, value]) => (
                                        <span key={key} className="text-xs bg-slate-900/50 text-slate-400 px-2 py-1 rounded border border-slate-700">
                                            {key.replace('_', ' ')}: <span className="text-white font-mono">{String(value)}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-medium transition-colors whitespace-nowrap">
                                View Report
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IntegrityScanner;
