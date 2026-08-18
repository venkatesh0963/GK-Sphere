# GKSphere

GKSphere is a gamified General Knowledge platform built to make learning engaging and consistent. Our mission is to empower individuals to learn "One Concept at a Time" through daily challenges and an interactive level-based progression system.

![GKSphere Cover](client/public/hero-boy.png)

## 🚀 Features

- **100+ Interactive Levels**: From easy to expert, levels designed to challenge and grow your knowledge.
- **Daily Streaks**: Keep your streak alive! Play daily, stay consistent, and build a winning habit.
- **Smart Progress Tracking**: Track your performance, analyze your strengths, and see how you improve over time.
- **Global Leaderboard**: Compete with learners around the world and climb the ranks.
- **Achievements & Badges**: Earn badges and showcase your GK mastery with pride.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Redux Toolkit, React Router v7
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## 💻 Running Locally

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/try/download/community) installed on your machine.

### 1. Clone the repository

```bash
git clone https://github.com/venkatesh0963/GK-Sphere.git
cd GK-Sphere
```

### 2. Install Dependencies

You need to install dependencies for both the frontend (client) and the backend (server).

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd ../client
npm install
```

### 3. Environment Variables

In the `server` directory, create a `.env` file (if one does not exist) and add the following:

```env
MONGO_URI=mongodb://localhost:27017/gksphere
PORT=5000
JWT_SECRET=supersecretjwtkey_gksphere
NODE_ENV=development
```

### 4. Seed the Database (Optional)

To populate your database with initial questions and achievements:

```bash
cd server
npm run data:import
```

### 5. Run the Application

You can start both the client and server concurrently.

**Start the Server:**
```bash
cd server
npm run dev
```

**Start the Client:**
```bash
cd client
npm run dev
```

The application will be running at [http://localhost:5173](http://localhost:5173).

## 🌍 Deployment

- **Frontend**: Designed to be deployed easily on [Vercel](https://vercel.com).
- **Backend**: Can be deployed on [Render](https://render.com) or Railway.
- **Database**: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud database.

## 📄 License

This project is licensed under the MIT License.
