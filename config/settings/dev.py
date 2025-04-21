from .base import *

DEBUG = True
ALLOWED_HOSTS = ["*"]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.getenv("DEV_NAME"),
        "USER": os.getenv("DEV_USER"),
        "PASSWORD": os.getenv("DEV_PASSWORD"),
        "HOST": os.getenv("DEV_HOST"),
        "PORT": os.getenv("DEV_PORT"),
    }
}

CORS_ALLOW_ALL_ORIGINS = True

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [os.getenv("REDIS_UR")],
        },
    },
}
print(f"Layers: {CHANNEL_LAYERS}")


CELERY_BROKER_URL = os.getenv("REDIS_UR")
CELERY_RESULT_BACKEND = os.getenv("REDIS_UR")
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'
