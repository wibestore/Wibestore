from django.urls import path
from . import views

urlpatterns = [
    # Auth endpoints
    path('auth/register/', views.RegisterWithOTPView.as_view(), name='register'),
    path('auth/verify-otp/', views.VerifyOTPView.as_view(), name='verify-otp'),
    path('auth/login/', views.LoginView.as_view(), name='login'),
    path('auth/profile/', views.ProfileView.as_view(), name='profile'),

    # Bot internal endpoint
    path('bot/create-otp/', views.OTPStatusView.as_view(), name='create-otp'),
]
