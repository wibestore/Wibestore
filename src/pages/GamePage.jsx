import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Filter, Search, ChevronDown, Star, Crown } from 'lucide-react';
import { useState } from 'react';
import AccountCard from '../components/AccountCard';
import { games, accounts } from '../data/mockData';

const GamePage = () => {
    const { gameId } = useParams();
    const [sortBy, setSortBy] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);

    const game = games.find(g => g.id === gameId);
    const gameAccounts = accounts.filter(acc => acc.gameId === gameId);

    // Sort accounts
    const sortedAccounts = [...gameAccounts].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.seller.rating - a.seller.rating;
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // Premium accounts first
    const finalAccounts = [
        ...sortedAccounts.filter(acc => acc.isPremium),
        ...sortedAccounts.filter(acc => !acc.isPremium)
    ];

    if (!game) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">O'yin topilmadi</h1>
                    <Link to="/" className="text-purple-400 hover:underline">Bosh sahifaga qaytish</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Orqaga
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[#25253a] rounded-2xl flex items-center justify-center text-3xl">
                            {game.icon}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">{game.name}</h1>
                            <p className="text-gray-400">{gameAccounts.length} ta akkaunt mavjud</p>
                        </div>
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Akkauntlarni qidirish..."
                            className="w-full pl-12 pr-4 py-3 bg-[#1e1e32] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                        />
                    </div>

                    {/* Sort */}
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none w-full lg:w-48 px-4 py-3 pr-10 bg-[#1e1e32] border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 cursor-pointer transition-colors"
                        >
                            <option value="newest">Eng yangilari</option>
                            <option value="price-low">Narx: arzon</option>
                            <option value="price-high">Narx: qimmat</option>
                            <option value="rating">Reyting bo'yicha</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>

                    {/* Filter Button */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1e1e32] border border-white/10 rounded-xl text-white hover:border-purple-500/50 transition-colors"
                    >
                        <Filter className="w-5 h-5" />
                        Filtrlar
                    </button>
                </div>

                {/* Accounts Grid */}
                {finalAccounts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {finalAccounts.map((account) => (
                            <AccountCard key={account.id} account={account} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">😔</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Akkauntlar topilmadi</h3>
                        <p className="text-gray-400">Bu o'yin uchun hozircha akkauntlar mavjud emas</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GamePage;
