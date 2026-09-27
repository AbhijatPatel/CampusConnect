# CampusConnect — Cloud Deployment Guide (Vercel & Render)

CampusConnect is configured for **Vercel** (React + Vite Frontend) and **Render** (Spring Boot Backend API & Python FastAPI AI Microservice), supporting either **PostgreSQL** (Render's native managed database, Supabase, Neon) or **MySQL** (Aiven, TiDB Cloud, Clever Cloud).

---

## 1. Architecture Deployment Topology

```
┌────────────────────────────────────────┐
│                VERCEL                  │
│        React + Vite Frontend           │
│   (https://your-app.vercel.app)        │
└───────────────────┬────────────────────┘
                    │ HTTPS / Axios
                    ▼
┌────────────────────────────────────────┐
│             RENDER (Web 1)             │
│        Spring Boot Backend API         │
│          (Docker / Java 17)            │
└───────┬─────────────────────────┬──────┘
        │ JDBC                    │ HTTP REST
        ▼                         ▼
┌───────────────┐         ┌────────────────────────────────────────┐
│  MANAGED DB   │         │             RENDER (Web 2)             │
│  Postgres /   │         │       Python FastAPI Microservice      │
│  MySQL        │         │             (Python / Docker)          │
└───────────────┘         └────────────────────────────────────────┘
```

---

## 2. Step 1: Push Code to GitHub

Ensure all your latest files are committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "Configure Render and Vercel production deployment"
git push origin main
```

---

## 3. Step 2: Deploy Backend & AI Service on Render

### Option A: 1-Click Blueprint (Recommended)

1. Open [Render Dashboard](https://dashboard.render.com).
2. Click **New +** → **Blueprint**.
3. Select your `CampusConnect` repository.
4. Render will read [`render.yaml`](../render.yaml) and automatically create:
   - `campusconnect-backend` (Docker container running Spring Boot)
   - `campusconnect-ai-service` (Python microservice)
5. Fill in the required environment variables when prompted:
   - `DB_URL`: JDBC connection string (see Database section below)
   - `DB_USERNAME`: Database username
   - `DB_PASSWORD`: Database password
6. Click **Apply**.

---

### Option B: Manual Service Creation on Render

#### 1. (Optional) Database Setup
- **Render PostgreSQL (Free / Paid)**: Click **New +** → **PostgreSQL**. Note the **Internal Database URL** or **External Database URL**.
  - JDBC URL format: `jdbc:postgresql://<host>:5432/<dbname>`
- **Free Cloud MySQL** (e.g., [TiDB Cloud](https://tidbcloud.com), [Aiven](https://aiven.io), [Clever Cloud](https://clever-cloud.com)):
  - JDBC URL format: `jdbc:mysql://<host>:3306/<dbname>?useSSL=true`
*(Note: If `DB_URL` is omitted, the backend will safely fallback to an embedded H2 database file so the service boots without errors).*

#### 2. Deploy Python AI Microservice
1. Click **New +** → **Web Service**.
2. Connect your repository.
3. Configure:
   - **Name**: `campusconnect-ai-service`
   - **Root Directory**: `ai-service`
   - **Runtime**: `Python` (or `Docker`)
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Free
4. Add Environment Variables:
   - `PORT`: `8000`
5. Click **Create Web Service**. Note the deployed URL (e.g. `https://campusconnect-ai-service.onrender.com`).

#### 3. Deploy Spring Boot Backend
1. Click **New +** → **Web Service**.
2. Connect your repository.
3. Configure:
   - **Name**: `campusconnect-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Docker` *(Render detects `backend/Dockerfile`)*
   - **Instance Type**: Free
4. Add Environment Variables:
   - `PORT`: `8080`
   - `SPRING_PROFILES_ACTIVE`: `prod`
   - `DB_URL`: `jdbc:postgresql://<host>:5432/<dbname>` (or MySQL JDBC URL)
   - `DB_USERNAME`: `<username>`
   - `DB_PASSWORD`: `<password>`
   - `JWT_SECRET`: Generate a 64-character random hex string
   - `AI_SERVICE_URL`: `https://campusconnect-ai-service.onrender.com`
   - `ALLOWED_ORIGINS`: `https://*.vercel.app`
5. Click **Create Web Service**. Note the backend URL (e.g. `https://campusconnect-backend.onrender.com`).

---

## 4. Step 3: Deploy Frontend on Vercel

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Import your `CampusConnect` GitHub repository.
4. In the **Configure Project** screen:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click *Edit* and select `frontend` (Important!)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
5. Expand **Environment Variables** and add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://<YOUR_RENDER_BACKEND>.onrender.com/api`
     *(e.g., `https://campusconnect-backend.onrender.com/api`)*
6. Click **Deploy**.

---

## 5. Environment Variables Reference

### Frontend (Vercel)
| Variable | Value | Description |
| :--- | :--- | :--- |
| `VITE_API_URL` | `https://<backend>.onrender.com/api` | Full URL to Spring Boot `/api` |

### Backend (Render)
| Variable | Default / Example | Description |
| :--- | :--- | :--- |
| `PORT` | `8080` | Server port (Render sets this dynamically) |
| `SPRING_PROFILES_ACTIVE` | `prod` | Activates production database & logging profile |
| `DB_URL` | `jdbc:postgresql://...` or `jdbc:mysql://...` | Connection URL (falls back to H2 if blank) |
| `DB_USERNAME` | `<db-user>` | Database user |
| `DB_PASSWORD` | `<db-password>` | Database password |
| `JWT_SECRET` | 64-char hex key | HS256 secret for JWT signing |
| `AI_SERVICE_URL` | `https://campusconnect-ai-service.onrender.com` | Internal or public URL to FastAPI service |
| `ALLOWED_ORIGINS` | `https://*.vercel.app` | Allowed CORS origins for browser requests |

### AI Microservice (Render)
| Variable | Default | Description |
| :--- | :--- | :--- |
| `PORT` | `8000` | Port for Uvicorn |
| `OLLAMA_BASE_URL` | `http://localhost:11434` | Ollama LLM endpoint |
| `OLLAMA_MODEL` | `qwen2.5:latest` | Target model name |
