# 🏘️ Smart Neighborhood Waste Segregation & Pickup Management System

A full-stack **MERN application** designed to help **municipal corporations manage household waste pickup requests** efficiently while creating **community awareness** about **segregable (wet) and non-segregable (dry) waste**.

This project reduces **manual coordination and nuisance for corporation workers** by enabling households to request waste pickup digitally.

---

## 🎯 Project Objective

- Enable households to request waste pickup online
- Help corporation workers manage pickups systematically
- Promote awareness on waste segregation
- Reduce street-level confusion and delays
- Provide role-based dashboards for smooth operations

---

## 🧑‍💼 User Roles

### 🏠 Household User
- Register & login
- Request waste pickup
- View pickup history
- View scheduled pickups
- Logout securely

### 🚚 Collector (Corporation Worker)
- Login securely
- View assigned pickup requests
- Complete pickups
- Update pickup status

### 🛠️ Admin (Municipality)
- View all users
- View all pickup requests
- Monitor pending & completed pickups
- View system statistics
- Access reports & analytics dashboard

---

## 🧩 Features

### 🔐 Authentication
- JWT-based authentication
- Role-based authorization
- Secure password hashing using bcrypt

### 🏠 Household Dashboard
- Pickup request form
- Pickup history (pending & completed)
- Scheduled pickup view

### 🚛 Collector Dashboard
- View pending pickups
- Mark pickup as completed

### 🛠️ Admin Dashboard
- Total users count
- Total pickups count
- View all users
- View all pickups with user details
- Reports & analytics section

---

## 🏠 Home Page
- Awareness-focused landing page
- Importance of waste segregation
- Clean navigation bar
- Login & Signup options

---

## 🧪 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## 🗂️ Folder Structure

smart-recycling-system/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│
└── README.md


---

## 🚀 Run the Project

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
