import React, { useEffect, useState } from 'react';
import { Activity, AlertOctagon, AlertTriangle } from 'lucide-react';
import { agentApi } from '../../api/agent';

const DerivativeScanner: React.FC = () => {
    const [alerts, setAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await agentApi.scanDerivatives();
                // Map backend response to frontend alert format if needed
                // Assuming backend returns { critical_alerts: [], warnings: [] }
                const mappedAlerts = [
                    ...(data.critical_alerts || []).map((msg: string) => ({ id: Math.random(), type: 'CRITICAL_RISK', message: msg, severity: 'CRITICAL', symbol: 'PORTFOLIO' })),
                    ...(data.warnings || []).map((msg: string) => ({ id: Math.random(), type: 'WARNING', message: msg, severity: 'WARNING', symbol: 'PORTFOLIO' }))
                ];
                setAlerts(mappedAlerts);
            } catch (error) {
                console.error("Failed to scan derivatives", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-slate-400">Scanning positions...</div>;

    return (
        <div className="space-y-6">
            <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                    <Activity className="w-6 h-6 text-blue-400" />
                    <h2 className="text-xl font-bold text-white">F&O Position Scanner</h2>
                </div>

                <div className="space-y-4">
                    {alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={`p-4 rounded-xl border flex items-start space-x-4 ${alert.severity === 'CRITICAL'
                                ? 'bg-red-500/10 border-red-500/30'
                                : alert.severity === 'HIGH'
                                    ? 'bg-orange-500/10 border-orange-500/30'
                                    : 'bg-yellow-500/10 border-yellow-500/30'
                                }`}
                        >
                            <div className={`p-2 rounded-lg ${alert.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                                alert.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                                    'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                {alert.severity === 'CRITICAL' ? <AlertOctagon className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className={`font-semibold ${alert.severity === 'CRITICAL' ? 'text-red-400' :
                                        alert.severity === 'HIGH' ? 'text-orange-400' :
                                            'text-yellow-400'
                                        }`}>
                                        {alert.type.replace('_', ' ')}
                                    </h3>
                                    <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">
                                        {alert.symbol}
                                    </span>
                                </div>
                                <p className="text-slate-300 text-sm">{alert.message}</p>
                            </div>

                            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">
                                Fix Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DerivativeScanner;
