from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

from database import Base, Product, Supplier, Category, ProductStatus

DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://user:pass@localhost:5432/dropshipping")

engine = create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

# Create default categories
categories_data = [
    {"name_ar": "إلكترونيات", "name_en": "Electronics", "slug": "electronics", "level": 0},
    {"name_ar": "أزياء ومجوهرات", "name_en": "Fashion & Accessories", "slug": "fashion", "level": 0},
    {"name_ar": "منزل وحديقة", "name_en": "Home & Garden", "slug": "home-garden", "level": 0},
    {"name_ar": "رياضات", "name_en": "Sports", "slug": "sports", "level": 0},
    {"name_ar": "جمال وم presumably", "name_en": "Beauty & Health", "slug": "beauty", "level": 0},
    {"name_ar": "Books", "name_en": "Books", "slug": "books", "level": 0},
    {"name_ar": "(children)", "name_en": "Toys", "slug": "toys", "level": 0},
]

for cat_data in categories_data:
    existing = db.query(Category).filter(Category.slug == cat_data["slug"]).first()
    if not existing:
        category = Category(**cat_data)
        db.add(category)

db.commit()

# Create default supplier
supplier = Supplier(
    name="tunisia-market-aggregator",
    location="Tunisia",
    is_active=True,
    rating=4.5
)
db.add(supplier)
db.commit()

print("Database initialized successfully")
db.close()
