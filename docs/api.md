# CampusConnect — REST API Reference

All protected endpoints require the HTTP Header:
`Authorization: Bearer <JWT_ACCESS_TOKEN>`

---

## 1. Authentication APIs (`/api/auth`)

### Register User
- **Method**: `POST`
- **Path**: `/api/auth/register`
- **Access**: Public
- **Body**:
  ```json
  {
    "fullName": "Abhijat Patel",
    "email": "abhijat@gmail.com",
    "password": "password123",
    "role": "STUDENT",
    "phone": "+91 9876543210"
  }
  ```
- **Response**: `200 OK` with `accessToken`, `id`, `fullName`, `email`, and `role`.

### Login User
- **Method**: `POST`
- **Path**: `/api/auth/login`
- **Access**: Public
- **Body**:
  ```json
  {
    "email": "abhijat@gmail.com",
    "password": "password123"
  }
  ```

---

## 2. Student APIs (`/api/student`)

### Get Current Profile
- **Method**: `GET`
- **Path**: `/api/student/me`
- **Access**: `ROLE_STUDENT`, `ROLE_ADMIN`

### Update Profile
- **Method**: `PUT`
- **Path**: `/api/student/me`
- **Access**: `ROLE_STUDENT`

### Upload Resume
- **Method**: `POST`
- **Path**: `/api/student/resume`
- **Content-Type**: `multipart/form-data`
- **Access**: `ROLE_STUDENT`

### Get AI Recommended Jobs
- **Method**: `GET`
- **Path**: `/api/student/recommendations`
- **Access**: `ROLE_STUDENT`

### Get Student Applications
- **Method**: `GET`
- **Path**: `/api/student/applications`
- **Access**: `ROLE_STUDENT`

---

## 3. Jobs & Application APIs (`/api/jobs`, `/api/recruiter`)

### Search & Filter Jobs (Paginated)
- **Method**: `GET`
- **Path**: `/api/jobs?keyword=java&location=noida&page=0&size=10`
- **Access**: Public

### Get Job Details
- **Method**: `GET`
- **Path**: `/api/jobs/{id}`
- **Access**: Public

### Apply For Job
- **Method**: `POST`
- **Path**: `/api/jobs/{id}/apply`
- **Access**: `ROLE_STUDENT`

### Create Job Post
- **Method**: `POST`
- **Path**: `/api/recruiter/jobs`
- **Access**: `ROLE_RECRUITER`, `ROLE_ADMIN`

### Get Ranked Candidates (Flagship DSA Engine)
- **Method**: `GET`
- **Path**: `/api/recruiter/jobs/{id}/ranked-candidates?skillMatchWeight=0.40&nlpSimilarityWeight=0.20`
- **Access**: `ROLE_RECRUITER`, `ROLE_ADMIN`
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "rank": 1,
        "candidateName": "Abhijat Patel",
        "overallScore": 92.4,
        "skillMatchScore": 95.0,
        "nlpMatchScore": 89.0,
        "experienceYears": 1.5,
        "cgpa": 8.9,
        "rankingExplanation": "Matches 5/5 required skills (100%). Meets CGPA requirement (8.9 >= 7.0).",
        "applicationStatus": "APPLIED"
      }
    ]
  }
  ```

### Update Application Stage
- **Method**: `PUT`
- **Path**: `/api/recruiter/applications/{id}/status`
- **Body**: `{"status": "SHORTLISTED"}`
- **Access**: `ROLE_RECRUITER`

---

## 4. Admin APIs (`/api/admin`)

### Dashboard Metrics
- **Method**: `GET`
- **Path**: `/api/admin/dashboard`
- **Access**: `ROLE_ADMIN`

### Manage Users
- **Method**: `GET`
- **Path**: `/api/admin/users`
- **Access**: `ROLE_ADMIN`

### Toggle User Active Status
- **Method**: `PUT`
- **Path**: `/api/admin/users/{id}/status`
- **Access**: `ROLE_ADMIN`
