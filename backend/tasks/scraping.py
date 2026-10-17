"""Background tasks for scraping"""
import logging
from celery import shared_task
from scraping.crawler import ProductCrawler
from database import get_db

logger = logging.getLogger(__name__)

@shared_task(bind=True, max_retries=3)
def run_scraping_job(self):
    """Run product scraping job"""
    try:
        crawler = ProductCrawler()
        db = next(get_db())
        products_data = crawler.crawl_all_sources()
        saved_count = crawler.save_products_to_db(products_data, db)
        db.close()
        logger.info(f"Scraping job completed: {saved_count} products saved")
        return {"status": "success", "products_saved": saved_count}
    except Exception as exc:
        logger.error(f"Scraping job failed: {exc}")
        self.retry(exc=exc, countdown=60)