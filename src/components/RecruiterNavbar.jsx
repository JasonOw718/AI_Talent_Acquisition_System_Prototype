import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function RecruiterNavbar() {
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Track window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsMobileNavOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('recruiterLoggedIn');
    navigate('/recruiter/login');
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
    
    // Prevent body scroll when mobile menu is open
    if (!isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Determine if we should show mobile view
  const isMobile = windowWidth < 1024;

  // Define navigation links
  const navLinks = [
    { name: 'Dashboard', path: '/recruiter/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Job Listings', path: '/recruiter/jobs', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { name: 'AI Assistant', path: '/recruiter/aiassistant', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { name: 'Profile', path: '/recruiter/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  return (
    <>
      {/* Mobile header bar */}
      {isMobile && (
        <div style={styles.mobileHeader}>
          <div style={styles.mobileLogo}>RecruitIQ</div>
          <button 
            style={styles.mobileMenuButton}
            onClick={toggleMobileNav}
            aria-label="Toggle menu"
          >
            {isMobileNavOpen ? (
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M3 12h18M3 6h18M3 18h18"></path>
              </svg>
            )}
          </button>
        </div>
      )}
      
      {/* Sidebar - shown based on screen size or toggle state */}
      <aside style={{
        ...styles.sidebar,
        ...(isMobile && styles.mobileSidebar),
        ...(isMobile && !isMobileNavOpen && styles.mobileSidebarHidden),
      }}>
        <div style={styles.logoSection}>
          <div style={styles.logo}>RecruitIQ</div>
          {isMobile && (
            <button 
              style={styles.closeButton}
              onClick={() => setIsMobileNavOpen(false)}
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          )}
        </div>
        <nav style={styles.navLinks}>
          {navLinks.map((link) => (
            <NavLink 
              key={link.name}
              to={link.path} 
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive ? styles.activeNavLink : {})
              })}
              onClick={() => isMobile && setIsMobileNavOpen(false)}
            >
              <span style={styles.navIcon}>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d={link.icon}></path>
                </svg>
              </span>
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div style={styles.spacer}></div>
        <div style={styles.profileSection}>
          <button 
            style={styles.logoutButton}
            onClick={handleLogout}
          >
            <span style={styles.logoutIcon}>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
                <path d="M16 17l5-5-5-5"></path>
                <path d="M21 12H9"></path>
              </svg>
            </span>
            <span style={styles.logoutText}>Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Mobile overlay */}
      {isMobile && isMobileNavOpen && (
        <div 
          style={styles.mobileOverlay}
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}
    </>
  );
}

const styles = {
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '240px',
    background: '#ffffff',
    color: '#334155',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1100,
    boxShadow: '0 0 15px rgba(0,0,0,0.05)',
    padding: '2rem 0 1.5rem 0',
    transition: 'transform 0.3s ease',
    borderRight: '1px solid #e2e8f0',
  },
  mobileSidebar: {
    transform: 'translateX(0)',
    width: '280px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    zIndex: 1200,
  },
  mobileSidebarHidden: {
    transform: 'translateX(-100%)',
  },
  mobileHeader: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    background: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1rem',
    zIndex: 1050,
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    borderBottom: '1px solid #e2e8f0',
  },
  mobileLogo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    background: 'linear-gradient(90deg, #4285f4, #0f9d58)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  mobileMenuButton: {
    background: 'transparent',
    border: 'none',
    color: '#334155',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1150,
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    color: '#334155',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1.5rem',
    marginBottom: '2.5rem',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    background: 'linear-gradient(90deg, #4285f4, #0f9d58)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    padding: '0.5rem 0',
  },
  navLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    color: '#334155',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s',
    marginBottom: '0.25rem',
  },
  activeNavLink: {
    background: 'linear-gradient(90deg, #4285f4, #0f9d58)',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(66,133,244,0.08)',
  },
  navIcon: {
    marginRight: '0.75rem',
    display: 'flex',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0 1.5rem',
  },
  logoutButton: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '8px',
    color: '#ef4444',
    cursor: 'pointer',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    transition: 'all 0.2s',
    marginTop: '10px',
    '&:hover': {
      background: 'rgba(239, 68, 68, 0.15)',
    },
  },
  logoutIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '8px',
  },
  logoutText: {
    fontSize: '0.9rem',
    fontWeight: '500',
  },
}; 