# To-Do List App 📝

This project is a simple web application for managing your daily tasks using MongoDB.

**Features:**

* **Task Management:**
    * ✅ Create new tasks 
    * 📋 View existing tasks
    * ✏️ Edit task details (e.g., description, due date, priority)
    * 🗑️ Delete tasks

**Getting Started:**

1. **Prerequisites:**
    * Node.js and npm (or yarn) installed 
    * MongoDB installed and running 
    * MongoDB Compass (optional, for easier database exploration)

2. **Installation:**
    * Clone this repository: `git clone git@github.com:zhannurr/toDoList.git`
    * Navigate to the project directory: `cd toDoList`
    * Install dependencies: `npm install` 

3. **Configuration:** 
    * Create a `.env` file in the project root and add your MongoDB connection string: 
        ```
        MONGODB_URI=mongodb://<username>:<password>@<host>:<port>/<database_name>
        ```

4. **Run the Application:**
    * Start the server: `npm start` 

5. **Access the Application:**
    * Open your web browser and visit `http://localhost:3000`

**Usage:**

* **Create:** Add a new task by entering a description and optionally setting a due date and priority.
* **Read:** View the list of tasks, including their status (completed/incomplete).
* **Update:** Edit existing tasks by modifying their description, due date, priority, and marking them as completed.
* **Delete:** Remove tasks from the list.

**Testing:**

* Create, edit, and delete test tasks.
* Mark tasks as completed and verify their status.
* Test filtering and sorting tasks (e.g., by due date, priority).


**Enjoy!** ☕️
