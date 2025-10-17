import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  originalImages: [{
    filename: String,
    originalName: String,
    path: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  roomDimensions: {
    length: Number,
    width: Number,
    height: Number,
    area: Number,
    unit: {
      type: String,
      enum: ['ft', 'meters'],
      default: 'ft'
    }
  },
  selectedMaterials: [{
    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material'
    },
    quantity: Number,
    appliedTo: {
      type: String,
      enum: ['flooring', 'walls', 'roofing', 'windows', 'doors', 'lighting', 'furniture']
    }
  }],
  modifications: {
    extensionSize: {
      width: Number,
      height: Number,
      depth: Number
    },
    materials: {
      flooring: String,
      walls: String,
      roofing: String
    },
    style: String,
    colors: {
      primary: String,
      secondary: String,
      accent: String
    },
    furniture: [{
      type: String,
      position: {
        x: Number,
        y: Number
      }
    }]
  },
  costEstimate: {
    materialCosts: [{
      materialId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material'
      },
      materialName: String,
      quantity: Number,
      unitPrice: Number,
      totalCost: Number,
      supplierUrl: String,
      supplierName: String
    }],
    totalMaterialCost: Number,
    laborEstimate: Number,
    totalProjectCost: Number,
    lastCalculated: Date
  },
  generatedVariations: [{
    id: String,
    imageUrl: String,
    modifications: mongoose.Schema.Types.Mixed,
    style: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'processing', 'completed', 'archived'],
    default: 'draft'
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  shareToken: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// Generate share token before saving
projectSchema.pre('save', function(next) {
  if (this.isPublic && !this.shareToken) {
    this.shareToken = Math.random().toString(36).substring(2, 15) + 
                     Math.random().toString(36).substring(2, 15);
  }
  next();
});

export default mongoose.model('Project', projectSchema);
