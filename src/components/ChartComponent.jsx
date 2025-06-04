import React from 'react';

export default function ChartComponent({ title, data, type = 'bar' }) {
  // Calculate the maximum value for scaling
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>{title}</h3>
      <div style={styles.chartContent}>
        {type === 'bar' ? (
          <div style={styles.barChart}>
            {data.map((item, index) => (
              <div key={index} style={styles.barItem}>
                <div style={styles.barLabel}>{item.label}</div>
                <div style={styles.barContainer}>
                  <div 
                    style={{
                      ...styles.bar,
                      width: `${(item.value / maxValue) * 100}%`,
                      backgroundColor: item.color || '#4f46e5',
                    }}
                  ></div>
                </div>
                <div style={styles.barValue}>{item.value}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.pieChartPlaceholder}>
            <div style={styles.pieChartCircle}></div>
            <div style={styles.pieChartLegend}>
              {data.map((item, index) => (
                <div key={index} style={styles.legendItem}>
                  <div 
                    style={{
                      ...styles.legendColor,
                      backgroundColor: item.color || '#4f46e5',
                    }}
                  ></div>
                  <div style={styles.legendLabel}>{item.label}: {item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  chartTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 0,
    marginBottom: '1.5rem',
  },
  chartContent: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  barChart: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  barItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  barLabel: {
    width: '100px',
    fontSize: '0.875rem',
    color: '#6b7280',
    textAlign: 'right',
  },
  barContainer: {
    flex: 1,
    height: '12px',
    backgroundColor: '#f1f5f9',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: '6px',
    transition: 'width 1s ease-out',
  },
  barValue: {
    width: '40px',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#1e293b',
  },
  pieChartPlaceholder: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '200px',
  },
  pieChartCircle: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'conic-gradient(#4f46e5 0% 25%, #60a5fa 25% 56%, #a78bfa 56% 80%, #f43f5e 80% 100%)',
  },
  pieChartLegend: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  legendColor: {
    width: '12px',
    height: '12px',
    borderRadius: '3px',
  },
  legendLabel: {
    fontSize: '0.875rem',
    color: '#4b5563',
  },
}; 