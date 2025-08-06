# 🚀 Tiger Motos - Deployment Guide

## 📋 **Options for Client to View the Project**

### **Option 1: Deploy to Vercel (Recommended - Free)**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from the frontend directory:**
   ```bash
   cd frontend
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project: No
   - Project name: tiger-motos
   - Directory: ./
   - Override settings: No

4. **Get the live URL** (e.g., `https://tiger-motos.vercel.app`)

### **Option 2: Deploy to Netlify (Free)**

1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Drag and drop the `build` folder to [netlify.com](https://netlify.com)**

3. **Get the live URL** (e.g., `https://tiger-motos.netlify.app`)

### **Option 3: Deploy to GitHub Pages**

1. **Create a GitHub repository**
2. **Push the code to GitHub**
3. **Enable GitHub Pages in repository settings**
4. **Get the live URL** (e.g., `https://username.github.io/tiger-motos`)

### **Option 4: Local Development (For Testing)**

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd tiger-motos
   ```

2. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open in browser:** `http://localhost:3000`

### **Option 5: Production Build (Static Files)**

1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Serve the build folder:**
   ```bash
   npx serve -s build -l 3000
   ```

3. **Open in browser:** `http://localhost:3000`

## 🔧 **Backend Deployment (Optional)**

If you need the backend API:

### **Deploy Backend to Railway/Heroku:**

1. **Create account on Railway or Heroku**
2. **Connect your GitHub repository**
3. **Deploy the backend folder**
4. **Update the API URL in frontend**

## 📱 **Client Access Options**

### **For Immediate Access:**
- **Option 1 (Vercel)** - Best for quick deployment
- **Option 2 (Netlify)** - Easy drag-and-drop

### **For Development/Testing:**
- **Option 4 (Local)** - Full development environment
- **Option 5 (Static)** - Simple file serving

### **For Production:**
- **Option 1 (Vercel)** - Professional hosting
- **Option 3 (GitHub Pages)** - Free hosting

## 🌍 **Recommended Deployment Steps**

1. **Choose Vercel (Option 1)**
2. **Run the deployment commands**
3. **Share the live URL with your client**
4. **Client can access from any device with internet**

## 📞 **Support**

If you need help with deployment, contact your developer or refer to the official documentation of the chosen platform. 