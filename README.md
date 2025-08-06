# Tiger Motos - Motorcycle Dealership Website

A comprehensive motorcycle dealership website with an admin panel for managing inventory. Built with React, Node.js, Express, and MongoDB.

## Features

### Public Website
- **Home Page**: Hero section, featured motorcycles, company highlights
- **Inventory**: Browse all motorcycles with advanced filtering and search
- **Motorcycle Details**: Detailed view with images, specifications, and contact info
- **About & Contact Pages**: Company information and contact details
- **Responsive Design**: Mobile-friendly interface

### Admin Panel
- **Authentication**: Secure login system with role-based access
- **Dashboard**: Overview of inventory statistics and recent additions
- **Inventory Management**: Add, edit, delete motorcycles
- **Image Upload**: Multiple image upload with preview
- **User Management**: Create and manage admin users
- **Real-time Updates**: Instant inventory updates

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Heroicons** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing

## Project Structure

```
tiger-motos/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   │   └── admin/       # Admin pages
│   │   ├── contexts/        # React contexts
│   │   ├── services/        # API services
│   │   └── types/           # TypeScript types
│   └── package.json
├── backend/                  # Node.js backend
│   ├── routes/              # API routes
│   ├── models/              # MongoDB models
│   ├── middleware/          # Custom middleware
│   ├── uploads/             # Image uploads
│   └── server.js            # Main server file
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tiger-motos
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tiger-motos
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

5. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin Panel: http://localhost:3000/admin/login

## API Endpoints

### Public Endpoints
- `GET /api/motorcycles` - Get all motorcycles
- `GET /api/motorcycles/featured` - Get featured motorcycles
- `GET /api/motorcycles/:id` - Get motorcycle by ID
- `GET /api/motorcycles/brand/:brand` - Get motorcycles by brand
- `GET /api/motorcycles/category/:category` - Get motorcycles by category
- `GET /api/motorcycles/search/suggestions` - Get search suggestions
- `GET /api/motorcycles/stats/overview` - Get inventory statistics

### Admin Endpoints (Authentication Required)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Motorcycle Management (Admin)
- `GET /api/admin/motorcycles` - Get all motorcycles (admin view)
- `POST /api/admin/motorcycles` - Create new motorcycle
- `PUT /api/admin/motorcycles/:id` - Update motorcycle
- `DELETE /api/admin/motorcycles/:id` - Delete motorcycle
- `PATCH /api/admin/motorcycles/:id/availability` - Toggle availability
- `PATCH /api/admin/motorcycles/:id/featured` - Toggle featured status
- `DELETE /api/admin/motorcycles/:id/images/:index` - Delete image
- `GET /api/admin/dashboard/stats` - Get dashboard statistics

## Motorcycle Data Model

```typescript
interface Motorcycle {
  _id: string;
  brand: string;
  model: string;
  year: number;
  category: 'Sport' | 'Cruiser' | 'Touring' | 'Adventure' | 'Naked' | 'Scooter' | 'Dual-Sport' | 'Custom';
  condition: 'New' | 'Used' | 'Certified Pre-Owned';
  price: number;
  mileage: number;
  engineSize: number;
  fuelType: 'Gasoline' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic' | 'CVT';
  color: string;
  vin?: string;
  description: string;
  features: string[];
  images: string[];
  isAvailable: boolean;
  isFeatured: boolean;
  location: string;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
}
```

## Admin User Roles

- **admin**: Full access to all features
- **manager**: Can manage inventory and view statistics
- **sales**: Can view and edit motorcycle details

## Features in Detail

### Inventory Management
- Add new motorcycles with detailed specifications
- Upload multiple images per motorcycle
- Edit existing motorcycle information
- Mark motorcycles as available/unavailable
- Feature/unfeature motorcycles
- Delete motorcycles and associated images

### Search and Filtering
- Search by brand, model, or description
- Filter by category, condition, price range, year range
- Sort by various criteria (price, year, date added)
- Pagination for large inventories

### Image Management
- Multiple image upload support
- Image preview in admin panel
- Delete individual images
- Automatic image optimization

### User Management
- Secure authentication with JWT
- Role-based access control
- User profile management
- Password change functionality

## Deployment

### Backend Deployment
1. Set up a MongoDB database (MongoDB Atlas recommended)
2. Configure environment variables for production
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or AWS S3

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact:
- Email: info@tigermotos.com
- Phone: (555) 123-4567

## Future Enhancements

- [ ] Online financing calculator
- [ ] Test ride scheduling
- [ ] Customer reviews and ratings
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with third-party services 