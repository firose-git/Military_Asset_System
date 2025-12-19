🛡️ Military Asset Management System

This repository contains a Military Asset Management System designed to help commanders and logistics staff track, assign, transfer, and audit military assets such as vehicles and equipment in a structured and transparent way.

The system focuses on abstraction and modular design, ensuring clarity, maintainability, and scalability.

📌 Project Overview

The Military Asset Management System enables:

Recording asset purchases

Transferring assets between military bases

Assigning assets to personnel or units

Marking assets as expended or retired

Tracking opening balance, closing balance, and net movement

Ensuring transparent and auditable asset records

Providing role-based access control so users see only what they need

The overall goal is to make military asset tracking efficient, secure, auditable, and easy to manage.

🎯 Key Features

📦 Asset purchase and inventory management

🔁 Asset transfer between bases

👤 Asset assignment to personnel

🗑️ Asset usage and expenditure tracking

📊 Automatic calculation of:

Opening balance

Closing balance

Net movement (Purchases + Transfers In − Transfers Out)

# Logo
<p align="center">
  <img src="https://raw.githubusercontent.com/firose-git/Military_Asset_System/main/Frontend/public/asset/logo.png" width="180">
</p>

<h1 align="center">Military Asset Management System</h1>
<p align="center">Secure • Auditable • Scalable</p>





🔐 Role-based access (Admin & Base Staff)

🧾 Clear audit trail for accountability

🧠 Abstraction Concept Used

This project demonstrates abstraction by:

Separating business logic from user interface

Using modular APIs for asset operations

Allowing different user roles to interact with the system without exposing internal complexity

Making the system easy to extend with new asset types or operations

🛠️ Tech Stack
| Technology     | Usage                              |
| -------------- | ---------------------------------- |
| **Node.js**    | Backend runtime                    |
| **Express.js** | REST API development               |
| **MongoDB**    | Asset and transaction data storage |
| **React.js**   | Responsive frontend UI             |
| **JWT**        | Authentication & role-based access |


📂 Project Structure
Military-Asset-System/
│
├── backend/        # Node.js + Express + MongoDB API
│
├── frontend/       # React single-page application
│
└── README.md

🚀 Quick Start
Backend Setup
cd backend
npm install

Create or update .env file:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:
npm run dev

Frontend Setup
cd frontend
npm install

Set API URL if needed:
REACT_APP_API_URL=http://localhost:5000/api

Run frontend:
npm start

🔐 Security Notes

Use a strong JWT_SECRET in production

Always configure a secure MongoDB URI

Enable proper role-based access checks before deployment

📈 Future Enhancements

Detailed asset reports and dashboards

Export audit logs (PDF / Excel)

Notification system for asset movement

Advanced role permissions

Deployment using cloud services

📌 This project is intended for learning and demonstration purposes, showcasing abstraction, clean architecture, and real-world asset management concepts.
