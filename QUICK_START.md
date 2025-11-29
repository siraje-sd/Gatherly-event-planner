# Gatherly - Quick Start Guide

## 🚀 Start the Application

### Step 1: Start Backend Server

Open PowerShell/Terminal and run:
```powershell
cd "path/to/event planner/server"
npm run dev
```

Wait for: `Server running on port 5000`

### Step 2: Start Frontend (New Terminal)

Open a **NEW** PowerShell/Terminal window and run:
```powershell
cd "path/to/event planner"
npm start
```

Wait for: Browser to open automatically

## ⚙️ Environment Setup (First Time Only)

### Backend Environment Variables

Create `server/.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eventplanner
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**Note:** Update URLs for production deployment.

### Frontend Environment Variables

Create `.env` file in root directory:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

**Note:** Update URLs for production deployment.

## 📋 Prerequisites

- ✅ Node.js installed
- ✅ MongoDB running locally
- ✅ All dependencies installed (already done)

## 🎯 What You'll See

1. **Landing Page**: Beautiful home page with features
2. **Sign Up**: Create your account
3. **Dashboard**: View all your events
4. **Create Event**: Plan your celebration
5. **Event Details**: Manage invitations, RSVPs, and collaborators

## 🐛 Troubleshooting

### If you see "Cannot find module" errors:

```powershell
cd "path/to/event planner"
npm install
```

### If Tailwind CSS errors:

The project uses Tailwind CSS v3. Make sure:
- `tailwindcss@^3.4.1` is in devDependencies
- `postcss.config.js` exists

### If MongoDB connection fails:

1. Make sure MongoDB is installed and running
2. Check MongoDB service is started
3. Verify connection string in `server/.env`

### Clear cache and restart:

```powershell
cd "path/to/event planner"
Remove-Item -Recurse -Force node_modules\.cache
npm start
```

## ✅ Verification Checklist

- [ ] Backend server starts without errors
- [ ] Frontend compiles successfully
- [ ] Can access the frontend application
- [ ] Can register a new account
- [ ] Can login
- [ ] Can create an event
- [ ] Can view event details

## 📚 Documentation

- **Setup Details**: See `README_SETUP.md`
- **Design Guide**: See `DESIGN_DOCUMENTATION.md`
- **UI Writing**: See `UI_WRITING_DOCUMENT.md`
- **Niche & Theme**: See `NICHE_THEME_JUSTIFICATION.md`
- **Project Summary**: See `PROJECT_COMPLETION_SUMMARY.md`

---

**Ready to go!** 🎉

