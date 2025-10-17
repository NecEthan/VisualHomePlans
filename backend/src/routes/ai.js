import express from 'express';

const router = express.Router();

// Generate AI image variations
router.post('/generate', async (req, res) => {
  try {
    const { imagePath, modifications, style } = req.body;

    // TODO: Integrate with AI image generation service
    // This is a placeholder for the actual AI integration
    
    // Mock response for now
    const mockVariations = [
      {
        id: '1',
        imageUrl: '/api/mock-images/variation1.jpg',
        modifications: modifications,
        style: style,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        imageUrl: '/api/mock-images/variation2.jpg',
        modifications: modifications,
        style: style,
        createdAt: new Date().toISOString()
      }
    ];

    res.json({
      message: 'AI generation completed',
      variations: mockVariations
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available styles
router.get('/styles', (req, res) => {
  const styles = [
    { id: 'modern', name: 'Modern', description: 'Clean, minimalist design' },
    { id: 'traditional', name: 'Traditional', description: 'Classic, timeless style' },
    { id: 'industrial', name: 'Industrial', description: 'Raw, urban aesthetic' },
    { id: 'scandinavian', name: 'Scandinavian', description: 'Light, natural, cozy' },
    { id: 'bohemian', name: 'Bohemian', description: 'Eclectic, artistic style' }
  ];
  
  res.json(styles);
});

// Get available materials
router.get('/materials', (req, res) => {
  const materials = {
    flooring: [
      { id: 'hardwood', name: 'Hardwood', price: 8.50 },
      { id: 'tile', name: 'Ceramic Tile', price: 4.25 },
      { id: 'carpet', name: 'Carpet', price: 3.75 },
      { id: 'laminate', name: 'Laminate', price: 2.95 }
    ],
    walls: [
      { id: 'paint', name: 'Paint', price: 0.50 },
      { id: 'wallpaper', name: 'Wallpaper', price: 1.25 },
      { id: 'brick', name: 'Exposed Brick', price: 12.00 },
      { id: 'wood', name: 'Wood Paneling', price: 6.50 }
    ],
    roofing: [
      { id: 'shingles', name: 'Asphalt Shingles', price: 3.50 },
      { id: 'metal', name: 'Metal Roofing', price: 8.00 },
      { id: 'tile', name: 'Clay Tiles', price: 12.00 },
      { id: 'slate', name: 'Slate', price: 15.00 }
    ]
  };
  
  res.json(materials);
});

export default router;
