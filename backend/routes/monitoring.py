"""Monitoring and health check endpoints"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from datetime import datetime
import os

from database import get_db, engine
from auth_utils import get_current_user

router = APIRouter(tags=["monitoring"])


@router.get("/health")
async def health_check():
    """Basic health check - public"""
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat(), "service": "backend"}


@router.get("/health/ready")
async def readiness_check(db: Session = Depends(get_db)):
    """Readiness check - verifies database connectivity - public"""
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ready", "database": "connected", "timestamp": datetime.utcnow().isoformat()}
    except Exception as e:
        return {"status": "not ready", "database": "disconnected", "error": str(e)}


@router.get("/health/live")
async def liveness_check():
    """Liveness check - verifies the service is running - public"""
    return {"status": "alive", "timestamp": datetime.utcnow().isoformat()}


@router.get("/metrics")
async def metrics(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Basic metrics endpoint for monitoring - requires authentication"""
    from database import Product, Order, User, OrderStatus
    from sqlalchemy import func

    total_products = db.query(Product).count()
    total_orders = db.query(Order).count()
    total_users = db.query(User).count()
    pending_orders = db.query(Order).filter(Order.status == OrderStatus.PENDING).count()

    return {
        "products_total": total_products,
        "orders_total": total_orders,
        "users_total": total_users,
        "orders_pending": pending_orders,
        "timestamp": datetime.utcnow().isoformat(),
    }
