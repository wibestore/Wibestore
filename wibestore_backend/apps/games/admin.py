"""
WibeStore Backend - Games Admin
"""

from django.contrib import admin

from .models import Category, Game


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "icon", "is_active", "sort_order", "get_active_listings", "created_at"]
    list_filter = ["is_active"]
    search_fields = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}
    list_editable = ["is_active", "sort_order"]
    ordering = ["sort_order", "name"]
    readonly_fields = ["created_at", "updated_at"]

    @admin.display(description="Active Listings")
    def get_active_listings(self, obj):
        if obj is None or not obj.pk:
            return 0
        try:
            return obj.listings.filter(status="active").count()
        except Exception:
            return 0


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "parent"]
    search_fields = ["name"]
    prepopulated_fields = {"slug": ("name",)}
