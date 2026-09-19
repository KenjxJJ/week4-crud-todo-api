# Week 4: CRUD Todo API

A lightweight RESTful CRUD API for managing todos built with Node.js and Express.

---

## 🚀 Live Demo (Render Deployment)

- **Live URL:** [https://week4-crud-todo-api.onrender.com/todos](https://week4-crud-todo-api.onrender.com/todos)

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Dev Tool:** Nodemon

---

## 📋 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/todos` | Retrieve all todos |
| `GET` | `/todos/active` | Retrieve all active (uncompleted) todos |
| `GET` | `/todos/completed` | Retrieve all completed todos |
| `GET` | `/todos/:id` | Retrieve a single todo by ID |
| `POST` | `/todos` | Create a new todo |
| `PATCH` | `/todos/:id` | Partially update an existing todo |
| `DELETE` | `/todos/:id` | Delete a todo by ID |

---

## 📦 Request / Response Examples

### 1. Get All Todos
**Request:**
```http
GET /todos
```

**Response (200 OK):**
```json
[
  { "id": 1, "task": "Learn Node.js", "completed": false },
  { "id": 2, "task": "Build CRUD API", "completed": true }
]
```

---

### 2. Create a Todo
**Request:**
```http
POST /todos
Content-Type: application/json

{
  "task": "Deploy to Render",
  "completed": false
}
```

**Response (201 Created):**
```json
{
  "id": 3,
  "task": "Deploy to Render",
  "completed": false
}
```

---

### 3. Update a Todo
**Request:**
```http
PATCH /todos/1
Content-Type: application/json

{
  "completed": true
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "task": "Learn Node.js",
  "completed": true
}
```

---

### 4. Delete a Todo
**Request:**
```http
DELETE /todos/1
```

**Response (204 No Content)**

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd week3-crud-todo-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server with hot-reload:
   ```bash
   npm run dev
   ```
   Or start the production server:
   ```bash
   npm start
   ```
4. Access the API locally at `http://localhost:3002/todos`.
