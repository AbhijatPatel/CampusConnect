# CampusConnect — AI-Powered Campus Placement & Recruitment Portal

[![Architecture: Polyglot Microservices](https://img.shields.io/badge/Architecture-Spring%20Boot%20%7C%20FastAPI%20%7C%20React-blue.svg)](https://github.com)
[![DSA Ranking: PriorityQueue MaxHeap](https://img.shields.io/badge/DSA%20Engine-O(N%20log%20K)%20Heap-emerald.svg)](docs/ranking-algorithm.md)
[![AI / NLP: Scikit-Learn & Ollama Qwen](https://img.shields.io/badge/AI%20Layer-TF--IDF%20%2B%20Qwen3-purple.svg)](docs/ai-matching.md)
[![Deployment: Vercel & Render](https://img.shields.io/badge/Deploy-Vercel%20%2B%20Render-black.svg)](docs/deployment.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)

**CampusConnect** is a full-stack, enterprise-grade campus placement and recruitment platform designed to eliminate resume black holes and connect university talent with top employers through intelligent NLP resume parsing, semantic job matching, and a fully explainable Java DSA priority ranking engine.

---

## 1. System Architecture

```mermaid
graph TD
    StudentRecruiter([Student / Recruiter / Admin]) -->|HTTPS| ReactFrontend[React + Vite SaaS UI on Vercel]
    ReactFrontend -->|Axios REST / JWT| SpringBackend[Spring Boot Backend API on Render]
    
    subgraph Spring Boot Backend Layer (Render Native Java)
        Controller[REST Controllers & Validation] --> Service[Business & Storage Services]
        Service --> RankingEngine[Java DSA Ranking Engine PriorityQueue]
        Service --> Security[Spring Security & JWT Filter]
        Service --> JPA[Spring Data JPA Repositories]
    end

    SpringBackend -->|Hibernate / JDBC| MySQLDB[(Managed MySQL / Render DB)]
    SpringBackend -->|Multipart / REST| PythonAIService[Python FastAPI Microservice on Render]
    
    subgraph AI / NLP Intelligence Layer (Render Native Python)
        PythonAIService --> SkillExtractor[Regex & N-Gram Taxonomy Engine]
        PythonAIService --> VectorSim[TF-IDF Cosine Similarity Engine]
        PythonAIService --> OllamaQwen[Local Ollama Qwen3 / Qwen2.5 LLM]
    end

    RankingEngine -->|Explainable Ranked Candidates| RecruiterDashboard[Recruiter Candidate Ranking Console]
```

---

## 2. Key Features

- **Multi-Role Authentication**: JWT-based stateless authentication with BCrypt hashing for `STUDENT`, `RECRUITER`, and `ADMIN`.
- **Explainable DSA Ranking Engine**: Transparent Java algorithm utilizing a Max-Heap `PriorityQueue` with a multi-factor custom `Comparator` and configurable evaluation weights.
- **AI/NLP Resume Parsing**: Instant technical skill extraction, TF-IDF cosine similarity, and gap analysis with actionable upskilling steps.
- **Dynamic Job Search & Filters**: Server-side pagination, search by title/skills/location, salary range, and eligibility filtering.
- **Hiring Pipeline Tracking**: Interactive status progression (`Applied` → `Under Review` → `Shortlisted` → `Interview` → `Selected`).
- **Comprehensive Analytics**: Recharts visualizations for recruiter candidate funnels and student application distributions.
- **Enterprise Notification Center**: Automatic notifications triggered upon application submission, status transitions, and interviews.

---

## 3. Technology Stack

| Layer | Technologies | Deployment Target |
|---|---|---|
| **Frontend** | React 18, Vite, JavaScript (JSX), Tailwind CSS, Lucide React, Recharts, Axios | **Vercel** |
| **Backend API** | Java 17, Spring Boot 3.2, Spring Security 6, Spring Data JPA, JWT, Lombok, Maven | **Render** |
| **AI / NLP Service** | Python 3.11, FastAPI, Pydantic, Scikit-Learn, Ollama (Qwen3 / Qwen2.5) | **Render** |
| **Database** | MySQL 8.0 (Managed MySQL / Render MySQL / Aiven) | Cloud MySQL Provider |

---

## 4. DSA Priority Ranking Engine (Flagship Feature)

The ranking engine calculates a multi-attribute weighted score:

$$\text{Composite Score} = (S \times 0.40) + (N \times 0.20) + (E \times 0.15) + (C \times 0.10) + (P \times 0.10) + (L \times 0.05)$$

- **Skill Match ($S$, 40%)**: Verified overlap via $O(1)$ `HashSet` lookups.
- **NLP Similarity ($N$, 20%)**: Semantic vector cosine similarity.
- **Experience ($E$, 15%)**: Work/internship duration alignment.
- **CGPA ($C$, 10%)**: Standardized academic performance score.
- **Projects ($P$, 10%)**: Portfolio breadth and GitHub repositories.
- **Eligibility ($L$, 5%)**: Minimum CGPA threshold verification.

### Time & Space Complexity
- **Time Complexity**: $O(N \log K)$ ranking using a Max-Heap `PriorityQueue`.
- **Space Complexity**: $O(N)$ auxiliary heap memory.
- For complete algorithmic documentation and test proofs, see [docs/ranking-algorithm.md](docs/ranking-algorithm.md).

---

## 5. Seed Dataset (Indian Campus Placement Data)

Pre-populated realistic seed data is automatically initialized on first startup:
- **10 Students**: Top university candidates with realistic Indian academic profiles, CGPA, projects, and skills.
- **5 Companies**: TechNova Solutions, CloudVibe Systems, DataSphere Analytics, QuantumEdge Infotech, CyberPulse Networks.
- **3 Recruiters**: Lead campus recruiters with dedicated hiring pipelines.
- **15 Jobs**: Spanning Java Backend, React Frontend, DevOps, AI/NLP Research, and QA roles.
- **30 Applications**: Live applications distributed across all hiring stages with calculated DSA scores.

### Demo Credentials

| Role | Email | Password | Pre-configured Access |
|---|---|---|---|
| **Student** | `abhijat@gmail.com` | `password123` | Student Dashboard, Resume Analyzer, Application Tracker |
| **Recruiter** | `recruiter1@technova.com` | `password123` | Recruiter Console, Job Creator, DSA Candidate Ranking |
| **Administrator** | `admin@campusconnect.com` | `admin123` | Admin Portal, User Management, Global Metrics |

*(Quick one-click demo login buttons are provided on the login page).*

---

## 6. Project Structure

```
CampusConnect/
├── frontend/                     # React + Vite Client Application (Deploy on Vercel)
│   ├── src/
│   │   ├── components/           # Navbar, Footer, StatCard, CandidateRankingModal
│   │   ├── context/              # AuthContext (JWT session management)
│   │   ├── pages/                # Landing, Dashboards, Ranking, Analyzer, JobSearch
│   │   ├── services/             # Axios API client (VITE_API_URL configured)
│   │   ├── App.jsx               # Route definitions
│   │   └── index.css             # Tailwind glassmorphic styling
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json               # SPA routing & security headers for Vercel
├── backend/                      # Spring Boot 3 REST API (Deploy on Render)
│   ├── src/main/java/com/campusconnect/
│   │   ├── config/               # SecurityConfig, CorsConfig, RestTemplateConfig
│   │   ├── controller/           # Auth, Student, Recruiter, Job, Ranking, Admin
│   │   ├── service/              # Business logic, Storage, Notification, AI integration
│   │   ├── entity/               # JPA Entities: User, Student, Job, Application, etc.
│   │   ├── repository/           # Spring Data JPA interfaces
│   │   ├── ranking/              # DsaRankingEngine, MaxHeap, WeightConfig
│   │   ├── security/             # JwtTokenProvider, JwtAuthenticationFilter
│   │   └── util/                 # SeedDataInitializer
│   └── pom.xml
├── ai-service/                   # Python FastAPI AI / NLP Microservice (Deploy on Render)
│   ├── app/
│   │   ├── api/routes.py         # Endpoints for resume & job matching
│   │   ├── services/             # NLP similarity, Skill extractor, Ollama Qwen
│   │   ├── models/schemas.py     # Pydantic v2 validation models
│   │   └── main.py
│   ├── tests/test_nlp.py
│   └── requirements.txt
├── docs/                         # In-depth architectural documentation
├── render.yaml                   # 1-Click Render Blueprint for Backend and AI Service
├── .env.example
└── README.md
```

---

## 7. Local Setup & Execution

### 1. Start Python AI Microservice
```bash
cd ai-service
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --port 8000 --reload
```

### 2. Start Spring Boot Backend
```bash
cd backend
mvn clean spring-boot:run
```
*(Automatically starts on port 8080 and populates H2/MySQL seed data).*

### 3. Start React Frontend
```bash
cd frontend
npm install
npm run dev
```
*(Starts on [http://localhost:5173](http://localhost:5173)).*

---

## 8. Deployment: Vercel & Render (No Docker Required)

See the full step-by-step guide in [docs/deployment.md](docs/deployment.md).

### Frontend on Vercel
1. Import repository on [Vercel](https://vercel.com) with root directory set to `frontend`.
2. Add Environment Variable:
   - `VITE_API_URL` = `https://<YOUR-RENDER-BACKEND>.onrender.com/api`
3. Click **Deploy**.

### Backend & AI Microservice on Render (1-Click Blueprint)
1. In Render, select **Blueprints** → **New Blueprint Instance**.
2. Select your repository. Render automatically reads [`render.yaml`](render.yaml) to configure:
   - `campusconnect-backend` (Native Java environment)
   - `campusconnect-ai-service` (Native Python environment)
3. Set your MySQL credentials (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`).
4. Click **Apply**.

---

## 9. Testing

```bash
# Run DSA Ranking Engine and Auth tests
cd backend
mvn test

# Run AI NLP test suite
cd ai-service
pytest
```

---

## 10. License & Author

Distributed under the MIT License. Built with precision for modern university placement drives.
