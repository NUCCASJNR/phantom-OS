import logging.config
import os
from datetime import timedelta
from pathlib import Path

from django.conf.global_settings import STATICFILES_DIRS
from dotenv import load_dotenv
from django.utils.log import DEFAULT_LOGGING

from django.conf import settings
from PIL import ImageFont
from django.contrib.staticfiles import finders

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv("SECRET_KEY")

INSTALLED_APPS = [
    "daphne",
    "channels",
    "django.contrib.admin",
    "jazzmin",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    "drf_yasg",
    "phonenumber_field",
    "django_celery_beat",
    "django_celery_results",
    'users',
    'desktop',
    'filesystem',
    'core',
    'apps.notepad',
    'apps.terminal',
    'apps.settings',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # Must come first
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    # "debug_toolbar.middleware.DebugToolbarMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    # "honeybadger.contrib.DjangoHoneybadgerMiddleware",
    "apps.users.middleware.PutAsPostMiddleware",
    # "silk.middleware.SilkyMiddleware",
]


ROOT_URLCONF = "cofig.urls"

DATABASES = {}

# AUTH_USER_MODEL = "users.MainUser"

# STATIC_URL = "static/"
# STATIC_ROOT = BASE_DIR / "static"


MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

FONT_URL = BASE_DIR / "staticfiles"

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Africa/Lagos"
USE_I18N = True
USE_TZ = True

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_PORT = os.getenv("EMAIL_PORT")
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_PWD")
# EMAIL_USE_SSL = True
EMAIL_USE_SSL = True  # Use SSL since port 465 is SSL
EMAIL_USE_TLS = False

CLOUDINARY_URL = os.getenv("CLOUDINARY_URL")

ASGI_APPLICATION = "config.asgi.application"
WSGI_APPLICATION = "config.wsgi.application"
AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "utils.backends.CustomBackend"
]
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "anon.auth.AccessTokenAuth"
        # "rest_framework_simplejwt.authentication.JWTAuthentication",
        # "rest_framework.authentication.TokenAuthentication",
        # "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
        "rest_framework.parsers.FormParser",
        "rest_framework.parsers.MultiPartParser",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 15,
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.UserRateThrottle',
        'rest_framework.throttling.AnonRateThrottle',
    ],
}


SWAGGER_SETTINGS = {
    "DEFAULT_AUTO_SCHEMA_CLASS": "drf_yasg.inspectors.SwaggerAutoSchema",
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=3),
    "ROTATE_REFRESH_TOKENS": True,
}

LOG_LEVEL = "DEBUG"  # Set to DEBUG for more detailed logging

LOGGING_DIR = os.path.join(BASE_DIR, "logs")
if not os.path.exists(LOGGING_DIR):
    os.makedirs(LOGGING_DIR)

if not os.path.exists(LOGGING_DIR):
    os.makedirs(LOGGING_DIR)

try:
    logging.config.dictConfig(
        {
            "version": 1,
            "disable_existing_loggers": False,
            "formatters": {
                "console": {
                    "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
                },
                "file": {
                    "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
                },
                "django.server": DEFAULT_LOGGING["formatters"]["django.server"],
            },
            "handlers": {
                "console": {
                    "level": LOG_LEVEL,
                    "class": "logging.StreamHandler",
                    "formatter": "console",
                },
                "file": {
                    "level": LOG_LEVEL,
                    "class": "logging.handlers.RotatingFileHandler",
                    "formatter": "file",
                    "filename": os.path.join(LOGGING_DIR, "django.log"),
                    "maxBytes": 1024 * 1024 * 10,  # 10 MB
                    "backupCount": 5,
                },
                "django.server": DEFAULT_LOGGING["handlers"]["django.server"],
            },
            "loggers": {
                "": {
                    "level": LOG_LEVEL,
                    "handlers": ["console", "file"],
                    "propagate": True,
                },
                "apps": {
                    "level": LOG_LEVEL,
                    "handlers": ["console", "file"],
                    "propagate": False,
                },
                "django.server": DEFAULT_LOGGING["loggers"]["django.server"],
                "daphne.http_protocol": {
                    "level": "DEBUG",
                    "handlers": ["console", "file"],
                    "propagate": False,  # Avoid propagating to root logger
                },
            },
        }
    )
except Exception as e:
    logging.exception("Failed to configure logging: %s", e)
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]



# font_path = finders.find('fonts/Roboto-Regular.ttf')

# # Load the font
# font = ImageFont.truetype(font_path, size=40)

DATA_UPLOAD_MAX_NUMBER_FIELDS = 52428800

# settings.py
DATA_UPLOAD_MAX_MEMORY_SIZE = 52428800  # 50MB
FILE_UPLOAD_MAX_MEMORY_SIZE = 10485760  # 10MB

INTERNAL_IPS = [
    "127.0.0.1",  # Localhost
]
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"
STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
]
NINJA_PAGINATION_CLASS = "utils.paginate.CustomPagination"

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_PORT = os.getenv("EMAIL_PORT")
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_PWD")
EMAIL_USE_SSL = True

