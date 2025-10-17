import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  ExternalLink, 
  Star, 
  DollarSign, 
  Package,
  X,
  Plus,
  Minus
} from 'lucide-react'

const PreviewContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(0, 212, 255, 0.3);
    transform: translateY(-2px);
  }
`

const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`

const MaterialInfo = styled.div`
  flex: 1;
`

const MaterialName = styled.h3`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const MaterialCategory = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
`

const MaterialImage = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  margin-left: 1rem;
  flex-shrink: 0;
`

const MaterialMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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

const SupplierInfo = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`

const CostCalculator = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`

const CalculatorTitle = styled.h4`
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`

const CalculatorInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.5rem;
  color: white;
  font-size: 0.9rem;
  width: 80px;
  
  &:focus {
    outline: none;
    border-color: #00d4ff;
  }
`

const UnitLabel = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`

const CostResult = styled.div`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
`

const CostAmount = styled.div`
  color: #00d4ff;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const CostDetails = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
`

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const QuantityButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 0.25rem;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  
  &:hover {
    background: rgba(0, 212, 255, 0.1);
    border-color: #00d4ff;
  }
`

const QuantityInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 0.25rem;
  color: white;
  text-align: center;
  width: 50px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #00d4ff;
  }
`

const ActionButtons = styled.div`
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
  font-size: 0.9rem;
  
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

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  
  &:hover {
    color: #ff6b6b;
    background: rgba(255, 107, 107, 0.1);
  }
`

interface MaterialPreviewProps {
  material: {
    _id: string
    name: string
    description: string
    category: string
    price: number
    unit: string
    supplierName: string
    supplierUrl: string
    imageUrl: string
    rating: number
    inStock: boolean
    appliedTo?: string
    quantity?: number
  }
  onAddToProject?: (material: any, appliedTo: string) => void
  onRemove?: (materialId: string) => void
  onUpdateQuantity?: (materialId: string, quantity: number) => void
  showCalculator?: boolean
  showQuantity?: boolean
  isSelected?: boolean
}

const MaterialPreview: React.FC<MaterialPreviewProps> = ({
  material,
  onAddToProject,
  onRemove,
  onUpdateQuantity,
  showCalculator = false,
  showQuantity = false,
  isSelected = false
}) => {
  const [area, setArea] = useState(100)
  const [quantity, setQuantity] = useState(material.quantity || 1)

  const calculateCost = () => {
    const wasteFactor = 0.1 // 10% waste
    const totalArea = area * (1 + wasteFactor)
    const unitsNeeded = Math.ceil(totalArea / 1) // Assuming 1 sq ft per unit
    return {
      unitsNeeded,
      totalCost: unitsNeeded * material.price,
      wasteArea: area * wasteFactor
    }
  }

  const costCalculation = calculateCost()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
    onUpdateQuantity?.(material._id, newQuantity)
  }

  const handleAddToProject = () => {
    if (onAddToProject) {
      onAddToProject(material, material.appliedTo || 'flooring')
    }
  }

  return (
    <PreviewContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PreviewHeader>
        <MaterialInfo>
          <MaterialName>{material.name}</MaterialName>
          <MaterialCategory>{material.category}</MaterialCategory>
          <MaterialMeta>
            <Price>
              <DollarSign size={14} />
              {material.price}/{material.unit}
            </Price>
            <Rating>
              <Star size={14} fill="currentColor" />
              {material.rating}
            </Rating>
          </MaterialMeta>
          <SupplierInfo>
            <Package size={12} style={{ marginRight: '0.25rem' }} />
            {material.supplierName}
          </SupplierInfo>
        </MaterialInfo>
        <MaterialImage>
          {material.name.charAt(0)}
        </MaterialImage>
        {onRemove && (
          <RemoveButton onClick={() => onRemove(material._id)}>
            <X size={16} />
          </RemoveButton>
        )}
      </PreviewHeader>

      {showCalculator && (
        <CostCalculator>
          <CalculatorTitle>Cost Calculator</CalculatorTitle>
          <CalculatorInput>
            <Input
              type="number"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              min="1"
            />
            <UnitLabel>sq ft</UnitLabel>
          </CalculatorInput>
          <CostResult>
            <CostAmount>${costCalculation.totalCost.toFixed(2)}</CostAmount>
            <CostDetails>
              {costCalculation.unitsNeeded} units needed
              <br />
              (includes {costCalculation.wasteArea.toFixed(1)} sq ft waste)
            </CostDetails>
          </CostResult>
        </CostCalculator>
      )}

      {showQuantity && (
        <QuantitySelector>
          <QuantityButton onClick={() => handleQuantityChange(quantity - 1)}>
            <Minus size={12} />
          </QuantityButton>
          <QuantityInput
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            min="1"
          />
          <QuantityButton onClick={() => handleQuantityChange(quantity + 1)}>
            <Plus size={12} />
          </QuantityButton>
        </QuantitySelector>
      )}

      <ActionButtons>
        {onAddToProject && (
          <ActionButton onClick={handleAddToProject}>
            <ShoppingCart size={16} />
            {isSelected ? 'Update Project' : 'Use in Project'}
          </ActionButton>
        )}
        <SupplierButton
          onClick={() => window.open(material.supplierUrl, '_blank')}
        >
          <ExternalLink size={16} />
        </SupplierButton>
      </ActionButtons>
    </PreviewContainer>
  )
}

export default MaterialPreview
