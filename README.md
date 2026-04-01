# CodeTrack – CSE Department Coding Practice Platform

CodeTrack is a Full Stack Web Application created for the Computer Science Department to facilitate coding practice, code submission, and performance tracking.

## Features
- **Student Portal (Angular):** Browse problems, filter by difficulty, submit code, and see submission history.
- **Admin Portal (React):** Create, update, and delete coding problems; view student submissions.
- **Basic Portal (EJS):** Login, registration, and dashboard.
- **Role-Based Access Control:** Secure routes for students and admins.
- **AJAX Integrations:** Fetch, Axios, and HttpClient implementations without full page reloads.

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose
- **Frontend Modules:**
  - EJS (Basic Server-Side Pages)
  - Angular (Student Portal)
  - React (Admin Portal)
- **Deployment:** Render (Backend), Vercel (Frontends)

## Folder Structure
```
codeTrack/
├── backend/            # Express REST API & EJS Views
├── frontend-angular/   # Angular Student Portal application
├── frontend-react/     # React Admin Portal application
├── docs/               # Documentation
└── render.yaml         # Render deployment configuration
```

## Setup Steps
1. Clone the repository and navigate to the project directory.
2. Ensure you have Node.js and npm installed.

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm start
```

### React Admin Portal Setup
```bash
cd frontend-react
npm install
npm start
```

### Angular Student Portal Setup
Ensure you have the Angular CLI installed (`npm install -g @angular/cli`).
```bash
cd frontend-angular
npm install
ng serve
```

## Environment Variables
Create a `.env` file within the `backend/` directory referencing:
- `MONGO_URI`: Your MongoDB connection string.
- `SESSION_SECRET`: Random string for encrypting user sessions.
- `PORT`: Define the local server port (e.g., 10000).

## Deployment
Please refer to `docs/deployment-guide.md` for dedicated deployment steps configuring Render and Vercel.
