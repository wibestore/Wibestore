"""
WibeStore Backend - Upload URL Configuration
"""

from django.urls import path

from . import upload_views

app_name = "upload"

urlpatterns = [
    path("image/", upload_views.ImageUploadView.as_view(), name="image-upload"),
    path("images/", upload_views.MultipleImageUploadView.as_view(), name="multiple-image-upload"),
]
