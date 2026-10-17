from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class ProductBase(BaseModel):
    name: str
    name_ar: Optional[str] = None
    name_en: Optional[str] = None
    description: Optional[str] = None
    description_ar: Optional[str] = None
    price: float
    original_price: Optional[float] = None
    currency: str = "TND"
    stock_quantity: int = 0
    sku: Optional[str] = None
    brand: Optional[str] = None
    model: Optional[str] = None
    images: List[str] = []
    main_image: Optional[str] = None
    category_id: Optional[int] = None
    supplier_id: Optional[int] = None
    is_featured: bool = False
    tags: List[str] = []

class ProductCreate(ProductBase):
    status: str = "pending_review"

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    name_ar: Optional[str] = None
    name_en: Optional[str] = None
    description: Optional[str] = None
    description_ar: Optional[str] = None
    price: Optional[float] = None
    original_price: Optional[float] = None
    currency: Optional[str] = None
    stock_quantity: Optional[int] = None
    sku: Optional[str] = None
    brand: Optional[str] = None
    model: Optional[str] = None
    images: Optional[List[str]] = None
    main_image: Optional[str] = None
    category_id: Optional[int] = None
    supplier_id: Optional[int] = None
    status: Optional[str] = None
    is_featured: Optional[bool] = None
    tags: Optional[List[str]] = None

class ProductResponse(ProductBase):
    id: int
    status: str
    view_count: int
    sales_count: int
    rating: float
    rating_count: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class CategoryBase(BaseModel):
    name_ar: str
    name_en: str
    slug: str
    parent_id: Optional[int] = None
    level: int = 0
    sort_order: int = 0
    is_active: bool = True

class CategoryResponse(CategoryBase):
    id: int
    class Config:
        from_attributes = True

class SupplierBase(BaseModel):
    name: str
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    website_url: Optional[str] = None
    location: Optional[str] = None
    rating: float = 0.0
    is_active: bool = True

class SupplierCreate(SupplierBase):
    pass

class SupplierUpdate(BaseModel):
    name: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    website_url: Optional[str] = None
    location: Optional[str] = None
    rating: Optional[float] = None
    is_active: Optional[bool] = None

class SupplierResponse(SupplierBase):
    id: int
    created_at: datetime
    updated_at: datetime
    class Config:
        from_attributes = True

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int
    unit_price: float
    total_price: float

class OrderItemResponse(OrderItemBase):
    id: int
    order_id: int
    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    customer_name: str
    customer_email: str
    customer_phone: Optional[str] = None
    shipping_address: str
    shipping_city: Optional[str] = None
    shipping_postal_code: Optional[str] = None
    total_amount: float
    currency: str = "TND"
    payment_method: Optional[str] = None
    payment_status: str = "pending"
    payment_id: Optional[str] = None
    tracking_number: Optional[str] = None
    supplier_id: Optional[int] = None
    notes: Optional[str] = None

class OrderCreate(BaseModel):
    customer_name: str
    customer_email: str
    customer_phone: Optional[str] = None
    shipping_address: str
    shipping_city: Optional[str] = None
    shipping_postal_code: Optional[str] = None
    payment_method: str
    items: List[dict]
    notes: Optional[str] = None

class OrderUpdate(BaseModel):
    status: Optional[str] = None
    payment_status: Optional[str] = None
    payment_id: Optional[str] = None
    tracking_number: Optional[str] = None
    notes: Optional[str] = None

class OrderResponse(OrderBase):
    id: int
    order_number: str
    status: str
    created_at: datetime
    updated_at: datetime
    items: List[OrderItemResponse] = []
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: str
    name: Optional[str] = None
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class SearchRequest(BaseModel):
    query: str
    category: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    sort_by: str = "relevance"
    page: int = 1
    size: int = 20

class SearchResult(BaseModel):
    total: int
    page: int
    size: int
    results: List[dict]
