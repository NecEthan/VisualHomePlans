import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Upload as UploadIcon, Image as ImageIcon, Home, Palette, Settings, Zap, Ruler, Calculator, ShoppingCart, X } from 'lucide-react'
import { useMaterialContext } from '../context/MaterialContext'
import MaterialPreview from '../components/MaterialPreview'

const UploadContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: transparent;
`

const UploadSection = styled.section`
  margin-bottom: 3rem;
`

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00d4ff 0%, #7b68ee 50%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
`

const Dropzone = styled.div<{ $isDragActive: boolean }>`
  border: 2px dashed ${props => props.$isDragActive ? '#00d4ff' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  background: ${props => props.$isDragActive ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #00d4ff;
    background: rgba(0, 212, 255, 0.1);
    transform: translateY(-2px);
  }
`

const DropzoneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const UploadIconStyled = styled(UploadIcon)`
  width: 3rem;
  height: 3rem;
  color: #00d4ff;
`

const DropzoneText = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
`

const FileList = styled.div`
  margin-top: 2rem;
`

const FileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`

const ImagePreview = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`

const FileInfo = styled.div`
  flex: 1;
`

const FileName = styled.div`
  font-weight: 500;
  color: #333;
`

const FileSize = styled.div`
  font-size: 0.9rem;
  color: #666;
`

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #c82333;
  }
`

// Additional styled components for the comprehensive interface
const FormSection = styled.section`
  margin-bottom: 3rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  font-size: 0.9rem;
`

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
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

const Select = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #00d4ff;
    box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.2);
  }
  
  option {
    background: #1a1a2e;
    color: white;
  }
`

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  color: white;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #00d4ff;
    box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.2);
  }
`

const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`

const StyleCard = styled.div<{ $selected?: boolean }>`
  background: ${props => props.$selected ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  border: 2px solid ${props => props.$selected ? '#00d4ff' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #00d4ff;
    background: rgba(0, 212, 255, 0.1);
  }
`

const StyleName = styled.div`
  color: white;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const StyleDescription = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
`

const GenerateButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 2rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const TabContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
`

const TabHeader = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const TabButton = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? 'rgba(0, 212, 255, 0.2)' : 'transparent'};
  border: none;
  border-bottom: 2px solid ${props => props.$active ? '#00d4ff' : 'transparent'};
  color: ${props => props.$active ? '#00d4ff' : 'rgba(255, 255, 255, 0.7)'};
  padding: 1rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #00d4ff;
    background: rgba(0, 212, 255, 0.1);
  }
`

const TabContent = styled.div`
  min-height: 200px;
`

const SelectedMaterialsSection = styled.div`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`

const SelectedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const SelectedTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const SelectedMaterialsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

const RoomDimensionsSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
`

const DimensionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`

const DimensionInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const DimensionLabel = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const DimensionInputField = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

const NumberInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  color: white;
  font-size: 1rem;
  flex: 1;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #00d4ff;
    box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.2);
  }
`

const UnitSelect = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  color: white;
  font-size: 1rem;
  min-width: 80px;
  
  &:focus {
    outline: none;
    border-color: #00d4ff;
    box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.2);
  }
  
  option {
    background: #1a1a2e;
    color: white;
  }
`

const AreaDisplay = styled.div`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  margin-top: 1rem;
`

const AreaValue = styled.div`
  color: #00d4ff;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const AreaLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`

const GenerationOptions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`

const OptionButton = styled.button<{ $primary?: boolean }>`
  background: ${props => props.$primary 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.$primary 
    ? 'transparent' 
    : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 12px;
  padding: 1rem 1.5rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const Upload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([])
  const [selectedStyle, setSelectedStyle] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'describe' | 'materials'>('describe')
  const [roomDimensions, setRoomDimensions] = useState({
    length: '',
    width: '',
    height: '',
    unit: 'ft'
  })
  const [formData, setFormData] = useState({
    projectName: '',
    roomType: '',
    extensionSize: '',
    wallMaterial: '',
    floorMaterial: '',
    roofType: '',
    windowType: '',
    furniture: '',
    lighting: '',
    additionalNotes: ''
  })
  const { state, removeMaterial } = useMaterialContext()

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles])
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const calculateArea = () => {
    const length = parseFloat(roomDimensions.length) || 0
    const width = parseFloat(roomDimensions.width) || 0
    const area = length * width
    
    if (roomDimensions.unit === 'meters') {
      return area * 10.764 // Convert to sq ft
    }
    return area
  }

  const handleDimensionChange = (field: string, value: string) => {
    setRoomDimensions(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGenerate = () => {
    const area = calculateArea()
    const generationData = {
      files,
      formData,
      selectedStyle,
      selectedMaterials: state.selectedMaterials,
      roomDimensions: {
        ...roomDimensions,
        area
      }
    }
    
    console.log('Generating with:', generationData)
    // TODO: Implement AI generation with materials and dimensions
  }

  const styles = [
    { id: 'modern', name: 'Modern', description: 'Clean, minimalist design' },
    { id: 'traditional', name: 'Traditional', description: 'Classic, timeless style' },
    { id: 'industrial', name: 'Industrial', description: 'Raw, urban aesthetic' },
    { id: 'scandinavian', name: 'Scandinavian', description: 'Light, natural, cozy' },
    { id: 'bohemian', name: 'Bohemian', description: 'Eclectic, artistic style' },
    { id: 'farmhouse', name: 'Farmhouse', description: 'Rustic, country charm' }
  ]

  return (
    <UploadContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Photo Upload Section */}
        <UploadSection>
          <SectionTitle>📸 Upload Your Home Photos</SectionTitle>
          <Dropzone {...getRootProps()} $isDragActive={isDragActive}>
            <input {...getInputProps()} />
            <DropzoneContent>
              <UploadIconStyled />
              <div>
                <DropzoneText>
                  {isDragActive
                    ? 'Drop your images here...'
                    : 'Drag & drop your home photos here, or click to select files'
                  }
                </DropzoneText>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '0.5rem' }}>
                  Supports: JPEG, PNG, GIF, WebP (max 10MB each)
                </div>
              </div>
            </DropzoneContent>
          </Dropzone>

          {files.length > 0 && (
            <FileList>
              <h3 style={{ color: 'white', marginBottom: '1rem' }}>Selected Files ({files.length})</h3>
              {files.map((file, index) => (
                <FileItem key={index}>
                  <ImageIcon size={24} color="#00d4ff" />
                  <FileInfo>
                    <FileName>{file.name}</FileName>
                    <FileSize>{(file.size / 1024 / 1024).toFixed(2)} MB</FileSize>
                  </FileInfo>
                  <RemoveButton onClick={() => removeFile(index)}>
                    Remove
                  </RemoveButton>
                </FileItem>
              ))}
            </FileList>
          )}
        </UploadSection>

        {/* Selected Materials Section */}
        {state.selectedMaterials.length > 0 && (
          <SelectedMaterialsSection>
            <SelectedHeader>
              <SelectedTitle>
                <ShoppingCart size={20} />
                Selected Materials ({state.selectedMaterials.length})
              </SelectedTitle>
            </SelectedHeader>
            <SelectedMaterialsList>
              {state.selectedMaterials.map((material) => (
                <MaterialPreview
                  key={`${material._id}-${material.appliedTo}`}
                  material={material}
                  onRemove={removeMaterial}
                  showCalculator={true}
                  showQuantity={true}
                  isSelected={true}
                />
              ))}
            </SelectedMaterialsList>
          </SelectedMaterialsSection>
        )}

        {/* Room Dimensions Section */}
        <RoomDimensionsSection>
          <SectionTitle>📏 Room Dimensions</SectionTitle>
          <DimensionsGrid>
            <DimensionInput>
              <DimensionLabel>
                <Ruler size={16} />
                Length
              </DimensionLabel>
              <DimensionInputField>
                <NumberInput
                  type="number"
                  value={roomDimensions.length}
                  onChange={(e) => handleDimensionChange('length', e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.1"
                />
                <UnitSelect
                  value={roomDimensions.unit}
                  onChange={(e) => handleDimensionChange('unit', e.target.value)}
                >
                  <option value="ft">ft</option>
                  <option value="meters">m</option>
                </UnitSelect>
              </DimensionInputField>
            </DimensionInput>

            <DimensionInput>
              <DimensionLabel>
                <Ruler size={16} />
                Width
              </DimensionLabel>
              <DimensionInputField>
                <NumberInput
                  type="number"
                  value={roomDimensions.width}
                  onChange={(e) => handleDimensionChange('width', e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.1"
                />
                <UnitSelect
                  value={roomDimensions.unit}
                  onChange={(e) => handleDimensionChange('unit', e.target.value)}
                >
                  <option value="ft">ft</option>
                  <option value="meters">m</option>
                </UnitSelect>
              </DimensionInputField>
            </DimensionInput>

            <DimensionInput>
              <DimensionLabel>
                <Ruler size={16} />
                Height
              </DimensionLabel>
              <DimensionInputField>
                <NumberInput
                  type="number"
                  value={roomDimensions.height}
                  onChange={(e) => handleDimensionChange('height', e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.1"
                />
                <UnitSelect
                  value={roomDimensions.unit}
                  onChange={(e) => handleDimensionChange('unit', e.target.value)}
                >
                  <option value="ft">ft</option>
                  <option value="meters">m</option>
                </UnitSelect>
              </DimensionInputField>
            </DimensionInput>
          </DimensionsGrid>

          {calculateArea() > 0 && (
            <AreaDisplay>
              <AreaValue>{calculateArea().toFixed(1)} sq ft</AreaValue>
              <AreaLabel>Total Area</AreaLabel>
            </AreaDisplay>
          )}
        </RoomDimensionsSection>

        {/* Tab Interface */}
        <TabContainer>
          <TabHeader>
            <TabButton
              $active={activeTab === 'describe'}
              onClick={() => setActiveTab('describe')}
            >
              <Palette size={16} />
              Describe Your Vision
            </TabButton>
            <TabButton
              $active={activeTab === 'materials'}
              onClick={() => setActiveTab('materials')}
            >
              <ShoppingCart size={16} />
              Apply Specific Material
            </TabButton>
          </TabHeader>

          <TabContent>
            {activeTab === 'describe' && (
              <div>
                <FormGroup>
                  <Label>What changes do you want to make?</Label>
                  <TextArea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    placeholder="Describe your vision... (e.g., 'Add a modern kitchen island with marble countertops and pendant lighting')"
                  />
                </FormGroup>
              </div>
            )}

            {activeTab === 'materials' && (
              <div>
                {state.selectedMaterials.length > 0 ? (
                  <div>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem' }}>
                      Selected materials will be applied to your design:
                    </p>
                    <SelectedMaterialsList>
                      {state.selectedMaterials.map((material) => (
                        <MaterialPreview
                          key={`${material._id}-${material.appliedTo}`}
                          material={material}
                          onRemove={removeMaterial}
                          showCalculator={true}
                          isSelected={true}
                        />
                      ))}
                    </SelectedMaterialsList>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <ShoppingCart size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1rem' }}>
                      No materials selected yet
                    </p>
                    <button
                      onClick={() => window.location.href = '/materials'}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.75rem 1.5rem',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Browse Materials
                    </button>
                  </div>
                )}
              </div>
            )}
          </TabContent>
        </TabContainer>

        {/* Project Details */}
        <FormSection>
          <SectionTitle>🏠 Project Details</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>Project Name</Label>
              <Input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                placeholder="e.g., Living Room Redesign"
              />
            </FormGroup>
            <FormGroup>
              <Label>Room Type</Label>
              <Select name="roomType" value={formData.roomType} onChange={handleInputChange}>
                <option value="">Select room type</option>
                <option value="living-room">Living Room</option>
                <option value="kitchen">Kitchen</option>
                <option value="bedroom">Bedroom</option>
                <option value="bathroom">Bathroom</option>
                <option value="dining-room">Dining Room</option>
                <option value="home-office">Home Office</option>
                <option value="exterior">Exterior</option>
                <option value="other">Other</option>
              </Select>
            </FormGroup>
          </FormGrid>
        </FormSection>

        {/* Extension & Structure */}
        <FormSection>
          <SectionTitle>🔨 Extension & Structure</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>Extension Size (if applicable)</Label>
              <Input
                type="text"
                name="extensionSize"
                value={formData.extensionSize}
                onChange={handleInputChange}
                placeholder="e.g., 20x15 feet"
              />
            </FormGroup>
            <FormGroup>
              <Label>Wall Material</Label>
              <Select name="wallMaterial" value={formData.wallMaterial} onChange={handleInputChange}>
                <option value="">Select wall material</option>
                <option value="paint">Paint</option>
                <option value="wallpaper">Wallpaper</option>
                <option value="brick">Brick</option>
                <option value="wood-paneling">Wood Paneling</option>
                <option value="stone">Stone</option>
                <option value="tile">Tile</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Floor Material</Label>
              <Select name="floorMaterial" value={formData.floorMaterial} onChange={handleInputChange}>
                <option value="">Select floor material</option>
                <option value="hardwood">Hardwood</option>
                <option value="tile">Tile</option>
                <option value="carpet">Carpet</option>
                <option value="laminate">Laminate</option>
                <option value="concrete">Concrete</option>
                <option value="marble">Marble</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Roof Type (exterior only)</Label>
              <Select name="roofType" value={formData.roofType} onChange={handleInputChange}>
                <option value="">Select roof type</option>
                <option value="shingles">Asphalt Shingles</option>
                <option value="metal">Metal Roofing</option>
                <option value="tile">Clay Tiles</option>
                <option value="slate">Slate</option>
                <option value="flat">Flat Roof</option>
              </Select>
            </FormGroup>
          </FormGrid>
        </FormSection>

        {/* Windows & Lighting */}
        <FormSection>
          <SectionTitle>🪟 Windows & Lighting</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>Window Type</Label>
              <Select name="windowType" value={formData.windowType} onChange={handleInputChange}>
                <option value="">Select window type</option>
                <option value="double-hung">Double Hung</option>
                <option value="casement">Casement</option>
                <option value="bay">Bay Window</option>
                <option value="picture">Picture Window</option>
                <option value="sliding">Sliding</option>
                <option value="skylight">Skylight</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Lighting Style</Label>
              <Select name="lighting" value={formData.lighting} onChange={handleInputChange}>
                <option value="">Select lighting style</option>
                <option value="recessed">Recessed Lighting</option>
                <option value="pendant">Pendant Lights</option>
                <option value="chandelier">Chandelier</option>
                <option value="track">Track Lighting</option>
                <option value="natural">Natural Light Focus</option>
                <option value="ambient">Ambient Lighting</option>
              </Select>
            </FormGroup>
          </FormGrid>
        </FormSection>

        {/* Furniture & Decor */}
        <FormSection>
          <SectionTitle>🪑 Furniture & Decor</SectionTitle>
          <FormGroup>
            <Label>Furniture Requirements</Label>
            <TextArea
              name="furniture"
              value={formData.furniture}
              onChange={handleInputChange}
              placeholder="Describe the furniture you want to include (e.g., sectional sofa, dining table, bookshelf, etc.)"
            />
          </FormGroup>
        </FormSection>

        {/* Style Selection */}
        <FormSection>
          <SectionTitle>🎨 Design Style</SectionTitle>
          <StyleGrid>
            {styles.map((style) => (
              <StyleCard
                key={style.id}
                $selected={selectedStyle === style.id}
                onClick={() => setSelectedStyle(style.id)}
              >
                <StyleName>{style.name}</StyleName>
                <StyleDescription>{style.description}</StyleDescription>
              </StyleCard>
            ))}
          </StyleGrid>
        </FormSection>

        {/* Additional Notes */}
        <FormSection>
          <SectionTitle>📝 Additional Notes</SectionTitle>
          <FormGroup>
            <TextArea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              placeholder="Any specific requirements, preferences, or ideas you'd like to share..."
            />
          </FormGroup>
        </FormSection>

        {/* Generation Options */}
        <GenerationOptions>
          {state.selectedMaterials.length > 0 && (
            <OptionButton $primary onClick={handleGenerate} disabled={files.length === 0}>
              <Zap size={20} />
              Generate with {state.selectedMaterials.length} Material{state.selectedMaterials.length > 1 ? 's' : ''}
            </OptionButton>
          )}
          <OptionButton onClick={handleGenerate} disabled={files.length === 0}>
            <Palette size={20} />
            Generate from Description
          </OptionButton>
        </GenerationOptions>
      </motion.div>
    </UploadContainer>
  )
}

export default Upload
