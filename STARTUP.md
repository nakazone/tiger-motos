# Tiger Motos - Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Quick Setup

### 1. Install Dependencies

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tiger-motos
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running on your system. If using MongoDB locally:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Windows
net start MongoDB

# Linux
sudo systemctl start mongod
```

### 4. Initialize Database

```bash
cd backend
npm run setup
```

This will create an initial admin user:
- Email: admin@tigermotos.com
- Password: admin123

### 5. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 6. Access the Application

- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login
- **API**: http://localhost:5000

## Default Admin Credentials

- **Email**: admin@tigermotos.com
- **Password**: admin123

**Important**: Change the password after first login!

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the connection string in `.env`
- For cloud MongoDB, use the full connection string

### Port Already in Use
- Change the PORT in `.env` file
- Kill processes using the ports: `lsof -ti:3000 | xargs kill -9`

### Module Not Found Errors
- Run `npm install` in both frontend and backend directories
- Clear node_modules and reinstall if needed

## Next Steps

1. **Add Sample Data**: Use the admin panel to add some motorcycles
2. **Customize**: Update company information, colors, and branding
3. **Deploy**: Follow the deployment guide in the main README
4. **Secure**: Change default passwords and JWT secret

## Support

If you encounter issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify MongoDB is running
4. Check environment variables are set correctly 