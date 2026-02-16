import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronDown, Grid, List } from 'lucide-react';
import GameCard from '../components/GameCard';
import AccountCard from '../components/AccountCard';
import { games, accounts } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

const ProductsPage = () => {
    const { t } = useLanguage();
    const [viewMode, setViewMode] = useState('grid');
    const [selectedGame, setSelectedGame] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [searchQuery, setSearchQuery] = useState('');
    const [userListings, setUserListings] = useState([]);

    // Load approved listings from localStorage
    useEffect(() => {
        const savedListings = localStorage.getItem('wibeListings');
        if (savedListings) {
            const allListings = JSON.parse(savedListings);
            // Only show active (approved) listings
            const approvedListings = allListings
                .filter(l => l.status === 'active')
                .map(l => ({
                    id: `user-${l.id}`,
                    title: l.title,
                    description: l.description,
                    gameId: l.gameId,
                    price: Number(l.price),
                    level: l.level,
                    rank: l.rank,
                    isPremium: false,
                    images: l.images || [],
                    features: l.features || [],
                    seller: {
                        name: l.sellerName,
                        rating: 5.0,
                        sales: 0
                    },
                    createdAt: l.createdAt
                }));
            setUserListings(approvedListings);
        }
    }, []);

    // Other games (additional games can be added here)
    const otherGames = [
        { id: 'valorant', name: 'Valorant', icon: '🎯', accountCount: 180 },
        { id: 'fortnite', name: 'Fortnite', icon: '🏝️', accountCount: 320 },
        { id: 'minecraft', name: 'Minecraft', icon: '⛏️', accountCount: 290 },
        { id: 'genshin', name: 'Genshin Impact', icon: '⚡', accountCount: 410 },
        { id: 'lol', name: 'League of Legends', icon: '🏆', accountCount: 560 },
        { id: 'apex', name: 'Apex Legends', icon: '🔷', accountCount: 230 },
    ];

    const allGames = [...games, ...otherGames];

    // Combine mock accounts with user listings
    const allAccounts = [...accounts, ...userListings];

    // Filter and sort accounts
    let filteredAccounts = [...allAccounts];

    if (selectedGame !== 'all') {
        filteredAccounts = filteredAccounts.filter(acc => acc.gameId === selectedGame);
    }

    if (searchQuery) {
        filteredAccounts = filteredAccounts.filter(acc =>
            acc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            acc.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Sort
    filteredAccounts.sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.seller.rating - a.seller.rating;
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Premium accounts first
    const finalAccounts = [
        ...filteredAccounts.filter(acc => acc.isPremium),
        ...filteredAccounts.filter(acc => !acc.isPremium)
    ];

    return (
        <div className="min-h-screen pt-24 pb-16 cl page-enter">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('products.title')}</h1>
                    <p className="text-gray-500">{t('products.subtitle')}</p>
                </div>

                {/* Games Filter */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 md">{t('products.by_game')}</h2>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setSelectedGame('all')}
                            className={` wd px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedGame === 'all'
                                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                                : 'bg-white text-gray-600 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                                }`}
                        >
                            {t('products.all')}
                        </button>
                        {allGames.map((game) => (
                            <button
                                key={game.id}
                                onClick={() => setSelectedGame(game.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedGame === game.id
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                                    : 'bg-white text-gray-600 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                                    }`}
                            >
                                <span>{game.icon}</span>
                                {game.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search & Filters Bar */}
                <div className="flex flex-col lg:flex-row items-center gap-4 mb-8">
                    {/* Search */}
                    <div className="relative flex-1 w-full">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('products.search')}
                            className="w-full pl-5 pr-12 py-4 bg-white border border-slate-200 rounded-xl text-gray-800 text-base placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors h-14 leading-tight"
                        />
                        <Search className="st absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>

                    {/* Sort */}
                    <div className="relative w-full lg:w-auto">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none w-full lg:w-56 px-5 pr-12 bg-white border border-slate-200 rounded-xl text-gray-800 text-base focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 cursor-pointer transition-colors h-14 flex items-center"
                        >
                            <option value="newest">{t('products.sort_newest')}</option>
                            <option value="price-low">{t('products.sort_cheap')}</option>
                            <option value="price-high">{t('products.sort_expensive')}</option>
                            <option value="rating">{t('products.sort_rating')}</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>

                    {/* View Mode */}
                    <div className="flex bg-white border border-slate-200 rounded-xl p-1 h-14 items-center">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-3 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-blue-600'
                                }`}
                        >
                            <Grid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-3 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-blue-600'
                                }`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Results Count */}
                <div className="text-gray-500 text-sm mb-6">
                    {finalAccounts.length} {t('products.found')}
                </div>

                {/* Accounts Grid/List */}
                {finalAccounts.length > 0 ? (
                    <div className={`grid gap-6 ${viewMode === 'grid'
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                        : 'grid-cols-1'
                        }`}>
                        {finalAccounts.map((account) => (
                            <AccountCard key={account.id} account={account} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('products.not_found')}</h3>
                        <p className="text-gray-500">{t('products.change_search')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
