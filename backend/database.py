from sqlalchemy import create_engine, Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey, Enum, JSON
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func
from datetime import datetime
import enum

Base = declarative_base()

class ProductStatus(str, enum.Enum):
    ACTIVE = "active"
    OUT_OF_STOCK = "out_of_stock"
    DISCONTINUED = "discontinued"
    PENDING_REVIEW = "pending_review"

class OrderStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"

class Supplier(Base):
    __tablename__ = "suppliers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    contact_email = Column(String(255))
    contact_phone = Column(String(50))
    website_url = Column(Text)
    location = Column(String(255))
    rating = Column(Float, default=0.0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    products = relationship("Product", back_populates="supplier")
    orders = relationship("Order", back_populates="supplier")

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name_ar = Column(String(255), nullable=False)
    name_en = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True)
    parent_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    level = Column(Integer, default=0)
    sort_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    
    children = relationship("Category", backref="parent", remote_side=[id])
    products = relationship("Product", back_populates="category")

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(Text, nullable=False, index=True)
    name_ar = Column(Text)
    name_en = Column(Text)
    description = Column(Text)
    description_ar = Column(Text)
    price = Column(Float, nullable=False)
    original_price = Column(Float)
    currency = Column(String(10), default="TND")
    stock_quantity = Column(Integer, default=0)
    sku = Column(String(100), unique=True, index=True)
    brand = Column(String(255))
    model = Column(String(255))
    images = Column(JSON, default=list)
    main_image = Column(Text)
    category_id = Column(Integer, ForeignKey("categories.id"))
    supplier_id = Column(Integer, ForeignKey("suppliers.id"))
    status = Column(Enum(ProductStatus), default=ProductStatus.PENDING_REVIEW)
    is_featured = Column(Boolean, default=False)
    view_count = Column(Integer, default=0)
    sales_count = Column(Integer, default=0)
    rating = Column(Float, default=0.0)
    rating_count = Column(Integer, default=0)
    tags = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    category = relationship("Category", back_populates="products")
    supplier = relationship("Supplier", back_populates="products")
    
    __table_args__ = (
        {"mysql_engine": "InnoDB"},
    )

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String(50), unique=True, index=True)
    customer_name = Column(String(255), nullable=False)
    customer_email = Column(String(255), nullable=False)
    customer_phone = Column(String(50))
    shipping_address = Column(Text, nullable=False)
    shipping_city = Column(String(255))
    shipping_postal_code = Column(String(20))
    total_amount = Column(Float, nullable=False)
    currency = Column(String(10), default="TND")
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)
    payment_method = Column(String(50))
    payment_status = Column(String(50), default="pending")
    payment_id = Column(String(255))
    tracking_number = Column(String(255))
    supplier_id = Column(Integer, ForeignKey("suppliers.id"))
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    supplier = relationship("Supplier", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)
    
    order = relationship("Order", back_populates="items")
    product = relationship("Product")

class ScrapingJob(Base):
    __tablename__ = "scraping_jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    source_name = Column(String(255), nullable=False)
    source_url = Column(Text)
    status = Column(String(50), default="pending")
    products_found = Column(Integer, default=0)
    products_added = Column(Integer, default=0)
    last_run = Column(DateTime)
    next_run = Column(DateTime)
    error_message = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
