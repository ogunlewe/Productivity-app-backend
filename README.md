# Productivity & Challenge Tracker API 🚀

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-800000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Overview
A robust backend API built with Express.js and MongoDB (via Mongoose) designed to empower users to track challenges, manage projects, and log daily check-ins. It features a secure authentication system with JWT.

## Features
-   **Node.js**: Asynchronous event-driven JavaScript runtime.
-   **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
-   **MongoDB**: NoSQL database for flexible data storage.
-   **Mongoose**: MongoDB object data modeling (ODM) for Node.js.
-   **JSON Web Tokens (JWT)**: Secure authentication and authorization.
-   **Bcrypt.js**: Password hashing for security.
-   **CORS**: Cross-Origin Resource Sharing enabled for frontend integration.
-   **Morgan**: HTTP request logger for development.

## Getting Started
Follow these steps to set up the project locally.

### Installation
To get started with the Productivity & Challenge Tracker API, clone the repository and install its dependencies:

```bash
# ⬇️ Clone the repository
git clone <repository-url>

# 📂 Navigate into the project directory
cd "project 1" # Assuming "project 1" is the folder name after cloning

# 📦 Install dependencies using pnpm (as specified in package.json)
pnpm install
```

### Environment Variables
Create a `.env` file in the root directory of the project and add the following environment variables:

```
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database_name?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
```
**Examples:**
*   `PORT=5000`: The port on which the server will run.
*   `MONGO_URI=mongodb+srv://admin:password123@cluster0.abcde.mongodb.net/productivity_db?retryWrites=true&w=majority`: Your MongoDB connection string. Replace `your_username`, `your_password`, `your_cluster`, and `your_database_name` with your actual MongoDB Atlas (or local MongoDB) details.
*   `JWT_SECRET=supersecretkey123`: A strong, random string used to sign and verify JWTs. Generate a complex one for production.

### Running the Server
Once the dependencies are installed and environment variables are set, you can start the server:

```bash
# ▶️ Start the server in development mode (with nodemon for auto-restarts)
pnpm run dev

# 🚀 Or start the server in production mode
pnpm start
```
The server will typically run on `http://localhost:5000` (or the `PORT` you configured).

## Usage
This API powers the backend for a productivity and challenge tracking application. It can be integrated with any frontend application that requires user authentication, challenge creation and participation, project management, and daily check-ins.

**Example Flow:**
1.  **Register a User**: Send a `POST` request to `/api/auth/signup` with `username`, `email`, and `password`.
2.  **Login User**: Send a `POST` request to `/api/auth/login` with `email` and `password` to receive a JWT.
3.  **Access Protected Endpoints**: Include the received JWT in the `Authorization: Bearer <token>` header for all authenticated requests (e.g., creating a challenge, logging a check-in).
4.  **Create a Challenge**: A logged-in user can create new challenges.
5.  **Join Challenges**: Users can participate in existing challenges.
6.  **Log Daily Check-ins**: Users can log their progress and mood daily for challenges or projects.
7.  **Manage Projects**: Users can create and manage projects associated with challenges.

## API Documentation

### Base URL
The base URL for all API endpoints is `http://localhost:5000/api` (or your configured host and port).

### Endpoints

#### `POST /api/auth/signup`
**Description**: Registers a new user account.
**Request**:
```json
{
  "username": "jane.doe",
  "email": "jane.doe@example.com",
  "password": "StrongPassword123"
}
```
**Response**:
```json
{
  "_id": "60d0fe4f3b7b2b0015b8d2c0",
  "username": "jane.doe",
  "email": "jane.doe@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
**Errors**:
-   `400 Bad Request`: `{"message": "All fields are required."}`
-   `400 Bad Request`: `{"message": "User already exists."}`

#### `POST /api/auth/login`
**Description**: Authenticates a user and returns a JWT.
**Request**:
```json
{
  "email": "jane.doe@example.com",
  "password": "StrongPassword123"
}
```
**Response**:
```json
{
  "_id": "60d0fe4f3b7b2b0015b8d2c0",
  "username": "jane.doe",
  "email": "jane.doe@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
**Errors**:
-   `401 Unauthorized`: `{"message": "Invalid credentials."}`

#### `GET /api/auth/me`
**Description**: Retrieves the profile of the authenticated user.
**Authorization**: Bearer Token required.
**Request**: No body.
**Response**:
```json
{
  "_id": "60d0fe4f3b7b2b0015b8d2c0",
  "username": "jane.doe",
  "email": "jane.doe@example.com",
  "avatar": "http://example.com/avatar.png",
  "bio": "Passionate developer.",
  "createdAt": "2023-10-26T10:00:00.000Z",
  "updatedAt": "2023-10-26T10:00:00.000Z"
}
```
**Errors**:
-   `401 Unauthorized`: `{"message": "No token, authorization denied"}`
-   `401 Unauthorized`: `{"message": "Not authorized"}`

#### `POST /api/challenges`
**Description**: Creates a new challenge.
**Authorization**: Bearer Token required.
**Request**:
```json
{
  "title": "30 Days of Code",
  "description": "Commit to coding daily for 30 days.",
  "duration": 30,
  "tags": ["coding", "productivity", "challenge"]
}
```
**Response**:
```json
{
  "_id": "60d0fe4f3b7b2b0015b8d2c1",
  "title": "30 Days of Code",
  "description": "Commit to coding daily for 30 days.",
  "duration": 30,
  "startDate": "2023-10-26T10:00:00.000Z",
  "creator": "60d0fe4f3b7b2b0015b8d2c0",
  "participants": ["60d0fe4f3b7b2b0015b8d2c0"],
  "tags": ["coding", "productivity", "challenge"],
  "createdAt": "2023-10-26T10:00:00.000Z",
  "updatedAt": "2023-10-26T10:00:00.000Z"
}
```
**Errors**:
-   `400 Bad Request`: `{"message": "Title and duration are required."}`
-   `401 Unauthorized`: `{"message": "Not authorized"}`

#### `GET /api/challenges`
**Description**: Retrieves a list of all challenges.
**Request**: No body.
**Response**:
```json
[
  {
    "_id": "60d0fe4f3b7b2b0015b8d2c1",
    "title": "30 Days of Code",
    "description": "Commit to coding daily for 30 days.",
    "duration": 30,
    "creator": {
      "_id": "60d0fe4f3b7b2b0015b8d2c0",
      "username": "jane.doe"
    },
    "participants": ["60d0fe4f3b7b2b0015b8d2c0"],
    "tags": ["coding", "productivity", "challenge"],
    "createdAt": "2023-10-26T10:00:00.000Z"
  }
]
```

#### `GET /api/challenges/:id`
**Description**: Retrieves a single challenge by its ID.
**Request**: No body.
**Response**:
```json
{
  "_id": "60d0fe4f3b7b2b0015b8d2c1",
  "title": "30 Days of Code",
  "description": "Commit to coding daily for 30 days.",
  "duration": 30,
  "startDate": "2023-10-26T10:00:00.000Z",
  "creator": {
    "_id": "60d0fe4f3b7b2b0015b8d2c0",
    "username": "jane.doe"
  },
  "participants": ["60d0fe4f3b7b2b0015b8d2c0"],
  "tags": ["coding", "productivity", "challenge"],
  "createdAt": "2023-10-26T10:00:00.000Z",
  "updatedAt": "2023-10-26T10:00:00.000Z"
}
```
**Errors**:
-   `404 Not Found`: `{"message": "Challenge not found"}`

#### `POST /api/challenges/:id/join`
**Description**: Allows an authenticated user to join a specific challenge.
**Authorization**: Bearer Token required.
**Request**: No body.
**Response**:
```json
{
  "message": "Challenge joined successfully"
}
```
**Errors**:
-   `404 Not Found`: `{"message": "Challenge not found"}`
-   `400 Bad Request`: `{"message": "Already joined this challenge"}`
-   `401 Unauthorized`: `{"message": "Not authorized"}`

#### `POST /api/checkins`
**Description**: Creates a new daily check-in for an authenticated user.
**Authorization**: Bearer Token required.
**Request**:
```json
{
  "challenge": "60d0fe4f3b7b2b0015b8d2c1",
  "content": "Completed 2 hours of coding today, feeling productive!",
  "mood": "😊",
  "project": "60d0fe4f3b7b2b0015b8d2c5",
  "images": ["http://example.com/screenshot1.png"]
}
```
**Response**:
```json
{
  "_id": "60d0fe4f3b7b2b0015b8d2c3",
  "user": "60d0fe4f3b7b2b0015b8d2c0",
  "challenge": "60d0fe4f3b7b2b0015b8d2c1",
  "project": "60d0fe4f3b7b2b0015b8d2c5",
  "content": "Completed 2 hours of coding today, feeling productive!",
  "mood": "😊",
  "images": ["http://example.com/screenshot1.png"],
  "date": "2023-10-27T10:00:00.000Z",
  "createdAt": "2023-10-27T10:00:00.000Z",
  "updatedAt": "2023-10-27T10:00:00.000Z"
}
```
**Errors**:
-   `400 Bad Request`: `{"message": "Already checked in today"}`
-   `401 Unauthorized`: `{"message": "Not authorized"}`

#### `GET /api/checkins/me`
**Description**: Retrieves all check-ins made by the authenticated user.
**Authorization**: Bearer Token required.
**Request**: No body.
**Response**:
```json
[
  {
    "_id": "60d0fe4f3b7b2b0015b8d2c3",
    "user": "60d0fe4f3b7b2b0015b8d2c0",
    "challenge": {
      "_id": "60d0fe4f3b7b2b0015b8d2c1",
      "title": "30 Days of Code"
    },
    "content": "Completed 2 hours of coding today, feeling productive!",
    "mood": "😊",
    "createdAt": "2023-10-27T10:00:00.000Z"
  }
]
```
**Errors**:
-   `401 Unauthorized`: `{"message": "Not authorized"}`

#### `GET /api/checkins/challenge/:challengeId`
**Description**: Retrieves all check-ins for a specific challenge.
**Authorization**: Bearer Token required.
**Request**: No body.
**Response**:
```json
[
  {
    "_id": "60d0fe4f3b7b2b0015b8d2c3",
    "user": {
      "_id": "60d0fe4f3b7b2b0015b8d2c0",
      "username": "jane.doe"
    },
    "challenge": "60d0fe4f3b7b2b0015b8d2c1",
    "content": "Completed 2 hours of coding today, feeling productive!",
    "mood": "😊",
    "createdAt": "2023-10-27T10:00:00.000Z"
  }
]
```
**Errors**:
-   `401 Unauthorized`: `{"message": "Not authorized"}`

#### `POST /api/projects`
**Description**: Creates a new project.
**Authorization**: Bearer Token required.
**Request**:
```json
{
  "title": "My Portfolio Website",
  "description": "Building a personal portfolio to showcase my work.",
  "challenge": "60d0fe4f3b7b2b0015b8d2c1",
  "techStack": ["React", "Node.js", "MongoDB"],
  "repoLink": "https://github.com/jane_doe/my-portfolio",
  "screenshots": ["http://example.com/screenshot_portfolio1.png"]
}
```
**Response**:
```json
{
  "_id": "60d0fe4f3b7b2b0015b8d2c5",
  "title": "My Portfolio Website",
  "description": "Building a personal portfolio to showcase my work.",
  "owner": "60d0fe4f3b7b2b0015b8d2c0",
  "challenge": "60d0fe4f3b7b2b0015b8d2c1",
  "techStack": ["React", "Node.js", "MongoDB"],
  "repoLink": "https://github.com/jane_doe/my-portfolio",
  "screenshots": ["http://example.com/screenshot_portfolio1.png"],
  "createdAt": "2023-10-27T11:00:00.000Z",
  "updatedAt": "2023-10-27T11:00:00.000Z"
}
```
**Errors**:
-   `400 Bad Request`: `{"message": "Title and challenge are required."}`
-   `401 Unauthorized`: `{"message": "Not authorized"}`

#### `GET /api/projects`
**Description**: Retrieves a list of all projects.
**Request**: No body.
**Response**:
```json
[
  {
    "_id": "60d0fe4f3b7b2b0015b8d2c5",
    "title": "My Portfolio Website",
    "description": "Building a personal portfolio to showcase my work.",
    "owner": {
      "_id": "60d0fe4f3b7b2b0015b8d2c0",
      "username": "jane.doe"
    },
    "challenge": {
      "_id": "60d0fe4f3b7b2b0015b8d2c1",
      "title": "30 Days of Code"
    },
    "techStack": ["React", "Node.js", "MongoDB"],
    "repoLink": "https://github.com/jane_doe/my-portfolio",
    "screenshots": ["http://example.com/screenshot_portfolio1.png"]
  }
]
```

#### `GET /api/projects/me`
**Description**: Retrieves all projects owned by the authenticated user.
**Authorization**: Bearer Token required.
**Request**: No body.
**Response**:
```json
[
  {
    "_id": "60d0fe4f3b7b2b0015b8d2c5",
    "title": "My Portfolio Website",
    "description": "Building a personal portfolio to showcase my work.",
    "owner": "60d0fe4f3b7b2b0015b8d2c0",
    "challenge": {
      "_id": "60d0fe4f3b7b2b0015b8d2c1",
      "title": "30 Days of Code"
    },
    "techStack": ["React", "Node.js", "MongoDB"],
    "repoLink": "https://github.com/jane_doe/my-portfolio"
  }
]
```
**Errors**:
-   `401 Unauthorized`: `{"message": "Not authorized"}`

#### `GET /api/projects/:id`
**Description**: Retrieves a single project by its ID.
**Request**: No body.
**Response**:
```json
{
  "_id": "60d0fe4f3b7b2b0015b8d2c5",
  "title": "My Portfolio Website",
  "description": "Building a personal portfolio to showcase my work.",
  "owner": {
    "_id": "60d0fe4f3b7b2b0015b8d2c0",
    "username": "jane.doe"
  },
  "challenge": {
    "_id": "60d0fe4f3b7b2b0015b8d2c1",
    "title": "30 Days of Code"
  },
  "techStack": ["React", "Node.js", "MongoDB"],
  "repoLink": "https://github.com/jane_doe/my-portfolio",
  "screenshots": ["http://example.com/screenshot_portfolio1.png"],
  "createdAt": "2023-10-27T11:00:00.000Z",
  "updatedAt": "2023-10-27T11:00:00.000Z"
}
```
**Errors**:
-   `404 Not Found`: `{"message": "Project not found"}`

#### `PUT /api/projects/:id`
**Description**: Updates an existing project by its ID. Only the project owner can update it.
**Authorization**: Bearer Token required.
**Request**:
```json
{
  "description": "Updated description for my portfolio website.",
  "techStack": ["React", "TypeScript", "Node.js", "MongoDB"]
}
```
**Response**:
```json
{
  "_id": "60d0fe4f3b7b2b0015b8d2c5",
  "title": "My Portfolio Website",
  "description": "Updated description for my portfolio website.",
  "owner": "60d0fe4f3b7b2b0015b8d2c0",
  "challenge": "60d0fe4f3b7b2b0015b8d2c1",
  "techStack": ["React", "TypeScript", "Node.js", "MongoDB"],
  "repoLink": "https://github.com/jane_doe/my-portfolio",
  "screenshots": ["http://example.com/screenshot_portfolio1.png"],
  "createdAt": "2023-10-27T11:00:00.000Z",
  "updatedAt": "2023-10-27T11:30:00.000Z"
}
```
**Errors**:
-   `404 Not Found`: `{"message": "Project not found"}`
-   `403 Forbidden`: `{"message": "Not authorized to update this project"}`
-   `401 Unauthorized`: `{"message": "Not authorized"}`

## Technologies Used
This project leverages a modern JavaScript ecosystem:

| Category        | Technology     | Description                                |
| :-------------- | :------------- | :----------------------------------------- |
| **Backend**     | Node.js        | Server-side JavaScript runtime             |
|                 | Express.js     | Web application framework                  |
| **Database**    | MongoDB        | NoSQL document database                    |
|                 | Mongoose       | MongoDB object modeling for Node.js        |
| **Authentication** | JSON Web Tokens | Secure, compact, URL-safe means of representing claims |
|                 | Bcrypt.js      | Password hashing library                   |
| **Utilities**   | Dotenv         | Loads environment variables from a `.env` file |
|                 | CORS           | Middleware for enabling Cross-Origin Resource Sharing |
|                 | Morgan         | HTTP request logger middleware             |
| **Development** | Nodemon        | Monitors for changes and restarts server   |

## Contributing
Contributions are highly welcome! If you have suggestions for improvements or new features, please follow these steps:

1.  🍴 **Fork the repository**: Click on the 'Fork' button at the top right of this page.
2.  🌿 **Create a new branch**: `git checkout -b feature/your-feature-name`
3.  ✨ **Make your changes**: Implement your feature or fix.
4.  ✍️ **Commit your changes**: `git commit -m 'feat: Add new feature'`
5.  ⬆️ **Push to your branch**: `git push origin feature/your-feature-name`
6.  🔄 **Open a Pull Request**: Explain your changes and why they are beneficial.

## License
This project is licensed under the ISC License.


---
[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)#   P r o d u c t i v i t y - a p p - b a c k e n d  
 #   P r o d u c t i v i t y - a p p - b a c k e n d  
 #   P r o d u c t i v i t y - a p p - b a c k e n d  
 #   P r o d u c t i v i t y - a p p - b a c k e n d  
 #   P r o d u c t i v i t y - a p p - b a c k e n d  
 