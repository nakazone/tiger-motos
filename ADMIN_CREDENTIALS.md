# 🔐 Admin Panel Credentials - Tiger Motos

## **Access Information**

### **Admin Panel URL:**
```
http://localhost:3000/admin/login
```

### **Default Credentials:**
- **Username:** `admin`
- **Password:** `tiger2024!`

## **Security Features**

### **Authentication System:**
- ✅ **Secure login** with username/password
- ✅ **Session management** (24-hour expiry)
- ✅ **Protected routes** for admin access
- ✅ **Automatic logout** on session expiry
- ✅ **Role-based access control**

### **Session Management:**
- **Session Duration:** 24 hours
- **Auto-logout:** When session expires
- **Secure Storage:** localStorage with expiry timestamps
- **Route Protection:** Unauthorized users redirected to login

## **Admin Panel Features**

### **Dashboard:**
- 📊 **Storage monitoring** with visual indicators
- 🖼️ **Image management** with drag & drop
- 🔧 **Bulk operations** for motorcycles and images
- 📈 **Real-time statistics** and analytics

### **Image Management:**
- **Drag & Drop:** Reorder images within motorcycles
- **Cross-motorcycle:** Move images between listings
- **Storage Optimization:** Automatic cleanup tools
- **Bulk Operations:** Remove multiple images at once

### **Motorcycle Management:**
- **Add/Edit:** Complete motorcycle forms
- **Image Upload:** Multiple image support
- **Featured Status:** Mark motorcycles as featured
- **Inventory Control:** Full CRUD operations

## **Setup Instructions**

### **1. Start the Application:**
```bash
cd frontend
npm start
```

### **2. Access Admin Panel:**
- Navigate to: `http://localhost:3000/admin/login`
- Use credentials: `admin` / `tiger2024!`

### **3. First Login:**
- Enter credentials
- Click "Entrar no Painel"
- You'll be redirected to `/admin` dashboard

## **Security Notes**

### **For Production:**
- ⚠️ **Change default credentials** before deployment
- 🔒 **Use environment variables** for sensitive data
- 🌐 **Implement HTTPS** for secure connections
- 🗄️ **Use secure database** instead of localStorage
- 🔐 **Add two-factor authentication** for enhanced security

### **Current Implementation:**
- **Local Development:** Credentials stored in code
- **Session Storage:** Browser localStorage with expiry
- **Route Protection:** React Router with authentication checks
- **Error Handling:** Secure error messages

## **Troubleshooting**

### **Login Issues:**
1. **Check credentials** - Ensure correct username/password
2. **Clear browser storage** - Remove old session data
3. **Check console** - Look for authentication errors
4. **Restart app** - Clear any cached authentication state

### **Access Issues:**
1. **Verify authentication** - Check if logged in
2. **Check session expiry** - Sessions last 24 hours
3. **Clear localStorage** - Remove expired session data
4. **Check route protection** - Ensure admin routes are protected

## **File Structure**

```
frontend/src/
├── contexts/
│   ├── AuthContext.tsx          # Authentication logic
│   └── MotorcycleContext.tsx    # Motorcycle data management
├── components/
│   └── ProtectedRoute.tsx       # Route protection component
├── pages/admin/
│   ├── AdminLogin.tsx           # Login page
│   └── AdminDashboard.tsx       # Main admin dashboard
└── App.tsx                      # Route configuration
```

## **API Endpoints (Future)**

When moving to production, these endpoints will be implemented:
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh session token

## **Support**

For technical support or questions about the admin panel:
- **Email:** admin@tigermotos.com.br
- **Documentation:** Check the code comments
- **Issues:** Review browser console for error messages

---

**⚠️ Important:** These are demonstration credentials. Change them before deploying to production! 