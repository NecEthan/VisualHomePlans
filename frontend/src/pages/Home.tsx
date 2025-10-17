import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background: transparent;
`

const HeroSection = styled.section`
  text-align: center;
  padding: 6rem 0 8rem;
  position: relative;
  z-index: 1;
`

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #00d4ff 0%, #7b68ee 25%, #ff6b9d 50%, #c44569 75%, #f8b500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  font-weight: 300;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const CTAButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.6);
    
    &::before {
      left: 100%;
    }
  }
`

const FeaturesSection = styled.section`
  padding: 6rem 0;
  position: relative;
  z-index: 1;
`

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00d4ff 0%, #7b68ee 50%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 4rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 2rem;
`

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #00d4ff, #7b68ee, #ff6b9d);
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }
`

const FeatureIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.3));
`

const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #ffffff;
  font-weight: 600;
`

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  font-size: 1.1rem;
  font-weight: 300;
`

// Additional styled components for nanobanana-style layout
const StatsSection = styled.section`
  padding: 4rem 0;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`

const StatItem = styled.div`
  padding: 1rem;
`

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00d4ff 0%, #7b68ee 50%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  font-weight: 500;
`

const ProcessSection = styled.section`
  padding: 6rem 0;
`

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 2rem;
`

const ProcessStep = styled(motion.div)`
  text-align: center;
  position: relative;
`

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
`

const StepTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
  font-weight: 600;
`

const StepDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  font-size: 1rem;
`

const TestimonialSection = styled.section`
  padding: 6rem 0;
  background: rgba(255, 255, 255, 0.02);
`

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 2rem;
`

const TestimonialCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
`

const TestimonialText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`

const TestimonialAuthor = styled.div`
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const TestimonialRole = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`

const CTASection = styled.section`
  padding: 6rem 0;
  text-align: center;
`

const CTAContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00d4ff 0%, #7b68ee 50%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
`

const CTADescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`

const CTAGrid = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`

const SecondaryButton = styled(Link)`
  display: inline-block;
  background: transparent;
  color: #00d4ff;
  padding: 1rem 2rem;
  border: 2px solid #00d4ff;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #00d4ff;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 212, 255, 0.3);
  }
`

const Home: React.FC = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Design',
      description: 'Generate realistic previews of your home redesigns using advanced AI technology. See your vision come to life with photorealistic renderings.'
    },
    {
      icon: '🎨',
      title: 'Interactive Editing',
      description: 'Adjust dimensions, colors, and materials in real-time with our intuitive editor. Fine-tune every detail to perfection.'
    },
    {
      icon: '📱',
      title: 'Smart Sharing',
      description: 'Save and share your designs with family, friends, or contractors for feedback. Get approvals before you start construction.'
    }
  ]

  const stats = [
    { number: '10K+', label: 'Projects Completed' },
    { number: '50K+', label: 'Happy Customers' },
    { number: '99%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'AI Support' }
  ]

  const processSteps = [
    {
      number: '1',
      title: 'Upload Photos',
      description: 'Take or upload photos of your space from multiple angles to get the best results.'
    },
    {
      number: '2',
      title: 'Specify Changes',
      description: 'Tell us what you want to change - materials, colors, furniture, or extensions.'
    },
    {
      number: '3',
      title: 'AI Generation',
      description: 'Our AI creates multiple realistic variations of your redesigned space.'
    },
    {
      number: '4',
      title: 'Refine & Share',
      description: 'Use our interactive editor to fine-tune details and share with others.'
    }
  ]

  const testimonials = [
    {
      text: "The AI redesign helped me visualize my kitchen extension perfectly. I could see exactly how it would look before spending a penny!",
      author: "Sarah Johnson",
      role: "Homeowner"
    },
    {
      text: "As a contractor, this tool helps me show clients exactly what their renovation will look like. It's a game-changer!",
      author: "Mike Chen",
      role: "General Contractor"
    },
    {
      text: "The material catalog integration is brilliant. I could see real products and prices while designing my living room.",
      author: "Emily Rodriguez",
      role: "Interior Designer"
    }
  ]

  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <HeroTitle>Transform Your Home with AI</HeroTitle>
          <HeroSubtitle>
            Upload photos of your space and let AI generate stunning redesign variations. 
            Visualize extensions, new materials, and furniture layouts before you commit.
          </HeroSubtitle>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CTAButton to="/upload">Start Your AI Journey</CTAButton>
          </motion.div>
        </motion.div>
      </HeroSection>

      {/* Stats Section */}
      <StatsSection>
        <StatsGrid>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <StatItem>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            </motion.div>
          ))}
        </StatsGrid>
      </StatsSection>

      {/* Features Section */}
      <FeaturesSection>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <SectionTitle>Why Choose AI Home Redesign?</SectionTitle>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 + index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </motion.div>
      </FeaturesSection>

      {/* Process Section */}
      <ProcessSection>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <SectionTitle>How It Works</SectionTitle>
          <ProcessGrid>
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 + index * 0.2 }}
              >
                <StepNumber>{step.number}</StepNumber>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </ProcessStep>
            ))}
          </ProcessGrid>
        </motion.div>
      </ProcessSection>

      {/* Testimonials Section */}
      <TestimonialSection>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <SectionTitle>What Our Users Say</SectionTitle>
          <TestimonialGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.7 + index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <TestimonialText>"{testimonial.text}"</TestimonialText>
                <TestimonialAuthor>{testimonial.author}</TestimonialAuthor>
                <TestimonialRole>{testimonial.role}</TestimonialRole>
              </TestimonialCard>
            ))}
          </TestimonialGrid>
        </motion.div>
      </TestimonialSection>

      {/* Final CTA Section */}
      <CTASection>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9 }}
        >
          <CTAContent>
            <CTATitle>Ready to Redesign Your Space?</CTATitle>
            <CTADescription>
              Join thousands of homeowners who have transformed their spaces with AI-powered design.
              Start your project today and see the possibilities.
            </CTADescription>
            <CTAGrid>
              <CTAButton to="/upload">Get Started Now</CTAButton>
              <SecondaryButton to="/materials">Browse Materials</SecondaryButton>
            </CTAGrid>
          </CTAContent>
        </motion.div>
      </CTASection>
    </PageContainer>
  )
}

export default Home
