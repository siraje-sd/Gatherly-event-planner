# Gatherly - Complete Installation Guide

## 📦 Step-by-Step Installation

Follow these commands **in order** to set up the entire project.

---

## Step 1: Install Frontend Dependencies

Open PowerShell/Terminal in the project root directory:

```powershell
cd "path/to/event planner"
```

### Install Core React Dependencies
```powershell
npm install react@^19.2.0 react-dom@^19.2.0 react-scripts@5.0.1
```

### Install Routing
```powershell
npm install react-router-dom@^7.9.6
```

### Install HTTP Client
```powershell
npm install axios@^1.13.2
```

### Install Form Handling
```powershell
npm install react-hook-form@^7.67.0
```

### Install Form Validation
```powershell
npm install yup@^1.7.1
```

### Install Form Validation Resolver
```powershell
npm install @hookform/resolvers@^5.2.2
```

### Install State Management
```powershell
npm install zustand@^5.0.8
```

### Install Real-Time Client
```powershell
npm install socket.io-client@^4.8.1
```

### Install Animations
```powershell
npm install framer-motion@^10.16.16
```

### Install Styling (Dev Dependencies)
```powershell
npm install -D tailwindcss@^3.4.1 postcss@^8.4.35 autoprefixer@^10.4.17
```

### Install Testing Libraries (Optional)
```powershell
npm install -D @testing-library/react@^16.3.0 @testing-library/jest-dom@^6.9.1 @testing-library/user-event@^13.5.0 @testing-library/dom@^10.4.1
```

### Install Web Vitals
```powershell
npm install web-vitals@^2.1.4
```

---

## Step 2: Install Backend Dependencies

Navigate to server directory:

```powershell
cd "path/to/event planner/server"
```

### Install Core Server
```powershell
npm install express@^4.18.2
```

### Install Database
```powershell
npm install mongoose@^8.0.3
```

### Install CORS
```powershell
npm install cors@^2.8.5
```

### Install Environment Variables
```powershell
npm install dotenv@^16.3.1
```

### Install Authentication
```powershell
npm install bcryptjs@^2.4.3
```

### Install JWT
```powershell
npm install jsonwebtoken@^9.0.2
```

### Install File Upload
```powershell
npm install multer@^1.4.5-lts.1
```

### Install Real-Time Server
```powershell
npm install socket.io@^4.6.1
```

### Install Development Tools
```powershell
npm install -D nodemon@^3.0.2
```

---

## Step 3: Initialize Tailwind CSS

Navigate back to root directory:

```powershell
cd "path/to/event planner"
```

### Initialize Tailwind Config
```powershell
npx tailwindcss init -p
```

**Note:** This creates `tailwind.config.js` and `postcss.config.js` (already created in this project)

---

## Step 4: Verify Installation

### Check Frontend Dependencies
```powershell
cd "path/to/event planner"
npm list --depth=0
```

### Check Backend Dependencies
```powershell
cd "path/to/event planner/server"
npm list --depth=0
```

---

## Step 5: Quick Install (Alternative - All at Once)

If you prefer to install everything at once:

### Frontend (Root Directory)
```powershell
cd "path/to/event planner"
npm install react@^19.2.0 react-dom@^19.2.0 react-scripts@5.0.1 react-router-dom@^7.9.6 axios@^1.13.2 react-hook-form@^7.67.0 yup@^1.7.1 @hookform/resolvers@^5.2.2 zustand@^5.0.8 socket.io-client@^4.8.1 framer-motion@^10.16.16 web-vitals@^2.1.4
```

```powershell
npm install -D tailwindcss@^3.4.1 postcss@^8.4.35 autoprefixer@^10.4.17 @testing-library/react@^16.3.0 @testing-library/jest-dom@^6.9.1 @testing-library/user-event@^13.5.0 @testing-library/dom@^10.4.1
```

### Backend (Server Directory)
```powershell
cd "path/to/event planner/server"
npm install express@^4.18.2 mongoose@^8.0.3 cors@^2.8.5 dotenv@^16.3.1 bcryptjs@^2.4.3 jsonwebtoken@^9.0.2 multer@^1.4.5-lts.1 socket.io@^4.6.1
```

```powershell
npm install -D nodemon@^3.0.2
```

---

## Step 6: Clean Install (If Issues Occur)

If you encounter any problems, do a clean reinstall:

### Frontend Clean Install
```powershell
cd "path/to/event planner"
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

### Backend Clean Install
```powershell
cd "path/to/event planner/server"
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

---

## Step 7: Verify Critical Packages

### Check Framer Motion
```powershell
cd "path/to/event planner"
npm list framer-motion
```

### Check Tailwind CSS
```powershell
cd "path/to/event planner"
npm list tailwindcss
```

### Check React Router
```powershell
cd "path/to/event planner"
npm list react-router-dom
```

### Check Express
```powershell
cd "path/to/event planner/server"
npm list express
```

### Check Mongoose
```powershell
cd "path/to/event planner/server"
npm list mongoose
```

---

## 📋 Complete Package List

### Frontend Dependencies (package.json)
```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-scripts": "5.0.1",
    "react-router-dom": "^7.9.6",
    "axios": "^1.13.2",
    "react-hook-form": "^7.67.0",
    "yup": "^1.7.1",
    "@hookform/resolvers": "^5.2.2",
    "zustand": "^5.0.8",
    "socket.io-client": "^4.8.1",
    "framer-motion": "^10.16.16",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.35",
    "autoprefixer": "^10.4.17",
    "@testing-library/react": "^16.3.0",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/user-event": "^13.5.0",
    "@testing-library/dom": "^10.4.1"
  }
}
```

### Backend Dependencies (server/package.json)
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "socket.io": "^4.6.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

---

## ✅ Installation Verification Checklist

After installation, verify:

- [ ] `node_modules` folder exists in root directory
- [ ] `node_modules` folder exists in `server/` directory
- [ ] `package-lock.json` exists in root directory
- [ ] `package-lock.json` exists in `server/` directory
- [ ] `tailwind.config.js` exists in root directory
- [ ] `postcss.config.js` exists in root directory
- [ ] No errors when running `npm list` commands

---

## 🚨 Common Issues & Solutions

### Issue: "Module not found: framer-motion"
**Solution:**
```powershell
cd "path/to/event planner"
npm install framer-motion@^10.16.16
```

### Issue: "Tailwind CSS PostCSS error"
**Solution:**
```powershell
cd "path/to/event planner"
npm uninstall tailwindcss
npm install -D tailwindcss@^3.4.1
```

### Issue: "Cannot find module 'react-router-dom'"
**Solution:**
```powershell
cd "path/to/event planner"
npm install react-router-dom@^7.9.6
```

### Issue: "Port already in use"
**Solution:** 
- Close other applications using the ports
- Or change ports in `.env` files

---

## 📝 Installation Order Summary

1. ✅ Navigate to project root
2. ✅ Install frontend dependencies
3. ✅ Install frontend dev dependencies
4. ✅ Navigate to server directory
5. ✅ Install backend dependencies
6. ✅ Install backend dev dependencies
7. ✅ Verify installations
8. ✅ Create environment files
9. ✅ Start MongoDB
10. ✅ Start backend server
11. ✅ Start frontend server

---

**All installation commands are now separated and ready to use!** 🎉

