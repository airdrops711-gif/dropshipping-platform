from fastapi import APIRouter, HTTPException, Query, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
import uuid

from database import get_db, Order, OrderItem, Product, OrderStatus, Supplier
from schemas import OrderCreate, OrderResponse, OrderUpdate
from config import settings
from auth_utils import get_current_user

router = APIRouter()

@router.get("/", response_model=list[OrderResponse])
async def get_orders(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    status: str = Query(None),
    supplier_id: int = Query(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    query = db.query(Order)
    if status:
        query = query.filter(Order.status == OrderStatus(status))
    if supplier_id:
        query = query.filter(Order.supplier_id == supplier_id)
    return query.order_by(Order.created_at.desc()).offset(skip).limit(limit).all()

@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.post("/", response_model=OrderResponse)
async def create_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    # Generate order number
    order_number = f"TN-{datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:8].upper()}"
    
    # Calculate total
    total = 0
    order_items = []
    for item in order_data.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        if product.stock_quantity < item.quantity:
            raise HTTPException(status_code=400, detail=f"Insufficient stock for {product.name}")
        
        item_total = product.price * item.quantity
        total += item_total
        order_items.append({
            "product_id": item.product_id,
            "quantity": item.quantity,
            "unit_price": product.price,
            "total_price": item_total
        })
    
    # Create order
    order_dict = order_data.dict()
    order_dict["order_number"] = order_number
    order_dict["total_amount"] = total
    order_dict["status"] = OrderStatus.PENDING
    
    db_order = Order(**order_dict)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    # Create order items
    for item_data in order_items:
        item_data["order_id"] = db_order.id
        db_item = OrderItem(**item_data)
        db.add(db_item)
        # Update product stock
        product = db.query(Product).filter(Product.id == item_data["product_id"]).first()
        product.stock_quantity -= item_data["quantity"]
        product.sales_count = (product.sales_count or 0) + item_data["quantity"]
    
    db.commit()
    db.refresh(db_order)
    return db_order

@router.put("/{order_id}", response_model=OrderResponse)
async def update_order(
    order_id: int,
    order_update: OrderUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    update_data = order_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(order, key, value)
    order.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(order)
    return order

@router.get("/stats/summary")
async def get_order_stats(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    total_orders = db.query(Order).count()
    total_revenue = db.query(func.sum(Order.total_amount)).filter(
        Order.status.in_([OrderStatus.CONFIRMED, OrderStatus.PROCESSING, OrderStatus.SHIPPED, OrderStatus.DELIVERED])
    ).scalar() or 0
    
    pending_orders = db.query(Order).filter(Order.status == OrderStatus.PENDING).count()
    
    return {
        "total_orders": total_orders,
        "total_revenue": float(total_revenue),
        "pending_orders": pending_orders,
        "currency": "TND"
    }
