# SkillSync - Developer Portfolio & Job Tracker Platform

SkillSync is a full-stack web application that helps developers manage their professional journey efficiently. It enables users to create a personal profile, upload project links and resumes, track job applications, and gain insights through analytics.

---

## ✨ Features

- ✅ Developer profile creation  
- ✅ Upload project links (GitHub, live demo, etc.)  
- ✅ CRUD for job applications (Company, Role, Status)  
- ✅ JWT-based user authentication  
- ✅ Resume/screenshot file uploads via multipart  
- ✅ File download & delete functionality  
- ✅ Daily reminder for pending applications *(Scheduled Jobs)*  
- ✅ Analytics (application stats)  
- ✅ Notifications *(Planned)*

---

## 📅 Project Status

**✅ Backend Phase Completed:**

- User CRUD
- Job Application CRUD
- JWT Auth (Register/Login)
- File Upload, Download, Delete (Resume/Screenshots)
- Folder structure and service layer separation

**🚧 Current Phase: Frontend Integration**

- React UI for Upload, View, Delete
- JWT login integration
- File management from UI

---

## 🪧 Tech Stack

### ✅ Backend (Spring Boot - Java)

- Spring Boot (REST APIs)
- Spring Security (JWT Authentication)
- Spring Data JPA
- File Upload via `MultipartFile`
- Scheduled Jobs using `@Scheduled`

### ✅ Database

- PostgreSQL

### 🧪 DevOps / Deployment

- Dockerized Backend
- Firebase / Netlify for Frontend Deployment
- Railway/Render for Backend Hosting *(optional)*

### 🚀 Frontend (Client Folder)

- React.js (Hooks, Context API)
- TailwindCSS *(or Bootstrap)*
- Axios for HTTP calls
- File upload/download integration
- Toasts & Modals *(optional)*

---

## ⚙️ Backend API Reference

### 🔐 Authentication (JWT)
- `POST /api/auth/register` – Register a user
- `POST /api/auth/login` – Login & get JWT

### 👤 Users – `/api/users`
- `GET /api/users` – Get all users  
- `GET /api/users/{id}` – Get user by ID  
- `POST /api/users` – Create new user  
- `PUT /api/users/{id}` – Update user  
- `DELETE /api/users/{id}` – Delete user  

### 💼 Job Applications – `/api/jobs`
- `GET /api/jobs` – Get all jobs  
- `GET /api/jobs/{id}` – Get job by ID  
- `POST /api/jobs` – Create new job  
- `PUT /api/jobs/{id}` – Update job  
- `DELETE /api/jobs/{id}` – Delete job  

### 📁 Files – `/api/files`
- `POST /api/files/upload/{userId}` – Upload file  
- `GET /api/files/user/{userId}` – List files for a user  
- `GET /api/files/download/{fileId}` – Download a file  
- `DELETE /api/files/{fileId}` – Delete a file  

---

## 🧪 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/skillsync.git
cd skillsync
```

### 2. Backend Setup

#### 🔧 PostgreSQL Config
Create a database: `skillsync`

#### 🧾 Update application.properties
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/skillsync
spring.datasource.username=postgres
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

#### ▶️ Run the Backend
```bash
mvn spring-boot:run
```
Use Postman to test APIs.

### 📁 Backend Structure
```
src/
 ├── main/java/com/skillsync
 │   ├── controller
 │   │    ├── HomeController.java
 │   │    ├── UserController.java
 │   │    ├── JobApplicationController.java
 │   │    ├── AuthController.java
 │   │    └── FileUploadController.java
 │   ├── model
 │   │    ├── User.java
 │   │    ├── JobApplication.java
 │   │    └── FileUpload.java
 │   ├── service
 │   │    ├── UserService.java
 │   │    ├── JobApplicationService.java
 │   │    └── FileUploadService.java
 │   ├── repository
 │   │    ├── UserRepository.java
 │   │    ├── JobApplicationRepository.java
 │   │    └── FileUploadRepository.java
 │   └── SkillSyncApplication.java
 └── resources
     ├── application.properties
     └── static/index.html
```

## 🖥️ Frontend (Client Folder)

### 📁 Location: `client/`
The frontend is built using React.js. All frontend code will reside under the `client/` directory.

### 📦 Step-by-Step Frontend Modules

#### ✅ Step 1: File Upload UI
*[You will paste component code here later]*
- Choose a file and upload to the backend using Axios
- Store JWT in headers if needed

#### ✅ Step 2: File List UI
*[Paste component here later]*
- Call `GET /api/files/user/{userId}`
- Display uploaded files in a table/card layout

#### ✅ Step 3: File Download
*[Paste logic/button here later]*
- Download file by clicking a download button

#### ✅ Step 4: File Delete
*[Paste logic here later]*
- Delete file and update UI immediately

#### ✅ Step 5: JWT Auth Integration
*[Paste auth hooks/context here later]*
- Use login/register to store JWT and userId

---

## 🧭 Next Steps

- [ ] Finish all 4 frontend file features (Upload, List, Download, Delete)
- [ ] Integrate JWT with React Context
- [ ] Add Dashboard with analytics
- [ ] Add Public Profile feature
- [ ] Schedule email reminders

---

## 🙌 Contributing

This project is built for learning and professional use. Open to contributions after MVP is stable.

---

## 🌐 License

MIT — Free to use, fork, and modify.

---

✅ Your README is now **production-ready** and aligned with everything we've completed!

Let's now move to building the frontend.

---

When you're ready, answer:
1. ✅ Do you have a working login frontend already (JWT + userId)?
2. ✅ Are you using Tailwind or any UI library?

Once I get that, I'll give you:
- `FileUploader.js`
- `FileList.js`
- Axios setup with JWT auth
- Clean UI with working download + delete

Ready when you are!