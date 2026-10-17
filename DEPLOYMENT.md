# OpenShift Deployment Guide

## Prerequisites
- OpenShift cluster access (`oc` CLI configured)
- Git repository with code
- Build configs created in OpenShift

## Step 1: Create GitHub Repository

```bash
# Create repo on GitHub: airdrops711/dropshipping-platform
# Then push:
git remote add origin https://github.com/airdrops711/dropshipping-platform.git
git push -u origin main
```

## Step 2: Start Builds

```bash
# Start backend build
oc start-build backend-build -n saif711-dev

# Start frontend build  
oc start-build frontend-build -n saif711-dev

# Monitor builds
oc logs -n saif711-dev -f bc/backend-build
```

## Step 3: Verify Deployments

```bash
# Check all pods
oc get pods -n saif711-dev

# Check services
oc get services -n saif711-dev

# Check routes
oc get routes -n saif711-dev
```

## Step 4: Initialize Database

```bash
# Exec into backend pod and run init
oc exec -n saif711-dev -it deployment/postgres -- bash
# Then run: psql -U dropshipping -d dropshipping -f /init.sql

# Or run Python init script:
oc run -n saif711-dev init-db --rm -it --image=image-registry.openshift-image-registry.svc:5000/saif711-dev/dropshipping-backend:latest -- python init_db.py
```

## Step 5: Configure DNS & TLS

Point your domain `dropshipping.tn` to the OpenShift router IP, then create a TLS certificate:
```bash
oc create secret tls dropshipping-tls-cert -n saif711-dev --cert=cert.pem --key=key.pem
```

## Environment Variables Summary

| Variable | Value | Source |
|----------|-------|--------|
| DATABASE_URL | postgresql://dropshipping:changeme123@postgres:5432/dropshipping | ConfigMap |
| REDIS_URL | redis://redis:6379/0 | ConfigMap |
| RABBITMQ_URL | amqp://guest:guest@rabbitmq:5672/ | ConfigMap |
| ELASTICSEARCH_URL | http://elasticsearch:9200 | ConfigMap |
| SECRET_KEY | (from secret) | Secret |
| STRIPE_SECRET_KEY | (from secret) | Secret |
