const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Motorcycle = require('../models/Motorcycle');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'motorcycle-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Apply auth middleware to all admin routes
router.use(auth);
router.use(requireRole(['admin', 'sales', 'manager']));

// Get all motorcycles (admin view)
router.get('/motorcycles', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search, 
      condition, 
      category,
      isAvailable,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {};

    // Apply filters
    if (search) {
      query.$text = { $search: search };
    }
    if (condition) query.condition = condition;
    if (category) query.category = category;
    if (isAvailable !== undefined) query.isAvailable = isAvailable === 'true';

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (Number(page) - 1) * Number(limit);

    const motorcycles = await Motorcycle.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .select('-__v');

    const total = await Motorcycle.countDocuments(query);

    res.json({
      motorcycles,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching motorcycles', error: error.message });
  }
});

// Create new motorcycle
router.post('/motorcycles', upload.array('images', 10), async (req, res) => {
  try {
    const motorcycleData = req.body;
    
    // Handle features array
    if (motorcycleData.features) {
      motorcycleData.features = motorcycleData.features.split(',').map(f => f.trim());
    }

    // Handle image uploads
    if (req.files && req.files.length > 0) {
      motorcycleData.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    const motorcycle = new Motorcycle(motorcycleData);
    await motorcycle.save();

    res.status(201).json({
      message: 'Motorcycle created successfully',
      motorcycle
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating motorcycle', error: error.message });
  }
});

// Get motorcycle by ID (admin view)
router.get('/motorcycles/:id', async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findById(req.params.id).select('-__v');
    
    if (!motorcycle) {
      return res.status(404).json({ message: 'Motorcycle not found' });
    }

    res.json(motorcycle);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching motorcycle', error: error.message });
  }
});

// Update motorcycle
router.put('/motorcycles/:id', upload.array('images', 10), async (req, res) => {
  try {
    const motorcycleData = req.body;
    
    // Handle features array
    if (motorcycleData.features) {
      motorcycleData.features = motorcycleData.features.split(',').map(f => f.trim());
    }

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      
      // If replacing all images
      if (motorcycleData.replaceImages === 'true') {
        motorcycleData.images = newImages;
      } else {
        // Add new images to existing ones
        const existingMotorcycle = await Motorcycle.findById(req.params.id);
        motorcycleData.images = [...(existingMotorcycle.images || []), ...newImages];
      }
    }

    const motorcycle = await Motorcycle.findByIdAndUpdate(
      req.params.id,
      motorcycleData,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!motorcycle) {
      return res.status(404).json({ message: 'Motorcycle not found' });
    }

    res.json({
      message: 'Motorcycle updated successfully',
      motorcycle
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating motorcycle', error: error.message });
  }
});

// Delete motorcycle
router.delete('/motorcycles/:id', async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findById(req.params.id);
    
    if (!motorcycle) {
      return res.status(404).json({ message: 'Motorcycle not found' });
    }

    // Delete associated images
    if (motorcycle.images && motorcycle.images.length > 0) {
      motorcycle.images.forEach(imagePath => {
        const fullPath = path.join(__dirname, '..', imagePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
    }

    await Motorcycle.findByIdAndDelete(req.params.id);

    res.json({ message: 'Motorcycle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting motorcycle', error: error.message });
  }
});

// Toggle motorcycle availability
router.patch('/motorcycles/:id/availability', async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findById(req.params.id);
    
    if (!motorcycle) {
      return res.status(404).json({ message: 'Motorcycle not found' });
    }

    motorcycle.isAvailable = !motorcycle.isAvailable;
    await motorcycle.save();

    res.json({
      message: `Motorcycle ${motorcycle.isAvailable ? 'made available' : 'made unavailable'}`,
      motorcycle
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating availability', error: error.message });
  }
});

// Toggle featured status
router.patch('/motorcycles/:id/featured', async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findById(req.params.id);
    
    if (!motorcycle) {
      return res.status(404).json({ message: 'Motorcycle not found' });
    }

    motorcycle.isFeatured = !motorcycle.isFeatured;
    await motorcycle.save();

    res.json({
      message: `Motorcycle ${motorcycle.isFeatured ? 'marked as featured' : 'unmarked as featured'}`,
      motorcycle
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating featured status', error: error.message });
  }
});

// Delete image from motorcycle
router.delete('/motorcycles/:id/images/:imageIndex', async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findById(req.params.id);
    
    if (!motorcycle) {
      return res.status(404).json({ message: 'Motorcycle not found' });
    }

    const imageIndex = parseInt(req.params.imageIndex);
    
    if (imageIndex < 0 || imageIndex >= motorcycle.images.length) {
      return res.status(400).json({ message: 'Invalid image index' });
    }

    // Delete the image file
    const imagePath = motorcycle.images[imageIndex];
    const fullPath = path.join(__dirname, '..', imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    // Remove from array
    motorcycle.images.splice(imageIndex, 1);
    await motorcycle.save();

    res.json({
      message: 'Image deleted successfully',
      motorcycle
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
});

// Get dashboard statistics
router.get('/dashboard/stats', async (req, res) => {
  try {
    const totalMotorcycles = await Motorcycle.countDocuments();
    const availableMotorcycles = await Motorcycle.countDocuments({ isAvailable: true });
    const newMotorcycles = await Motorcycle.countDocuments({ condition: 'New' });
    const usedMotorcycles = await Motorcycle.countDocuments({ condition: 'Used' });
    const featuredMotorcycles = await Motorcycle.countDocuments({ isFeatured: true });

    const recentMotorcycles = await Motorcycle.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('brand model year price condition createdAt');

    const brandStats = await Motorcycle.aggregate([
      { $group: { _id: '$brand', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const categoryStats = await Motorcycle.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      totalMotorcycles,
      availableMotorcycles,
      newMotorcycles,
      usedMotorcycles,
      featuredMotorcycles,
      recentMotorcycles,
      brandStats,
      categoryStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard statistics', error: error.message });
  }
});

module.exports = router; 