import { useState } from 'react';
import { Trophy, TrendingUp, Users, ShoppingBag, Star, Medal, Crown, Award } from 'lucide-react';

const StatisticsPage = () => {
    const [activeTab, setActiveTab] = useState('sellers');

    const topSellers = [
        { id: 1, name: 'GameMaster_UZ', avatar: null, sales: 156, rating: 4.9, premium: 'premium' },
        { id: 2, name: 'ProGamer777', avatar: null, sales: 142, rating: 4.8, premium: 'pro' },
        { id: 3, name: 'AccountKing', avatar: null, sales: 128, rating: 4.7, premium: 'premium' },
        { id: 4, name: 'EliteSeller', avatar: null, sales: 115, rating: 4.9, premium: null },
        { id: 5, name: 'TopTrader', avatar: null, sales: 98, rating: 4.6, premium: 'pro' },
        { id: 6, name: 'FastDeals', avatar: null, sales: 87, rating: 4.5, premium: null },
        { id: 7, name: 'TrustySeller', avatar: null, sales: 76, rating: 4.8, premium: 'premium' },
        { id: 8, name: 'QuickSale', avatar: null, sales: 65, rating: 4.4, premium: null },
        { id: 9, name: 'BestPrice', avatar: null, sales: 54, rating: 4.7, premium: 'pro' },
        { id: 10, name: 'SafeTrade', avatar: null, sales: 43, rating: 4.6, premium: null },
    ];

    const activeUsers = [
        { id: 1, name: 'ActivePlayer1', avatar: null, activity: 98, purchases: 45, sales: 32 },
        { id: 2, name: 'DailyGamer', avatar: null, activity: 95, purchases: 38, sales: 28 },
        { id: 3, name: 'TrueCollector', avatar: null, activity: 92, purchases: 52, sales: 15 },
        { id: 4, name: 'GameHunter', avatar: null, activity: 89, purchases: 41, sales: 22 },
        { id: 5, name: 'TopBuyer', avatar: null, activity: 85, purchases: 67, sales: 8 },
        { id: 6, name: 'RegularUser', avatar: null, activity: 82, purchases: 29, sales: 35 },
        { id: 7, name: 'ProCollector', avatar: null, activity: 78, purchases: 48, sales: 12 },
        { id: 8, name: 'FastBuyer', avatar: null, activity: 75, purchases: 33, sales: 18 },
        { id: 9, name: 'SmartTrader', avatar: null, activity: 72, purchases: 25, sales: 41 },
        { id: 10, name: 'NewStar', avatar: null, activity: 68, purchases: 19, sales: 24 },
    ];

    const getRankIcon = (index) => {
        if (index === 0) return <Crown className="w-6 h-6 text-yellow-500" />;
        if (index === 1) return <Medal className="w-6 h-6 text-slate-400" />;
        if (index === 2) return <Award className="w-6 h-6 text-amber-600" />;
        return <span className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold text-sm">{index + 1}</span>;
    };

    const getPremiumBadge = (type) => {
        if (type === 'premium') {
            return <span className="px-2.5 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-xs rounded-full font-medium" style={{ color: '#ffffff' }}>Premium</span>;
        }
        if (type === 'pro') {
            return <span className="px-2.5 py-1 bg-gradient-to-r from-blue-400 to-cyan-500 text-xs rounded-full font-medium" style={{ color: '#ffffff' }}>Pro</span>;
        }
        return null;
    };

    const getAvatarColor = (index) => {
        const colors = [
            'from-blue-500 to-blue-600',
            'from-blue-400 to-indigo-500',
            'from-indigo-400 to-blue-500',
            'from-blue-500 to-cyan-500',
            'from-cyan-500 to-blue-500',
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="min-h-screen" style={{ paddingTop: '180px', paddingBottom: '64px', display: 'flex', justifyContent: 'center' }}>
            <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col items-center mb-14">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-sm font-medium mb-6">
                        <Trophy className="w-4 h-4" />
                        <span>Statistika va Reyting</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-5" style={{ textAlign: 'center' }}>
                        🏆 Top Foydalanuvchilar
                    </h1>
                    <p className="text-gray-500 text-lg" style={{ textAlign: 'center' }}>
                        Eng ko&apos;p akkaunt sotgan va eng faol foydalanuvchilar reytingi
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
                        <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-800">1,234</p>
                        <p className="text-xs text-gray-500 mt-1">Jami foydalanuvchilar</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
                        <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <ShoppingBag className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-800">5,678</p>
                        <p className="text-xs text-gray-500 mt-1">Jami sotuvlar</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
                        <div className="w-11 h-11 bg-yellow-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Star className="w-5 h-5 text-yellow-500" />
                        </div>
                        <p className="text-2xl font-bold text-gray-800">4.8</p>
                        <p className="text-xs text-gray-500 mt-1">O&apos;rtacha reyting</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
                        <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-800">+23%</p>
                        <p className="text-xs text-gray-500 mt-1">Bu oylik o&apos;sish</p>
                    </div>
                </div>

                {/* Tabs - Centered */}
                <div className="flex justify-center gap-4 mb-10">
                    <button
                        onClick={() => setActiveTab('sellers')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'sellers'
                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/25'
                            : 'bg-white text-gray-600 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                            }`}
                        style={activeTab === 'sellers' ? { color: '#ffffff' } : {}}
                    >
                        <Trophy className="w-4 h-4" />
                        Top Sotuvchilar
                    </button>
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'active'
                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/25'
                            : 'bg-white text-gray-600 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                            }`}
                        style={activeTab === 'active' ? { color: '#ffffff' } : {}}
                    >
                        <TrendingUp className="w-4 h-4" />
                        Faol Foydalanuvchilar
                    </button>
                </div>

                {/* Leaderboard */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    {activeTab === 'sellers' ? (
                        <div className="divide-y divide-slate-100">
                            {topSellers.map((user, index) => (
                                <div
                                    key={user.id}
                                    className={`flex items-center gap-4 px-6 py-5 hover:bg-slate-50 transition-colors ${index < 3 ? 'bg-blue-50/40' : ''}`}
                                >
                                    {/* Rank */}
                                    <div className="w-8 flex justify-center flex-shrink-0">
                                        {getRankIcon(index)}
                                    </div>

                                    {/* Avatar */}
                                    <div className={`w-12 h-12 bg-gradient-to-br ${getAvatarColor(index)} rounded-full flex items-center justify-center flex-shrink-0`}>
                                        <span className="font-bold text-lg" style={{ color: '#ffffff' }}>{user.name.charAt(0)}</span>
                                    </div>

                                    {/* Name & Rating */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-semibold text-gray-800">{user.name}</span>
                                            {getPremiumBadge(user.premium)}
                                        </div>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm text-gray-500">{user.rating}</span>
                                        </div>
                                    </div>

                                    {/* Sales Count */}
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-xl font-bold text-blue-600">{user.sales}</p>
                                        <p className="text-xs text-gray-400">sotuvlar</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {activeUsers.map((user, index) => (
                                <div
                                    key={user.id}
                                    className={`flex items-center gap-4 px-6 py-5 hover:bg-slate-50 transition-colors ${index < 3 ? 'bg-blue-50/40' : ''}`}
                                >
                                    {/* Rank */}
                                    <div className="w-8 flex justify-center flex-shrink-0">
                                        {getRankIcon(index)}
                                    </div>

                                    {/* Avatar */}
                                    <div className={`w-12 h-12 bg-gradient-to-br ${getAvatarColor(index)} rounded-full flex items-center justify-center flex-shrink-0`}>
                                        <span className="font-bold text-lg" style={{ color: '#ffffff' }}>{user.name.charAt(0)}</span>
                                    </div>

                                    {/* Name & Stats */}
                                    <div className="flex-1 min-w-0">
                                        <span className="font-semibold text-gray-800">{user.name}</span>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                            <span>🛒 {user.purchases} xarid</span>
                                            <span>💰 {user.sales} sotuv</span>
                                        </div>
                                    </div>

                                    {/* Activity Bar */}
                                    <div className="text-right flex-shrink-0">
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                                                    style={{ width: `${user.activity}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700 w-10">{user.activity}%</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-0.5">faollik</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;
