
---

## ✨ Features

### 🧩 Core (MVP)
- 📝 **Create Post:** Users can add new questions and topics.  
- 📋 **List & View Posts:** View all posts sorted by votes or date.  
- 💬 **Add Reply:** Users can add replies beneath any post.  
- ⬆️ **Upvote Post:** Increment the vote count for a post.  
- 📱 **Responsive UI:** Fully responsive design that works on desktop and mobile, built with Tailwind CSS.

---

### 🚀 Stretch Goals (Implemented)
✅ **Authentication:** Full JWT (JSON Web Token) authentication for user registration and login.  
✅ **Role-Based Access:** Differentiates between Student and Instructor roles.  
✅ **Mark as Answered:** A protected endpoint (`PUT /replies/:id/answer`) allows users with the Instructor role to mark a specific reply as the correct answer.  
✅ **Containerized Deployment:** The entire application (frontend, backend, database) is containerized with **Docker** and orchestrated with **Docker Compose** for easy, one-command setup.

---

## 🛠️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js, Vite, Tailwind CSS, axios |
| **Backend** | Node.js, Express.js (using ES Modules) |
| **Database** | MongoDB (with Mongoose) |
| **Authentication** | jsonwebtoken (JWT), bcrypt.js |
| **Containerization** | Docker, Docker Compose |

---

## 🏗️ Architecture

This project is built on a **decoupled microservice architecture**:

