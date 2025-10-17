import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ShoppingCart, Plus } from 'lucide-react'
import { useMaterialContext } from '../context/MaterialContext'

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: transparent;
`

const Header = styled.header`
  background: transparent;
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00d4ff 0%, #7b68ee 50%, #ff6b9d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  letter-spacing: -0.02em;
`

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
`

const MaterialCart = styled.div`
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 212, 255, 0.1);
  }
`

const CartBadge = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
`

const StartProjectButton = styled(Link)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }
`

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${props => props.$active ? '#00d4ff' : 'rgba(255, 255, 255, 0.8)'};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #00d4ff, #7b68ee, #ff6b9d);
    transition: width 0.3s ease;
  }

  &:hover {
    color: #00d4ff;
    
    &::after {
      width: 100%;
    }
  }
`

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  background: transparent;
  position: relative;
  z-index: 1;
`

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const { state, toggleCart } = useMaterialContext()
  const selectedCount = state.selectedMaterials.length

  return (
    <LayoutContainer>
      <Header>
        <Nav>
          <Logo to="/">AI Home Redesign</Logo>
          <NavLinks>
            <NavLink to="/" $active={location.pathname === '/'}>
              Home
            </NavLink>
            <NavLink to="/materials" $active={location.pathname === '/materials'}>
              Materials
            </NavLink>
            <NavLink to="/upload" $active={location.pathname === '/upload'}>
              Upload
            </NavLink>
            <NavLink to="/gallery" $active={location.pathname === '/gallery'}>
              Gallery
            </NavLink>
            <MaterialCart onClick={toggleCart}>
              <ShoppingCart size={20} />
              {selectedCount > 0 && (
                <CartBadge>
                  {selectedCount}
                </CartBadge>
              )}
            </MaterialCart>
            <StartProjectButton to="/upload">
              <Plus size={16} />
              Start Project
            </StartProjectButton>
          </NavLinks>
        </Nav>
      </Header>
      <Main>
        {children}
      </Main>
    </LayoutContainer>
  )
}

export default Layout
