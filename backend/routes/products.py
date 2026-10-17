from fastapi import APIRouter, HTTPException, Query, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_, func
import json
from datetime import datetime

from database import get_db, Product, Category, Supplier, ProductStatus
from schemas import ProductCreate, ProductUpdate, ProductResponse
from elasticsearch_client import es_client

router = APIRouter()

@router.get("/", response_model=list[ProductResponse])
async def get_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    category_id: int = Query(None),
    supplier_id: int = Query(None),
    status: str = Query("active"),
    search: str = Query(None),
    min_price: float = Query(None, ge=0),
    max_price: float = Query(None, ge=0),
    sort_by: str = Query("created_at"),
    sort_order: str = Query("desc"),
    db: Session = Depends(get_db)
):
    query = db.query(Product)
    
    if status:
        query = query.filter(Product.status == ProductStatus(status))
    if category_id:
        query = query.filter(Product.category_id == category_id)
    if supplier_id:
        query = query.filter(Product.supplier_id == supplier_id)
    if min_price:
        query = query.filter(Product.price >= min_price)
    if max_price:
        query = query.filter(Product.price <= max_price)
    if search:
        query = query.filter(or_(
            Product.name.ilike(f"%{search}%"),
            Product.description.ilike(f"%{search}%"),
            Product.brand.ilike(f"%{search}%")
        ))
    
    sort_field = getattr(Product, sort_by, Product.created_at)
    if sort_order == "desc":
        query = query.order_by(sort_field.desc())
    else:
        query = query.order_by(sort_field.asc())
    
    return query.offset(skip).limit(limit).all()

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product.view_count = (product.view_count or 0) + 1
    db.commit()
    return product

@router.post("/", response_model=ProductResponse)
async def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    
    # Index in Elasticsearch
    await es_client.index_product(db_product)
    
    return db_product

@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
    db_product.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_product)
    
    await es_client.update_product(db_product)
    return db_product

@router.delete("/{product_id}")
async def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(db_product)
    db.commit()
    await es_client.delete_product(product_id)
    return {"message": "Product deleted"}

@router.get("/categories/list")
async def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).filter(Category.is_active == True).all()

@router.get("/featured/list")
async def get_featured(limit: int = Query(10, ge=1, le=50), db: Session = Depends(get_db)):
    return db.query(Product).filter(
        Product.is_featured == True,
        Product.status == ProductStatus.ACTIVE
    ).limit(limit).all()
