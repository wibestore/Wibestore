import { Link } from 'react-router-dom';
import { Check, Crown, Star, Zap, Shield, TrendingUp, X } from 'lucide-react';
import { formatPrice } from '../data/mockData';

const PremiumPage = () => {
    const features = {
        free: [
            { text: 'Akkauntlarni sotish', included: true },
            { text: "10% komissiya", included: true },
            { text: 'Standart pozitsiya', included: true },
            { text: 'Asosiy statistika', included: true },
            { text: "Premium badge", included: false },
            { text: "Bosh sahifada ko'rinish", included: false },
            { text: 'Tezkor to\'lov', included: false },
            { text: 'Shaxsiy manager', included: false },
        ],
        premium: [
            { text: 'Akkauntlarni sotish', included: true },
            { text: "8% komissiya", included: true },
            { text: "Tavsiyalarda 3x ko'proq", included: true },
            { text: 'Premium ⭐ badge', included: true },
            { text: "Bosh sahifada ko'rinish", included: true },
            { text: "Qidiruvda yuqori pozitsiya", included: true },
            { text: 'Maxsus support', included: true },
            { text: 'Shaxsiy manager', included: false },
        ],
        pro: [
            { text: 'Akkauntlarni sotish', included: true },
            { text: "5% komissiya (standart 10%)", included: true },
            { text: "Eng yuqori pozitsiya", included: true },
            { text: 'VIP 💎 golden badge', included: true },
            { text: "Bosh sahifada birinchi", included: true },
            { text: 'Tezkor to\'lov (24 soat)', included: true },
            { text: 'Maxsus VIP support', included: true },
            { text: 'Shaxsiy manager', included: true },
        ],
    };

    const plans = [
        {
            id: 'free',
            name: 'Free',
            price: 0,
            icon: '🆓',
            description: 'Boshlash uchun',
            color: 'from-gray-400 to-gray-500',
            buttonClass: 'bg-slate-100 hover:bg-slate-200 text-gray-600',
            features: features.free
        },
        {
            id: 'premium',
            name: 'Premium',
            price: 99000,
            icon: '⭐',
            description: "Ko'proq ko'rinish",
            color: 'from-blue-500 to-blue-600',
            buttonClass: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90',
            features: features.premium
        },
        {
            id: 'pro',
            name: 'Pro',
            price: 249999,
            icon: '💎',
            description: 'Maksimal imkoniyatlar',
            color: 'from-yellow-400 to-orange-500',
            buttonClass: 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:opacity-90 text-black font-semibold',
            features: features.pro,
            popular: true
        }
    ];

    return (
        <div className="min-h-screen" style={{ paddingTop: '140px', paddingBottom: '64px' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col items-center mb-16">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-50 border border-yellow-300 rounded-full text-yellow-600 text-sm font-medium mb-6">
                        <Crown className="w-4 h-4" />
                        Premium obuna
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6" style={{ textAlign: 'center' }}>
                        Sotuvlaringizni <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">oshiring</span>
                    </h1>
                    <p className="text-lg text-gray-500" style={{ textAlign: 'center', maxWidth: '600px' }}>
                        Premium obuna bilan akkauntlaringiz ko&apos;proq ko&apos;rinadi, tezroq sotiladi va ko&apos;proq daromad keltiradi
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl ${plan.popular
                                ? 'border-yellow-400 shadow-lg shadow-yellow-500/10'
                                : 'border-slate-200 hover:border-blue-300'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-sm font-bold text-black">
                                    🔥 Eng mashhur
                                </div>
                            )}

                            {/* Icon & Name */}
                            <div className="text-center mb-8">
                                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                                    {plan.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                                <p className="text-gray-500 text-sm mt-1">{plan.description}</p>
                            </div>

                            {/* Price */}
                            <div className="text-center mb-8">
                                {plan.price > 0 ? (
                                    <>
                                        <span className="text-4xl font-bold text-gray-800">{formatPrice(plan.price)}</span>
                                        <span className="text-gray-500">/oy</span>
                                    </>
                                ) : (
                                    <span className="text-4xl font-bold text-gray-800">Bepul</span>
                                )}
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        {feature.included ? (
                                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                <Check className="w-3 h-3 text-green-600" />
                                            </div>
                                        ) : (
                                            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                                                <X className="w-3 h-3 text-gray-400" />
                                            </div>
                                        )}
                                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* Button */}
                            {plan.price > 0 ? (
                                <a
                                    href="https://t.me/amor_fati71"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`block text-center w-full py-4 rounded-xl font-semibold transition-all ${plan.buttonClass}`}
                                    style={plan.id === 'premium' ? { color: '#ffffff' } : {}}
                                >
                                    💬 Telegram orqali sotib olish
                                </a>
                            ) : (
                                <button
                                    disabled
                                    className={`w-full py-4 rounded-xl font-semibold transition-all ${plan.buttonClass} opacity-50 cursor-not-allowed`}
                                >
                                    Hozirgi reja
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Benefits Section */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 lg:p-12 mb-16 shadow-lg shadow-blue-500/20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>Premium afzalliklari</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)' }}>Nima uchun sotuvchilar Premium tanlaydi?</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: TrendingUp,
                                title: "3x ko'proq ko'rinish",
                                description: "Akkauntlaringiz tavsiyalarda va qidiruvda ko'proq chiqadi",
                            },
                            {
                                icon: Zap,
                                title: "Tezkor sotish",
                                description: "Premium sotuvchilar o'rtacha 2x tezroq sotadi",
                            },
                            {
                                icon: Shield,
                                title: "Ishonch badge'i",
                                description: "Xaridorlar Premium sotuvchilarga ko'proq ishonadi",
                            },
                            {
                                icon: Star,
                                title: 'Yuqori pozitsiya',
                                description: "Bosh sahifa va qidiruv natijalarida birinchi bo'ling",
                            }
                        ].map((benefit, index) => (
                            <div key={index} className="flex flex-col items-center text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                                <div className="w-14 h-14 mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
                                    <benefit.icon className="w-7 h-7" style={{ color: '#ffffff' }} />
                                </div>
                                <h3 className="text-lg font-semibold mb-2" style={{ color: '#ffffff' }}>{benefit.title}</h3>
                                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Methods */}
                <div style={{ textAlign: 'center' }}>
                    <h3 className="text-xl font-semibold text-gray-800 mb-8">To&apos;lov usullari</h3>
                    <div className="flex items-center justify-center gap-6 flex-wrap">
                        {[
                            { name: 'payme', bg: '#00CCCC', text: 'white' },
                            { name: 'Click', bg: '#0095FF', text: 'white' },
                            { name: 'PAYNET', bg: '#FFFFFF', text: '#00A651', border: true },
                            { name: 'UZCARD', bg: '#0066B3', text: 'white' },
                            { name: 'HUMO', bg: '#FFFFFF', text: '#B8860B', border: true },
                        ].map((pm) => (
                            <div key={pm.name} className={`px-6 py-4 bg-white rounded-xl hover:shadow-md transition-all border ${pm.border ? 'border-slate-200' : 'border-slate-200'}`}>
                                <span className="font-bold text-lg" style={{ color: pm.text === 'white' ? pm.bg : pm.text }}>{pm.name}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-gray-500 text-sm mt-8">Obuna har oy avtomatik uzaytiriladi. Istalgan vaqt bekor qilish mumkin.</p>
                </div>
            </div>
        </div>
    );
};

export default PremiumPage;
