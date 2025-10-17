import React from 'react'
import styled from 'styled-components'

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: transparent;
`

const GalleryHeader = styled.div`
  margin-bottom: 2rem;
`

const GalleryTitle = styled.h1`
  font-size: 2rem;
  background: linear-gradient(135deg, #00d4ff 0%, #7b68ee 50%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const GallerySubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
`

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    border-color: rgba(0, 212, 255, 0.3);
  }
`

const ProjectImage = styled.div`
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const ProjectInfo = styled.div`
  padding: 1.5rem;
`

const ProjectName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
  font-weight: 600;
`

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`

const ProjectMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.6);
`

const Gallery: React.FC = () => {
  // Mock data - in real app, this would come from API
  const projects = [
    {
      id: '1',
      name: 'Modern Living Room',
      description: 'Contemporary design with neutral colors',
      createdAt: '2024-01-15',
      variations: 3
    },
    {
      id: '2',
      name: 'Kitchen Extension',
      description: 'Open plan kitchen with island',
      createdAt: '2024-01-10',
      variations: 5
    }
  ]

  return (
    <GalleryContainer>
      <GalleryHeader>
        <GalleryTitle>Your Projects</GalleryTitle>
        <GallerySubtitle>View and manage your home redesign projects</GallerySubtitle>
      </GalleryHeader>

      {projects.length > 0 ? (
        <ProjectsGrid>
          {projects.map((project) => (
            <ProjectCard key={project.id}>
              <ProjectImage>
                <div>Project Preview</div>
              </ProjectImage>
              <ProjectInfo>
                <ProjectName>{project.name}</ProjectName>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectMeta>
                  <span>{project.variations} variations</span>
                  <span>{project.createdAt}</span>
                </ProjectMeta>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      ) : (
        <EmptyState>
          <h3>No projects yet</h3>
          <p>Upload some photos to get started with your first project</p>
        </EmptyState>
      )}
    </GalleryContainer>
  )
}

export default Gallery
