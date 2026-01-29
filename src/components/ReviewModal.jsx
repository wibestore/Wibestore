import { useState } from 'react';
import { Star, X, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ReviewModal = ({ isOpen, onClose, seller, account, onSubmit }) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) return;

        setIsSubmitting(true);

        const review = {
            id: Date.now(),
            rating,
            comment,
            reviewerId: user?.id,
            reviewerName: user?.name || 'Anonim',
            sellerId: seller?.id,
            sellerName: seller?.name,
            accountId: account?.id,
            accountTitle: account?.title,
            createdAt: new Date().toISOString()
        };

        // Save to localStorage
        const savedReviews = localStorage.getItem('wibeReviews');
        const reviews = savedReviews ? JSON.parse(savedReviews) : [];
        reviews.push(review);
        localStorage.setItem('wibeReviews', JSON.stringify(reviews));

        // Update seller rating in localStorage
        updateSellerRating(seller?.id, rating);

        setTimeout(() => {
            setIsSubmitting(false);
            onSubmit?.(review);
            onClose();
            setRating(0);
            setComment('');
        }, 500);
    };

    const updateSellerRating = (sellerId, newRating) => {
        const savedRatings = localStorage.getItem('wibeSellerRatings');
        const ratings = savedRatings ? JSON.parse(savedRatings) : {};

        if (!ratings[sellerId]) {
            ratings[sellerId] = { total: 0, count: 0 };
        }

        ratings[sellerId].total += newRating;
        ratings[sellerId].count += 1;

        localStorage.setItem('wibeSellerRatings', JSON.stringify(ratings));
    };

    const ratingLabels = ['', 'Yomon', 'Qoniqarsiz', 'Yaxshi', 'Juda yaxshi', 'A\'lo'];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-[#1e1e32] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">Baholash</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Seller Info */}
                    <div className="flex items-center gap-4 p-4 bg-[#25253a] rounded-xl">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-lg font-bold text-white">
                            {seller?.name?.charAt(0) || 'S'}
                        </div>
                        <div>
                            <p className="text-white font-medium">{seller?.name || 'Sotuvchi'}</p>
                            <p className="text-sm text-gray-400">{account?.title || 'Akkaunt'}</p>
                        </div>
                    </div>

                    {/* Star Rating */}
                    <div className="text-center">
                        <p className="text-sm text-gray-400 mb-3">Bahoingizni bering</p>
                        <div className="flex justify-center gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="p-1 transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`w-10 h-10 transition-colors ${star <= (hoverRating || rating)
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-600'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        <p className="text-sm font-medium text-yellow-400 h-5">
                            {ratingLabels[hoverRating || rating]}
                        </p>
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Izoh (ixtiyoriy)
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Sotuvchi haqida fikringizni yozing..."
                            rows={4}
                            className="w-full px-4 py-3 bg-[#25253a] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={rating === 0 || isSubmitting}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                        {isSubmitting ? 'Yuborilmoqda...' : 'Baholash'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
