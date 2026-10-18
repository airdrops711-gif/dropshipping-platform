"""Admin routes for product management, scraping controls, and analytics"""
from fastapi import APIRouter, HTTPException, Depends, Query, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from sqlalchemy import func, desc, and_
from datetime import datetime, timedelta
from typing import Optional, List

from database import get_db, User, Product, Category, Order, OrderItem, ScrapingJob, Supplier, ProductStatus, OrderStatus
from schemas import ProductCreate, ProductUpdate, ProductResponse, CategoryResponse, SupplierResponse
from auth_utils import decode_access_token

router = APIRouter(tags=["admin"])
security = HTTPBearer()


def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    """Verify admin authentication"""
    token = credentials.credentials
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user or not user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    
    return user


# ==================== DASHBOARD ANALYTICS ====================

@router.get("/dashboard/stats")
async def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Get dashboard overview statistics"""
    total_products = db.query(Product).count()
    active_products = db.query(Product).filter(Product.status == ProductStatus.ACTIVE).count()
    pending_products = db.query(Product).filter(Product.status == ProductStatus.PENDING_REVIEW).count()
    total_orders = db.query(Order).count()
    total_revenue = db.query(func.sum(Order.total_amount)).filter(
        Order.status.in_([OrderStatus.CONFIRMED, OrderStatus.PROCESSING, OrderStatus.SHIPPED, OrderStatus.DELIVERED])
    ).scalar() or 0
    pending_orders = db.query(Order).filter(Order.status == OrderStatus.PENDING).count()
    total_customers = db.query(User).filter(User.is_admin == False).count()
    
    # Recent orders (last 7 days)
    week_ago = datetime.utcnow() - timedelta(days=7)
    recent_orders = db.query(Order).filter(Order.created_at >= week_ago).count()
    recent_revenue = db.query(func.sum(Order.total_amount)).filter(
        Order.created_at >= week_ago,
        Order.status.in_([OrderStatus.CONFIRMED, OrderStatus.PROCESSING, OrderStatus.SHIPPED, OrderStatus.DELIVERED])
    ).scalar() or 0
    
    # Top selling products
    top_products = db.query(
        Product.id, Product.name, Product.price, func.sum(OrderItem.quantity).label("total_sold")
    ).join(OrderItem).group_by(Product.id).order_by(desc("total_sold")).limit(5).all()
    
    return {
        "total_products": total_products,
        "active_products": active_products,
        "pending_products": pending_products,
        "total_orders": total_orders,
        "total_revenue": float(total_revenue),
        "pending_orders": pending_orders,
        "total_customers": total_customers,
        "recent_orders_7d": recent_orders,
        "recent_revenue_7d": float(recent_revenue),
        "top_products": [
            {"id": p.id, "name": p.name, "price": p.price, "total_sold": p.total_sold}
            for p in top_products
        ]
    }


@router.get("/dashboard/analytics/daily")
async def get_daily_analytics(
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Get daily analytics for orders and revenue"""
    start_date = datetime.utcnow() - timedelta(days=days)
    
    daily_data = db.query(
        func.date(Order.created_at).label("date"),
        func.count(Order.id).label("orders"),
        func.sum(Order.total_amount).label("revenue")
    ).filter(
        Order.created_at >= start_date,
        Order.status.in_([OrderStatus.CONFIRMED, OrderStatus.PROCESSING, OrderStatus.SHIPPED, OrderStatus.DELIVERED])
    ).group_by(func.date(Order.created_at)).order_by(func.date(Order.created_at)).all()
    
    return [
        {
            "date": str(d.date),
            "orders": d.orders,
            "revenue": float(d.revenue or 0)
        }
        for d in daily_data
    ]


@router.get("/dashboard/analytics/categories")
async def get_category_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Get analytics by category"""
    category_stats = db.query(
        Category.id, Category.name_en, Category.name_ar,
        func.count(Product.id).label("product_count"),
        func.sum(OrderItem.quantity).label("total_sold")
    ).outerjoin(Product).outerjoin(OrderItem).group_by(Category.id).all()
    
    return [
        {
            "id": c.id,
            "name_en": c.name_en,
            "name_ar": c.name_ar,
            "product_count": c.product_count or 0,
            "total_sold": c.total_sold or 0
        }
        for c in category_stats
    ]


# ==================== PRODUCT MANAGEMENT ====================

@router.get("/products", response_model=List[ProductResponse])
async def admin_list_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """List all products for admin (including pending review)"""
    query = db.query(Product)
    if status:
        query = query.filter(Product.status == ProductStatus(status))
    return query.offset(skip).limit(limit).all()


@router.post("/products", response_model=ProductResponse)
async def admin_create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Create a new product"""
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


@router.put("/products/{product_id}", response_model=ProductResponse)
async def admin_update_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Update a product"""
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
    db_product.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_product)
    return db_product


@router.delete("/products/{product_id}")
async def admin_delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Delete a product"""
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(db_product)
    db.commit()
    return {"message": "Product deleted"}


@router.post("/products/{product_id}/approve")
async def admin_approve_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Approve a pending product"""
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    db_product.status = ProductStatus.ACTIVE
    db_product.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_product)
    return {"message": "Product approved", "product": db_product}


# ==================== SCRAPING CONTROLS ====================

@router.get("/scraping/jobs")
async def list_scraping_jobs(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """List scraping jobs"""
    return db.query(ScrapingJob).offset(skip).limit(limit).all()


@router.post("/scraping/run")
async def run_scraping_job(
    source_name: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Trigger a scraping job"""
    from scraping.crawler import ProductCrawler
    
    job = ScrapingJob(
        source_name=source_name or "all",
        status="running",
        last_run=datetime.utcnow()
    )
    db.add(job)
    db.commit()
    db.refresh(job)

    try:
        crawler = ProductCrawler()
        products_data = await crawler.crawl_all_sources()
        saved_count = crawler.save_products_to_db(products_data, db)

        job.status = "completed"
        job.products_found = sum(len(p) for p in products_data.values())
        job.products_added = saved_count
        db.commit()

        return {
            "job_id": job.id,
            "status": "completed",
            "products_found": job.products_found,
            "products_added": saved_count
        }
    except Exception as e:
        job.status = "failed"
        job.error_message = str(e)
        db.commit()
        raise HTTPException(status_code=500, detail=f"Scraping failed: {str(e)}")


# ==================== USER MANAGEMENT ====================

@router.get("/users")
async def list_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """List all users"""
    return db.query(User).offset(skip).limit(limit).all()


@router.put("/users/{user_id}/role")
async def update_user_role(
    user_id: int,
    is_admin: bool,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Update user admin role"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.is_admin = is_admin
    db.commit()
    return {"message": "User role updated", "user_id": user_id, "is_admin": is_admin}


# ==================== ORDER MANAGEMENT ====================

@router.get("/orders")
async def admin_list_orders(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """List all orders for admin"""
    query = db.query(Order)
    if status:
        query = query.filter(Order.status == OrderStatus(status))
    return query.order_by(Order.created_at.desc()).offset(skip).limit(limit).all()


@router.put("/orders/{order_id}/status")
async def admin_update_order_status(
    order_id: int,
    status: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin)
):
    """Update order status"""
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = OrderStatus(status)
    order.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(order)
    return {"message": "Order status updated", "order_id": order_id, "status": status}