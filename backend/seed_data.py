"""Seed initial data for the dropshipping platform"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

from database import Base, Product, Supplier, Category, ProductStatus, User, Order, OrderItem, OrderStatus

DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://dropshipping:changeme123@postgres:5432/dropshipping")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

# Create categories
categories_data = [
    {"name_ar": "إلكترونيات", "name_en": "Electronics", "slug": "electronics", "level": 0, "sort_order": 1},
    {"name_ar": "أزياء ومجوهرات", "name_en": "Fashion & Accessories", "slug": "fashion", "level": 0, "sort_order": 2},
    {"name_ar": "منزل وحديقة", "name_en": "Home & Garden", "slug": "home-garden", "level": 0, "sort_order": 3},
    {"name_ar": "رياضات", "name_en": "Sports", "slug": "sports", "level": 0, "sort_order": 4},
    {"name_ar": "جمال وصحة", "name_en": "Beauty & Health", "slug": "beauty", "level": 0, "sort_order": 5},
    {"name_ar": "كتب", "name_en": "Books", "slug": "books", "level": 0, "sort_order": 6},
    {"name_ar": "ألعاب", "name_en": "Toys", "slug": "toys", "level": 0, "sort_order": 7},
]

categories = {}
for cat_data in categories_data:
    existing = db.query(Category).filter(Category.slug == cat_data["slug"]).first()
    if not existing:
        category = Category(**cat_data)
        db.add(category)
        db.flush()
        categories[cat_data["slug"]] = category
    else:
        categories[cat_data["slug"]] = existing

db.commit()

# Create default supplier
supplier = db.query(Supplier).filter(Supplier.name == "tunisia-market-aggregator").first()
if not supplier:
    supplier = Supplier(
        name="tunisia-market-aggregator",
        location="Tunisia",
        is_active=True,
        rating=4.5
    )
    db.add(supplier)
    db.commit()

# Create sample products
products_data = [
    {
        "name": "iPhone 15 Pro",
        "name_ar": "آيفون 15 برو",
        "name_en": "iPhone 15 Pro",
        "description": "The iPhone 15 Pro features a titanium design, A17 Pro chip, and advanced camera system.",
        "description_ar": "يتميز iPhone 15 برو بتصميم من التيتانيوم، وشريحة A17 برو، ونظام كاميرا متقدم.",
        "price": 3299.0,
        "original_price": 3999.0,
        "currency": "TND",
        "stock_quantity": 15,
        "sku": "IP15PRO-128",
        "brand": "Apple",
        "model": "iPhone 15 Pro",
        "images": ["https://images.unsplash.com/photo-1678928136917-9e274e39e993?w=800&q=80"],
        "main_image": "https://images.unsplash.com/photo-1678928136917-9e274e39e993?w=800&q=80",
        "category_id": categories["electronics"].id,
        "supplier_id": supplier.id,
        "status": ProductStatus.ACTIVE,
        "is_featured": True,
        "tags": ["smartphone", "apple", "titanium"],
        "view_count": 1240,
        "sales_count": 89,
        "rating": 4.8,
        "rating_count": 156,
    },
    {
        "name": "Samsung Galaxy S24",
        "name_ar": "سامسونج جالكسي S24",
        "name_en": "Samsung Galaxy S24",
        "description": "Samsung Galaxy S24 with AI features, 50MP camera, and long-lasting battery.",
        "description_ar": "سامسونج جالكسي S24 مع ميزات الذكاء الاصطناعي، وكاميرا 50 ميجابكسل، وبطارية طويلة الأمد.",
        "price": 2899.0,
        "original_price": 3299.0,
        "currency": "TND",
        "stock_quantity": 8,
        "sku": "SGS24-256",
        "brand": "Samsung",
        "model": "Galaxy S24",
        "images": ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80"],
        "main_image": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
        "category_id": categories["electronics"].id,
        "supplier_id": supplier.id,
        "status": ProductStatus.ACTIVE,
        "is_featured": True,
        "tags": ["smartphone", "samsung", "ai"],
        "view_count": 980,
        "sales_count": 67,
        "rating": 4.7,
        "rating_count": 134,
    },
    {
        "name": "MacBook Air M3",
        "name_ar": "ماك بوك إير M3",
        "name_en": "MacBook Air M3",
        "description": "MacBook Air with M3 chip, 13.6-inch Liquid Retina display, and all-day battery life.",
        "description_ar": "ماك بوك إير مع شريحة M3، وشاشة Liquid Retina مقاس 13.6 بوصة، وعمر بطارية طوال اليوم.",
        "price": 4599.0,
        "original_price": 5299.0,
        "currency": "TND",
        "stock_quantity": 5,
        "sku": "MBA-M3-256",
        "brand": "Apple",
        "model": "MacBook Air M3",
        "images": ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"],
        "main_image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
        "category_id": categories["electronics"].id,
        "supplier_id": supplier.id,
        "status": ProductStatus.ACTIVE,
        "is_featured": True,
        "tags": ["laptop", "apple", "m3"],
        "view_count": 756,
        "sales_count": 34,
        "rating": 4.9,
        "rating_count": 89,
    },
    {
        "name": "Sony WH-1000XM5",
        "name_ar": "سوني WH-1000XM5",
        "name_en": "Sony WH-1000XM5",
        "description": "Industry-leading noise canceling headphones with 30-hour battery life.",
        "description_ar": "سماعات رأس رائدة في الصناعة مع إلغاء الضوضاء وعمر بطارية 30 ساعة.",
        "price": 899.0,
        "original_price": 1099.0,
        "currency": "TND",
        "stock_quantity": 22,
        "sku": "SWH1000XM5",
        "brand": "Sony",
        "model": "WH-1000XM5",
        "images": ["https://images.unsplash.com/photo-1583394838336-acd677ed66f1?w=800&q=80"],
        "main_image": "https://images.unsplash.com/photo-1583394838336-acd677ed66f1?w=800&q=80",
        "category_id": categories["electronics"].id,
        "supplier_id": supplier.id,
        "status": ProductStatus.ACTIVE,
        "is_featured": True,
        "tags": ["headphones", "sony", "noise-canceling"],
        "view_count": 543,
        "sales_count": 112,
        "rating": 4.8,
        "rating_count": 203,
    },
    {
        "name": "Nike Air Max",
        "name_ar": "نايكي إير ماكس",
        "name_en": "Nike Air Max",
        "description": "Classic Nike Air Max sneakers with visible air cushioning.",
        "description_ar": "حذاء نايكي إير ماكس الكلاسيكي مع وسادة هواء مرئية.",
        "price": 599.0,
        "original_price": 749.0,
        "currency": "TND",
        "stock_quantity": 30,
        "sku": "NAM-42",
        "brand": "Nike",
        "model": "Air Max",
        "images": ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"],
        "main_image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
        "category_id": categories["fashion"].id,
        "supplier_id": supplier.id,
        "status": ProductStatus.ACTIVE,
        "is_featured": False,
        "tags": ["sneakers", "nike", "running"],
        "view_count": 432,
        "sales_count": 156,
        "rating": 4.6,
        "rating_count": 189,
    },
    {
        "name": "IKEA Desk Lamp",
        "name_ar": "مصباح مكتب إيكيا",
        "name_en": "IKEA Desk Lamp",
        "description": "Modern LED desk lamp with adjustable brightness and color temperature.",
        "description_ar": "مصباح مكتب LED حديث مع سطوع قابل للتعديل ودرجة حرارة اللون.",
        "price": 199.0,
        "original_price": 249.0,
        "currency": "TND",
        "stock_quantity": 40,
        "sku": "IKEA-DL-001",
        "brand": "IKEA",
        "model": "Desk Lamp",
        "images": ["https://images.unsplash.com/photo-1507473885765-e2ed079f03c7?w=800&q=80"],
        "main_image": "https://images.unsplash.com/photo-1507473885765-e2ed079f03c7?w=800&q=80",
        "category_id": categories["home-garden"].id,
        "supplier_id": supplier.id,
        "status": ProductStatus.ACTIVE,
        "is_featured": False,
        "tags": ["lamp", "ikea", "led"],
        "view_count": 289,
        "sales_count": 78,
        "rating": 4.4,
        "rating_count": 67,
    },
    {
        "name": "Yoga Mat",
        "name_ar": "حصيرة يوجا",
        "name_en": "Yoga Mat",
        "description": "Non-slip yoga mat with carrying strap, perfect for home workouts.",
        "description_ar": "حصيرة يوجا غير قابلة للانزلاق مع حزام حمل، مثالية للتمارين المنزلية.",
        "price": 129.0,
        "original_price": 159.0,
        "currency": "TND",
        "stock_quantity": 25,
        "sku": "YM-001",
        "brand": "FitTunisia",
        "model": "Pro Mat",
        "images": ["https://images.unsplash.com/photo-1544367567-0f21b003405e?w=800&q=80"],
        "main_image": "https://images.unsplash.com/photo-1544367567-0f21b003405e?w=800&q=80",
        "category_id": categories["sports"].id,
        "supplier_id": supplier.id,
        "status": ProductStatus.ACTIVE,
        "is_featured": False,
        "tags": ["yoga", "fitness", "mat"],
        "view_count": 198,
        "sales_count": 45,
        "rating": 4.3,
        "rating_count": 52,
    },
    {
        "name": "Levi's Jeans",
        "name_ar": "جينز ليفيز",
        "name_en": "Levi's Jeans",
        "description": "Classic Levi's 501 jeans, premium denim made in Tunisia.",
        "description_ar": "جينز ليفيز 501 الكلاسيكي، دينيم فاخر مصنوع في تونس.",
        "price": 349.0,
        "original_price": 449.0,
        "currency": "TND",
        "stock_quantity": 0,
        "sku": "LEVIS-501-32",
        "brand": "Levi's",
        "model": "501",
        "images": ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80"],
        "main_image": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
        "category_id": categories["fashion"].id,
        "supplier_id": supplier.id,
        "status": ProductStatus.OUT_OF_STOCK,
        "is_featured": False,
        "tags": ["jeans", "levis", "denim"],
        "view_count": 312,
        "sales_count": 234,
        "rating": 4.5,
        "rating_count": 145,
    },
    {
        "name": "Dell XPS 13",
        "name_ar": "ديل XPS 13",
        "name_en": "Dell XPS 13",
        "description": "Dell XPS 13 laptop with Intel Core i7, 16GB RAM, and 512GB SSD.",
        "description_ar": "لابتوب ديل XPS 13 مع معالج إنتل كور i7، وذاكرة 16 جيجابايت، وقرص 512 جيجابايت.",
        "price": 3899.0,
        "original_price": 4499.0,
        "currency": "TND",
        "stock_quantity": 7,
        "sku": "DELL-XPS13-512",
        "brand": "Dell",
        "model": "XPS 13",
        "images": ["https://images.unsplash.com/photo-1593642532400-248788f66709?w=800&q=80"],
        "main_image": "https://images.unsplash.com/photo-1593642532400-248788f66709?w=800&q=80",
        "category_id": categories["electronics"].id,
        "supplier_id": supplier.id,
        "status": ProductStatus.ACTIVE,
        "is_featured": True,
        "tags": ["laptop", "dell", "xps"],
        "view_count": 654,
        "sales_count": 23,
        "rating": 4.7,
        "rating_count": 89,
    },
    {
        "name": "Canon EOS R50",
        "name_ar": "كانون EOS R50",
        "name_en": "Canon EOS R50",
        "description": "Canon EOS R50 mirrorless camera with 24.2MP sensor and 4K video.",
        "description_ar": "كاميرا كانون EOS R50 بدون مرآة مع مستشعر 24.2 ميجابكسل وتصوير 4K.",
        "price": 2499.0,
        "original_price": 2999.0,
        "currency": "TND",
        "stock_quantity": 4,
        "sku": "CANON-EOSR50",
        "brand": "Canon",
        "model": "EOS R50",
        "images": ["https://images.unsplash.com/photo-1516035069371-29a1b2440326?w=800&q=80"],
        "main_image": "https://images.unsplash.com/photo-1516035069371-29a1b2440326?w=800&q=80",
        "category_id": categories["electronics"].id,
        "supplier_id": supplier.id,
        "status": ProductStatus.ACTIVE,
        "is_featured": False,
        "tags": ["camera", "canon", "mirrorless"],
        "view_count": 312,
        "sales_count": 12,
        "rating": 4.6,
        "rating_count": 67,
    },
    {
        "name": "Adidas Ultraboost",
        "name_ar": "أديداس ألترابوست",
        "name_en": "Adidas Ultraboost",
        "description": "Adidas Ultraboost running shoes with Boost cushioning and Primeknit upper.",
        "description_ar": "حذاء أديداس ألترابوست للجري مع وسادة بوس وجزء علوي من برايمنيت.",
        "price": 449.0,
        "original_price": 599.0,
        "currency": "TND",
        "stock_quantity": 18,
        "sku": "ADIDAS-UB-42",
        "brand": "Adidas",
        "model": "Ultraboost",
        "images": ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"],
        "main_image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
        "category_id": categories["sports"].id,
        "supplier_id": supplier.id,
        "status": ProductStatus.ACTIVE,
        "is_featured": False,
        "tags": ["sneakers", "adidas", "running"],
        "view_count": 523,
        "sales_count": 89,
        "rating": 4.5,
        "rating_count": 156,
    },
]

for p_data in products_data:
    existing = db.query(Product).filter(Product.sku == p_data["sku"]).first()
    if not existing:
        product = Product(**p_data)
        db.add(product)

db.commit()
print(f"Seeded {len(products_data)} products successfully")

# Create a test admin user
from auth_utils import get_password_hash
admin_user = db.query(User).filter(User.email == "admin@dropshipping.tn").first()
if not admin_user:
    admin_user = User(
        email="admin@dropshipping.tn",
        password_hash=get_password_hash("admin123"),
        name="Admin User",
        phone="+216 20 000 000",
        is_active=True,
        is_admin=True,
    )
    db.add(admin_user)
    db.commit()
    print("Created admin user: admin@dropshipping.tn / admin123")

db.close()
print("Database seeding complete!")
