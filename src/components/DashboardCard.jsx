import React from 'react';

export default function DashboardCard({ title, value, icon, color, change, changeType }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>{title}</h3>
        <div style={{...styles.cardIcon, backgroundColor: `${color}15`}}>
          <span style={{color}}>{icon}</span>
        </div>
      </div>
      
      <div style={styles.cardBody}>
        <div style={styles.cardValue}>{value}</div>
        {change && (
          <div style={{
            ...styles.changeIndicator,
            color: changeType === 'positive' ? '#00c851' : '#f44336',
            backgroundColor: changeType === 'positive' ? 'rgba(0, 200, 81, 0.1)' : 'rgba(244, 67, 54, 0.1)'
          }}>
            <span>{changeType === 'positive' ? '↑' : '↓'}</span>
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    minWidth: '220px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  cardTitle: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#6c757d',
    margin: 0,
  },
  cardIcon: {
    width: '42px',
    height: '42px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
  },
  cardBody: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  cardValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1f36',
  },
  changeIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.875rem',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '16px',
  },
}; 