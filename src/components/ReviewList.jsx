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
            <div className="empty-state">
                <MessageSquare className="empty-state-icon" />
                <p className="empty-state-description">
                    {type === 'received'
                        ? 'Hali baholashlar yo\'q'
                        : 'Siz hali hech kimni baholamadingiz'
                    }
                </p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Summary */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    padding: 'var(--space-4)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--color-border-muted)',
                }}
            >
                <div className="text-center">
                    <div
                        style={{
                            fontSize: 'var(--font-size-3xl)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--color-text-primary)',
                        }}
                    >
                        {getAverageRating()}
                    </div>
                    <div className="flex items-center gap-1" style={{ marginTop: '4px' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className="w-4 h-4"
                                style={{
                                    color: star <= Math.round(getAverageRating())
                                        ? 'var(--color-premium-gold-light)'
                                        : 'var(--color-text-muted)',
                                    fill: star <= Math.round(getAverageRating()) ? 'currentColor' : 'none',
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div style={{ color: 'var(--color-text-muted)' }}>
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: 'var(--font-weight-medium)' }}>
                        {reviews.length}
                    </span>{' '}
                    ta baholash
                </div>
            </div>

            {/* Reviews List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        style={{
                            padding: 'var(--space-4)',
                            backgroundColor: 'var(--color-bg-secondary)',
                            borderRadius: 'var(--radius-xl)',
                            border: '1px solid var(--color-border-muted)',
                        }}
                    >
                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div
                                className="avatar avatar-lg"
                                style={{
                                    backgroundColor: 'var(--color-accent-blue)',
                                    color: '#fff',
                                    flexShrink: 0,
                                }}
                            >
                                {review.reviewerName?.charAt(0) || 'U'}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-4" style={{ marginBottom: '8px' }}>
                                    <div>
                                        <span
                                            style={{
                                                fontWeight: 'var(--font-weight-medium)',
                                                color: 'var(--color-text-primary)',
                                            }}
                                        >
                                            {review.reviewerName}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: 'var(--font-size-sm)',
                                                color: 'var(--color-text-muted)',
                                                marginLeft: '8px',
                                            }}
                                        >
                                            {formatDate(review.createdAt)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className="w-4 h-4"
                                                style={{
                                                    color: star <= review.rating
                                                        ? 'var(--color-premium-gold-light)'
                                                        : 'var(--color-text-muted)',
                                                    fill: star <= review.rating ? 'currentColor' : 'none',
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Account Info */}
                                {review.accountTitle && (
                                    <p style={{
                                        fontSize: 'var(--font-size-sm)',
                                        color: 'var(--color-text-muted)',
                                        marginBottom: '8px',
                                    }}>
                                        Akkaunt:{' '}
                                        <span style={{ color: 'var(--color-text-secondary)' }}>
                                            {review.accountTitle}
                                        </span>
                                    </p>
                                )}

                                {/* Comment */}
                                {review.comment && (
                                    <p style={{
                                        color: 'var(--color-text-secondary)',
                                        lineHeight: 'var(--line-height-base)',
                                    }}>
                                        {review.comment}
                                    </p>
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
