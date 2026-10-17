import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = os.environ.get("DATABASE_URL", "postgresql://user:pass@localhost:5432/dropshipping")
    redis_url: str = os.environ.get("REDIS_URL", "redis://localhost:6379/0")
    rabbitmq_url: str = os.environ.get("RABBITMQ_URL", "amqp://user:pass@localhost:5672/")
    elasticsearch_url: str = os.environ.get("ELASTICSEARCH_URL", "http://localhost:9200")
    secret_key: str = os.environ.get("SECRET_KEY", "change-me-in-production")
    stripe_secret_key: str = os.environ.get("STRIPE_SECRET_KEY", "")
    paypal_client_id: str = os.environ.get("PAYPAL_CLIENT_ID", "")
    paypal_secret: str = os.environ.get("PAYPAL_SECRET", "")
    openai_api_key: str = os.environ.get("OPENAI_API_KEY", "")
    environment: str = os.environ.get("ENVIRONMENT", "development")
    
    class Config:
        env_file = ".env"

settings = Settings()
