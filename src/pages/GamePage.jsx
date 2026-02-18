import { useParams, Link } from 'react-router-dom';
import { Search, Package } from 'lucide-react';
import { useState } from 'react';
import AccountCard from '../components/AccountCard';
import { games, accounts } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

const GamePage = () => {
    const { t } = useLanguage();
    const { gameId } = useParams();
    const [sortBy, setSortBy] = useState('newest');
    const [searchQuery, setSearchQuery] = useState('');

    const game = games.find(g => g.id === gameId);
    const gameAccounts = accounts.filter(acc => acc.gameId === gameId);

    const sortedAccounts = [...gameAccounts].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.seller.rating - a.seller.rating;
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const finalAccounts = [
        ...sortedAccounts.filter(acc => acc.isPremium),
        ...sortedAccounts.filter(acc => !acc.isPremium)
    ].filter(acc =>
        searchQuery === '' || acc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!game) {
        return (
            <div className="page-enter" style={{ minHeight: 'calc(100vh - 64px)' }}>
                <div className="gh-container">
                    <div className="empty-state">
                        <Package className="empty-state-icon" />
                        <h3 className="empty-state-title">
                            {t('game.not_found') || 'Game not found'}
                        </h3>
                        <p className="empty-state-description">
                            {t('game.not_found_desc') || 'The game you are looking for does not exist.'}
                        </p>
                        <Link to="/" className="btn btn-primary btn-md" style={{ textDecoration: 'none' }}>
                            {t('game.go_home') || 'Go to homepage'}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: '64px' }}>
            <div className="gh-container">
                {/* Breadcrumbs */}
                <div className="breadcrumbs">
                    <Link to="/">Home</Link>
                    <span className="breadcrumb-separator">/</span>
                    <Link to="/products">{t('nav.products') || 'Products'}</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">{game.name}</span>
                </div>

                {/* Game Header */}
                <div
                    className="flex items-center gap-4"
                    style={{ paddingTop: 'var(--space-6)', marginBottom: 'var(--space-8)' }}
                >
                    <div
                        className="flex items-center justify-center"
                        style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: 'var(--radius-xl)',
                            backgroundColor: 'var(--color-bg-secondary)',
                            border: '1px solid var(--color-border-default)',
                            fontSize: '28px',
                            flexShrink: 0,
                            overflow: 'hidden',
                        }}
                    >
                        {game.image && !game.image.includes('placeholder') ? (
                            <img src={game.image} alt={game.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <span>{game.icon}</span>
                        )}
                    </div>
                    <div>
                        <h1 style={{
                            fontSize: 'var(--font-size-2xl)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--color-text-primary)',
                            marginBottom: 'var(--space-1)',
                        }}>
                            {game.name}
                        </h1>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                            {gameAccounts.length} {t('game.accounts_available') || 'accounts available'}
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div
                    className="flex flex-col sm:flex-row gap-3"
                    style={{ marginBottom: 'var(--space-6)' }}
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('game.search') || 'Search accounts...'}
                            className="input input-md w-full"
                            style={{ paddingLeft: '36px' }}
                            aria-label="Search accounts"
                        />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="select select-md"
                        style={{ minWidth: '180px' }}
                        aria-label="Sort accounts"
                    >
                        <option value="newest">{t('sort.newest') || 'Newest'}</option>
                        <option value="price-low">{t('sort.price_low') || 'Price: Low'}</option>
                        <option value="price-high">{t('sort.price_high') || 'Price: High'}</option>
                        <option value="rating">{t('sort.rating') || 'By rating'}</option>
                    </select>
                </div>

                {/* Accounts Grid */}
                {finalAccounts.length > 0 ? (
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-stagger"
                        style={{ gap: 'var(--space-4)' }}
                    >
                        {finalAccounts.map((account) => (
                            <AccountCard key={account.id} account={account} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <Search className="empty-state-icon" />
                        <h3 className="empty-state-title">
                            {t('game.no_accounts') || 'No accounts found'}
                        </h3>
                        <p className="empty-state-description">
                            {t('game.no_accounts_desc') || 'No accounts available for this game yet'}
                        </p>
                        <Link to="/products" className="btn btn-primary btn-md" style={{ textDecoration: 'none' }}>
                            {t('products.title') || 'Browse all products'}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GamePage;
