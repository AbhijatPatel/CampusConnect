# CampusConnect — Cloud Deployment Guide (Vercel & Render)

CampusConnect is configured exclusively for **Vercel** (Frontend SPA) and **Render** (Spring Boot Backend API & Python FastAPI AI Microservice) connected to managed MySQL (Render MySQL / Aiven / PlanetScale). No Docker daemon or container registry is needed.

---

## 1. Architecture Deployment Topology

```
┌───────────────────────────────────────┐
│               VERCEL                  │
│       React + Vite Frontend           │
│   (https://campusconnect.vercel.app)  │
└──────────────────┬────────────────────┘
                   │ HTTPS / Axios
                   ▼
┌───────────────────────────────────────┐
│            RENDER (Web 1)             │
│       Spring Boot Backend API         │
│         (Native Java / Maven)         │
└──────┬─────────────────────────┬──────┘
       │ JDBC                    │ HTTP REST
       ▼                         ▼
┌──────────────┐          ┌───────────────────────────────────────┐
│ MANAGED DB   │          │            RENDER (Web 2)             │
│ MySQL 8.0    │          │      Python FastAPI Microservice      │
│ (Render/Aiv.)│          │            (Native Python)            │
└──────────────┘          └───────────────────────────────────────┘
```

---

## 2. Frontend Deployment (Vercel)

### Setup Steps
1. Navigate to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Select your `CampusConnect` repository.
3. Configure the project settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://<YOUR_RENDER_BACKEND>.onrender.com/api`
5. Click **Deploy**.

*(Note: `frontend/vercel.json` is pre-configured with security headers and rewrites to route all paths to `index.html` for React Router).*

---

## 3. Automated Render Blueprint Deployment (1-Click)

The repository includes a ready-to-use [`render.yaml`](../render.yaml) blueprint specification.

1. In Render, go to **Blueprints** → **New Blueprint Instance**.
2. Connect your `CampusConnect` repository.
3. Render automatically discovers both services:
   - `campusconnect-backend` (Native Java environment)
   - `campusconnect-ai-service` (Native Python environment)
4. Input your MySQL database connection values (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`).
5. Click **Apply**.

---

## 4. Manual Render Web Service Deployment

### A. Python AI Microservice (Deploy First)
1. In Render, click **New +** → **Web Service**.
2. Connect the `CampusConnect` repository.
3. Settings:
   - **Name**: `campusconnect-ai-service`
   - **Region**: Singapore / Frankfurt / Oregon
   - **Root Directory**: `ai-service`
   - **Runtime**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Environment Variables:
   - `PORT`: `8000`
5. Click **Create Web Service**. Note the deployed URL (e.g. `https://campusconnect-ai-service.onrender.com`).

### B. Spring Boot Backend Web Service
1. In Render, click **New +** → **Web Service**.
2. Connect the `CampusConnect` repository.
3. Settings:
   - **Name**: `campusconnect-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Java`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/campusconnect-backend-1.0.0.jar`
4. Environment Variables:
   - `PORT`: `8080` (or leave default for Render `$PORT`)
   - `SPRING_PROFILES_ACTIVE`: `prod`
   - `DB_URL`: `jdbc:mysql://<your-db-host>:3306/campusconnect_db?useSSL=true`
   - `DB_USERNAME`: `<your-db-username>`
   - `DB_PASSWORD`: `<your-db-password>`
   - `JWT_SECRET`: `404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970`
   - `AI_SERVICE_URL`: `https://campusconnect-ai-service.onrender.com`
   - `FRONTEND_URL`: `https://<YOUR_VERCEL_APP>.vercel.app`
5. Click **Create Web Service**.

---

## 5. Summary of Environment Variables

### Frontend (.env / Vercel Settings)
```env
VITE_API_URL=https://campusconnect-backend.onrender.com/api
```

### Backend (Render Environment)
```env
PORT=8080
SPRING_PROFILES_ACTIVE=prod
DB_URL=jdbc:mysql://<host>:3306/campusconnect_db?useSSL=true
DB_USERNAME=<db_user>
DB_PASSWORD=<db_password>
JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
AI_SERVICE_URL=https://campusconnect-ai-service.onrender.com
FRONTEND_URL=https://campusconnect.vercel.app
```

### AI Service (Render Environment)
```env
PORT=8000
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:latest
```
