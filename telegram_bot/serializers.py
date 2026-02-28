from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils import timezone
from .models import OTPCode

User = get_user_model()


class OTPVerifySerializer(serializers.Serializer):
    """OTP kod orqali ro'yxatdan o'tish uchun serializer"""
    code = serializers.CharField(min_length=4, max_length=6)
    email = serializers.EmailField(required=False, allow_blank=True)
    username = serializers.CharField(min_length=3, max_length=50, required=False)
    password = serializers.CharField(min_length=8, write_only=True, required=False)

    def validate_code(self, value):
        return value.strip()

    def validate(self, data):
        code = data.get('code')

        # Kodni bazadan qidirish
        otp = OTPCode.objects.filter(
            code=code,
            is_used=False
        ).order_by('-created_at').first()

        if not otp:
            raise serializers.ValidationError({
                'code': 'Kod noto\'g\'ri yoki allaqachon ishlatilgan.'
            })

        if not otp.is_valid:
            raise serializers.ValidationError({
                'code': f'Kod muddati tugagan. Botdan yangi kod oling.'
            })

        data['otp'] = otp
        return data


class UserRegisterSerializer(serializers.ModelSerializer):
    """Foydalanuvchi ro'yxatdan o'tish serializer"""
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True)
    otp_code = serializers.CharField(min_length=4, max_length=6)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'otp_code']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password2': 'Parollar mos kelmadi.'})

        code = data.get('otp_code')
        otp = OTPCode.objects.filter(
            code=code,
            is_used=False
        ).order_by('-created_at').first()

        if not otp:
            raise serializers.ValidationError({
                'otp_code': 'Noto\'g\'ri OTP kod.'
            })

        if not otp.is_valid:
            raise serializers.ValidationError({
                'otp_code': 'OTP kod muddati tugagan. Botdan yangi kod oling.'
            })

        data['otp'] = otp
        return data

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Bu username band.')
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Bu email allaqachon ro\'yxatdan o\'tgan.')
        return value

    def create(self, validated_data):
        otp = validated_data.pop('otp')
        validated_data.pop('password2')
        validated_data.pop('otp_code')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            telegram_id=otp.telegram_id,
            is_telegram_verified=True
        )

        # OTP ni ishlatilgan deb belgilash
        otp.is_used = True
        otp.save()

        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'telegram_id',
                  'telegram_username', 'is_telegram_verified', 'created_at']
        read_only_fields = ['id', 'telegram_id', 'created_at']


class OTPStatusSerializer(serializers.Serializer):
    """OTP kod holati uchun"""
    code = serializers.CharField()
    remaining_seconds = serializers.IntegerField()
    is_valid = serializers.BooleanField()
    telegram_id = serializers.IntegerField()
