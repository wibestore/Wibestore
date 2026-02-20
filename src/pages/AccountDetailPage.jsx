import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Heart, Share2, Shield, Star, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { useListing, useAddToFavorites, useRemoveFromFavorites } from '../hooks';
import SkeletonLoader from '../components/SkeletonLoader';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../components/ToastProvider';

const AccountDetailPage = () => {
    const { accountId } = useParams();
    const { t } = useLanguage();
    const { addToast } = useToast();
    
    // API hooks
    const { data: listing, isLoading } = useListing(accountId);
    const { mutate: addToFavorites } = useAddToFavorites();
    const { mutate: removeFromFavorites } = useRemoveFromFavorites();
    
    const [isLiked, setIsLiked] = useState(false);

    if (isLoading) {
        return (
            <div className="page-enter" style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SkeletonLoader />
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="page-enter" style={{ minHeight: 'calc(100vh - 64px)' }}>
                <div className="gh-container">
                    <div className="empty-state">
                        <AlertCircle className="empty-state-icon" />
                        <h3 className="empty-state-title">Listing not found</h3>
                        <Link to="/products" className="btn btn-primary btn-md">Browse Products</Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleFavorite = () => {
        if (isLiked) {
            removeFromFavorites(listing.id, {
                onSuccess: () => {
                    setIsLiked(false);
                    addToast({ type: 'info', title: 'Removed from favorites' });
                }
            });
        } else {
            addToFavorites(listing.id, {
                onSuccess: () => {
                    setIsLiked(true);
                    addToast({ type: 'success', title: 'Added to favorites' });
                }
            });
        }
    };

    return (
        <div className="page-enter" style={{ minHeight: '100vh', paddingBottom: '64px' }}>
            <div className="gh-container">
                {/* Breadcrumbs */}
                <div className="breadcrumbs">
                    <Link to="/">Home</Link>
                    <span className="breadcrumb-separator">/</span>
                    <Link to="/products">Products</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">{listing.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '32px', marginTop: '24px' }}>
                    {/* Images */}
                    <div>
                        <div
                            style={{
                                backgroundColor: 'var(--color-bg-secondary)',
                                border: '1px solid var(--color-border-default)',
                                borderRadius: 'var(--radius-xl)',
                                overflow: 'hidden',
                                marginBottom: '16px',
                            }}
                        >
                            {listing.images?.[0]?.image ? (
                                <img
                                    src={listing.images[0].image}
                                    alt={listing.title}
                                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '400px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'var(--color-bg-primary)',
                                        color: 'var(--color-text-muted)',
                                    }}
                                >
                                    No image available
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details */}
                    <div>
                        <div className="flex items-start justify-between" style={{ marginBottom: '16px' }}>
                            <div>
                                <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: '8px' }}>
                                    {listing.title}
                                </h1>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                                    {listing.game?.name}
                                </p>
                            </div>
                            <button
                                onClick={handleFavorite}
                                className={`btn ${isLiked ? 'btn-error' : 'btn-ghost'} btn-lg`}
                                style={{ padding: '0 12px' }}
                            >
                                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                            </button>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <span style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-accent-blue)' }}>
                                ${listing.price}
                            </span>
                        </div>

                        <div className="flex items-center gap-3" style={{ marginBottom: '24px' }}>
                            <div
                                className="flex items-center gap-2"
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: 'var(--color-success-bg)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-accent-green)',
                                }}
                            >
                                <Shield className="w-4 h-4" />
                                <span>Escrow Protected</span>
                            </div>
                            <div
                                className="flex items-center gap-2"
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: 'var(--color-info-bg)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-accent-blue)',
                                }}
                            >
                                <CheckCircle className="w-4 h-4" />
                                <span>Verified Seller</span>
                            </div>
                        </div>

                        <div className="flex gap-3" style={{ marginBottom: '24px' }}>
                            <button className="btn btn-primary btn-lg flex-1">
                                Buy Now
                            </button>
                            <button className="btn btn-secondary btn-lg">
                                <MessageCircle className="w-5 h-5" />
                                Contact Seller
                            </button>
                        </div>

                        {/* Seller Info */}
                        <div
                            style={{
                                backgroundColor: 'var(--color-bg-secondary)',
                                border: '1px solid var(--color-border-default)',
                                borderRadius: 'var(--radius-lg)',
                                padding: '16px',
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: 'var(--radius-full)',
                                        background: 'linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-purple))',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 'var(--font-weight-bold)',
                                    }}
                                >
                                    {listing.seller?.display_name?.charAt(0) || 'S'}
                                </div>
                                <div className="flex-1">
                                    <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                                        {listing.seller?.display_name || 'Seller'}
                                    </div>
                                    <div className="flex items-center gap-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                                        <Star className="w-3.5 h-3.5" style={{ fill: 'var(--color-accent-orange)', color: 'var(--color-accent-orange)' }} />
                                        <span>{listing.seller?.rating || '5.0'}</span>
                                        <span>•</span>
                                        <span>{listing.seller?.total_sales || 0} sales</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div
                    style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-border-default)',
                        borderRadius: 'var(--radius-xl)',
                        padding: '24px',
                        marginTop: '32px',
                    }}
                >
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: '16px' }}>
                        Description
                    </h2>
                    <p style={{ color: 'var(--color-text-primary)', lineHeight: '1.7' }}>
                        {listing.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AccountDetailPage;
