# Celery configuration
import os
from celery import Celery
from .loader import get_settings_module

os.environ.setdefault('DJANGO_SETTINGS_MODULE', get_settings_module())

# Create a Celery instance
app = Celery('config')

# Configuration based on environment
mode = os.getenv("MODE", "dev").lower()

if mode == "production":
    app.conf.broker_url = os.getenv("REDIS_URL")
    app.conf.result_backend = os.getenv("REDIS_URL")
else:
    app.conf.broker_url = os.getenv("REDIS_UR")
    app.conf.result_backend = os.getenv("REDIS_UR")

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

# Celery general configurations
app.conf.update(
    result_expires=3600,  # Results expire after 1 hour
    task_track_started=True,  # Track started tasks
    loglevel='DEBUG',
    worker_concurrency=2,
    worker_max_tasks_per_child=100,
    worker_prefetch_multiplier=1,
)

# Only use SSL in production
if mode == "production":
    app.conf.broker_use_ssl = {'ssl_cert_reqs': 'CERT_NONE'}

# Gracefully restart Celery if Redis is unavailable
app.conf.broker_connection_retry_on_startup = True

if __name__ == '__main__':
    app.start()
