import { useState } from "react";

// SVG Icons Component
const SvgIcons = {
    TrendingUp: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
    ),
    Shield: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
    ),
    Zap: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
    ),
    Users: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    ),
    BarChart3: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18"></path>
            <path d="M18 17V9"></path>
            <path d="M13 17V5"></path>
            <path d="M8 17v-3"></path>
        </svg>
    ),
    Cpu: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
            <rect x="9" y="9" width="6" height="6"></rect>
            <line x1="9" y1="1" x2="9" y2="4"></line>
            <line x1="15" y1="1" x2="15" y2="4"></line>
            <line x1="9" y1="20" x2="9" y2="23"></line>
            <line x1="15" y1="20" x2="15" y2="23"></line>
            <line x1="20" y1="9" x2="23" y2="9"></line>
            <line x1="20" y1="14" x2="23" y2="14"></line>
            <line x1="1" y1="9" x2="4" y2="9"></line>
            <line x1="1" y1="14" x2="4" y2="14"></line>
        </svg>
    ),
    ArrowRight: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
    ),
    Play: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
    ),
    Star: ({ className = "" }) => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={className}
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    ),
    Scale: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M2 12h20"></path>
            <path d="M2 12a10 10 0 0 1 20 0"></path>
        </svg>
    ),
    Eye: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    ),
    Check: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    ),
    Lock: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    )
};

// Animated Background Component
const AnimatedBackground = () => (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
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

            {/* Animated stock chart line */}
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
        <div className="absolute top-10 left-10 bg-green-500/10 backdrop-blur-sm border border-green-500/30 px-4 py-2 rounded-lg text-green-400 text-sm font-mono animate-pulse">
            AAPL +2.34%
        </div>
        <div className="absolute top-20 right-20 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 px-4 py-2 rounded-lg text-blue-400 text-sm font-mono animate-pulse" style={{ animationDelay: '0.5s' }}>
            TSLA +5.67%
        </div>
        <div className="absolute bottom-32 left-20 bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 px-4 py-2 rounded-lg text-purple-400 text-sm font-mono animate-pulse" style={{ animationDelay: '1s' }}>
            GOOGL +1.89%
        </div>
        <div className="absolute bottom-20 right-32 bg-red-500/10 backdrop-blur-sm border border-red-500/30 px-4 py-2 rounded-lg text-red-400 text-sm font-mono animate-pulse" style={{ animationDelay: '1.5s' }}>
            AMZN -0.45%
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
);

// Navigation Component
const Navigation = () => (
    <nav className="relative z-20 py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <SvgIcons.TrendingUp />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    HashTrade AI
                </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
                <a href="#pricing" className="text-slate-300 hover:text-white transition">Pricing</a>
                <a href="#testimonials" className="text-slate-300 hover:text-white transition">Testimonials</a>
            </div>

            <div className="flex items-center space-x-4">
                <a href="/login" className="text-slate-300 hover:text-white transition">Sign In</a>
                <a href="/register" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all duration-200">
                    Start Trading
                </a>
            </div>
        </div>
    </nav>
);

// Hero Section Component
const HeroSection = ({ }) => {
    const stats = [
        { number: "99.8%", label: "Risk Management Accuracy" },
        { number: "24/7", label: "Auto-Hedging Protection" },
        { number: "100k+", label: "Scalable User Capacity" },
        { number: "0.01s", label: "Trade Execution Speed" }
    ];

    return (
        <section className="relative z-10 pt-20 pb-32 px-8">
            <div className="max-w-7xl mx-auto text-center">
                <div className={`transition-all duration-1000 transform translate-y-0 opacity-100`}>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            AI-Powered
                        </span>
                        <br />
                        <span className="text-white">Trading Intelligence</span>
                    </h1>

                    <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Transform every investor into a disciplined, data-driven, risk-aware trader with
                        our comprehensive AI safety layer.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <a
                            href="#pricing"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/25"
                        >
                            View Pricing Plans
                            <SvgIcons.ArrowRight />
                        </a>
                        <button className="border border-slate-600 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/50 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 flex items-center gap-2">
                            <SvgIcons.Play />
                            Watch Demo
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl">
                                <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.number}</div>
                                <div className="text-slate-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Features Section Component
const FeaturesSection = () => {
    const coreFeatures = [
        {
            icon: <SvgIcons.Zap />,
            title: "AI-Driven Trade Recommendations",
            description: "Intelligent trade signals powered by advanced machine learning algorithms"
        },
        {
            icon: <SvgIcons.Shield />,
            title: "Auto-Risk-Management",
            description: "The Safety Layer that protects your capital with automated risk controls"
        },
        {
            icon: <SvgIcons.Cpu />,
            title: "Automated Hedging Engine",
            description: "Retail-focused hedging strategies to minimize downside risk"
        },
        {
            icon: <SvgIcons.BarChart3 />,
            title: "Personalized Trading Dashboard",
            description: "Customized interface showing your portfolio performance and insights"
        },
        {
            icon: <SvgIcons.Eye />,
            title: "Explainable AI + Full Transparency",
            description: "Understand every trade decision with clear, explainable AI reasoning"
        },
        {
            icon: <SvgIcons.Scale />,
            title: "Built for Scale",
            description: "Enterprise-grade infrastructure supporting 100k+ retail users simultaneously"
        }
    ];

    return (
        <section id="features" className="relative z-10 py-20 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">The Complete AI Safety Layer</h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Six powerful components working together to protect and enhance your trading performance
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coreFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 p-8 rounded-2xl hover:border-blue-500/50 transition-all duration-300 group hover:transform hover:-translate-y-2"
                        >
                            <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-500/20">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Pricing Section Component
const PricingSection = () => {
    const pricingPlans = [
        {
            name: "Primary",
            price: "₹149",
            period: "month",
            description: "AI insights + dashboard",
            popular: false,
            features: [
                "AI Trade Recommendations",
                "Basic Dashboard",
                "Real-time Market Data",
                "Email Support",
                "Community Access"
            ],
            buttonText: "Get Started",
            gradient: "from-gray-600 to-gray-700"
        },
        {
            name: "Pro",
            price: "₹499",
            period: "month",
            description: "Auto-risk + Auto-hedging",
            popular: true,
            features: [
                "Everything in Primary",
                "Auto-Risk Management",
                "Automated Hedging Engine",
                "Priority Support",
                "Advanced Analytics",
                "Portfolio Protection"
            ],
            buttonText: "Start Trading",
            gradient: "from-blue-500 to-purple-600"
        },
        {
            name: "Elite",
            price: "₹999",
            period: "month",
            description: "Advanced AI & portfolio coaching",
            popular: false,
            features: [
                "Everything in Pro",
                "1-on-1 Portfolio Coaching",
                "Advanced AI Algorithms",
                "24/7 Phone Support",
                "Custom Strategies",
                "Dedicated Account Manager"
            ],
            buttonText: "Go Elite",
            gradient: "from-purple-500 to-pink-600"
        }
    ];

    return (
        <section id="pricing" className="relative z-10 py-20 px-8 bg-slate-900/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Choose Your Trading Plan</h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Start with AI insights or go pro with automated risk management and hedging
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-slate-900/80 backdrop-blur-2xl border ${plan.popular
                                ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20 scale-105'
                                : 'border-slate-700/50'
                                } rounded-3xl p-8 transition-all duration-300 hover:scale-105`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline justify-center gap-1 mb-2">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-slate-400">/{plan.period}</span>
                                </div>
                                <p className="text-slate-400">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <SvgIcons.Check />
                                        </div>
                                        <span className="text-slate-300 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white font-semibold py-4 rounded-xl transition-all duration-200`}
                            >
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Trust Badges */}
                <div className="text-center mt-12">
                    <p className="text-slate-400 mb-6">Trusted by 50,000+ traders worldwide</p>
                    <div className="flex flex-wrap justify-center gap-8 text-slate-400 text-sm">
                        <div className="flex items-center gap-2">
                            <SvgIcons.Shield />
                            <span>Bank-level Security</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <SvgIcons.Zap />
                            <span>Real-time Execution</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <SvgIcons.Eye />
                            <span>SEBI Registered</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Testimonials Section Component
const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Professional Trader",
            content: "The automated hedging engine saved my portfolio during market volatility. Game-changing protection.",
            rating: 5
        },
        {
            name: "Mike Rodriguez",
            role: "Hedge Fund Manager",
            content: "Finally, AI that explains its reasoning. The transparency builds trust in every trade.",
            rating: 5
        },
        {
            name: "Emily Watson",
            role: "Retail Investor",
            content: "Went from emotional trading to disciplined, data-driven decisions. Life-changing platform.",
            rating: 5
        }
    ];

    return (
        <section id="testimonials" className="relative z-10 py-20 px-8 bg-slate-900/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Trusted by Disciplined Traders</h2>
                    <p className="text-xl text-slate-300">Join investors who transformed their trading with AI discipline</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 p-8 rounded-2xl"
                        >
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <SvgIcons.Star
                                        key={i}
                                        className={i < testimonial.rating ? "text-yellow-400" : "text-slate-600"}
                                    />
                                ))}
                            </div>
                            <p className="text-slate-300 mb-6 italic">"{testimonial.content}"</p>
                            <div>
                                <div className="font-semibold text-white">{testimonial.name}</div>
                                <div className="text-slate-400 text-sm">{testimonial.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// CTA Section Component
const CTASection = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        alert(`Thank you! We'll contact you at ${email}`);
        setEmail("");
    };

    return (
        <section className="relative z-10 py-20 px-8">
            <div className="max-w-4xl mx-auto text-center">
                <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 p-12 rounded-3xl">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Trade with AI Discipline?
                    </h2>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of investors who transformed emotional trading into data-driven success.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="flex-1 bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 whitespace-nowrap"
                        >
                            Get Started Free
                        </button>
                    </form>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 px-3 py-1.5 rounded-full">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-green-400 font-medium">Markets Open</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 px-3 py-1.5 rounded-full">
                            <SvgIcons.Shield />
                            <span className="text-blue-400">AI Protection Active</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-800/50 border border-slate-600/50 px-3 py-1.5 rounded-full">
                            <SvgIcons.Scale />
                            <span className="text-slate-400">50,000+ Active Traders</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => (
    <footer className="relative z-10 py-8 px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <SvgIcons.TrendingUp />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        HashTrade AI
                    </span>
                </div>

                <div className="text-slate-400 text-sm">
                    © 2024 HashTrade AI. Transforming emotional investors into disciplined traders. Trading involves risk.
                </div>
            </div>
        </div>
    </footer>
);

// Main App Component
export default function LandingPage() {
    return (
        <div className="min-h-screen relative overflow-hidden">
            <AnimatedBackground />
            <Navigation />
            <HeroSection />
            <FeaturesSection />
            <PricingSection />
            <TestimonialsSection />
            <CTASection />
            <Footer />
        </div>
    );
}