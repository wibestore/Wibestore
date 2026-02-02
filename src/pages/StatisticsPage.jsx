import { useState } from 'react';
import { Trophy, TrendingUp, Users, ShoppingBag, Star, Medal, Crown, Award } from 'lucide-react';

const StatisticsPage = () => {
    const [activeTab, setActiveTab] = useState('sellers');

    // Demo data - in real app, this would come from backend
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
        if (index === 0) return <Crown className="w-6 h-6 text-yellow-400" />;
        if (index === 1) return <Medal className="w-6 h-6 text-gray-300" />;
        if (index === 2) return <Award className="w-6 h-6 text-amber-600" />;
        return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">{index + 1}</span>;
    };

    const getPremiumBadge = (type) => {
        if (type === 'premium') {
            return <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full">Premium</span>;
        }
        if (type === 'pro') {
            return <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full">Pro</span>;
        }
        return null;
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm mb-4">
                        <Trophy className="w-4 h-4" />
                        <span>Statistika va Reyting</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        🏆 Top Foydalanuvchilar
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Eng ko'p akkaunt sotgan va eng faol foydalanuvchilar reytingi
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#1e1e32] rounded-xl p-4 border border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">1,234</p>
                                <p className="text-xs text-gray-500">Jami foydalanuvchilar</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1e1e32] rounded-xl p-4 border border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <ShoppingBag className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">5,678</p>
                                <p className="text-xs text-gray-500">Jami sotuvlar</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1e1e32] rounded-xl p-4 border border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                <Star className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">4.8</p>
                                <p className="text-xs text-gray-500">O'rtacha reyting</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1e1e32] rounded-xl p-4 border border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-pink-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">+23%</p>
                                <p className="text-xs text-gray-500">Bu oylik o'sish</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('sellers')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'sellers'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'bg-[#1e1e32] text-gray-400 hover:text-white'
                            }`}
                    >
                        <Trophy className="w-4 h-4 inline mr-2" />
                        Top Sotuvchilar
                    </button>
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'active'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'bg-[#1e1e32] text-gray-400 hover:text-white'
                            }`}
                    >
                        <TrendingUp className="w-4 h-4 inline mr-2" />
                        Faol Foydalanuvchilar
                    </button>
                </div>

                {/* Leaderboard */}
                <div className="bg-[#1e1e32] rounded-2xl border border-white/5 overflow-hidden">
                    {activeTab === 'sellers' ? (
                        <div className="divide-y divide-white/5">
                            {topSellers.map((user, index) => (
                                <div key={user.id} className={`flex items-center gap-4 p-4 hover:bg-white/5 transition-colors ${index < 3 ? 'bg-gradient-to-r from-purple-500/5 to-pink-500/5' : ''}`}>
                                    <div className="w-8 flex justify-center">
                                        {getRankIcon(index)}
                                    </div>
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-white">{user.name}</span>
                                            {getPremiumBadge(user.premium)}
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <Star className="w-3 h-3 text-yellow-400" />
                                            <span>{user.rating}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-white">{user.sales}</p>
                                        <p className="text-xs text-gray-500">sotuvlar</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="divide-y divide-white/5">
                            {activeUsers.map((user, index) => (
                                <div key={user.id} className={`flex items-center gap-4 p-4 hover:bg-white/5 transition-colors ${index < 3 ? 'bg-gradient-to-r from-purple-500/5 to-pink-500/5' : ''}`}>
                                    <div className="w-8 flex justify-center">
                                        {getRankIcon(index)}
                                    </div>
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <span className="font-medium text-white">{user.name}</span>
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <span>🛒 {user.purchases} xarid</span>
                                            <span>💰 {user.sales} sotuv</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1">
                                            <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                                                    style={{ width: `${user.activity}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-medium text-white">{user.activity}%</span>
                                        </div>
                                        <p className="text-xs text-gray-500">faollik</p>
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
