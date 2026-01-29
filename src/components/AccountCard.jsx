import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Crown, Heart } from 'lucide-react';
import { formatPrice } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const AccountCard = ({ account, featured = false }) => {
    const { user, isAuthenticated } = useAuth();
    const [isLiked, setIsLiked] = useState(false);

    // Check if account is liked
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
            className={`group relative bg-gradient-to-b from-[#1e1e32] to-[#25253a] border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${account.isPremium
                ? 'border-yellow-500/30 hover:border-yellow-500/50 hover:shadow-yellow-500/10'
                : 'border-white/5 hover:border-purple-500/50 hover:shadow-purple-500/10'
                } ${featured ? 'flex-shrink-0 w-72 snap-start' : ''}`}
        >
            {/* Premium top accent */}
            {account.isPremium && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500" />
            )}

            {/* Image */}
            <div className="relative h-44 bg-[#25253a] overflow-hidden">
                {account.image ? (
                    <img
                        src={account.image}
                        alt={account.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl opacity-50">
                        🎮
                    </div>
                )}

                {/* Like Button */}
                {isAuthenticated && (
                    <button
                        onClick={handleLike}
                        className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${isLiked
                                ? 'bg-red-500 text-white'
                                : 'bg-black/40 backdrop-blur-sm text-white/70 hover:bg-black/60 hover:text-white'
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                )}

                {/* Premium Badge */}
                {account.isPremium && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-xs font-bold text-black">
                        <Crown className="w-3 h-3" />
                        Premium
                    </div>
                )}

                {/* Game Badge */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-gray-300">
                    {account.gameName}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Title */}
                <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {account.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {account.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    {/* Price */}
                    <span className="text-lg font-bold text-cyan-400">
                        {formatPrice(account.price)}
                    </span>

                    {/* Seller Info */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="text-xs font-medium">{account.seller.rating}</span>
                        </div>
                        {account.seller.isPremium && (
                            <Crown className="w-3.5 h-3.5 text-yellow-400" />
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AccountCard;
