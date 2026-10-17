import os
from typing import Optional, List, Dict, Any
from elasticsearch import AsyncElasticsearch
from elasticsearch.exceptions import NotFoundError, RequestError, TransportError

class ElasticsearchClient:
    def __init__(self):
        self.es = None
        self.index_name = "products"
    
    async def connect(self):
        url = os.environ.get("ELASTICSEARCH_URL", "http://localhost:9200")
        self.es = AsyncElasticsearch([url])
        await self._ensure_index()
    
    async def _ensure_index(self):
        if not await self.es.indices.exists(index=self.index_name):
            await self.es.indices.create(index=self.index_name, body={
                "mappings": {
                    "properties": {
                        "name": {"type": "text", "analyzer": "standard"},
                        "name_ar": {"type": "text", "analyzer": "arabic"},
                        "name_en": {"type": "text", "analyzer": "standard"},
                        "description": {"type": "text", "analyzer": "standard"},
                        "brand": {"type": "keyword"},
                        "category": {"type": "keyword"},
                        "price": {"type": "float"},
                        "currency": {"type": "keyword"},
                        "status": {"type": "keyword"},
                        "images": {"type": "keyword"},
                        "created_at": {"type": "date"}
                    }
                }
            })
    
    async def index_product(self, product):
        doc = {
            "id": product.id,
            "name": product.name,
            "name_ar": product.name_ar,
            "name_en": product.name_en,
            "description": product.description,
            "brand": product.brand,
            "category_id": product.category_id,
            "price": product.price,
            "currency": product.currency,
            "status": product.status.value if hasattr(product.status, 'value') else str(product.status),
            "images": product.images or [],
            "created_at": product.created_at.isoformat() if product.created_at else None
        }
        await self.es.index(index=self.index_name, id=product.id, document=doc)
    
    async def update_product(self, product):
        doc = {
            "name": product.name,
            "name_ar": product.name_ar,
            "name_en": product.name_en,
            "description": product.description,
            "brand": product.brand,
            "price": product.price,
            "status": product.status.value if hasattr(product.status, 'value') else str(product.status),
            "images": product.images or []
        }
        await self.es.update(index=self.index_name, id=product.id, doc=doc)
    
    async def delete_product(self, product_id):
        await self.es.delete(index=self.index_name, id=product_id)
    
    async def search_products(self, query: str, category: str = None, min_price: float = None, max_price: float = None, sort_by: str = "relevance", page: int = 1, size: int = 20) -> Dict[str, Any]:
        must = [{"match": {"name": query}}]
        
        if category:
            must.append({"term": {"category": category}})
        
        range_filter = {}
        if min_price is not None:
            range_filter["gte"] = min_price
        if max_price is not None:
            range_filter["lte"] = max_price
        
        if range_filter:
            must.append({"range": {"price": range_filter}})
        
        body = {
            "query": {
                "bool": {
                    "must": must
                }
            },
            "from": (page - 1) * size,
            "size": size
        }
        
        if sort_by == "price_asc":
            body["sort"] = [{"price": {"order": "asc"}}]
        elif sort_by == "price_desc":
            body["sort"] = [{"price": {"order": "desc"}}]
        elif sort_by == "newest":
            body["sort"] = [{"created_at": {"order": "desc"}}]
        
        response = await self.es.search(index=self.index_name, body=body)
        
        results = []
        for hit in response["hits"]["hits"]:
            source = hit["_source"]
            source["_score"] = hit["_score"]
            results.append(source)
        
        return {
            "total": response["hits"]["total"]["value"],
            "page": page,
            "size": size,
            "results": results
        }
    
    async def get_suggestions(self, q: str) -> Dict[str, Any]:
        body = {
            "suggest": {
                "product-suggest": {
                    "prefix": q,
                    "completion": {
                        "field": "name.keyword",
                        "size": 10
                    }
                }
            }
        }
        response = await self.es.search(index=self.index_name, body=body)
        suggestions = []
        for option in response.get("suggest", {}).get("product-suggest", [{}])[0].get("options", []):
            suggestions.append(option["text"])
        return {"suggestions": suggestions}

es_client = ElasticsearchClient()
