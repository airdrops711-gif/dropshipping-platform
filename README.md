# Dropshipping Platform Tunisia

A modern dropshipping platform targeting the Tunisian market.

## Architecture

- **Frontend**: Next.js (React) with SSR/ISR for SEO
- **Backend**: FastAPI (Python) for API endpoints
- **Database**: PostgreSQL
- **Search**: Elasticsearch
- **Queue**: Celery + RabbitMQ
- **Deployment**: OpenShift via GitOps

## Quick Start

```bash
cd dropshipping-platform

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd ../frontend
npm install
npm run dev
```

## Deployment

All deployment configs are in the `deployment/` directory. Use ArgoCD or OpenShift CLI to deploy.

```bash
oc apply -f deployment/namespace.yaml
oc apply -f deployment/configmap.yaml
oc apply -f deployment/deployment.yaml
```
