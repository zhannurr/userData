# 🚀 MongoDB CRUD Application

## 📌 Project Overview
This project is a simple web application that integrates **MongoDB** to store user data and provides **CRUD operations**:

✅ **Create**: Add new users via a form or API.
✅ **Read**: Display user data on a webpage.
✅ **Update**: Edit user information.
✅ **Delete**: Remove users from the database.

Additionally, the project includes **Search & Filtering** functionality for better data management. 🔍📊

---

## 🛠️ Installation & Setup

### 1️⃣ Install MongoDB
- Download & install **MongoDB** from [here](https://www.mongodb.com/try/download/community).
- Start MongoDB server using:
  ```bash
  mongod --dbpath /path/to/data
  ```
- Use **MongoDB Compass** to create a database named **assignment3**.

### 2️⃣ Install Dependencies
Make sure you have **Node.js** installed. Then, run:
```bash
npm install
```

### 3️⃣ Start the Server
Run the backend server:
```bash
node server.js
```

### 4️⃣ Open the App
Go to your browser and visit:
```
http://localhost:3000
```

---

## 🔧 Features

### ✨ Core Features
- **MongoDB Integration** for database storage.
- **Full CRUD operations** (Create, Read, Update, Delete).
- **User-friendly UI** with forms & tables.

### 🎯 Additional Features
✅ **Search Functionality** – Quickly find users by name or email.
✅ **Data Filtering & Sorting** – Sort users by age, name, etc.
✅ **Error Handling** – Alerts for database connection issues & invalid inputs.

---

## 🎮 How to Use

### 📌 Add a User
- Fill in the form and click **Submit**.
- The user appears in the table instantly! 🎉

### 📌 Edit a User
- Click the ✏️ **Edit** button next to a user.
- Update details and **save changes**.

### 📌 Delete a User
- Click the 🗑️ **Delete** button to remove a user.

### 📌 Search & Filter
- Use the **Search bar** to find specific users.
- Click on column headers to **sort** data.

---

## 🛡️ Error Handling
- Handles **invalid inputs** with user-friendly alerts.
- Shows messages for **failed database connections**.
- Prevents duplicate user entries.

---