import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coins, Gift, Clock, ShoppingBag, TrendingUp, HelpCircle, ChevronRight, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCoins } from '../context/CoinContext';

const CoinsPage = () => {
    const { user, isAuthenticated } = useAuth();
    const { balance, monthlyEarned, monthlyTransactions, history, COINS_PER_TRANSACTION, MAX_MONTHLY_TRANSACTIONS, PREMIUM_COST_IN_COINS, getVoucherDiscount } = useCoins();
    const [activeTab, setActiveTab] = useState('about');

    // Demo vouchers - in real app would come from user's data
    const vouchers = [
        { id: 1, type: 'premium', discount: 50, expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), status: 'active' },
        { id: 2, type: 'pro', discount: 20, expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), status: 'active' },
    ];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('uz-UZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getDaysLeft = (dateString) => {
        const diff = new Date(dateString) - new Date();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
                <div className="text-center">
                    <Coins className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">Kirish talab etiladi</h1>
                    <p className="text-gray-400 mb-6">Coinlar va vaucherlarni ko'rish uchun tizimga kiring</p>
                    <Link to="/login" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-semibold">
                        Kirish
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm mb-4">
                        <Coins className="w-4 h-4" />
                        <span>Coin Tizimi</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                        🪙 Coinlar va Vaucherlar
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Akkaunt sotib oling yoki soting — coin yig'ing va chegirmalar oling!
                    </p>
                </div>

                {/* Balance Card */}
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-500/30 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                                <Coins className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Sizning balansingiz</p>
                                <p className="text-4xl font-semibold text-gray-800">{balance} <span className="text-yellow-400">Coin</span></p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <div className="bg-white/5 rounded-xl px-4 py-3">
                                <p className="text-xs text-gray-500">Bu oy yig'ildi</p>
                                <p className="text-lg font-bold text-green-400">+{monthlyEarned} coin</p>
                            </div>
                            <div className="bg-white/5 rounded-xl px-4 py-3">
                                <p className="text-xs text-gray-500">Tranzaksiyalar</p>
                                <p className="text-lg font-semibold text-gray-800">{monthlyTransactions}/{MAX_MONTHLY_TRANSACTIONS}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {[
                        { id: 'about', label: 'Qanday ishlaydi?', icon: HelpCircle },
                        { id: 'vouchers', label: 'Vaucherlarim', icon: Gift },
                        { id: 'history', label: 'Tarix', icon: Clock },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                : 'bg-white border-slate-200 text-gray-500 hover:text-blue-600'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="bg-white border-slate-200 rounded-2xl border border-slate-200 p-6">
                    {activeTab === 'about' && (
                        <div className="space-y-8">
                            {/* How to earn */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-green-400" />
                                    Coin qanday yig'iladi?
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                                <ShoppingBag className="w-5 h-5 text-green-400" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">Akkaunt sotish</p>
                                                <p className="text-sm text-gray-500">Har bir sotuv uchun</p>
                                            </div>
                                        </div>
                                        <p className="text-2xl font-bold text-yellow-400">+{COINS_PER_TRANSACTION} coin</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                                <ShoppingBag className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">Akkaunt sotib olish</p>
                                                <p className="text-sm text-gray-500">Har bir xarid uchun</p>
                                            </div>
                                        </div>
                                        <p className="text-2xl font-bold text-yellow-400">+{COINS_PER_TRANSACTION} coin</p>
                                    </div>
                                </div>
                                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                                    <p className="text-yellow-400 text-sm">
                                        <AlertCircle className="w-4 h-4 inline mr-2" />
                                        <strong>Muhim:</strong> Oyiga faqat birinchi <strong>{MAX_MONTHLY_TRANSACTIONS} ta</strong> tranzaksiya uchun coin beriladi.
                                        Maksimum <strong>{MAX_MONTHLY_TRANSACTIONS * COINS_PER_TRANSACTION} coin</strong> oyiga.
                                    </p>
                                </div>
                            </div>

                            {/* How to use */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <Gift className="w-5 h-5 text-blue-500" />
                                    Coinni qanday ishlatish mumkin?
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/30">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                            <Star className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">Premium obuna BEPUL</p>
                                            <p className="text-sm text-gray-400">100 coin sarflab Premium obunani bepul oling</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-yellow-400">{PREMIUM_COST_IN_COINS}</p>
                                            <p className="text-xs text-gray-500">coin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Voucher Info */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-orange-400" />
                                    Voucher haqida
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                        <p className="text-blue-500 font-semibold mb-2">Premium obunachi</p>
                                        <p className="text-3xl font-semibold text-gray-800 mb-1">50% <span className="text-lg text-gray-400">chegirma</span></p>
                                        <p className="text-sm text-gray-500">Premium obunaga avtomatik voucher</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                        <p className="text-blue-400 font-semibold mb-2">Pro obunachi</p>
                                        <p className="text-3xl font-semibold text-gray-800 mb-1">20% <span className="text-lg text-gray-400">chegirma</span></p>
                                        <p className="text-sm text-gray-500">Pro obunaga avtomatik voucher</p>
                                    </div>
                                </div>
                                <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                                    <p className="text-orange-400 text-sm">
                                        <Clock className="w-4 h-4 inline mr-2" />
                                        <strong>Eslatma:</strong> Vaucherlar <strong>3 oy</strong> davomida amal qiladi.
                                        3 oydan keyin ishlatilmagan vaucherlar o'chirib tashlanadi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'vouchers' && (
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Sizning vaucherlaringiz</h3>
                            {vouchers.length > 0 ? (
                                <div className="space-y-3">
                                    {vouchers.map(voucher => (
                                        <div key={voucher.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${voucher.type === 'premium'
                                                ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                                                : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                                                }`}>
                                                <Gift className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-gray-800">{voucher.discount}% chegirma</p>
                                                    <span className={`px-2 py-0.5 text-xs rounded-full ${voucher.type === 'premium'
                                                        ? 'bg-purple-500/20 text-blue-500'
                                                        : 'bg-blue-500/20 text-blue-400'
                                                        }`}>
                                                        {voucher.type === 'premium' ? 'Premium' : 'Pro'}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Amal qiladi: {formatDate(voucher.expiresAt)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-sm font-medium ${getDaysLeft(voucher.expiresAt) < 30 ? 'text-orange-400' : 'text-green-400'}`}>
                                                    {getDaysLeft(voucher.expiresAt)} kun qoldi
                                                </p>
                                                <Link
                                                    to="/premium"
                                                    className="text-xs text-blue-500 hover:underline flex items-center gap-1 justify-end mt-1"
                                                >
                                                    Ishlatish <ChevronRight className="w-3 h-3" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Gift className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400">Hozircha vaucherlar yo'q</p>
                                    <p className="text-sm text-gray-500 mt-2">Premium yoki Pro obunaga o'ting va voucher oling!</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Coin tarixi</h3>
                            {history.length > 0 ? (
                                <div className="space-y-2">
                                    {history.slice().reverse().map(item => (
                                        <div key={item.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.type === 'earned' ? 'bg-green-500/20' : 'bg-red-500/20'
                                                }`}>
                                                {item.type === 'earned' ? (
                                                    <TrendingUp className="w-5 h-5 text-green-400" />
                                                ) : (
                                                    <ShoppingBag className="w-5 h-5 text-red-400" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">{item.reason}</p>
                                                <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
                                            </div>
                                            <p className={`font-bold ${item.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {item.amount > 0 ? '+' : ''}{item.amount} coin
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400">Tarix bo'sh</p>
                                    <p className="text-sm text-gray-500 mt-2">Akkaunt sotib oling yoki soting — coin yig'ing!</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* CTA */}
                {balance >= PREMIUM_COST_IN_COINS && (
                    <div className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30 text-center">
                        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Tabriklaymiz! 🎉</h3>
                        <p className="text-gray-400 mb-4">Sizda {balance} coin bor — Premium obunani BEPUL olishingiz mumkin!</p>
                        <Link
                            to="/premium"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
                        >
                            Premium olish
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoinsPage;
