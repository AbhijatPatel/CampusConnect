# CampusConnect — AI-Powered Campus Placement & Recruitment Portal

[![GitHub Repository](https://img.shields.io/badge/GitHub-AbhijatPatel%2FCampusConnect-181717.svg?logo=github)](https://github.com/AbhijatPatel/CampusConnect)
[![Architecture: Polyglot Microservices](https://img.shields.io/badge/Architecture-Spring%20Boot%20%7C%20FastAPI%20%7C%20React-blue.svg)](docs/architecture.md)
[![DSA Ranking: PriorityQueue MaxHeap](https://img.shields.io/badge/DSA%20Engine-O(N%20log%20K)%20Heap-emerald.svg)](docs/ranking-algorithm.md)
[![AI / NLP: Scikit-Learn & Ollama Qwen](https://img.shields.io/badge/AI%20Layer-TF--IDF%20%2B%20Qwen3-purple.svg)](docs/ai-matching.md)
[![Deployment: Vercel & Render](https://img.shields.io/badge/Deploy-Vercel%20%2B%20Render-black.svg)](docs/deployment.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)

**CampusConnect** is a full-stack, enterprise-grade campus placement and recruitment platform designed to eliminate resume black holes and connect university talent with top employers through intelligent NLP resume parsing, semantic job matching, dynamic candidate portfolio management, and a fully explainable Java DSA priority ranking engine.

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

    SpringBackend -->|Hibernate / JDBC| MySQLDB[(Managed MySQL / In-Memory H2 DB)]
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

- **Multi-Role Authentication & Access Control**: Stateless JWT authentication with BCrypt hashing for `ROLE_STUDENT`, `ROLE_RECRUITER`, and `ROLE_ADMIN`.
- **Explainable DSA Priority Ranking Engine**: Transparent algorithm using a Max-Heap `PriorityQueue` with a multi-factor custom `Comparator` and configurable recruiter weights ($O(N \log K)$ runtime).
- **Candidate Portfolio & Profile Management**: Complete CRUD operations for Technical Skills, GitHub-integrated Projects, Work Experience, and Academic Information with dedicated JPA entity persistence.
- **AI/NLP Resume Parsing**: Instant technical skill extraction, TF-IDF cosine similarity scoring, and gap analysis with actionable upskilling steps.
- **Dynamic Job Search & Filters**: Server-side pagination, search by title/skills/location, salary filters, and eligibility thresholds.
- **Real-Time Hiring Pipeline**: Visual status tracking (`Applied` → `Under Review` → `Shortlisted` → `Interview` → `Selected`).
- **Comprehensive Analytics & Dashboards**: Recharts visualizations for recruiter candidate funnels and student application progress.
- **Enterprise Notification Center**: Automatic notifications triggered upon application submission, status transitions, and interviews.

---

## 3. Technology Stack

| Layer | Technologies | Deployment Target |
|---|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide React, Recharts, Axios | **Vercel** |
| **Backend API** | Java 17+, Spring Boot 3.2, Spring Security 6, Spring Data JPA, JWT, Maven | **Render** |
| **AI / NLP Service** | Python 3.11, FastAPI, Pydantic, Scikit-Learn, Ollama (Qwen3 / Qwen2.5) | **Render** |
| **Database** | MySQL 8.0 (Production) / In-Memory H2 (Local Development) | Cloud MySQL / Render |

---

## 4. DSA Priority Ranking Engine

The ranking engine calculates a multi-attribute weighted score:

$$\text{Composite Score} = (S \times 0.40) + (N \times 0.20) + (E \times 0.15) + (C \times 0.10) + (P \times 0.10) + (L \times 0.05)$$

- **Skill Match ($S$, 40%)**: Verified overlap via $O(1)$ `HashSet` lookups.
- **NLP Similarity ($N$, 20%)**: Semantic vector cosine similarity.
- **Experience ($E$, 15%)**: Work/internship duration alignment.
- **CGPA ($C$, 10%)**: Standardized academic performance score.
- **Projects ($P$, 10%)**: Portfolio breadth and GitHub repositories.
- **Eligibility ($L$, 5%)**: Minimum CGPA threshold verification.

### Complexity
- **Time Complexity**: $O(N \log K)$ ranking using a bounded Max-Heap `PriorityQueue`.
- **Space Complexity**: $O(N)$ auxiliary heap memory.
- For complete algorithmic documentation and test proofs, see [docs/ranking-algorithm.md](docs/ranking-algorithm.md).

---

## 5. Seed Dataset (Indian Campus Placement Data)

Pre-populated realistic seed data is automatically initialized on startup:
- **10 Students**: Top university candidates with realistic Indian academic profiles, CGPA, projects, and skills.
- **5 Companies**: TechNova Solutions, CloudVibe Systems, DataSphere Analytics, QuantumEdge Infotech, CyberPulse Networks.
- **3 Recruiters**: Lead campus recruiters with dedicated hiring pipelines.
- **15 Jobs**: Spanning Java Backend, React Frontend, DevOps, AI/NLP Research, and QA roles.
- **30 Applications**: Live applications distributed across all hiring stages with calculated DSA scores.

### Demo Credentials

| Role | Email | Password | Pre-configured Access |
|---|---|---|---|
| **Student** | `abhijat@gmail.com` | `password123` | Student Dashboard, Resume Analyzer, Portfolio & Profile Editor |
| **Recruiter** | `recruiter1@technova.com` | `password123` | Recruiter Console, Job Creator, DSA Candidate Ranking |
| **Administrator** | `admin@campusconnect.com` | `admin123` | Admin Portal, User Management, Global Metrics |

*(One-click demo login buttons are provided on the login page).*

---

## 6. Project Structure

```
CampusConnect/
├── frontend/                     # React + Vite Client Application (Deploy on Vercel)
│   ├── src/
│   │   ├── components/           # Navbar, Footer, StatCard, CandidateRankingModal
│   │   ├── context/              # AuthContext (JWT session management)
│   │   ├── pages/                # Landing, StudentProfile, Dashboards, Ranking, Analyzer
│   │   ├── services/             # Axios API client (VITE_API_URL configured)
│   │   ├── App.jsx               # Route definitions
│   │   └── index.css             # Tailwind glassmorphic styling
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json               # SPA routing & security headers for Vercel
├── backend/                      # Spring Boot 3 REST API (Deploy on Render)
│   ├── src/main/java/com/campusconnect/
│   │   ├── config/               # SecurityConfig (Flexible localhost CORS), CorsConfig
│   │   ├── controller/           # Auth, Student, Recruiter, Job, Ranking, Admin
│   │   ├── service/              # Business logic, Storage, Notification, AI integration
│   │   ├── entity/               # JPA Entities: User, Student, StudentSkill, Project, Experience
│   │   ├── repository/           # Spring Data JPA: Student, StudentSkill, Project, Experience
│   │   ├── ranking/              # DsaRankingEngine, MaxHeap, WeightConfig
│   │   ├── security/             # JwtTokenProvider, JwtAuthenticationFilter
│   │   └── util/                 # SeedDataInitializer
│   ├── src/main/resources/       # application.yml
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

### Prerequisites
- **Java 17+** (JDK 17 or JDK 21) & **Apache Maven**
- **Node.js 18+** & **npm**
- **Python 3.10+** (Optional, for running local NLP microservice)

---

### Step 1: Start Spring Boot Backend
Open a terminal and run:
```bash
cd backend
mvn spring-boot:run
```
*(If Maven is not in your system PATH on Windows: `C:\apache-maven-3.9.16\bin\mvn.cmd spring-boot:run`)*

- Backend URL: **`http://localhost:8080`**
- H2 Console: **`http://localhost:8080/h2-console`** (`JDBC URL: jdbc:h2:mem:campusconnect_db`, User: `sa`, Password: empty)

---

### Step 2: Start React Frontend
Open a second terminal and run:
```bash
cd frontend
npm install
npm run dev
```

- Web App URL: **`http://localhost:5173`** (or `http://localhost:5174`)

---

### Step 3: Start Python AI Microservice *(Optional)*
```bash
cd ai-service
python -m venv venv

# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --port 8000 --reload
```
*(If the AI service is not running, the backend seamlessly falls back to its built-in NLP heuristics).*

---

## 8. API Endpoints Overview

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token | Public |
| `POST` | `/api/auth/register` | Register new Student or Recruiter | Public |
| `GET` | `/api/student/me` | Fetch authenticated student profile | Student / Admin |
| `PUT` | `/api/student/me` | Update academic & personal details | Student / Admin |
| `POST` | `/api/student/skills` | Add technical skill with proficiency level | Student / Admin |
| `PUT` | `/api/student/skills/{id}` | Update skill name / level / experience | Student / Admin |
| `DELETE` | `/api/student/skills/{id}` | Remove technical skill | Student / Admin |
| `POST` | `/api/student/projects` | Add project with tech stack & GitHub URL | Student / Admin |
| `PUT` | `/api/student/projects/{id}` | Update project details | Student / Admin |
| `DELETE` | `/api/student/projects/{id}` | Remove project | Student / Admin |
| `POST` | `/api/student/experiences` | Add internship or work experience | Student / Admin |
| `PUT` | `/api/student/experiences/{id}` | Update work experience | Student / Admin |
| `DELETE` | `/api/student/experiences/{id}` | Delete work experience | Student / Admin |
| `GET` | `/api/jobs` | Browse active campus job listings | Public |
| `GET` | `/api/recruiter/jobs/{id}/ranked-candidates` | Run DSA Max-Heap ranking for a job | Recruiter / Admin |

---

## 9. Deployment: Vercel & Render (No Docker Required)

See the detailed step-by-step guide in [docs/deployment.md](docs/deployment.md).

### Frontend on Vercel
1. Import repository on [Vercel](https://vercel.com) with root directory set to `frontend`.
2. Add Environment Variable:
   - `VITE_API_URL` = `https://<YOUR-RENDER-BACKEND>.onrender.com/api`
3. Click **Deploy**.

### Backend & AI Microservice on Render
1. In Render, select **Blueprints** → **New Blueprint Instance**.
2. Select your repository: `https://github.com/AbhijatPatel/CampusConnect.git`. Render automatically reads [`render.yaml`](render.yaml) to configure:
   - `campusconnect-backend` (Native Java environment)
   - `campusconnect-ai-service` (Native Python environment)
3. Provide your MySQL credentials (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`).
4. Click **Apply**.

---

## 10. Testing

```bash
# Run Backend unit & integration tests (DSA Ranking Engine & Auth)
cd backend
mvn test

# Run AI service NLP tests
cd ai-service
pytest
```

---

## 11. License & Author

- **Author**: [Abhijat Patel](https://github.com/AbhijatPatel)
- **Repository**: [https://github.com/AbhijatPatel/CampusConnect](https://github.com/AbhijatPatel/CampusConnect)
- **License**: Distributed under the [MIT License](LICENSE).
