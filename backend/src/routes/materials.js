import express from 'express';
import Material from '../models/Material.js';

const router = express.Router();

// Get all materials with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      inStock,
      supplier,
      search,
      page = 1,
      limit = 20,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    
    if (inStock === 'true') {
      filter.inStock = true;
    }
    
    if (supplier) {
      filter.supplierName = new RegExp(supplier, 'i');
    }
    
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const materials = await Material.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Material.countDocuments(filter);

    res.json({
      materials,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single material by ID
router.get('/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    
    res.json(material);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Calculate cost for materials based on room dimensions
router.post('/calculate-cost', async (req, res) => {
  try {
    const { roomDimensions, materialIds } = req.body;
    
    if (!roomDimensions || !materialIds || materialIds.length === 0) {
      return res.status(400).json({ error: 'Room dimensions and material IDs are required' });
    }

    const { length, width, height, unit = 'ft' } = roomDimensions;
    const area = length * width;
    
    // Convert to square feet if needed
    const areaInSqFt = unit === 'meters' ? area * 10.764 : area;

    const materials = await Material.find({ 
      _id: { $in: materialIds },
      isActive: true,
      inStock: true 
    });

    const costBreakdown = materials.map(material => {
      const costCalculation = material.calculateCost(areaInSqFt);
      
      return {
        materialId: material._id,
        materialName: material.name,
        category: material.category,
        unitPrice: material.price,
        quantity: costCalculation.unitsNeeded,
        totalCost: costCalculation.totalCost,
        supplierName: material.supplierName,
        supplierUrl: material.supplierUrl,
        coverage: {
          areaNeeded: areaInSqFt,
          wasteArea: costCalculation.wasteArea,
          unitsNeeded: costCalculation.unitsNeeded
        }
      };
    });

    const totalMaterialCost = costBreakdown.reduce((sum, item) => sum + item.totalCost, 0);
    
    // Estimate labor cost (roughly 30-50% of material cost)
    const laborEstimate = totalMaterialCost * 0.4;
    const totalProjectCost = totalMaterialCost + laborEstimate;

    res.json({
      roomDimensions: {
        length,
        width,
        height,
        area: areaInSqFt,
        unit: 'sq ft'
      },
      materials: costBreakdown,
      costSummary: {
        totalMaterialCost,
        laborEstimate,
        totalProjectCost,
        calculatedAt: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get material categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Material.distinct('category', { isActive: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get suppliers list
router.get('/suppliers/list', async (req, res) => {
  try {
    const suppliers = await Material.distinct('supplierName', { isActive: true });
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
