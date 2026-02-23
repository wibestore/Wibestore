"""
Reviews App - Services
"""

import logging
from django.db import transaction
from django.db.models import Avg
from apps.reviews.models import Review

logger = logging.getLogger(__name__)


class ReviewService:
    """Service for review-related operations."""

    @staticmethod
    @transaction.atomic
    def create_review(
        seller,
        reviewer,
        listing,
        rating: int,
        comment: str = ""
    ) -> Review:
        """Create a new review for a seller."""
        # Check if review already exists
        existing = Review.objects.filter(
            seller=seller,
            reviewer=reviewer,
            listing=listing
        ).first()
        
        if existing:
            raise ValueError("Review already exists for this listing")
        
        if rating < 1 or rating > 5:
            raise ValueError("Rating must be between 1 and 5")
        
        review = Review.objects.create(
            seller=seller,
            reviewer=reviewer,
            listing=listing,
            rating=rating,
            comment=comment
        )
        
        # Update seller rating
        ReviewService.update_seller_rating(seller)
        
        logger.info(f"Review created: {review.id} for seller {seller.id}")
        return review

    @staticmethod
    def update_seller_rating(seller) -> None:
        """Recalculate seller's average rating."""
        avg = Review.objects.filter(
            seller=seller
        ).aggregate(Avg('rating'))['rating__avg']
        
        if avg is not None:
            seller.rating = round(avg, 2)
            seller.save(update_fields=['rating'])
            logger.info(f"Seller {seller.id} rating updated to {seller.rating}")

    @staticmethod
    @transaction.atomic
    def delete_review(review: Review) -> None:
        """Delete a review and recalculate seller rating."""
        seller = review.seller
        review.delete()
        
        # Recalculate rating
        ReviewService.update_seller_rating(seller)
        
        logger.info(f"Review {review.id} deleted")
