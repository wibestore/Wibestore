import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Crown, Heart } from 'lucide-react';
import { formatPrice } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const AccountCard = ({ account, featured = false }) => {
    const { user, isAuthenticated } = useAuth();
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (user) {
            const savedLikes = localStorage.getItem(`wibeLikes_${user.id}`);
            if (savedLikes) {
                const likedIds = JSON.parse(savedLikes);
                setIsLiked(likedIds.includes(account.id));
            }
        }
    }, [user, account.id]);

    const handleLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isAuthenticated || !user) return;

        const savedLikes = localStorage.getItem(`wibeLikes_${user.id}`);
        let likedIds = savedLikes ? JSON.parse(savedLikes) : [];

        if (isLiked) {
            likedIds = likedIds.filter(id => id !== account.id);
        } else {
            likedIds.push(account.id);
        }

        localStorage.setItem(`wibeLikes_${user.id}`, JSON.stringify(likedIds));
        setIsLiked(!isLiked);
    };

    return (
        <Link
            to={`/account/${account.id}`}
            className={`group relative account-card-hover block ${account.isPremium ? 'account-card-premium' : ''} ${featured ? 'flex-shrink-0 snap-start' : ''}`}
            style={{
                backgroundColor: 'var(--color-bg-primary)',
                border: `1px solid ${account.isPremium ? 'var(--color-premium-gold-light)' : 'var(--color-border-default)'}`,
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                width: featured ? '280px' : 'auto',
                textDecoration: 'none',
            }}
        >
            {/* Premium top accent */}
            {account.isPremium && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: `linear-gradient(90deg, var(--color-premium-gold), var(--color-premium-gold-light))`,
                        zIndex: 2,
                    }}
                />
            )}

            {/* Image */}
            <div
                className="relative overflow-hidden"
                style={{
                    height: '164px',
                    backgroundColor: 'var(--color-bg-tertiary)',
                }}
            >
                {account.image ? (
                    <img
                        src={account.image}
                        alt={account.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">
                        🎮
                    </div>
                )}

                {/* Like Button */}
                {isAuthenticated && (
                    <button
                        onClick={handleLike}
                        className="absolute flex items-center justify-center rounded-full transition-all"
                        style={{
                            top: '12px',
                            left: '12px',
                            width: '32px',
                            height: '32px',
                            backgroundColor: isLiked ? 'var(--color-accent-red)' : 'rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(4px)',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        aria-label={isLiked ? 'Unlike' : 'Like'}
                    >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                )}

                {/* Premium Badge */}
                {account.isPremium && (
                    <div
                        className="badge badge-premium absolute flex items-center gap-1"
                        style={{ top: '12px', right: '12px', padding: '4px 8px', fontSize: '11px' }}
                    >
                        <Crown className="w-3 h-3" />
                        Premium
                    </div>
                )}

                {/* Game Badge */}
                <div
                    className="absolute rounded-full text-xs"
                    style={{
                        bottom: '12px',
                        left: '12px',
                        padding: '4px 10px',
                        backgroundColor: 'rgba(0,0,0,0.65)',
                        backdropFilter: 'blur(4px)',
                        color: '#ffffff',
                        fontWeight: 500,
                    }}
                >
                    {account.gameName}
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: 'var(--space-4)' }}>
                {/* Title */}
                <h3
                    className="font-semibold mb-2 line-clamp-2 transition-colors"
                    style={{
                        fontSize: 'var(--font-size-base)',
                        lineHeight: 'var(--line-height-base)',
                        color: 'var(--color-text-primary)',
                    }}
                >
                    {account.title}
                </h3>

                {/* Description */}
                <p
                    className="line-clamp-2 mb-4"
                    style={{
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-muted)',
                        lineHeight: 'var(--line-height-sm)',
                    }}
                >
                    {account.description}
                </p>

                {/* Footer */}
                <div
                    className="flex items-center justify-between"
                    style={{
                        paddingTop: 'var(--space-3)',
                        borderTop: '1px solid var(--color-border-muted)',
                    }}
                >
                    {/* Price */}
                    <span
                        className="font-bold"
                        style={{
                            fontSize: 'var(--font-size-lg)',
                            color: 'var(--color-text-accent)',
                        }}
                    >
                        {formatPrice(account.price)}
                    </span>

                    {/* Seller Info */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-current" style={{ color: 'var(--color-premium-gold-light)' }} />
                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                                {account.seller.rating}
                            </span>
                        </div>
                        {account.seller.isPremium && (
                            <Crown className="w-3.5 h-3.5" style={{ color: 'var(--color-premium-gold-light)' }} />
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AccountCard;
