# CodeTrack Deployment Guide

This document outlines the step-by-step process for deploying the CodeTrack Platform.

---

## 1. GitHub Setup

Ensure your project is version-controlled:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <github-repo-url>
git push -u origin main
```

---

## 2. MongoDB Atlas Setup
- Create a free cluster on MongoDB Atlas.
- Create a new Database named `codetrack`.
- Inside Atlas, navigate to **Database Access** and create a user. Allow network access from anywhere (`0.0.0.0/0`).
- Retrieve connection string: `mongodb+srv://username:password@cluster.mongodb.net/codetrack`

**Backend Environment Variables:**
- `MONGO_URI=your_connection_string`
- `SESSION_SECRET=your_secret`
- `PORT=10000`

---

## 3. Backend Deployment (Render)
1. Go to [Render](https://render.com) and create a new **Web Service**.
2. Connect your GitHub repository.
3. Define the Build Command:
   ```bash
   npm install
   ```
4. Define the Start Command:
   ```bash
   node backend/app.js
   ```
5. In the **Environment Variables** section, add your `MONGO_URI` and `SESSION_SECRET`.
6. Alternatively, use the provided `render.yaml` by picking "Blueprint" instead of "Web Service" during setup.

---

## 4. Frontend Deployment (Vercel)

Ensure Vercel CLI is installed and configured:
```bash
npm install -g vercel
vercel login
```

### Deploying Angular Student Portal
```bash
cd frontend-angular
ng build
cd dist/frontend-angular
vercel --prod
```

### Deploying React Admin Portal
```bash
cd frontend-react
npm install
npm run build
cd build
vercel --prod
```

---

**CONNECTION FLOW:**
Once deployed, the `EJS`/`Angular`/`React` apps will proxy to the `Express API` which seamlessly reads and writes through to `MongoDB Atlas`. Always ensure your Frontends update their API connection strings (`api.service.ts` / `api.js`) pointing to the generated Render URL.
