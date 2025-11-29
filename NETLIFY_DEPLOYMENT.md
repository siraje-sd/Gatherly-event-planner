# Netlify Deployment Guide

This guide will help you deploy the Event Planner frontend to Netlify.

## Prerequisites

1. A Netlify account (sign up at [netlify.com](https://www.netlify.com))
2. Your backend server deployed separately (see Backend Deployment section)
3. Git repository (GitHub, GitLab, or Bitbucket)

## Frontend Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended for first-time)

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Log in to Netlify** and click "Add new site" → "Import an existing project"

3. **Connect your Git repository** and select the repository

4. **Configure build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
   - **Node version:** 18 (or latest LTS)

5. **Set environment variables:**
   - Go to Site settings → Environment variables
   - Add `REACT_APP_API_URL` with your backend API URL
     - Example: `https://your-backend.railway.app/api`
     - Or: `https://your-backend.render.com/api`

6. **Deploy!** Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize and deploy:**
   ```bash
   netlify init
   netlify deploy --prod
   ```

## Backend Deployment

The backend server needs to be deployed separately. Here are recommended platforms:

### Railway (Recommended)
1. Sign up at [railway.app](https://railway.app)
2. Create a new project from GitHub
3. Add your MongoDB connection string as `MONGODB_URI`
4. Set `CLIENT_URL` to your Netlify domain (e.g., `https://your-app.netlify.app`)
5. Railway will automatically deploy and provide a URL

### Render
1. Sign up at [render.com](https://render.com)
2. Create a new Web Service
3. Connect your repository
4. Set build command: `cd server && npm install`
5. Set start command: `cd server && npm start`
6. Add environment variables:
   - `MONGODB_URI`
   - `CLIENT_URL` (your Netlify domain)
   - `JWT_SECRET` (generate a secure random string)
   - `PORT` (Render sets this automatically)

### Heroku
1. Sign up at [heroku.com](https://www.heroku.com)
2. Create a new app
3. Connect your repository
4. Set buildpacks: Node.js
5. Add environment variables in Settings → Config Vars
6. Deploy from the Deploy tab

## Environment Variables

### Frontend (Netlify)
- `REACT_APP_API_URL` - Your backend API URL

### Backend (Railway/Render/Heroku)
- `MONGODB_URI` - MongoDB connection string
- `CLIENT_URL` - Your Netlify frontend URL (for CORS)
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (usually set automatically by hosting platform)

## Post-Deployment Checklist

- [ ] Verify frontend is accessible at your Netlify URL
- [ ] Check that API calls are working (check browser console)
- [ ] Test authentication flow
- [ ] Verify CORS is configured correctly on backend
- [ ] Test Socket.io connections (if using real-time features)
- [ ] Update any hardcoded URLs in your code

## Troubleshooting

### CORS Errors
- Make sure `CLIENT_URL` on backend matches your Netlify domain exactly
- Include protocol: `https://your-app.netlify.app` (not just `your-app.netlify.app`)

### 404 Errors on Routes
- The `netlify.toml` and `_redirects` file should handle this
- Verify both files are in your repository

### Build Failures
- Check Node version (should be 18 or later)
- Verify all dependencies are in `package.json`
- Check build logs in Netlify dashboard

### API Connection Issues
- Verify `REACT_APP_API_URL` is set correctly in Netlify environment variables
- Check backend server is running and accessible
- Verify CORS settings on backend

## Continuous Deployment

Once connected to Git, Netlify will automatically deploy:
- Every push to your main/master branch (production)
- Every pull request (preview deployments)

## Custom Domain

1. Go to Site settings → Domain management
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `CLIENT_URL` on backend to include your custom domain

## Support

For more help:
- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community](https://answers.netlify.com)

