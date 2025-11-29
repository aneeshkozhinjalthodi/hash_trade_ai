import React, { useEffect, useState } from 'react';
import { Brain, Zap, Clock } from 'lucide-react';
import { agentApi } from '../../api/agent';

const BehaviorMonitor: React.FC = () => {
    const [alerts, setAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await agentApi.analyzeBehavior();
                // Backend returns list of BehaviorAlert objects
                const mappedAlerts = data.map((a: any, index: number) => ({
                    id: index,
                    type: a.alert_type,
                    message: a.message,
                    action: a.suggested_action,
                    severity: a.severity
                }));
                setAlerts(mappedAlerts);
            } catch (error) {
                console.error("Failed to analyze behavior", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-slate-400">Monitoring behavior...</div>;

    return (
        <div className="space-y-6">
            <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                    <Brain className="w-6 h-6 text-purple-400" />
                    <h2 className="text-xl font-bold text-white">Behavioral Analysis</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className={`p-5 rounded-xl border relative overflow-hidden ${alert.severity === 'BLOCK'
                                ? 'bg-red-500/10 border-red-500/30'
                                : 'bg-purple-500/10 border-purple-500/30'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className={`p-2 rounded-lg ${alert.severity === 'BLOCK' ? 'bg-red-500/20 text-red-400' : 'bg-purple-500/20 text-purple-400'
                                    }`}>
                                    {alert.type === 'REVENGE_TRADING' ? <Zap className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${alert.severity === 'BLOCK' ? 'bg-red-500/20 text-red-400' : 'bg-purple-500/20 text-purple-400'
                                    }`}>
                                    {alert.severity}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2">{alert.type.replace('_', ' ')}</h3>
                            <p className="text-slate-300 text-sm mb-4">{alert.message}</p>

                            <div className="flex items-center space-x-2 text-sm font-medium">
                                <span className="text-slate-400">Suggested Action:</span>
                                <span className={alert.severity === 'BLOCK' ? 'text-red-400' : 'text-purple-400'}>
                                    {alert.action.replace('_', ' ')}
                                </span>
                            </div>

                            {/* Cool-down Timer Mock */}
                            {alert.severity === 'BLOCK' && (
                                <div className="mt-4 pt-4 border-t border-red-500/20">
                                    <div className="flex justify-between text-xs text-red-300 mb-1">
                                        <span>Cool-down Active</span>
                                        <span>14:30 remaining</span>
                                    </div>
                                    <div className="w-full bg-red-900/30 rounded-full h-2">
                                        <div className="bg-red-500 h-full rounded-full w-1/2 animate-pulse"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BehaviorMonitor;
