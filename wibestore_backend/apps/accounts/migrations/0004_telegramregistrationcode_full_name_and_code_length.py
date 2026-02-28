# TelegramRegistrationCode: full_name field + index fix

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0003_telegram_registration"),
    ]

    operations = [
        # Fix: 0003 dagi index yaratilmagan bo'lsa, avval yaratamiz
        migrations.RunSQL(
            sql='CREATE INDEX IF NOT EXISTS "telegram_re_code_8a0b0d_idx" ON "telegram_registration_codes" ("code", "is_used");',
            reverse_sql='DROP INDEX IF EXISTS "telegram_re_code_8a0b0d_idx";',
        ),
        migrations.AddField(
            model_name="telegramregistrationcode",
            name="full_name",
            field=models.CharField(blank=True, default="", max_length=150),
        ),
    ]
