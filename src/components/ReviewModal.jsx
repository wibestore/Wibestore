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
            id: crypto.randomUUID(),
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
        <div className="modal-overlay">
            {/* Backdrop */}
            <div
                className="modal-backdrop"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="modal-content" style={{ maxWidth: '440px' }}>
                {/* Header */}
                <div className="modal-header">
                    <h2 className="modal-title">Baholash</h2>
                    <button
                        onClick={onClose}
                        className="btn btn-ghost btn-sm"
                        style={{ padding: '6px' }}
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit}>
                    <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Seller Info */}
                        <div
                            className="flex items-center gap-4"
                            style={{
                                padding: 'var(--space-4)',
                                backgroundColor: 'var(--color-bg-tertiary)',
                                borderRadius: 'var(--radius-xl)',
                            }}
                        >
                            <div
                                className="avatar avatar-lg"
                                style={{
                                    backgroundColor: 'var(--color-accent-blue)',
                                    color: '#fff',
                                }}
                            >
                                {seller?.name?.charAt(0) || 'S'}
                            </div>
                            <div>
                                <p style={{
                                    color: 'var(--color-text-primary)',
                                    fontWeight: 'var(--font-weight-medium)',
                                }}>
                                    {seller?.name || 'Sotuvchi'}
                                </p>
                                <p style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-muted)',
                                }}>
                                    {account?.title || 'Akkaunt'}
                                </p>
                            </div>
                        </div>

                        {/* Star Rating */}
                        <div className="text-center">
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-muted)',
                                marginBottom: '12px',
                            }}>
                                Bahoingizni bering
                            </p>
                            <div className="flex justify-center gap-2" style={{ marginBottom: '8px' }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        style={{
                                            padding: '4px',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'transform 0.15s ease',
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <Star
                                            className="w-10 h-10"
                                            style={{
                                                color: star <= (hoverRating || rating)
                                                    ? 'var(--color-premium-gold-light)'
                                                    : 'var(--color-text-muted)',
                                                fill: star <= (hoverRating || rating) ? 'currentColor' : 'none',
                                                transition: 'color 0.15s ease',
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: 'var(--font-weight-medium)',
                                color: 'var(--color-premium-gold-light)',
                                height: '20px',
                            }}>
                                {ratingLabels[hoverRating || rating]}
                            </p>
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="input-label">
                                Izoh (ixtiyoriy)
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Sotuvchi haqida fikringizni yozing..."
                                rows={4}
                                className="input"
                                style={{ resize: 'none', width: '100%' }}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="modal-footer">
                        <button
                            type="submit"
                            disabled={rating === 0 || isSubmitting}
                            className="btn btn-primary btn-lg w-full"
                            style={{ gap: '8px' }}
                        >
                            <Send className="w-5 h-5" />
                            {isSubmitting ? 'Yuborilmoqda...' : 'Baholash'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
