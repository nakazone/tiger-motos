const express = require('express');
const Motorcycle = require('../models/Motorcycle');

const router = express.Router();

// Get all motorcycles (public)
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      brand, 
      category, 
      condition, 
      minPrice, 
      maxPrice, 
      minYear, 
      maxYear,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = { isAvailable: true };

    // Apply filters
    if (brand) query.brand = { $regex: brand, $options: 'i' };
    if (category) query.category = category;
    if (condition) query.condition = condition;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (minYear || maxYear) {
      query.year = {};
      if (minYear) query.year.$gte = Number(minYear);
      if (maxYear) query.year.$lte = Number(maxYear);
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Sorting
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

// Get featured motorcycles
router.get('/featured', async (req, res) => {
  try {
    const motorcycles = await Motorcycle.find({ 
      isAvailable: true, 
      isFeatured: true 
    })
    .sort({ createdAt: -1 })
    .limit(6)
    .select('-__v');

    res.json(motorcycles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching featured motorcycles', error: error.message });
  }
});

// Get motorcycle by ID (public)
router.get('/:id', async (req, res) => {
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

// Get motorcycles by brand
router.get('/brand/:brand', async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const motorcycles = await Motorcycle.find({
      brand: { $regex: req.params.brand, $options: 'i' },
      isAvailable: true
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .select('-__v');

    const total = await Motorcycle.countDocuments({
      brand: { $regex: req.params.brand, $options: 'i' },
      isAvailable: true
    });

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
    res.status(500).json({ message: 'Error fetching motorcycles by brand', error: error.message });
  }
});

// Get motorcycles by category
router.get('/category/:category', async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const motorcycles = await Motorcycle.find({
      category: req.params.category,
      isAvailable: true
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
    .select('-__v');

    const total = await Motorcycle.countDocuments({
      category: req.params.category,
      isAvailable: true
    });

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
    res.status(500).json({ message: 'Error fetching motorcycles by category', error: error.message });
  }
});

// Get search suggestions
router.get('/search/suggestions', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.json([]);
    }

    const suggestions = await Motorcycle.aggregate([
      {
        $match: {
          $or: [
            { brand: { $regex: q, $options: 'i' } },
            { model: { $regex: q, $options: 'i' } }
          ],
          isAvailable: true
        }
      },
      {
        $group: {
          _id: '$brand',
          models: { $addToSet: '$model' }
        }
      },
      {
        $project: {
          brand: '$_id',
          models: { $slice: ['$models', 5] }
        }
      },
      { $limit: 10 }
    ]);

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching search suggestions', error: error.message });
  }
});

// Get statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalMotorcycles = await Motorcycle.countDocuments({ isAvailable: true });
    const newMotorcycles = await Motorcycle.countDocuments({ condition: 'New', isAvailable: true });
    const usedMotorcycles = await Motorcycle.countDocuments({ condition: 'Used', isAvailable: true });
    const featuredMotorcycles = await Motorcycle.countDocuments({ isFeatured: true, isAvailable: true });

    const brands = await Motorcycle.aggregate([
      { $match: { isAvailable: true } },
      { $group: { _id: '$brand', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const categories = await Motorcycle.aggregate([
      { $match: { isAvailable: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      totalMotorcycles,
      newMotorcycles,
      usedMotorcycles,
      featuredMotorcycles,
      brands,
      categories
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

module.exports = router; 