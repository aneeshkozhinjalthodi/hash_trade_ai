import React, { useState } from 'react';
import { Shield, Activity, Brain, Eye } from 'lucide-react';
import RiskOverview from '../components/risk/RiskOverview';
import DerivativeScanner from '../components/risk/DerivativeScanner';
import HedgePanel from '../components/risk/HedgePanel';
import BehaviorMonitor from '../components/risk/BehaviorMonitor';
import IntegrityScanner from '../components/risk/IntegrityScanner';

const RiskSafetyDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Risk Overview', icon: Shield },
        { id: 'derivatives', label: 'F&O Scanner', icon: Activity },
        { id: 'hedging', label: 'Auto-Hedging', icon: Shield },
        { id: 'behavior', label: 'Behavior AI', icon: Brain },
        { id: 'integrity', label: 'Fraud Scanner', icon: Eye },
    ];

    return (
        <div className="min-h-screen bg-background text-white p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Risk & Safety Command Center
                    </h1>
                    <p className="text-slate-400 mt-2">
                        AI-powered protection system: Risk Limits, F&O Scanning, and Behavioral Analysis.
                    </p>
                </header>

                {/* Navigation Tabs */}
                <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="animate-in fade-in duration-500">
                    {activeTab === 'overview' && <RiskOverview />}
                    {activeTab === 'derivatives' && <DerivativeScanner />}
                    {activeTab === 'hedging' && <HedgePanel />}
                    {activeTab === 'behavior' && <BehaviorMonitor />}
                    {activeTab === 'integrity' && <IntegrityScanner />}
                </div>
            </div>
        </div>
    );
};

export default RiskSafetyDashboard;
