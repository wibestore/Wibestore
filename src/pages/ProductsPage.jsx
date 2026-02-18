import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronDown, Grid, List, X } from 'lucide-react';
import GameCard from '../components/GameCard';
import AccountCard from '../components/AccountCard';
import { games, accounts } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

const ProductsPage = () => {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGame, setSelectedGame] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const sortOptions = [
        { value: 'newest', label: t('products.sort_newest') || 'Newest' },
        { value: 'price-low', label: t('products.sort_price_low') || 'Price: Low to High' },
        { value: 'price-high', label: t('products.sort_price_high') || 'Price: High to Low' },
        { value: 'rating', label: t('products.sort_rating') || 'Best Rating' },
    ];

    const filteredAccounts = useMemo(() => {
        let result = [...accounts];

        if (selectedGame !== 'all') {
            result = result.filter(acc => acc.gameId === selectedGame);
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(acc =>
                acc.title.toLowerCase().includes(q) ||
                acc.description.toLowerCase().includes(q) ||
                acc.gameName.toLowerCase().includes(q)
            );
        }

        switch (sortBy) {
            case 'price-low': result.sort((a, b) => a.price - b.price); break;
            case 'price-high': result.sort((a, b) => b.price - a.price); break;
            case 'rating': result.sort((a, b) => b.seller.rating - a.seller.rating); break;
            default: break;
        }

        return result;
    }, [selectedGame, searchQuery, sortBy]);

    const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
    const paginatedAccounts = filteredAccounts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="page-enter" style={{ minHeight: '100vh' }}>
            {/* Page Header */}
            <div className="gh-container">
                {/* Breadcrumbs */}
                <div className="breadcrumbs">
                    <Link to="/">Home</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">{t('nav.products') || 'Products'}</span>
                </div>

                <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                    <h1>{t('products.title') || 'All Products'}</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                        {filteredAccounts.length} {t('products.found') || 'accounts found'}
                    </p>
                </div>
            </div>

            <div className="gh-container">
                {/* Search & Filters Bar */}
                <div
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                    style={{ marginBottom: '24px' }}
                >
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                            style={{ color: 'var(--color-text-muted)' }}
                        />
                        <input
                            type="text"
                            placeholder={t('products.search_placeholder') || 'Search accounts...'}
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="input input-md w-full"
                            style={{ paddingLeft: '36px' }}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Game Filter */}
                    <select
                        value={selectedGame}
                        onChange={(e) => { setSelectedGame(e.target.value); setCurrentPage(1); }}
                        className="select select-md"
                        style={{ maxWidth: '200px' }}
                        aria-label="Filter by game"
                    >
                        <option value="all">{t('products.all_games') || 'All Games'}</option>
                        {games.filter(g => g.accountCount > 0).map(game => (
                            <option key={game.id} value={game.id}>{game.name}</option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="select select-md"
                        style={{ maxWidth: '180px' }}
                        aria-label="Sort by"
                    >
                        {sortOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>

                    {/* View toggle */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`btn btn-sm ${viewMode === 'grid' ? 'btn-secondary' : 'btn-ghost'}`}
                            style={{ padding: '0 8px' }}
                            aria-label="Grid view"
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`btn btn-sm ${viewMode === 'list' ? 'btn-secondary' : 'btn-ghost'}`}
                            style={{ padding: '0 8px' }}
                            aria-label="List view"
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Active filters */}
                {(selectedGame !== 'all' || searchQuery) && (
                    <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: '16px' }}>
                        {selectedGame !== 'all' && (
                            <span className="badge badge-blue flex items-center gap-1" style={{ padding: '4px 10px' }}>
                                {games.find(g => g.id === selectedGame)?.name}
                                <button
                                    onClick={() => setSelectedGame('all')}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0 }}
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        {searchQuery && (
                            <span className="badge badge-blue flex items-center gap-1" style={{ padding: '4px 10px' }}>
                                "{searchQuery}"
                                <button
                                    onClick={() => setSearchQuery('')}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0 }}
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        <button
                            onClick={() => { setSelectedGame('all'); setSearchQuery(''); }}
                            className="text-sm"
                            style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            {t('products.clear_all') || 'Clear all'}
                        </button>
                    </div>
                )}

                {/* Results */}
                {paginatedAccounts.length > 0 ? (
                    <>
                        <div
                            className={`grid animate-stagger ${viewMode === 'grid'
                                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                : 'grid-cols-1'
                                }`}
                            style={{ gap: '16px' }}
                        >
                            {paginatedAccounts.map((account) => (
                                <AccountCard key={account.id} account={account} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2" style={{ marginTop: '32px', paddingBottom: '32px' }}>
                                <div className="pagination">
                                    <button
                                        className="pagination-btn"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        ←
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            className={`pagination-btn ${currentPage === page ? 'pagination-active' : ''}`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        className="pagination-btn"
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                    >
                                        →
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    /* Empty State */
                    <div className="empty-state">
                        <Search className="empty-state-icon" />
                        <h3 className="empty-state-title">
                            {t('products.no_results') || 'No accounts found'}
                        </h3>
                        <p className="empty-state-description">
                            {t('products.no_results_desc') || 'Try adjusting your search or filters'}
                        </p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedGame('all'); }}
                            className="btn btn-primary btn-md"
                        >
                            {t('products.clear_filters') || 'Clear filters'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
