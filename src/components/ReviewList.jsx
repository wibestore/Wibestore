import { useState, useEffect } from 'react';
import { Star, MessageSquare, User } from 'lucide-react';

const ReviewList = ({ userId, type = 'received' }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const savedReviews = localStorage.getItem('wibeReviews');
        if (savedReviews) {
            const allReviews = JSON.parse(savedReviews);

            // Filter reviews based on type
            const filtered = type === 'received'
                ? allReviews.filter(r => r.sellerId === userId)
                : allReviews.filter(r => r.reviewerId === userId);

            setReviews(filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        }
    }, [userId, type]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uz-UZ', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getAverageRating = () => {
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((sum, r) => sum + r.rating, 0);
        return (total / reviews.length).toFixed(1);
    };

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                    {type === 'received'
                        ? 'Hali baholashlar yo\'q'
                        : 'Siz hali hech kimni baholamadingiz'
                    }
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Summary */}
            <div className="flex items-center gap-6 p-4 bg-[#25253a] rounded-xl">
                <div className="text-center">
                    <div className="text-3xl font-bold text-white">{getAverageRating()}</div>
                    <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-4 h-4 ${star <= Math.round(getAverageRating())
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-600'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                <div className="text-gray-400">
                    <span className="text-white font-medium">{reviews.length}</span> ta baholash
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="p-4 bg-[#25253a] rounded-xl border border-white/5"
                    >
                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                                {review.reviewerName?.charAt(0) || 'U'}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-4 mb-2">
                                    <div>
                                        <span className="font-medium text-white">
                                            {review.reviewerName}
                                        </span>
                                        <span className="text-sm text-gray-500 ml-2">
                                            {formatDate(review.createdAt)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-4 h-4 ${star <= review.rating
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-600'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Account Info */}
                                {review.accountTitle && (
                                    <p className="text-sm text-gray-500 mb-2">
                                        Akkaunt: <span className="text-gray-400">{review.accountTitle}</span>
                                    </p>
                                )}

                                {/* Comment */}
                                {review.comment && (
                                    <p className="text-gray-300">{review.comment}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;
