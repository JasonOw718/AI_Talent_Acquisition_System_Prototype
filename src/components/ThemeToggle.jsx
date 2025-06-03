import React from 'react';

export default function ThemeToggle({ darkMode, toggleTheme }) {
  return (
    <button onClick={toggleTheme} style={{
      background: 'none',
      border: '1px solid white',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      cursor: 'pointer'
    }}>
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
