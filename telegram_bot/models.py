from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import random
import string


class User(AbstractUser):
    telegram_id = models.BigIntegerField(null=True, blank=True, unique=True)
    telegram_username = models.CharField(max_length=100, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    is_telegram_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.username or self.email or str(self.telegram_id)


class OTPCode(models.Model):
    """OTP kod modeli - 1 daqiqa muddatli"""
    telegram_id = models.BigIntegerField()
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    code = models.CharField(max_length=6)
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    class Meta:
        db_table = 'otp_codes'
        ordering = ['-created_at']

    def __str__(self):
        return f"OTP {self.code} for telegram_id={self.telegram_id}"

    @classmethod
    def generate_code(cls, length=6):
        """6 xonali raqamli kod generatsiya qilish"""
        return ''.join(random.choices(string.digits, k=length))

    @classmethod
    def create_otp(cls, telegram_id, email=None, phone=None):
        """Yangi OTP kod yaratish, oldingi kodlarni bekor qilish"""
        # Avvalgi aktiv kodlarni o'chirish
        cls.objects.filter(
            telegram_id=telegram_id,
            is_used=False
        ).update(is_used=True)

        code = cls.generate_code(6)
        expires_at = timezone.now() + timezone.timedelta(minutes=1)

        otp = cls.objects.create(
            telegram_id=telegram_id,
            email=email,
            phone=phone,
            code=code,
            expires_at=expires_at
        )
        return otp

    @property
    def is_valid(self):
        """Kod hali ham amal qiladimi?"""
        return not self.is_used and timezone.now() < self.expires_at

    @property
    def remaining_seconds(self):
        """Necha soniya qoldi"""
        if self.is_valid:
            delta = self.expires_at - timezone.now()
            return max(0, int(delta.total_seconds()))
        return 0


class TelegramSession(models.Model):
    """Telegram bot sessiya holati"""
    STATES = [
        ('START', 'Start'),
        ('WAITING_EMAIL', 'Waiting Email'),
        ('WAITING_PHONE', 'Waiting Phone'),
        ('OTP_SENT', 'OTP Sent'),
        ('COMPLETED', 'Completed'),
    ]

    telegram_id = models.BigIntegerField(unique=True)
    telegram_username = models.CharField(max_length=100, null=True, blank=True)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=20, choices=STATES, default='START')
    temp_email = models.EmailField(null=True, blank=True)
    temp_phone = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'telegram_sessions'

    def __str__(self):
        return f"Session {self.telegram_id} - {self.state}"
