const mongoose = require('mongoose');

const motorcycleSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  category: {
    type: String,
    required: true,
    enum: ['Sport', 'Cruiser', 'Touring', 'Adventure', 'Naked', 'Scooter', 'Dual-Sport', 'Custom']
  },
  condition: {
    type: String,
    required: true,
    enum: ['New', 'Used', 'Certified Pre-Owned']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  mileage: {
    type: Number,
    required: true,
    min: 0
  },
  engineSize: {
    type: Number,
    required: true,
    min: 0
  },
  fuelType: {
    type: String,
    required: true,
    enum: ['Gasoline', 'Electric', 'Hybrid']
  },
  transmission: {
    type: String,
    required: true,
    enum: ['Manual', 'Automatic', 'CVT']
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  vin: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  features: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String,
    required: true
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  contactInfo: {
    phone: String,
    email: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search functionality
motorcycleSchema.index({ brand: 'text', model: 'text', description: 'text' });

// Pre-save middleware to update the updatedAt field
motorcycleSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Motorcycle', motorcycleSchema); 