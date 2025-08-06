const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory database for development
const inMemoryDB = {
  motorcycles: [
    {
      _id: '1',
      brand: 'Honda',
      model: 'CBR600RR',
      year: 2020,
      price: 8500,
      condition: 'Excellent',
      category: 'Sport',
      engineSize: 600,
      mileage: 5000,
      description: 'Excellent condition sport bike with low mileage.',
      features: ['ABS', 'LED Headlights', 'Digital Display'],
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1558981806-ec527fa84a39?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1558981403-c5f9248f5cde?w=800&h=600&fit=crop'
      ],
      isFeatured: true
    },
    {
      _id: '2',
      brand: 'Yamaha',
      model: 'YZF-R1',
      year: 2021,
      price: 15000,
      condition: 'Good',
      category: 'Sport',
      engineSize: 1000,
      mileage: 8000,
      description: 'High-performance sport bike in good condition.',
      features: ['ABS', 'Traction Control', 'Quick Shifter'],
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop&crop=entropy'
      ],
      isFeatured: true
    },
    {
      _id: '3',
      brand: 'Kawasaki',
      model: 'Ninja 650',
      year: 2019,
      price: 6500,
      condition: 'Good',
      category: 'Sport',
      engineSize: 650,
      mileage: 12000,
      description: 'Great beginner-friendly sport bike.',
      features: ['ABS', 'Comfortable Riding Position'],
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1558981403-c5f9248f5cde?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1558981806-ec527fa84a39?w=800&h=600&fit=crop'
      ],
      isFeatured: true
    },
    {
      _id: '4',
      brand: 'Ducati',
      model: 'Panigale V4',
      year: 2022,
      price: 25000,
      condition: 'Excellent',
      category: 'Sport',
      engineSize: 1103,
      mileage: 3000,
      description: 'Exotic Italian sport bike with incredible performance.',
      features: ['ABS', 'Traction Control', 'Quick Shifter', 'Launch Control'],
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1558981806-ec527fa84a39?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1558981403-c5f9248f5cde?w=800&h=600&fit=crop'
      ],
      isFeatured: true
    },
    {
      _id: '5',
      brand: 'BMW',
      model: 'S1000RR',
      year: 2021,
      price: 18000,
      condition: 'Excellent',
      category: 'Sport',
      engineSize: 999,
      mileage: 4500,
      description: 'German engineering at its finest with advanced electronics.',
      features: ['ABS', 'Traction Control', 'Quick Shifter', 'Dynamic Traction Control'],
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1558981403-c5f9248f5cde?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=600&fit=crop'
      ],
      isFeatured: true
    },
    {
      _id: '6',
      brand: 'Harley-Davidson',
      model: 'Street Glide',
      year: 2020,
      price: 22000,
      condition: 'Good',
      category: 'Cruiser',
      engineSize: 1746,
      mileage: 15000,
      description: 'Classic American cruiser with modern amenities.',
      features: ['ABS', 'Cruise Control', 'Infotainment System', 'LED Lighting'],
      status: 'available',
      images: [
        'https://images.unsplash.com/photo-1558981403-c5f9248f5cde?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1558981806-ec527fa84a39?w=800&h=600&fit=crop'
      ],
      isFeatured: true
    }
  ],
  users: [
    {
      _id: '1',
      email: 'admin@tigermotos.com',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      role: 'admin'
    }
  ]
};

// Mock authentication middleware
const mockAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token === 'mock-admin-token') {
    req.user = inMemoryDB.users[0];
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Tiger Motos API' });
});

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = inMemoryDB.users.find(u => u.email === email);
  
  if (user && password === 'password') {
    res.json({
      token: 'mock-admin-token',
      user: { id: user._id, email: user.email, role: user.role }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Motorcycle routes
app.get('/api/motorcycles', (req, res) => {
  const { page = 1, limit = 12, brand, category, condition, status } = req.query;
  let filteredMotorcycles = [...inMemoryDB.motorcycles];
  
  if (brand) filteredMotorcycles = filteredMotorcycles.filter(m => m.brand === brand);
  if (category) filteredMotorcycles = filteredMotorcycles.filter(m => m.category === category);
  if (condition) filteredMotorcycles = filteredMotorcycles.filter(m => m.condition === condition);
  if (status) filteredMotorcycles = filteredMotorcycles.filter(m => m.status === status);
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedMotorcycles = filteredMotorcycles.slice(startIndex, endIndex);
  
  res.json({
    motorcycles: paginatedMotorcycles,
    total: filteredMotorcycles.length,
    page: parseInt(page),
    totalPages: Math.ceil(filteredMotorcycles.length / limit)
  });
});

app.get('/api/motorcycles/featured', (req, res) => {
  const featuredMotorcycles = inMemoryDB.motorcycles.filter(m => m.isFeatured);
  res.json(featuredMotorcycles);
});

app.get('/api/motorcycles/:id', (req, res) => {
  const motorcycle = inMemoryDB.motorcycles.find(m => m._id === req.params.id);
  if (motorcycle) {
    res.json(motorcycle);
  } else {
    res.status(404).json({ message: 'Motorcycle not found' });
  }
});

// Admin routes
app.get('/api/admin/motorcycles', mockAuthMiddleware, (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedMotorcycles = inMemoryDB.motorcycles.slice(startIndex, endIndex);
  
  res.json({
    motorcycles: paginatedMotorcycles,
    total: inMemoryDB.motorcycles.length,
    page: parseInt(page),
    totalPages: Math.ceil(inMemoryDB.motorcycles.length / limit)
  });
});

app.get('/api/admin/motorcycles/:id', mockAuthMiddleware, (req, res) => {
  const motorcycle = inMemoryDB.motorcycles.find(m => m._id === req.params.id);
  if (motorcycle) {
    res.json(motorcycle);
  } else {
    res.status(404).json({ message: 'Motorcycle not found' });
  }
});

app.post('/api/admin/motorcycles', mockAuthMiddleware, (req, res) => {
  const newMotorcycle = {
    _id: (inMemoryDB.motorcycles.length + 1).toString(),
    ...req.body,
    status: req.body.status || 'available'
  };
  inMemoryDB.motorcycles.push(newMotorcycle);
  res.json({ message: 'Motorcycle created successfully', motorcycle: newMotorcycle });
});

app.put('/api/admin/motorcycles/:id', mockAuthMiddleware, (req, res) => {
  const index = inMemoryDB.motorcycles.findIndex(m => m._id === req.params.id);
  if (index !== -1) {
    inMemoryDB.motorcycles[index] = { ...inMemoryDB.motorcycles[index], ...req.body };
    res.json({ message: 'Motorcycle updated successfully', motorcycle: inMemoryDB.motorcycles[index] });
  } else {
    res.status(404).json({ message: 'Motorcycle not found' });
  }
});

app.delete('/api/admin/motorcycles/:id', mockAuthMiddleware, (req, res) => {
  const index = inMemoryDB.motorcycles.findIndex(m => m._id === req.params.id);
  if (index !== -1) {
    inMemoryDB.motorcycles.splice(index, 1);
    res.json({ message: 'Motorcycle deleted successfully' });
  } else {
    res.status(404).json({ message: 'Motorcycle not found' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Using in-memory database for development');
}); 