import React from 'react';
import RecruiterNavbar from '../components/RecruiterNavbar';
import DashboardCard from '../components/DashboardCard';
import ChartComponent from '../components/ChartComponent';

export default function RecruiterDashboard() {
  // Mock data for dashboard
  const dashboardStats = [
    { 
      title: 'Active Jobs', 
      value: '12', 
      icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>, 
      color: '#4285f4', 
      change: '2', 
      changeType: 'positive' 
    },
    { 
      title: 'Total Applicants', 
      value: '164', 
      icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path></svg>, 
      color: '#0f9d58', 
      change: '18', 
      changeType: 'positive' 
    },
    { 
      title: 'Spam Applications', 
      value: '47', 
      icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>, 
      color: '#f44336', 
      change: '8', 
      changeType: 'negative' 
    },
    { 
      title: 'AI Match Rate', 
      value: '89%', 
      icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>, 
      color: '#4285f4', 
      change: '2%', 
      changeType: 'positive' 
    },
  ];

  const spamAnalysisData = [
    { label: 'Genuine', value: 78, color: '#0f9d58' },
    { label: 'Low Quality', value: 14, color: '#ffc107' },
    { label: 'Spam', value: 8, color: '#f44336' },
  ];

  const aiMetricsData = [
    { label: 'Screening Accuracy', value: 95, color: '#4285f4' },
    { label: 'Prediction Rate', value: 87, color: '#0f9d58' },
    { label: 'Time Saved (hrs)', value: 64, color: '#9c27b0' },
    { label: 'Quality of Hire', value: 92, color: '#f8ac5c' },
  ];
  
  const spamBySourceData = [
    { label: 'LinkedIn', value: 5 },
    { label: 'JobStreet', value: 12 },
    { label: 'Indeed', value: 18 },
    { label: 'Direct', value: 7 },
    { label: 'Referrals', value: 2 },
    { label: 'Others', value: 3 },
  ];

  const recentActivity = [
    { name: 'Ahmad Bin Abdullah', position: 'Frontend Developer', action: 'moved to Stage 2', time: '2 hours ago' },
    { name: 'Siti Binti Mohamed', position: 'Backend Developer', action: 'moved to Stage 2', time: '3 hours ago' },
    { name: 'Tan Wei Ming', position: 'UX Designer', action: 'offered position', time: '5 hours ago' },
    { name: 'Rajesh Kumar', position: 'Data Analyst', action: 'scheduled interview', time: '1 day ago' },
    { name: 'Nurul Huda', position: 'DevOps Engineer', action: 'application received', time: '1 day ago' },
  ];

  return (
    <div style={styles.container}>
      <RecruiterNavbar />
      <div style={styles.contentWithSidebar}>
        <div style={styles.content}>
          <div style={styles.header}>
            <h1 style={styles.title}>Recruitment Analytics</h1>
          </div>
          
          <div style={styles.statsGrid}>
            {dashboardStats.map((stat, index) => (
              <DashboardCard 
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                change={stat.change}
                changeType={stat.changeType}
              />
            ))}
          </div>
          
          <div style={styles.chartsGrid}>
            <div style={styles.chartItem}>
              <div style={styles.chartCard}>
                <h3 style={styles.cardTitle}>AI Talent Acquisition Metrics</h3>
                <div style={styles.metricsGrid}>
                  {aiMetricsData.map((metric, index) => (
                    <div key={index} style={styles.metricItem}>
                      <div style={styles.metricHeader}>
                        <span style={styles.metricLabel}>{metric.label}</span>
                        <span style={{...styles.metricValue, color: metric.color}}>{metric.value}{metric.label.includes('Time') ? '' : '%'}</span>
                      </div>
                      <div style={styles.metricBar}>
                        <div 
                          style={{
                            ...styles.metricFill,
                            width: `${metric.value}%`,
                            backgroundColor: metric.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={styles.chartItem}>
              <div style={styles.chartCard}>
                <h3 style={styles.cardTitle}>Application Quality Analysis</h3>
                <div style={styles.pieChartContainer}>
                  <div style={styles.pieChart}>
                    <div style={styles.pieChartInner}>
                      <div style={styles.pieChartLabel}>
                        <div style={styles.pieChartValue}>78%</div>
                        <div style={styles.pieChartText}>Genuine</div>
                      </div>
                    </div>
                  </div>
                  <div style={styles.pieChartLegend}>
                    {spamAnalysisData.map((item, index) => (
                      <div key={index} style={styles.legendItem}>
                        <div 
                          style={{
                            ...styles.legendColor,
                            backgroundColor: item.color,
                          }}
                        ></div>
                        <div style={styles.legendLabel}>{item.label}: {item.value}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Recruitment Analytics</h2>
            
            <div style={styles.analyticsGrid}>
              <div style={styles.analyticsCard}>
                <h3 style={styles.cardTitle}>Spam Applications by Source</h3>
                <div style={styles.timeToFillContainer}>
                  {spamBySourceData.map((item, index) => (
                    <div key={index} style={styles.timeToFillRow}>
                      <div style={styles.timeToFillLabel}>{item.label}</div>
                      <div style={styles.timeToFillBarContainer}>
                        <div 
                          style={{
                            ...styles.timeToFillBar,
                            width: `${(item.value / 20) * 100}%`, // 20 is the max value
                            backgroundColor: '#4285f4',
                          }}
                        ></div>
                      </div>
                      <div style={styles.timeToFillValue}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={styles.analyticsCard}>
                <h3 style={styles.cardTitle}>Recent Activity</h3>
                <div style={styles.activityList}>
                  {recentActivity.map((item, index) => (
                    <div key={index} style={styles.activityItem}>
                      <div style={styles.activityIcon}>
                        <svg style={styles.activitySvg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12L11 14L15 10M12 3L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div style={styles.activityContent}>
                        <p style={styles.activityText}>
                          <span style={styles.activityHighlight}>{item.name}</span> {item.action} for <span style={styles.activityHighlight}>{item.position}</span>
                        </p>
                        <p style={styles.activityTime}>{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Job Listings Overview</h2>
              <button style={styles.viewAllButton}>View All Jobs</button>
            </div>
            
            <div style={styles.jobsTable}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Job Title</th>
                    <th style={styles.tableHeader}>Applicants</th>
                    <th style={styles.tableHeader}>Stage 1</th>
                    <th style={styles.tableHeader}>Stage 2</th>
                    <th style={styles.tableHeader}>Offered</th>
                    <th style={styles.tableHeader}>Spam</th>
                    <th style={styles.tableHeader}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { title: 'Frontend Developer', applicants: 45, stage1: 25, stage2: 15, offered: 5, spam: 12, status: 'Active' },
                    { title: 'Backend Engineer', applicants: 38, stage1: 18, stage2: 12, offered: 8, spam: 8, status: 'Active' },
                    { title: 'UX Designer', applicants: 32, stage1: 16, stage2: 12, offered: 4, spam: 6, status: 'Active' },
                    { title: 'Data Analyst', applicants: 28, stage1: 15, stage2: 10, offered: 3, spam: 14, status: 'Active' },
                    { title: 'DevOps Engineer', applicants: 21, stage1: 8, stage2: 7, offered: 6, spam: 7, status: 'Active' },
                  ].map((job, index) => (
                    <tr key={index} style={styles.tableRow}>
                      <td style={styles.tableCell}>{job.title}</td>
                      <td style={styles.tableCell}>{job.applicants}</td>
                      <td style={styles.tableCell}>{job.stage1}</td>
                      <td style={styles.tableCell}>{job.stage2}</td>
                      <td style={styles.tableCell}>{job.offered}</td>
                      <td style={styles.tableCell}>{job.spam}</td>
                      <td style={styles.tableCell}>
                        <span style={styles.statusBadge}>{job.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: "'Inter', system-ui, sans-serif",
    background: 'linear-gradient(to bottom, rgba(226, 232, 240, 0.2) 0%, rgba(248, 250, 252, 0.8) 100%)',
  },
  contentWithSidebar: {
    marginLeft: '240px',
    paddingTop: 0,
    minHeight: '100vh',
    transition: 'margin-left 0.3s',
    '@media (max-width: 1023px)': {
      marginLeft: 0,
    },
  },
  content: {
    paddingTop: '2.5rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    paddingBottom: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    '@media (max-width: 768px)': {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '1.5rem',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    '@media (max-width: 640px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '1rem',
    },
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
    '@media (max-width: 640px)': {
      fontSize: '1.5rem',
    },
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
    marginBottom: '2rem',
    '@media (max-width: 1280px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem',
    marginBottom: '2rem',
    '@media (max-width: 1023px)': {
      gridTemplateColumns: '1fr',
    },
  },
  chartItem: {
    flex: 1,
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    height: '100%',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    border: '1px solid #e2e8f0',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#334155',
    marginTop: 0,
    marginBottom: '1.5rem',
  },
  metricsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  metricItem: {
    marginBottom: '0.75rem',
  },
  metricHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  metricLabel: {
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '500',
  },
  metricValue: {
    fontSize: '0.875rem',
    fontWeight: '700',
  },
  metricBar: {
    height: '8px',
    backgroundColor: '#f1f5f9',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  metricFill: {
    height: '100%',
    borderRadius: '4px',
  },
  pieChartContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2rem',
    height: '100%',
    '@media (max-width: 640px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  pieChart: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    background: 'conic-gradient(#0f9d58 0% 78%, #ffc107 78% 92%, #f44336 92% 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 640px)': {
      width: '150px',
      height: '150px',
    },
  },
  pieChartInner: {
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 640px)': {
      width: '110px',
      height: '110px',
    },
  },
  pieChartLabel: {
    textAlign: 'center',
  },
  pieChartValue: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#0f9d58',
  },
  pieChartText: {
    fontSize: '0.875rem',
    color: '#64748b',
  },
  pieChartLegend: {
    flex: 1,
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.75rem',
  },
  legendColor: {
    width: '12px',
    height: '12px',
    borderRadius: '3px',
  },
  legendLabel: {
    fontSize: '0.875rem',
    color: '#334155',
    fontWeight: '500',
  },
  section: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 0,
    marginBottom: '1.5rem',
  },
  analyticsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem',
    '@media (max-width: 1023px)': {
      gridTemplateColumns: '1fr',
    },
  },
  analyticsCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
  },
  timeToFillContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  timeToFillRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  timeToFillLabel: {
    width: '80px',
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '500',
  },
  timeToFillBarContainer: {
    flex: 1,
    height: '8px',
    backgroundColor: '#f1f5f9',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  timeToFillBar: {
    height: '100%',
    borderRadius: '4px',
  },
  timeToFillValue: {
    width: '30px',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#334155',
    textAlign: 'right',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  activityItem: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
    padding: '0.75rem',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#f1f5f9',
    },
  },
  activityIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#e8f4ff',
    color: '#4285f4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  activitySvg: {
    width: '16px',
    height: '16px',
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: '0.875rem',
    color: '#334155',
    margin: '0 0 0.25rem 0',
    lineHeight: 1.5,
  },
  activityHighlight: {
    fontWeight: '600',
    color: '#1e293b',
  },
  activityTime: {
    fontSize: '0.75rem',
    color: '#64748b',
    margin: 0,
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  viewAllButton: {
    backgroundColor: 'transparent',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#4285f4',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#4285f4',
      color: 'white',
      borderColor: '#4285f4',
    },
  },
  jobsTable: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    overflowX: 'auto',
    border: '1px solid #e2e8f0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    textAlign: 'left',
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    color: '#64748b',
    fontSize: '0.75rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  tableRow: {
    borderBottom: '1px solid #e2e8f0',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#f8fafc',
    },
  },
  tableCell: {
    padding: '1rem',
    fontSize: '0.875rem',
    color: '#334155',
    whiteSpace: 'nowrap',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    backgroundColor: '#e8f5e9',
    color: '#0f9d58',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
}; 