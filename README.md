

# 📘 Course Management API

This is a full-featured RESTful API built using **Node.js**, **Express.js**, and **MongoDB** to manage courses, users, and authentication for an online learning platform. It includes user role-based access (Fellow/Admin), file uploads (images/videos), secure authentication, and course review functionality.

---

## 📂 Table of Contents

* [Features](#-features)
* [Installation](#-installation)
* [Environment Variables](#-environment-variables)
* [API Endpoints](#-api-endpoints)

  * [Auth Routes](#auth-routes)
  * [User Routes](#user-routes)
  * [Course Routes](#course-routes)
* [File Upload](#-file-upload)
* [Technologies Used](#-technologies-used)
* [Folder Structure](#-folder-structure)
* [License](#-license)

---

## 🚀 Features

* User registration, login, logout, and password reset.
* Email-based account verification.
* Course creation with image/video upload (Cloudinary).
* Admin course review (approve/reject).
* Role-based authorization (Fellow, Admin).
* Fetch all courses or user-specific courses.
* RESTful API structure with error handling.
* Swagger API documentation ready.

---

## 🛠️ Installation

```bash
git clone https://github.com/yourusername/course-management-api.git
cd course-management-api
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory and define the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

---

## 📡 API Endpoints

### 🔑 Auth Routes (`/api/auth`)

| Method | Endpoint                 | Description               |
| ------ | ------------------------ | ------------------------- |
| POST   | `/signup`                | Register new user         |
| POST   | `/verify-account`        | Verify email address      |
| POST   | `/login`                 | Login user                |
| POST   | `/logout`                | Logout user               |
| POST   | `/reset-token`           | Send reset password token |
| PUT    | `/reset-password/:token` | Reset password            |

---

### 👤 User Routes (`/api/user`)

> **Requires Admin Role**

| Method | Endpoint                    | Description      |
| ------ | --------------------------- | ---------------- |
| GET    | `/`                         | Get all users    |
| GET    | `/:userId`                  | Get user by ID   |
| PUT    | `/update-user-role/:userId` | Update user role |
| DELETE | `/delete/:userId`           | Delete user      |

---

### 📚 Course Routes (`/api/courses`)

| Method | Endpoint           | Description                               |
| ------ | ------------------ | ----------------------------------------- |
| GET    | `/`                | Get all courses (Public)                  |
| GET    | `/:id`             | Get a single course by ID (Authenticated) |
| POST   | `/`                | Create a new course (Fellow only)         |
| PUT    | `/:id`             | Update a course (Fellow only)             |
| DELETE | `/:id`             | Delete a course (Fellow only)             |
| GET    | `/user/my-courses` | Get all courses by user (Fellow only)     |
| PUT    | `/review/:id`      | Review a course (Admin only)              |

---

## 📦 File Upload

* Images and videos are uploaded to **Cloudinary**.
* Allowed image types: `jpeg`, `png`, `gif`.
* Allowed video types: `mp4`, `mov`, `avi`.

Ensure your Cloudinary credentials are added to your `.env` file.

---

## 🧰 Technologies Used

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **JWT Authentication**
* **Cloudinary**
* **Multer (for file upload)**
* **Cookie Parser**
* **Swagger for API docs**
* **Dotenv**

---

## 🗂️ Folder Structure

```
project-root/
│
├── config/                 # Database and Cloudinary config
├── controllers/            # API controllers
├── middleware/             # Authentication and file upload middlewares
├── routes/                 # Route files (auth, user, course)
├── services/               # Business logic layer
├── .env                    # Environment variables
├── app.js                  # Express app setup
├── server.js               # Entry point
```

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---

Let me know if you’d like me to generate a `swagger.json` file or set up a basic API documentation template using Swagger UI.
