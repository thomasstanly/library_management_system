from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

app = Celery('core', broker='redis://127.0.0.1:6379/0')
app.conf.enable_utc = False
app.conf.update(broker_url='redis://127.0.0.1:6379/0',
                accept_content=['json'],
                result_serializer='json',
                task_serializer='json',
                timezone='Asia/Kolkata',
                result_backend='django-db',
                beat_scheduler='django_celery_beat.schedulers:DatabaseScheduler',
                beat_schedule={
                    'check-overdue-items': {
                        'task': 'borrow.tasks.check_overdue_items',
                        'schedule': crontab(hour=0, minute=0),
                    },
                },
                broker_connection_retry_on_startup=True,
                )
app.config_from_object(settings, namespace='CELERY')
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print(f'request:{self.request!r}')
