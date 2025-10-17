import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const ProjectContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: transparent;
`

const ProjectHeader = styled.div`
  margin-bottom: 2rem;
`

const ProjectTitle = styled.h1`
  font-size: 2rem;
  background: linear-gradient(135deg, #00d4ff 0%, #7b68ee 50%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
`

const VariationsSection = styled.section`
  margin-bottom: 3rem;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00d4ff 0%, #7b68ee 50%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
`

const VariationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`

const VariationCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    border-color: rgba(0, 212, 255, 0.3);
  }
`

const VariationImage = styled.div`
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
`

const VariationInfo = styled.div`
  padding: 1rem;
`

const VariationName = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
  font-weight: 600;
`

const VariationMeta = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
`

const Project: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()

  // Mock data - in real app, this would come from API
  const project = {
    id: projectId,
    name: 'Modern Living Room Redesign',
    description: 'Contemporary living room with neutral color palette and modern furniture',
    variations: [
      { id: '1', name: 'Original Design', createdAt: '2024-01-15' },
      { id: '2', name: 'Modern Minimalist', createdAt: '2024-01-15' },
      { id: '3', name: 'Cozy Traditional', createdAt: '2024-01-15' }
    ]
  }

  return (
    <ProjectContainer>
      <ProjectHeader>
        <ProjectTitle>{project.name}</ProjectTitle>
        <ProjectDescription>{project.description}</ProjectDescription>
      </ProjectHeader>

      <VariationsSection>
        <SectionTitle>Design Variations</SectionTitle>
        <VariationsGrid>
          {project.variations.map((variation) => (
            <VariationCard key={variation.id}>
              <VariationImage>
                <div>Variation Preview</div>
              </VariationImage>
              <VariationInfo>
                <VariationName>{variation.name}</VariationName>
                <VariationMeta>
                  Created: {variation.createdAt}
                </VariationMeta>
              </VariationInfo>
            </VariationCard>
          ))}
        </VariationsGrid>
      </VariationsSection>
    </ProjectContainer>
  )
}

export default Project
