# Task Management System

This is a full-stack Task Management System that allows users to create, update, delete, and reorder tasks. Users can drag and drop tasks between different categories, and the changes are instantly saved in the database.

## Features
- Add, edit, and delete tasks.
- Tasks are categorized into "To-Do", "In Progress", and "Done".
- Drag-and-drop functionality to move tasks between categories.
- Reorder tasks within a category.
- Changes are saved instantly to MongoDB.

## Technologies Used
### Frontend:
- React.js
- React DnD (for drag-and-drop functionality)
- Tailwind CSS (for styling)
- Firebase (for authentication)
- Socket.io (for real-time updates)

### Backend:
- Node.js
- Express.js
- MongoDB Atlas (Database)
- Socket.io (for real-time updates)

## Installation
### Prerequisites:
- Node.js installed
- MongoDB Atlas set up

### Steps:
#### 1. Clone the repository:
```bash
  git clone https://github.com/your-username/task-manager.git
  cd task-manager
```

#### 2. Install dependencies:
For frontend:
```bash
  cd client
  npm install
```
For backend:
```bash
  cd server
  npm install
```

#### 3. Set up environment variables:
Create a `.env` file in the server directory and add:
```env
PORT=5000
DB_USER=your-mongodb-username
DB_PASS=your-mongodb-password
JWT_SECRET=your-jwt-secret
```

#### 4. Start the server:
```bash
  npm run dev
```

#### 5. Start the client:
```bash
  npm run dev
```

## API Endpoints
| Method | Endpoint        | Description |
|--------|---------------|-------------|
| GET    | /tasks        | Get all tasks |
| POST   | /tasks        | Add a new task |
| PUT    | /tasks/:id    | Update a task |
| DELETE | /tasks/:id    | Delete a task |

## Issues and Troubleshooting
### Common Errors:
1. **`Failed to fetch` error**:
   - Ensure your backend server is running on `localhost:5000`.
   - Check CORS policy settings in Express.
2. **Drag and Drop not saving tasks**:
   - Verify that `PUT /tasks/:id` is correctly updating the database.
   - Check console logs for any MongoDB connection issues.
3. **Socket.io issues**:
   - Make sure the `socket.io-client` library is installed (`npm install socket.io-client`).
   - Confirm the server is emitting and listening to socket events properly.

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push the branch (`git push origin feature-branch`)
5. Open a Pull Request


