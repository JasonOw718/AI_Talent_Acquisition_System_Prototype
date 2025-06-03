import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Jobs', path: '/jobs' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Login', path: '/login' },
];

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>AI Job Portal</h1>
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
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
    color: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  },
  logo: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '1.8rem',
    letterSpacing: '1.2px',
  },
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  link: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1.1rem',
    padding: '6px 8px',
    borderRadius: '4px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  activeLink: {
    backgroundColor: '#fff',
    color: '#182848',
    fontWeight: '700',
  }
};
