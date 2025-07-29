# Productivity Hub API 🚀

## Overview
The Productivity Hub API is a robust backend solution built with Node.js and Express.js, leveraging MongoDB with Mongoose for data persistence. It serves as the core for a productivity application, enabling users to manage challenges, track daily check-ins, and organize their projects.

## Features
*   **User Authentication & Authorization**: Secure user registration and login with JWTs, protected routes for authenticated access.
*   **Challenge Management**: Create, view, and join coding or productivity challenges.
*   **Daily Check-ins**: Track progress within challenges via daily check-ins, including content, mood, and associated projects.
*   **Project Portfolio**: Manage personal projects, link them to specific challenges, and update project details.
*   **Data Persistence**: Efficiently store and retrieve data using MongoDB, orchestrated by Mongoose ORM.
*   **RESTful API Design**: Clear and consistent API endpoints for seamless client-side integration.

## Getting Started
To get this backend server up and running on your local machine, follow these steps.

### Installation
1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/ogunlewe/productivity-app-backend.git
    cd productivity-app-backend
    ```
2.  **Install Dependencies**:
    The project uses `pnpm` as its package manager. Ensure you have it installed. If not, you can install it via npm: `npm install -g pnpm`.
    Then, install the project dependencies:
    ```bash
    pnpm install
    ```

### Environment Variables
Create a `.env` file in the root directory of the project and populate it with the following environment variables:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/productivity_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
```

**Required Variables**:
*   `PORT`: The port number on which the server will run. (e.g., `5000`)
*   `MONGO_URI`: Your MongoDB connection URI. (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/mydb?retryWrites=true&w=majority`)
*   `JWT_SECRET`: A strong, secret key used for signing JWTs. This should be a long, random string.

## API Documentation
### Base URL
`http://localhost:5000/api` (when running locally on port 5000)

### Endpoints

#### POST /api/auth/signup
Registers a new user.
**Request**:
```json
{
  "username": "jane_doe",
  "email": "jane.doe@example.com",
  "password": "StrongPassword123"
}
```
**Response**:
```json
{
  "_id": "60d0fe4f7e5f3c0015b0b1c0",
  "username": "jane_doe",
  "email": "jane.doe@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
**Errors**:
- `400 Bad Request`: `{ "message": "All fields are required." }`
- `400 Bad Request`: `{ "message": "User already exists." }`

#### POST /api/auth/login
Authenticates a user and returns a JWT.
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
  "_id": "60d0fe4f7e5f3c0015b0b1c0",
  "username": "jane_doe",
  "email": "jane.doe@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
**Errors**:
- `401 Unauthorized`: `{ "message": "Invalid credentials." }`

#### GET /api/auth/me
Retrieves the profile of the authenticated user.
**Request**:
Requires a valid JWT in the `Authorization` header: `Bearer YOUR_TOKEN`
**Response**:
```json
{
  "_id": "60d0fe4f7e5f3c0015b0b1c0",
  "username": "jane_doe",
  "email": "jane.doe@example.com",
  "avatar": "http://example.com/avatar.png",
  "bio": "A passionate developer.",
  "createdAt": "2023-10-26T10:00:00.000Z",
  "updatedAt": "2023-10-26T10:00:00.000Z"
}
```
**Errors**:
- `401 Unauthorized`: `{ "message": "Not authorized" }`
- `401 Unauthorized`: `{ "message": "No token, authorization denied" }`

#### POST /api/challenges
Creates a new challenge. (Protected route)
**Request**:
Requires a valid JWT in the `Authorization` header.
```json
{
  "title": "30 Days of Code",
  "description": "Challenge to code every day for 30 days.",
  "duration": 30,
  "tags": ["coding", "daily", "consistency"]
}
```
**Response**:
```json
{
  "_id": "60d0fe4f7e5f3c0015b0b1c1",
  "title": "30 Days of Code",
  "description": "Challenge to code every day for 30 days.",
  "duration": 30,
  "startDate": "2023-10-26T00:00:00.000Z",
  "creator": "60d0fe4f7e5f3c0015b0b1c0",
  "participants": ["60d0fe4f7e5f3c0015b0b1c0"],
  "tags": ["coding", "daily", "consistency"],
  "createdAt": "2023-10-26T10:00:00.000Z",
  "updatedAt": "2023-10-26T10:00:00.000Z"
}
```
**Errors**:
- `400 Bad Request`: `{ "message": "Title and duration are required." }`
- `401 Unauthorized`: `{ "message": "Not authorized" }`

#### GET /api/challenges
Retrieves all challenges.
**Request**:
None
**Response**:
```json
[
  {
    "_id": "60d0fe4f7e5f3c0015b0b1c1",
    "title": "30 Days of Code",
    "description": "Challenge to code every day for 30 days.",
    "duration": 30,
    "startDate": "2023-10-26T00:00:00.000Z",
    "creator": {
      "_id": "60d0fe4f7e5f3c0015b0b1c0",
      "username": "jane_doe"
    },
    "participants": ["60d0fe4f7e5f3c0015b0b1c0"],
    "tags": ["coding", "daily", "consistency"],
    "createdAt": "2023-10-26T10:00:00.000Z",
    "updatedAt": "2023-10-26T10:00:00.000Z"
  }
]
```
**Errors**: None expected for successful request.

#### GET /api/challenges/:id
Retrieves a single challenge by its ID.
**Request**:
None
**Response**:
```json
{
  "_id": "60d0fe4f7e5f3c0015b0b1c1",
  "title": "30 Days of Code",
  "description": "Challenge to code every day for 30 days.",
  "duration": 30,
  "startDate": "2023-10-26T00:00:00.000Z",
  "creator": {
    "_id": "60d0fe4f7e5f3c0015b0b1c0",
    "username": "jane_doe"
  },
  "participants": ["60d0fe4f7e5f3c0015b0b1c0"],
  "tags": ["coding", "daily", "consistency"],
  "createdAt": "2023-10-26T10:00:00.000Z",
  "updatedAt": "2023-10-26T10:00:00.000Z"
}
```
**Errors**:
- `404 Not Found`: `{ "message": "Challenge not found" }`

#### POST /api/challenges/:id/join
Allows an authenticated user to join a specific challenge. (Protected route)
**Request**:
Requires a valid JWT in the `Authorization` header.
**Response**:
```json
{
  "message": "Challenge joined successfully"
}
```
**Errors**:
- `404 Not Found`: `{ "message": "Challenge not found" }`
- `400 Bad Request`: `{ "message": "Already joined this challenge" }`
- `401 Unauthorized`: `{ "message": "Not authorized" }`

#### POST /api/checkins
Creates a daily check-in for an authenticated user. (Protected route)
**Request**:
Requires a valid JWT in the `Authorization` header.
```json
{
  "challenge": "60d0fe4f7e5f3c0015b0b1c1",
  "content": "Completed day 5 of the coding challenge. Focused on API design.",
  "mood": "😊",
  "project": "60d0fe4f7e5f3c0015b0b1c5",
  "images": ["http://example.com/checkin_img1.png"]
}
```
**Response**:
```json
{
  "_id": "60d0fe4f7e5f3c0015b0b1c2",
  "user": "60d0fe4f7e5f3c0015b0b1c0",
  "challenge": "60d0fe4f7e5f3c0015b0b1c1",
  "project": "60d0fe4f7e5f3c0015b0b1c5",
  "content": "Completed day 5 of the coding challenge. Focused on API design.",
  "mood": "😊",
  "images": ["http://example.com/checkin_img1.png"],
  "date": "2023-10-26T10:30:00.000Z",
  "createdAt": "2023-10-26T10:30:00.000Z",
  "updatedAt": "2023-10-26T10:30:00.000Z"
}
```
**Errors**:
- `400 Bad Request`: `{ "message": "Already checked in today" }`
- `401 Unauthorized`: `{ "message": "Not authorized" }`

#### GET /api/checkins/me
Retrieves all check-ins for the authenticated user. (Protected route)
**Request**:
Requires a valid JWT in the `Authorization` header.
**Response**:
```json
[
  {
    "_id": "60d0fe4f7e5f3c0015b0b1c2",
    "user": "60d0fe4f7e5f3c0015b0b1c0",
    "challenge": {
      "_id": "60d0fe4f7e5f3c0015b0b1c1",
      "title": "30 Days of Code"
    },
    "project": "60d0fe4f7e5f3c0015b0b1c5",
    "content": "Completed day 5 of the coding challenge. Focused on API design.",
    "mood": "😊",
    "images": ["http://example.com/checkin_img1.png"],
    "date": "2023-10-26T10:30:00.000Z",
    "createdAt": "2023-10-26T10:30:00.000Z",
    "updatedAt": "2023-10-26T10:30:00.000Z"
  }
]
```
**Errors**:
- `401 Unauthorized`: `{ "message": "Not authorized" }`

#### GET /api/checkins/challenge/:challengeId
Retrieves all check-ins for a specific challenge. (Protected route)
**Request**:
Requires a valid JWT in the `Authorization` header.
**Response**:
```json
[
  {
    "_id": "60d0fe4f7e5f3c0015b0b1c2",
    "user": {
      "_id": "60d0fe4f7e5f3c0015b0b1c0",
      "username": "jane_doe"
    },
    "challenge": "60d0fe4f7e5f3c0015b0b1c1",
    "project": "60d0fe4f7e5f3c0015b0b1c5",
    "content": "Completed day 5 of the coding challenge. Focused on API design.",
    "mood": "😊",
    "images": ["http://example.com/checkin_img1.png"],
    "date": "2023-10-26T10:30:00.000Z",
    "createdAt": "2023-10-26T10:30:00.000Z",
    "updatedAt": "2023-10-26T10:30:00.000Z"
  }
]
```
**Errors**:
- `401 Unauthorized`: `{ "message": "Not authorized" }`

#### POST /api/projects
Creates a new project. (Protected route)
**Request**:
Requires a valid JWT in the `Authorization` header.
```json
{
  "title": "Portfolio Website",
  "description": "Personal website to showcase projects and skills.",
  "challenge": "60d0fe4f7e5f3c0015b0b1c1",
  "techStack": ["React", "Node.js", "MongoDB"],
  "repoLink": "https://github.com/jane_doe/portfolio-website",
  "screenshots": ["http://example.com/portfolio_ss1.png"]
}
```
**Response**:
```json
{
  "_id": "60d0fe4f7e5f3c0015b0b1c5",
  "title": "Portfolio Website",
  "description": "Personal website to showcase projects and skills.",
  "owner": "60d0fe4f7e5f3c0015b0b1c0",
  "challenge": "60d0fe4f7e5f3c0015b0b1c1",
  "techStack": ["React", "Node.js", "MongoDB"],
  "repoLink": "https://github.com/jane_doe/portfolio-website",
  "screenshots": ["http://example.com/portfolio_ss1.png"],
  "createdAt": "2023-10-26T11:00:00.000Z",
  "updatedAt": "2023-10-26T11:00:00.000Z"
}
```
**Errors**:
- `400 Bad Request`: `{ "message": "Title and challenge are required." }`
- `401 Unauthorized`: `{ "message": "Not authorized" }`

#### GET /api/projects
Retrieves all projects.
**Request**:
None
**Response**:
```json
[
  {
    "_id": "60d0fe4f7e5f3c0015b0b1c5",
    "title": "Portfolio Website",
    "description": "Personal website to showcase projects and skills.",
    "owner": {
      "_id": "60d0fe4f7e5f3c0015b0b1c0",
      "username": "jane_doe"
    },
    "challenge": {
      "_id": "60d0fe4f7e5f3c0015b0b1c1",
      "title": "30 Days of Code"
    },
    "techStack": ["React", "Node.js", "MongoDB"],
    "repoLink": "https://github.com/jane_doe/portfolio-website",
    "screenshots": ["http://example.com/portfolio_ss1.png"],
    "createdAt": "2023-10-26T11:00:00.000Z",
    "updatedAt": "2023-10-26T11:00:00.000Z"
  }
]
```
**Errors**: None expected for successful request.

#### GET /api/projects/me
Retrieves all projects owned by the authenticated user. (Protected route)
**Request**:
Requires a valid JWT in the `Authorization` header.
**Response**:
```json
[
  {
    "_id": "60d0fe4f7e5f3c0015b0b1c5",
    "title": "Portfolio Website",
    "description": "Personal website to showcase projects and skills.",
    "owner": "60d0fe4f7e5f3c0015b0b1c0",
    "challenge": {
      "_id": "60d0fe4f7e5f3c0015b0b1c1",
      "title": "30 Days of Code"
    },
    "techStack": ["React", "Node.js", "MongoDB"],
    "repoLink": "https://github.com/jane_doe/portfolio-website",
    "screenshots": ["http://example.com/portfolio_ss1.png"],
    "createdAt": "2023-10-26T11:00:00.000Z",
    "updatedAt": "2023-10-26T11:00:00.000Z"
  }
]
```
**Errors**:
- `401 Unauthorized`: `{ "message": "Not authorized" }`

#### GET /api/projects/:id
Retrieves a single project by its ID.
**Request**:
None
**Response**:
```json
{
  "_id": "60d0fe4f7e5f3c0015b0b1c5",
  "title": "Portfolio Website",
  "description": "Personal website to showcase projects and skills.",
  "owner": {
    "_id": "60d0fe4f7e5f3c0015b0b1c0",
    "username": "jane_doe"
  },
  "challenge": {
    "_id": "60d0fe4f7e5f3c0015b0b1c1",
    "title": "30 Days of Code"
  },
  "techStack": ["React", "Node.js", "MongoDB"],
  "repoLink": "https://github.com/jane_doe/portfolio-website",
  "screenshots": ["http://example.com/portfolio_ss1.png"],
  "createdAt": "2023-10-26T11:00:00.000Z",
  "updatedAt": "2023-10-26T11:00:00.000Z"
}
```
**Errors**:
- `404 Not Found`: `{ "message": "Project not found" }`

#### PUT /api/projects/:id
Updates an existing project. Only the project owner can update it. (Protected route)
**Request**:
Requires a valid JWT in the `Authorization` header.
```json
{
  "description": "Updated description for the portfolio website.",
  "techStack": ["React", "Node.js", "Express", "MongoDB"]
}
```
**Response**:
```json
{
  "_id": "60d0fe4f7e5f3c0015b0b1c5",
  "title": "Portfolio Website",
  "description": "Updated description for the portfolio website.",
  "owner": "60d0fe4f7e5f3c0015b0b1c0",
  "challenge": "60d0fe4f7e5f3c0015b0b1c1",
  "techStack": ["React", "Node.js", "Express", "MongoDB"],
  "repoLink": "https://github.com/jane_doe/portfolio-website",
  "screenshots": ["http://example.com/portfolio_ss1.png"],
  "createdAt": "2023-10-26T11:00:00.000Z",
  "updatedAt": "2023-10-26T11:15:00.000Z"
}
```
**Errors**:
- `404 Not Found`: `{ "message": "Project not found" }`
- `403 Forbidden`: `{ "message": "Not authorized to update this project" }`
- `401 Unauthorized`: `{ "message": "Not authorized" }`

## Usage
Once the server is running, you can interact with the API using tools like Postman, Insomnia, or `curl`.

1.  **Start the server**:
    ```bash
    pnpm dev
    ```
    or
    ```bash
    pnpm start
    ```
    This will typically start the server on `http://localhost:5000`.

2.  **Register a User**:
    Send a `POST` request to `http://localhost:5000/api/auth/signup` with your desired username, email, and password in the JSON body.
    ```http
    POST http://localhost:5000/api/auth/signup
    Content-Type: application/json

    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "Password123"
    }
    ```
    The response will include a `token`. Copy this token as it's required for authenticated endpoints.

3.  **Log in a User**:
    Send a `POST` request to `http://localhost:5000/api/auth/login` with your email and password.
    ```http
    POST http://localhost:5000/api/auth/login
    Content-Type: application/json

    {
      "email": "test@example.com",
      "password": "Password123"
    }
    ```
    Again, capture the `token` from the response.

4.  **Access Protected Routes (e.g., Get Current User)**:
    For any protected route, include the JWT in the `Authorization` header.
    ```http
    GET http://localhost:5000/api/auth/me
    Authorization: Bearer YOUR_COPIED_TOKEN
    ```
    You should receive your user details. If you forget the `Authorization` header or provide an invalid token, you will get an unauthorized error.

5.  **Create a Challenge**:
    ```http
    POST http://localhost:5000/api/challenges
    Authorization: Bearer YOUR_COPIED_TOKEN
    Content-Type: application/json

    {
      "title": "Learn Express.js",
      "description": "Mastering Express.js fundamentals in 10 days.",
      "duration": 10
    }
    ```
    The response will contain the details of the newly created challenge, including its ID.

6.  **Create a Project**:
    Using the challenge ID from the previous step:
    ```http
    POST http://localhost:5000/api/projects
    Authorization: Bearer YOUR_COPIED_TOKEN
    Content-Type: application/json

    {
      "title": "Express REST API",
      "description": "Building a simple RESTful API with Express.",
      "challenge": "CHALLENGE_ID_FROM_PREVIOUS_STEP",
      "techStack": ["Express.js", "Node.js", "MongoDB"],
      "repoLink": "https://github.com/your-username/express-rest-api"
    }
    ```

7.  **Make a Daily Check-in**:
    Using the project and challenge IDs you've created:
    ```http
    POST http://localhost:5000/api/checkins
    Authorization: Bearer YOUR_COPIED_TOKEN
    Content-Type: application/json

    {
      "challenge": "CHALLENGE_ID",
      "project": "PROJECT_ID",
      "content": "Today I implemented authentication middleware.",
      "mood": "😃"
    }
    ```

Feel free to explore other endpoints using your preferred API client!

## Technologies Used
| Technology  | Description                                         |
| :---------- | :-------------------------------------------------- |
| Node.js     | 🌳 JavaScript runtime environment.                 |
| Express.js  | ⚡ Fast, unopinionated, minimalist web framework for Node.js. |
| MongoDB     | 🍃 Flexible NoSQL document database.              |
| Mongoose    |  ODM for MongoDB, providing schema-based solutions. |
| JWT         | 🔑 Securely transmit information between parties as a JSON object. |
| Bcrypt.js   | 🔐 Library for hashing passwords.                  |
| CORS        | Middleware for enabling Cross-Origin Resource Sharing. |
| Morgan      | HTTP request logger middleware.                    |
| dotenv      | Loads environment variables from a `.env` file.    |
| Nodemon     | 🔄 Utility that monitors for any changes in your source. |

## Contributing
We welcome contributions to enhance the Productivity Hub API! If you'd like to contribute, please follow these guidelines:

*   ✨ **Fork the repository**: Start by forking the project to your GitHub account.
*   🌿 **Create a new branch**: For each feature or bug fix, create a new branch from `main` (e.g., `feature/add-new-endpoint` or `fix/auth-bug`).
*   💻 **Make your changes**: Implement your features or fixes, ensuring code quality and adherence to existing patterns.
*   ✅ **Test your changes**: Write or update tests to cover your modifications.
*   💬 **Commit messages**: Write clear and descriptive commit messages following conventional commits.
*   ⬆️ **Push your branch**: Push your changes to your forked repository.
*   ✉️ **Open a Pull Request**: Submit a pull request to the `main` branch of the original repository, describing your changes in detail.

## License
This project is not currently covered by an explicit open-source license. Please contact the author for licensing information.

## Author Info
**Feranmi**

*   LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourusername)
*   Twitter: [Your Twitter Profile](https://twitter.com/yourusername)
*   Portfolio: [Your Portfolio Website](https://yourportfolio.com)

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
