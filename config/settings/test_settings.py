# test_settings.py

from .base import *
# DEBUG= True

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": ":memory:",
    }
}

# Disable migrations during tests
MIGRATION_MODULES = {app: None for app in INSTALLED_APPS}

SMTP_API_URL = "https://api.staging.smtpexpress.com/send"
SMTP_API_SECRET = "6e1492c9e96f03990aaf8e1c7ed1f7468c6ac0d138492872ed"
SMTP_SENDER_EMAIL = "animationhub-9d0a5a@smtpexpress.email"
