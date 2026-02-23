"""
Core - Shared Filter Backends
"""

from rest_framework import filters
from django.db.models import Q


class SearchFilter(filters.SearchFilter):
    """Extended search filter with case-insensitive search."""
    
    search_case_insensitive = True


class OrderingFilter(filters.OrderingFilter):
    """Extended ordering filter with default ordering."""
    
    def get_default_ordering(self, view):
        """Return default ordering if no ordering is specified."""
        if hasattr(view, 'default_ordering'):
            return view.default_ordering
        return self.default_ordering


class DynamicFieldsMixin:
    """Mixin for dynamic field selection via query parameters."""
    
    def get_fields(self):
        """Return subset of fields based on query params."""
        fields = super().get_fields()
        
        # Get requested fields from query params
        requested_fields = self.context['request'].query_params.get('fields', None)
        
        if requested_fields:
            # Split comma-separated fields
            field_list = requested_fields.split(',')
            
            # Filter to only requested fields that exist
            allowed_fields = set(field_list) & set(fields)
            
            if allowed_fields:
                # Create new dict with only allowed fields
                fields = {
                    field_name: fields[field_name]
                    for field_name in allowed_fields
                }
        
        return fields


class ExpansionMixin:
    """Mixin for expanding related fields via query parameters."""
    
    def get_expansions(self):
        """Return list of fields to expand based on query params."""
        request = self.context.get('request')
        if not request:
            return []
        
        expansions = request.query_params.get('expand', '')
        if expansions:
            return [field.strip() for field in expansions.split(',')]
        return []
