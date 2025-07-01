## 💻 Prerequisites

- Node.js `>= 18.x`
- npm `>= 9.x`
- Angular CLI `>= 16.x`
- MongoDB running locally or via Atlas

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/project-management-app.git
cd project-management-app
```

---

## 🔧 Backend Setup (NestJS)

### 📁 Navigate to backend folder:

```bash
cd backend
```

### 📦 Install dependencies

```bash
npm install
```

### ⚙️ Environment setup

Create a `.env` file:
### connect to your database URI
```env
MONGO_URI=mongodb://localhost:27017/projectdb
JWT_SECRET=your_jwt_secret
```

> Ensure MongoDB is running locally on port 27017

### ▶️ Run server

```bash
npm run start:dev
```

📌 **Server runs at:** `http://localhost:3000`

📡 **WebSocket endpoint:** `ws://localhost:3000`

---

## 🌐 Frontend Setup (Angular)

### 📁 Navigate to frontend folder:

```bash
cd ../frontend
```

### 📦 Install dependencies

```bash
npm install
```

### ▶️ Run Angular dev server

```bash
ng serve
```

📌 **Angular app runs at:** `http://localhost:4200`