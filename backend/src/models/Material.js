import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['flooring', 'walls', 'roofing', 'windows', 'doors', 'lighting', 'furniture', 'paint', 'tile', 'hardware'],
    index: true
  },
  subcategory: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true,
    enum: ['sq ft', 'sq meter', 'linear ft', 'each', 'gallon', 'box', 'roll'],
    default: 'sq ft'
  },
  supplierName: {
    type: String,
    required: true,
    trim: true
  },
  supplierUrl: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  thumbnailUrl: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 0
  },
  specifications: {
    color: String,
    finish: String,
    material: String,
    dimensions: String,
    weight: String,
    warranty: String
  },
  coverage: {
    // How much area one unit covers
    areaPerUnit: {
      type: Number,
      required: true
    },
    // Waste factor (e.g., 0.1 = 10% waste)
    wasteFactor: {
      type: Number,
      default: 0.1,
      min: 0,
      max: 1
    }
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient searching
materialSchema.index({ category: 1, inStock: 1, price: 1 });
materialSchema.index({ name: 'text', description: 'text' });

// Virtual for calculating total cost based on area
materialSchema.virtual('costPerSqFt').get(function() {
  if (this.unit === 'sq ft') {
    return this.price;
  } else if (this.unit === 'sq meter') {
    return this.price * 0.092903; // Convert sq meter to sq ft
  }
  return this.price;
});

// Method to calculate cost for given area
materialSchema.methods.calculateCost = function(area) {
  const areaPerUnit = this.coverage.areaPerUnit;
  const wasteFactor = this.coverage.wasteFactor;
  const totalArea = area * (1 + wasteFactor);
  const unitsNeeded = Math.ceil(totalArea / areaPerUnit);
  return {
    unitsNeeded,
    totalCost: unitsNeeded * this.price,
    wasteArea: area * wasteFactor,
    effectiveArea: area
  };
};

export default mongoose.model('Material', materialSchema);
