import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Careers', path: '/jobs' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav style={styles.navbar}>
      <div style={styles.logoSection}>
        <div style={styles.logo}>RecruitIQ</div>
      </div>
      
      {/* Desktop Navigation */}
      <div style={styles.navLinks}>
        {navItems.map(({ name, path }) => (
          <NavLink
            key={name}
            to={path}
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {})
            })}
          >
            {name}
          </NavLink>
        ))}
      </div>
      
      {/* Mobile Menu Button */}
      <div style={styles.mobileMenuButton} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <path d={mobileMenuOpen ? "M18 6L6 18M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
        </svg>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div style={styles.mobileNavLinks}>
          {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              style={({ isActive }) => ({
                ...styles.mobileLink,
                ...(isActive ? styles.activeMobileLink : {})
              })}
              onClick={() => setMobileMenuOpen(false)}
            >
              {name}
            </NavLink>
          ))}
          <NavLink to="/recruiter/login" style={styles.mobileRecruiterLink} onClick={() => setMobileMenuOpen(false)}>
            For Recruiters
          </NavLink>
        </div>
      )}
      
      <div style={styles.actionSection}>
        <NavLink to="/recruiter/login" style={styles.recruiterButton}>
          For Recruiters
          <svg style={styles.buttonIcon} viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </NavLink>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
    backgroundColor: '#fff',
    color: '#333',
    fontFamily: "'Inter', system-ui, sans-serif",
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    height: '70px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderBottom: '1px solid #e2e8f0',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    background: 'linear-gradient(90deg, #4285f4, #0f9d58)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    padding: '0.5rem 0',
  },
  navLinks: {
    display: 'flex',
    gap: '1rem',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  link: {
    color: '#475569',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.95rem',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(66, 133, 244, 0.05)',
      color: '#4285f4',
    },
  },
  activeLink: {
    backgroundColor: '#f1f5ff',
    color: '#4285f4',
    fontWeight: '600',
  },
  actionSection: {
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  recruiterButton: {
    background: 'linear-gradient(90deg, #4285f4, #0f9d58)',
    color: 'white',
    textDecoration: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '&:hover': {
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
      transform: 'translateY(-1px)',
    },
  },
  buttonIcon: {
    marginLeft: '0.25rem',
  },
  mobileMenuButton: {
    display: 'none',
    cursor: 'pointer',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  },
  mobileNavLinks: {
    position: 'absolute',
    top: '70px',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    zIndex: 1000,
  },
  mobileLink: {
    color: '#475569',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(66, 133, 244, 0.05)',
      color: '#4285f4',
    },
  },
  activeMobileLink: {
    backgroundColor: '#f1f5ff',
    color: '#4285f4',
    fontWeight: '600',
  },
  mobileRecruiterLink: {
    background: 'linear-gradient(90deg, #4285f4, #0f9d58)',
    color: 'white',
    textDecoration: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '0.5rem',
  },
};
