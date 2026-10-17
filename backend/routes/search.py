from fastapi import APIRouter, Query, HTTPException
from elasticsearch_client import es_client

router = APIRouter()

@router.get("/products")
async def search_products(
    q: str = Query(..., min_length=1),
    category: str = Query(None),
    min_price: float = Query(None, ge=0),
    max_price: float = Query(None, ge=0),
    sort_by: str = Query("relevance"),
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100)
):
    try:
        results = await es_client.search_products(
            query=q,
            category=category,
            min_price=min_price,
            max_price=max_price,
            sort_by=sort_by,
            page=page,
            size=size
        )
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/suggestions")
async def get_suggestions(q: str = Query(..., min_length=1)):
    try:
        return await es_client.get_suggestions(q)
    except Exception as e:
        return {"suggestions": []}
