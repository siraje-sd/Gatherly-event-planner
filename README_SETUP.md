# Gatherly - Setup Instructions

## Installation Complete ✅

All dependencies have been installed. Here's how to run the application:

## Starting the Application

### 1. Start the Backend Server

Open a terminal and run:
```powershell
cd "C:\Users\asusv\Desktop\event planner\server"
npm run dev
```

The server will start on `http://localhost:5000`

### 2. Start the Frontend

Open a **new terminal** and run:
```powershell
cd "C:\Users\asusv\Desktop\event planner"
npm start
```

The frontend will start on `http://localhost:3000`

## Environment Variables

### Backend (.env file in `server/` directory)

Create a `.env` file in the `server/` directory with:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eventplanner
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**Note:** Replace `localhost` with your actual server URL when deploying to production.

### Frontend (.env file in root directory)

Create a `.env` file in the root directory with:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

**Note:** Replace `localhost` with your actual API server URL when deploying to production.

## MongoDB Setup

Make sure MongoDB is running on your system:
- Install MongoDB Community Edition if not already installed
- Start MongoDB service
- The default connection string is: `mongodb://localhost:27017/eventplanner`

## Troubleshooting

### If you see "Module not found" errors:

1. Clear node_modules and reinstall:
```powershell
cd "C:\Users\asusv\Desktop\event planner"
Remove-Item -Recurse -Force node_modules
npm install
```

2. Clear npm cache:
```powershell
npm cache clean --force
```

### If Tailwind CSS errors occur:

The project uses Tailwind CSS v3. If you see PostCSS errors, make sure:
- `tailwindcss@^3.4.1` is installed (not v4)
- `postcss.config.js` exists in the root directory

### If build errors persist:

1. Stop all running processes (Ctrl+C)
2. Delete `node_modules` and `package-lock.json`
3. Run `npm install` again
4. Clear browser cache
5. Restart the development server

## Project Structure

```
event planner/
├── src/                    # React frontend
│   ├── components/        # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── contexts/          # React contexts
│   └── hooks/             # Custom hooks
├── server/                # Express backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── middleware/        # Express middleware
└── public/                # Static files
```

## Available Scripts

### Frontend:
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

### Backend:
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Dependencies Installed

### Frontend:
✅ React & React DOM
✅ React Router DOM
✅ Framer Motion
✅ Axios
✅ React Hook Form
✅ Yup
✅ Socket.io Client
✅ Tailwind CSS v3
✅ Zustand

### Backend:
✅ Express
✅ Mongoose
✅ Socket.io
✅ JWT & Bcrypt
✅ Multer
✅ CORS
✅ Dotenv

Everything is ready to go! 🎉

