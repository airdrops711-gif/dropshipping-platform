"""Celery application for background tasks"""
import os
from celery import Celery

broker_url = os.environ.get("RABBITMQ_URL", "amqp://guest:guest@localhost:5672/")
result_backend = os.environ.get("REDIS_URL", "redis://localhost:6379/0")

app = Celery(
    "dropshipping",
    broker=broker_url,
    backend=result_backend,
    include=["tasks.scraping", "tasks.orders"]
)

app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="Africa/Tunis",
    enable_utc=True,
    task_track_started=True,
    task_routes={
        "tasks.scraping.run_scraping_job": {"queue": "scraping"},
        "tasks.orders.process_order": {"queue": "orders"},
    }
)