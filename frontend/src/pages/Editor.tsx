import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { 
  Palette, 
  Move, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Moon, 
  Save, 
  Share2,
  Download,
  Settings,
  Layers,
  MousePointer,
  DollarSign,
  ShoppingCart,
  ExternalLink,
  Calculator,
  RefreshCw
} from 'lucide-react'
import { useMaterialContext } from '../context/MaterialContext'
import MaterialPreview from '../components/MaterialPreview'

const EditorContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: transparent;
`

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const EditorTitle = styled.h1`
  font-size: 2rem;
  background: linear-gradient(135deg, #00d4ff 0%, #7b68ee 50%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
`

const EditorContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
`

const CanvasArea = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ControlsPanel = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  height: fit-content;
`

const ControlSection = styled.div`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #ffffff;
  font-weight: 600;
`

// Additional styled components for interactive editor
const Toolbar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
`

const ToolButton = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.$active ? '#00d4ff' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 8px;
  padding: 0.75rem;
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

const CanvasControls = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const ZoomControls = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

const ZoomLevel = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  min-width: 60px;
  text-align: center;
`

const LightingToggle = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
`

const MaterialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
  margin-top: 1rem;
`

const MaterialCard = styled.div<{ $selected?: boolean }>`
  aspect-ratio: 1;
  background: ${props => props.$selected ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.$selected ? '#00d4ff' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: white;
  
  &:hover {
    border-color: #00d4ff;
    background: rgba(0, 212, 255, 0.1);
  }
`

const ColorPicker = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: transparent;
`

const FurnitureList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-top: 1rem;
`

const FurnitureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  margin-bottom: 0.5rem;
  cursor: grab;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:active {
    cursor: grabbing;
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`

const ActionButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }
`

const CostEstimatePanel = styled.div`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`

const CostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const CostTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const CostSummary = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
`

const CostRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-weight: 600;
    font-size: 1.1rem;
  }
`

const CostLabel = styled.span`
  color: rgba(255, 255, 255, 0.8);
`

const CostValue = styled.span`
  color: #00d4ff;
  font-weight: 600;
`

const MaterialCostsList = styled.div`
  margin-bottom: 1rem;
`

const MaterialCostItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 0.5rem;
`

const MaterialCostInfo = styled.div`
  flex: 1;
`

const MaterialCostName = styled.div`
  color: white;
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const MaterialCostDetails = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`

const MaterialCostActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const SupplierLink = styled.a`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 6px;
  padding: 0.5rem;
  color: #00d4ff;
  text-decoration: none;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 212, 255, 0.2);
    transform: translateY(-1px);
  }
`

const SwapMaterialButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
`

const RoomDimensionsDisplay = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`

const DimensionsTitle = styled.h4`
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const DimensionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`

const DimensionItem = styled.div`
  text-align: center;
`

const DimensionValue = styled.div`
  color: #00d4ff;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const DimensionLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
`

const Editor: React.FC = () => {
  const [activeTool, setActiveTool] = useState('select')
  const [zoomLevel, setZoomLevel] = useState(100)
  const [isDayMode, setIsDayMode] = useState(true)
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [selectedColor, setSelectedColor] = useState('#ffffff')
  const [costEstimate, setCostEstimate] = useState({
    materialCosts: [
      {
        materialId: '1',
        materialName: 'Premium Hardwood Flooring',
        quantity: 120,
        unitPrice: 8.50,
        totalCost: 1020.00,
        supplierUrl: 'https://example.com/hardwood',
        supplierName: 'Home Depot'
      },
      {
        materialId: '2',
        materialName: 'Ceramic Tile Collection',
        quantity: 80,
        unitPrice: 4.25,
        totalCost: 340.00,
        supplierUrl: 'https://example.com/tile',
        supplierName: 'Lowe\'s'
      }
    ],
    totalMaterialCost: 1360.00,
    laborEstimate: 544.00,
    totalProjectCost: 1904.00
  })
  const [roomDimensions, setRoomDimensions] = useState({
    length: 20,
    width: 15,
    height: 10,
    area: 300
  })
  const { state } = useMaterialContext()

  const materials = [
    'Wood', 'Tile', 'Paint', 'Brick', 'Stone', 'Metal',
    'Glass', 'Fabric', 'Leather', 'Marble', 'Concrete', 'Carpet'
  ]

  const furniture = [
    'Sofa', 'Dining Table', 'Bed', 'Bookshelf', 'Chair', 'Coffee Table',
    'TV Stand', 'Dresser', 'Desk', 'Lamp', 'Rug', 'Plant'
  ]

  const tools = [
    { id: 'select', icon: MousePointer, label: 'Select' },
    { id: 'move', icon: Move, label: 'Move' },
    { id: 'rotate', icon: RotateCw, label: 'Rotate' },
    { id: 'paint', icon: Palette, label: 'Paint' }
  ]

  return (
    <EditorContainer>
      <EditorHeader>
        <EditorTitle>🎨 Interactive Design Editor</EditorTitle>
        <ActionButtons>
          <ActionButton>
            <Save size={16} />
            Save Project
          </ActionButton>
          <ActionButton>
            <Share2 size={16} />
            Share
          </ActionButton>
          <ActionButton>
            <Download size={16} />
            Export
          </ActionButton>
        </ActionButtons>
      </EditorHeader>

      <Toolbar>
        {tools.map((tool) => (
          <ToolButton
            key={tool.id}
            $active={activeTool === tool.id}
            onClick={() => setActiveTool(tool.id)}
          >
            <tool.icon size={16} />
            {tool.label}
          </ToolButton>
        ))}
      </Toolbar>
      
      <EditorContent>
        <CanvasArea>
          <CanvasControls>
            <ZoomControls>
              <ToolButton onClick={() => setZoomLevel(Math.max(25, zoomLevel - 25))}>
                <ZoomOut size={16} />
              </ToolButton>
              <ZoomLevel>{zoomLevel}%</ZoomLevel>
              <ToolButton onClick={() => setZoomLevel(Math.min(400, zoomLevel + 25))}>
                <ZoomIn size={16} />
              </ToolButton>
            </ZoomControls>
            
            <LightingToggle>
              <ToolButton $active={isDayMode} onClick={() => setIsDayMode(true)}>
                <Sun size={16} />
                Day
              </ToolButton>
              <ToolButton $active={!isDayMode} onClick={() => setIsDayMode(false)}>
                <Moon size={16} />
                Night
              </ToolButton>
            </LightingToggle>
          </CanvasControls>
          
          <div style={{ 
            textAlign: 'center', 
            color: 'rgba(255, 255, 255, 0.7)',
            padding: '2rem',
            border: '2px dashed rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
            margin: '1rem 0'
          }}>
            <Layers size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3>Interactive Canvas</h3>
            <p>Your uploaded images and AI-generated variations will appear here</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Use the tools above to adjust dimensions, colors, and materials in real-time
            </p>
          </div>
        </CanvasArea>
        
        <ControlsPanel>
          {/* Cost Estimate Panel */}
          <CostEstimatePanel>
            <CostHeader>
              <CostTitle>
                <Calculator size={20} />
                Cost Estimate
              </CostTitle>
            </CostHeader>

            <RoomDimensionsDisplay>
              <DimensionsTitle>
                <Settings size={16} />
                Room Dimensions
              </DimensionsTitle>
              <DimensionsGrid>
                <DimensionItem>
                  <DimensionValue>{roomDimensions.length}ft</DimensionValue>
                  <DimensionLabel>Length</DimensionLabel>
                </DimensionItem>
                <DimensionItem>
                  <DimensionValue>{roomDimensions.width}ft</DimensionValue>
                  <DimensionLabel>Width</DimensionLabel>
                </DimensionItem>
                <DimensionItem>
                  <DimensionValue>{roomDimensions.area} sq ft</DimensionValue>
                  <DimensionLabel>Area</DimensionLabel>
                </DimensionItem>
              </DimensionsGrid>
            </RoomDimensionsDisplay>

            <CostSummary>
              <CostRow>
                <CostLabel>Materials</CostLabel>
                <CostValue>${costEstimate.totalMaterialCost.toFixed(2)}</CostValue>
              </CostRow>
              <CostRow>
                <CostLabel>Labor (40%)</CostLabel>
                <CostValue>${costEstimate.laborEstimate.toFixed(2)}</CostValue>
              </CostRow>
              <CostRow>
                <CostLabel>Total Project Cost</CostLabel>
                <CostValue>${costEstimate.totalProjectCost.toFixed(2)}</CostValue>
              </CostRow>
            </CostSummary>

            <MaterialCostsList>
              {costEstimate.materialCosts.map((material) => (
                <MaterialCostItem key={material.materialId}>
                  <MaterialCostInfo>
                    <MaterialCostName>{material.materialName}</MaterialCostName>
                    <MaterialCostDetails>
                      {material.quantity} units × ${material.unitPrice.toFixed(2)} = ${material.totalCost.toFixed(2)}
                    </MaterialCostDetails>
                  </MaterialCostInfo>
                  <MaterialCostActions>
                    <SupplierLink href={material.supplierUrl} target="_blank">
                      <ExternalLink size={12} />
                      Buy
                    </SupplierLink>
                    <SwapMaterialButton>
                      <RefreshCw size={12} />
                      Swap
                    </SwapMaterialButton>
                  </MaterialCostActions>
                </MaterialCostItem>
              ))}
            </MaterialCostsList>
          </CostEstimatePanel>

          <ControlSection>
            <SectionTitle>🎨 Materials</SectionTitle>
            <MaterialGrid>
              {materials.map((material) => (
                <MaterialCard
                  key={material}
                  $selected={selectedMaterial === material}
                  onClick={() => setSelectedMaterial(material)}
                >
                  {material}
                </MaterialCard>
              ))}
            </MaterialGrid>
          </ControlSection>
          
          <ControlSection>
            <SectionTitle>🌈 Colors</SectionTitle>
            <ColorPicker
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            />
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: selectedColor,
              borderRadius: '8px',
              textAlign: 'center',
              color: selectedColor === '#ffffff' ? '#000' : '#fff'
            }}>
              Selected Color
            </div>
          </ControlSection>
          
          <ControlSection>
            <SectionTitle>🪑 Furniture</SectionTitle>
            <FurnitureList>
              {furniture.map((item) => (
                <FurnitureItem key={item} draggable>
                  <Move size={14} />
                  {item}
                </FurnitureItem>
              ))}
            </FurnitureList>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.6)', 
              fontSize: '0.8rem',
              marginTop: '1rem'
            }}>
              Drag furniture items to the canvas to place them
            </p>
          </ControlSection>

          <ControlSection>
            <SectionTitle>⚙️ Settings</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                  Extension Width: 20ft
                </label>
                <input 
                  type="range" 
                  min="10" 
                  max="50" 
                  defaultValue="20"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                />
              </div>
              <div>
                <label style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                  Extension Height: 10ft
                </label>
                <input 
                  type="range" 
                  min="8" 
                  max="20" 
                  defaultValue="10"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                />
              </div>
            </div>
          </ControlSection>
        </ControlsPanel>
      </EditorContent>
    </EditorContainer>
  )
}

export default Editor
