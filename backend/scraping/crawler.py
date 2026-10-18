import asyncio
import logging
import random
import re
from typing import List, Dict, Any
from datetime import datetime
from playwright.async_api import async_playwright
from sqlalchemy.orm import Session
from database import get_db, Product, Supplier, Category, ProductStatus, ScrapingJob

logger = logging.getLogger(__name__)

TUNISIAN_MARKET_SOURCES = [
    {
        "name": "jumia_tn",
        "url": "https://www.jumia.tn/",
        "category_selectors": {
            "electronics": ".cat-electronics a",
            "fashion": ".cat-fashion a",
            "home": ".cat-home a",
            "sports": ".cat-sports a"
        }
    },
    {
        "name": "makino_tn",
        "url": "https://www.makino.tn/",
        "category_selectors": {}
    },
    {
        "name": "amazon_ma",
        "url": "https://www.amazon.ma/",
        "category_selectors": {}
    }
]

class ProductCrawler:
    def __init__(self):
        self.sources = TUNISIAN_MARKET_SOURCES
    
    async def crawl_source(self, source: dict) -> List[Dict[str, Any]]:
        products = []
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)
                context = await browser.new_context(
                    viewport={"width": 1920, "height": 1080},
                    user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                )
                page = await context.new_page()
                
                await page.goto(source["url"], wait_until="domcontentloaded", timeout=30000)
                await page.wait_for_timeout(3000)
                
                # Extract products
                product_elements = await page.query_selector_all(".product-item, .item, .product, article")
                
                for element in product_elements[:20]:  # Limit per page
                    try:
                        name_el = await element.query_selector(".name, .title, h2, h3, [class*='name'], [class*='title']")
                        price_el = await element.query_selector(".price, .cost, [class*='price']")
                        image_el = await element.query_selector("img")
                        
                        name = await name_el.inner_text() if name_el else ""
                        price_text = await price_el.inner_text() if price_el else "0"
                        image = await image_el.get_attribute("src") if image_el else ""
                        
                        # Parse price
                        price = self._parse_price(price_text)
                        
                        if name and price > 0:
                            products.append({
                                "name": name.strip(),
                                "price": price,
                                "currency": "TND",
                                "image": image,
                                "source": source["name"]
                            })
                    except Exception as e:
                        logger.warning(f"Error extracting product: {e}")
                        continue
                
                await browser.close()
        except Exception as e:
            logger.error(f"Error crawling {source['name']}: {e}")
        
        return products
    
    def _parse_price(self, text: str) -> float:
        cleaned = re.sub(r'[^\d.,]', '', text)
        cleaned = cleaned.replace(',', '.')
        try:
            return float(cleaned)
        except ValueError:
            return 0.0
    
    async def crawl_all_sources(self) -> Dict[str, List[Dict[str, Any]]]:
        results = {}
        for source in self.sources:
            products = await self.crawl_source(source)
            results[source["name"]] = products
            await asyncio.sleep(random.uniform(1, 3))  # Politeness delay
        return results
    
    def save_products_to_db(self, products_data: Dict[str, List[Dict]], db: Session):
        """Save scraped products to database"""
        saved_count = 0
        for source_name, products in products_data.items():
            for product_data in products:
                try:
                    # Check if product already exists
                    existing = db.query(Product).filter(
                        Product.name == product_data["name"],
                        Product.supplier_id != None
                    ).first()
                    
                    if not existing:
                        # Create or get supplier
                        supplier = db.query(Supplier).filter(Supplier.name == source_name).first()
                        if not supplier:
                            supplier = Supplier(
                                name=source_name,
                                location="Tunisia",
                                is_active=True
                            )
                            db.add(supplier)
                            db.flush()
                        
                        product = Product(
                            name=product_data["name"],
                            name_en=product_data["name"],
                            price=product_data["price"],
                            currency=product_data.get("currency", "TND"),
                            main_image=product_data.get("image", ""),
                            images=[product_data.get("image", "")] if product_data.get("image") else [],
                            supplier_id=supplier.id,
                            status=ProductStatus.PENDING_REVIEW,
                            stock_quantity=10  # Default, will be updated
                        )
                        db.add(product)
                        saved_count += 1
                except Exception as e:
                    logger.warning(f"Error saving product: {e}")
                    continue
        
        db.commit()
        return saved_count
    
    async def run_scraping_job(self, job_id: int = None):
        """Run a full scraping job"""
        db = next(get_db())
        try:
            products_data = await self.crawl_all_sources()
            saved_count = self.save_products_to_db(products_data, db)
            logger.info(f"Scraping job completed: {saved_count} products saved")
            return saved_count
        except Exception as e:
            logger.error(f"Scraping job failed: {e}")
            return 0
        finally:
            db.close()

async def start_scraping_job():
    """Standalone function to start scraping"""
    crawler = ProductCrawler()
    return await crawler.run_scraping_job()
