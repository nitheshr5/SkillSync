# SkillSync - Developer Portfolio & Job Tracker Platform

SkillSync is a full-stack web application built to help developers manage their professional journey efficiently. It allows users to create a personal skill profile, upload project links, and track job applications seamlessly.

---

## ✨ Features

* Developer profile creation
* Upload project links (GitHub, live demo, etc.)
* CRUD for job applications (Company, Role, Status)
* Learn from other public profiles *(optional)*
* JWT-based user authentication
* File uploads (Resume, screenshots)
* Daily reminder for pending applications (Scheduled jobs)
* Analytics (application stats)
* Notifications

---

## 📅 Project Status

**Phase 1 completed:**

* User endpoints
* Job Application endpoints

**Current Phase:**

* Adding authentication, file upload, analytics, and frontend integration

---

## 🪧 Tech Stack

### Frontend (Planned)

* React.js (Hooks, Context API)
* TailwindCSS (or Bootstrap)
* Axios for API calls
* Netlify / Firebase for deployment

### Backend (Spring Boot - Java)

* Spring Boot (REST APIs)
* Spring Data JPA
* Spring Security (JWT authentication)
* File Upload via Multipart
* Scheduled Jobs using @Scheduled

### Database

* PostgreSQL
* Redis *(Optional: caching or job queue)*

### DevOps

* Dockerized Backend
* Frontend: Deployed on Firebase/Netlify
* Backend: Railway/Render or localhost for now

---

## ⚙️ Backend API Structure

### Base URL: `http://localhost:8080`

### Home

* `GET /` – Welcome message

### Users (Endpoint: `/api/users`)

* `GET /api/users` – Get all users
* `GET /api/users/{id}` – Get user by ID
* `POST /api/users` – Create new user
* `PUT /api/users/{id}` – Update user
* `DELETE /api/users/{id}` – Delete user

### Job Applications (Endpoint: `/api/jobs`)

* `GET /api/jobs` – Get all job applications
* `GET /api/jobs/{id}` – Get job application by ID
* `POST /api/jobs` – Create job application
* `PUT /api/jobs/{id}` – Update job application
* `DELETE /api/jobs/{id}` – Delete job application

---

## 🚧 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/skillsync.git
cd skillsync
```

### 2. Setup PostgreSQL

* Create a database named `skillsync`

### 3. Configure `application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/skillsync
spring.datasource.username=postgres
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

### 4. Run the app

```bash
mvn spring-boot:run
```

Use Postman to test all endpoints.

---

## 📂 Project Structure

```
src/
 ├── main/java/com/skillsync
 │   ├── controller
 │   │    ├── HomeController.java
 │   │    ├── UserController.java
 │   │    └── JobApplicationController.java
 │   ├── model
 │   │    ├── User.java
 │   │    └── JobApplication.java
 │   ├── repository
 │   │    ├── UserRepository.java
 │   │    └── JobApplicationRepository.java
 │   └── SkillSyncApplication.java
 └── resources
     ├── application.properties
     └── static/index.html
```

---

## 🚀 Next Steps

* [ ] JWT authentication (login/register)
* [ ] Resume file uploads
* [ ] Public developer profiles
* [ ] Scheduled reminders
* [ ] React frontend
* [ ] Analytics dashboard
* [ ] Notifications system

---

## ✅ Contributing

This project is for learning and building a solid full-stack foundation. Contributions are welcome after Phase 1.

---

## 🌐 License

MIT — Free to use and extend.
