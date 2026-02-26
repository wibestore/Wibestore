"""
WibeStore Backend - Games Admin
Minimal config to avoid 500 when DB/migrations differ or relations fail.
"""

import logging

from django.contrib import admin

from .models import Category, Game

logger = logging.getLogger(__name__)


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "icon", "is_active", "sort_order", "created_at"]
    list_filter = ["is_active"]
    search_fields = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}
    ordering = ["sort_order", "name"]
    readonly_fields = ["created_at", "updated_at"]

    def changelist_view(self, request, extra_context=None):
        """Log any error for debugging (Railway logs)."""
        try:
            return super().changelist_view(request, extra_context=extra_context)
        except Exception as e:
            logger.exception("Game admin changelist error: %s", e)
            raise


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "parent"]
    search_fields = ["name"]
    prepopulated_fields = {"slug": ("name",)}
