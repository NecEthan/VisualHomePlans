import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  ExternalLink, 
  Star,
  DollarSign,
  Package,
  Truck
} from 'lucide-react'

const MaterialsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: transparent;
`

const MaterialsHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`

const MaterialsTitle = styled.h1`
  font-size: 2.5rem;
  background: linear-gradient(135deg, #00d4ff 0%, #7b68ee 50%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  margin-bottom: 1rem;
`

const MaterialsSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`

const SearchSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 3rem;
`

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`

const SearchInput = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  color: white;
  font-size: 1rem;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #00d4ff;
    box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.2);
  }
`

const FilterButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(0, 212, 255, 0.1);
    border-color: #00d4ff;
  }
`

const CategoryTabs = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const CategoryTab = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.$active ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    background: rgba(0, 212, 255, 0.1);
    border-color: #00d4ff;
  }
`

const MaterialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`

const MaterialCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(0, 212, 255, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`

const MaterialImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
`

const MaterialInfo = styled.div`
  padding: 1.5rem;
`

const MaterialName = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const MaterialDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`

const MaterialMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const Price = styled.div`
  color: #00d4ff;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`

const MaterialActions = styled.div`
  display: flex;
  gap: 0.75rem;
`

const ActionButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }
`

const SupplierButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(0, 212, 255, 0.1);
    border-color: #00d4ff;
  }
`

const Materials: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    'all', 'flooring', 'walls', 'roofing', 'windows', 'doors', 'lighting', 'furniture'
  ]

  const materials = [
    {
      id: 1,
      name: 'Premium Hardwood Flooring',
      category: 'flooring',
      description: 'Oak hardwood flooring with natural grain patterns',
      price: 8.50,
      rating: 4.8,
      supplier: 'Home Depot',
      image: 'Hardwood'
    },
    {
      id: 2,
      name: 'Ceramic Tile Collection',
      category: 'flooring',
      description: 'Durable ceramic tiles in various patterns and colors',
      price: 4.25,
      rating: 4.6,
      supplier: 'Lowe\'s',
      image: 'Ceramic'
    },
    {
      id: 3,
      name: 'Premium Paint Set',
      category: 'walls',
      description: 'High-quality interior paint with excellent coverage',
      price: 45.00,
      rating: 4.7,
      supplier: 'Sherwin Williams',
      image: 'Paint'
    },
    {
      id: 4,
      name: 'Asphalt Shingles',
      category: 'roofing',
      description: 'Weather-resistant asphalt shingles with 30-year warranty',
      price: 3.50,
      rating: 4.5,
      supplier: 'GAF',
      image: 'Shingles'
    },
    {
      id: 5,
      name: 'Energy Efficient Windows',
      category: 'windows',
      description: 'Double-pane windows with low-E coating',
      price: 350.00,
      rating: 4.9,
      supplier: 'Andersen',
      image: 'Windows'
    },
    {
      id: 6,
      name: 'Modern Pendant Lights',
      category: 'lighting',
      description: 'Contemporary pendant lights with LED bulbs',
      price: 125.00,
      rating: 4.4,
      supplier: 'West Elm',
      image: 'Lighting'
    }
  ]

  const filteredMaterials = materials.filter(material => {
    const matchesCategory = activeCategory === 'all' || material.category === activeCategory
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <MaterialsContainer>
      <MaterialsHeader>
        <MaterialsTitle>🏗️ Material Catalog</MaterialsTitle>
        <MaterialsSubtitle>
          Browse real-world materials and connect with suppliers for your home redesign project
        </MaterialsSubtitle>
      </MaterialsHeader>

      <SearchSection>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search materials, suppliers, or brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterButton>
            <Filter size={20} />
            Filters
          </FilterButton>
        </SearchBar>

        <CategoryTabs>
          {categories.map((category) => (
            <CategoryTab
              key={category}
              $active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </CategoryTab>
          ))}
        </CategoryTabs>
      </SearchSection>

      <MaterialsGrid>
        {filteredMaterials.map((material, index) => (
          <MaterialCard
            key={material.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <MaterialImage>
              {material.image}
            </MaterialImage>
            <MaterialInfo>
              <MaterialName>{material.name}</MaterialName>
              <MaterialDescription>{material.description}</MaterialDescription>
              <MaterialMeta>
                <Price>
                  <DollarSign size={16} />
                  {material.price}/sq ft
                </Price>
                <Rating>
                  <Star size={16} fill="currentColor" />
                  {material.rating}
                </Rating>
              </MaterialMeta>
              <MaterialActions>
                <ActionButton>
                  <ShoppingCart size={16} />
                  Add to Cart
                </ActionButton>
                <SupplierButton>
                  <ExternalLink size={16} />
                </SupplierButton>
              </MaterialActions>
            </MaterialInfo>
          </MaterialCard>
        ))}
      </MaterialsGrid>
    </MaterialsContainer>
  )
}

export default Materials
