import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

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

  return (
    <LayoutContainer>
      <Header>
        <Nav>
          <Logo to="/">AI Home Redesign</Logo>
          <NavLinks>
            <NavLink to="/" $active={location.pathname === '/'}>
              Home
            </NavLink>
            <NavLink to="/upload" $active={location.pathname === '/upload'}>
              Upload
            </NavLink>
            <NavLink to="/materials" $active={location.pathname === '/materials'}>
              Materials
            </NavLink>
            <NavLink to="/gallery" $active={location.pathname === '/gallery'}>
              Gallery
            </NavLink>
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
