import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Tag, Heart, Star, Settings, Edit2, LogOut, Package, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AccountCard from '../components/AccountCard';
import ReviewList from '../components/ReviewList';
import { accounts, formatPrice } from '../data/mockData';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('purchases');
    const [likedAccounts, setLikedAccounts] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [sales, setSales] = useState([]);
    const [reviewCount, setReviewCount] = useState(0);
    const [averageRating, setAverageRating] = useState(5.0);

    // Redirect if not logged in
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Load user data from localStorage
    useEffect(() => {
        if (user) {
            // Load liked accounts
            const savedLikes = localStorage.getItem(`wibeLikes_${user.id}`);
            if (savedLikes) {
                const likedIds = JSON.parse(savedLikes);
                setLikedAccounts(accounts.filter(acc => likedIds.includes(acc.id)));
            }

            // Load purchases
            const savedPurchases = localStorage.getItem(`wibePurchases_${user.id}`);
            if (savedPurchases) {
                const purchaseIds = JSON.parse(savedPurchases);
                setPurchases(accounts.filter(acc => purchaseIds.includes(acc.id)));
            } else {
                const demoPurchases = accounts.slice(0, 2);
                setPurchases(demoPurchases);
                localStorage.setItem(`wibePurchases_${user.id}`, JSON.stringify(demoPurchases.map(a => a.id)));
            }

            // Load sales
            const savedSales = localStorage.getItem(`wibeSales_${user.id}`);
            if (savedSales) {
                const saleIds = JSON.parse(savedSales);
                setSales(accounts.filter(acc => saleIds.includes(acc.id)));
            } else {
                setSales([]);
            }

            // Load reviews received
            const savedReviews = localStorage.getItem('wibeReviews');
            if (savedReviews) {
                const allReviews = JSON.parse(savedReviews);
                const userReviews = allReviews.filter(r => r.sellerId === user.id);
                setReviewCount(userReviews.length);
                if (userReviews.length > 0) {
                    const avg = userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length;
                    setAverageRating(avg.toFixed(1));
                }
            }
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const tabs = [
        { id: 'purchases', label: 'Sotib olganlarim', icon: ShoppingBag, count: purchases.length },
        { id: 'sales', label: 'Sotganlarim', icon: Tag, count: sales.length },
        { id: 'likes', label: 'Yoqtirganlarim', icon: Heart, count: likedAccounts.length },
        { id: 'reviews', label: 'Baholashlarim', icon: MessageSquare, count: reviewCount },
    ];

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-[#1e1e32] to-[#25253a] rounded-3xl p-6 lg:p-8 border border-white/5 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-purple-500/30">
                                {user.name?.charAt(0) || 'U'}
                            </div>
                            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#25253a] rounded-full flex items-center justify-center border-2 border-[#1e1e32] hover:bg-purple-500 transition-colors">
                                <Edit2 className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{user.name}</h1>
                            <p className="text-gray-400 mb-3">{user.email}</p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-white">{averageRating}</span>
                                    <span className="text-gray-500">({reviewCount})</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full">
                                    <Package className="w-4 h-4 text-cyan-400" />
                                    <span className="text-gray-300">{sales.length} ta sotuvlar</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full">
                                    <ShoppingBag className="w-4 h-4 text-purple-400" />
                                    <span className="text-gray-300">{purchases.length} ta xaridlar</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <Link
                                to="/settings"
                                className="p-3 bg-white/5 rounded-xl text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                <Settings className="w-5 h-5" />
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="hidden sm:inline">Chiqish</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                                    : 'bg-[#1e1e32] text-gray-400 hover:bg-[#25253a] hover:text-white'
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                            <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'
                                }`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="bg-[#1e1e32] rounded-2xl p-6 border border-white/5 min-h-[400px]">
                    {activeTab === 'purchases' && (
                        <>
                            <h2 className="text-xl font-bold text-white mb-6">Sotib olgan akkauntlarim</h2>
                            {purchases.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {purchases.map((account) => (
                                        <AccountCard key={account.id} account={account} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400 mb-4">Hali hech narsa sotib olmadingiz</p>
                                    <Link
                                        to="/"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium"
                                    >
                                        Xarid qilish
                                    </Link>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'sales' && (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Sotgan akkauntlarim</h2>
                                <Link
                                    to="/sell"
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white text-sm font-medium"
                                >
                                    <Tag className="w-4 h-4" />
                                    Yangi e'lon
                                </Link>
                            </div>
                            {sales.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {sales.map((account) => (
                                        <AccountCard key={account.id} account={account} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Tag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400 mb-4">Hali hech narsa sotmadingiz</p>
                                    <Link
                                        to="/sell"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium"
                                    >
                                        E'lon berish
                                    </Link>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'likes' && (
                        <>
                            <h2 className="text-xl font-bold text-white mb-6">Yoqtirgan akkauntlarim</h2>
                            {likedAccounts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {likedAccounts.map((account) => (
                                        <AccountCard key={account.id} account={account} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-400 mb-4">Hali yoqtirgan akkauntlar yo'q</p>
                                    <Link
                                        to="/"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium"
                                    >
                                        Akkauntlarni ko'rish
                                    </Link>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'reviews' && (
                        <>
                            <h2 className="text-xl font-bold text-white mb-6">Mening baholashlarim</h2>
                            <ReviewList userId={user.id} type="received" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
