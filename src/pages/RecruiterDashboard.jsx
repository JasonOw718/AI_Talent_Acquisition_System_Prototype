// RecruiterDashboard.jsx
import React from 'react';
import RecruiterNavbar from '../components/RecruiterNavbar';
import DashboardCard from '../components/DashboardCard';
import ChartComponent from '../components/ChartComponent';

export default function RecruiterDashboard() {
  const dashboardStats = [
    {
      title: 'Active Jobs',
      value: '8',
      icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>,
      color: '#4285f4',
      change: '+1 this week',
      changeType: 'positive'
    },
    {
      title: 'Total Applicants',
      value: '124',
      icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87"></path><path d="M16 3.13a4 4 0 010 7.75"></path></svg>,
      color: '#0f9d58',
      change: '+10 today',
      changeType: 'positive'
    },
    {
      title: 'Spam Rate',
      value: '12%',
      icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>,
      color: '#f44336',
      change: '4% decrease',
      changeType: 'negative'
    },
    {
      title: 'AI Match Rate',
      value: '86%',
      icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
      color: '#9c27b0',
      change: '1% increase',
      changeType: 'positive'
    },
  ];

  const applicationQualityData = [
    { label: 'Genuine', value: 82, color: '#0f9d58' },
    { label: 'Spam', value: 18, color: '#f44336' },
  ];

  const recruitmentMetrics = [
    { label: 'Average Processing Time (sec)', value: 12, color: '#9c27b0' },
    { label: 'Valid LinkedIn Profile Count ( >0.7 )', value: 78, color: '#f8ac5c' },
    { label: 'Time Saved (hrs)', value: 48, color: '#4285f4' }
  ];

  const matchQualityData = [
    { label: 'Excellent', value: 12, color: '#28a745' },
    { label: 'Good', value: 18, color: '#17a2b8' },
    { label: 'Average', value: 9, color: '#ffc107' },
    { label: 'Poor', value: 4, color: '#dc3545' },
  ];  

  const recentActivity = [
    { name: 'Ahmad Bin Abdullah', position: 'Frontend Developer', action: 'moved to Stage 2', time: '3 hours ago', status: 'in-progress' },
    { name: 'Siti Binti Mohamed', position: 'Backend Developer', action: 'moved to Stage 2', time: '4 hours ago', status: 'in-progress' },
    { name: 'Tan Wei Ming', position: 'UX Designer', action: 'offered position', time: '6 hours ago', status: 'completed' },
    { name: 'Rajesh Kumar', position: 'Data Analyst', action: 'scheduled interview', time: '1 day ago', status: 'pending' },
    { name: 'Nurul Huda', position: 'DevOps Engineer', action: 'application received', time: '1 day ago', status: 'new' },
  ];

  const jobListings = [
    { title: 'Frontend Developer', applicants: 45, stage1: 25, stage2: 15, offered: 5, spam: 12, status: 'Active', progress: 75 },
    { title: 'Backend Engineer', applicants: 38, stage1: 18, stage2: 12, offered: 8, spam: 8, status: 'Active', progress: 65 },
    { title: 'UX Designer', applicants: 32, stage1: 16, stage2: 12, offered: 4, spam: 6, status: 'Active', progress: 80 },
    { title: 'Data Analyst', applicants: 28, stage1: 15, stage2: 10, offered: 3, spam: 14, status: 'Active', progress: 60 },
    { title: 'DevOps Engineer', applicants: 21, stage1: 8, stage2: 7, offered: 6, spam: 7, status: 'Active', progress: 85 },
  ];

  return (
    <div style={styles.container}>
      <RecruiterNavbar />
      <div style={styles.contentWithSidebar}>
        <div style={styles.content}>
          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>Recruitment Dashboard</h1>
              <p style={styles.subtitle}>Overview of your recruitment pipeline and metrics</p>
            </div>
            <div style={styles.dateFilter}>
              <select style={styles.filterSelect}>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last quarter</option>
                <option>Custom range</option>
              </select>
            </div>
          </div>
          
          {/* Key Metrics Section */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Key Metrics</h2>
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
          </section>
          
          {/* Analytics Section */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Recruitment Analytics</h2>
            <div style={styles.chartsGrid}>
              {/* Recruitment Metrics */}
              <div style={styles.chartItem}>
                <div style={styles.chartCard}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>Recruitment Metrics</h3>
                    <button style={styles.cardAction}>View Details</button>
                  </div>
                  <div style={styles.metricsGrid}>
                    {recruitmentMetrics.map((metric, index) => (
                      <div key={index} style={styles.metricItem}>
                        <div style={styles.metricHeader}>
                          <span style={styles.metricLabel}>{metric.label}</span>
                          <span style={{...styles.metricValue, color: metric.color}}>
                            {metric.value}
                          </span>
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
              
              {/* Application Quality */}
              <div style={styles.chartItem}>
                <div style={styles.chartCard}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>Application Quality</h3>
                    <button style={styles.cardAction}>View Details</button>
                  </div>
                  <div style={styles.pieChartContainer}>
                    <div style={styles.pieChartWrapper}>
                      <div style={styles.pieChart}>
                        <div style={styles.pieChartInner}>
                          <div style={styles.pieChartLabel}>
                            <div style={styles.pieChartValue}>{applicationQualityData[0].value}%</div>
                            <div style={styles.pieChartText}>High Quality</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={styles.pieChartLegend}>
                      {applicationQualityData.map((item, index) => (
                        <div key={index} style={styles.legendItem}>
                          <div 
                            style={{
                              ...styles.legendColor,
                              backgroundColor: item.color,
                            }}
                          ></div>
                          <div style={styles.legendLabel}>{item.label}</div>
                          <div style={styles.legendValue}>{item.value}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Spam Analysis and Activity Section */}
          <section style={styles.section}>
            <div style={styles.analyticsGrid}>
              {/* matchQualityData */}
              <div style={styles.analyticsCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Candidate Match Quality</h3>
                  <button style={styles.cardAction}>View Report</button>
                </div>
                <div style={styles.barChartContainer}>
                  {matchQualityData.map((item, index) => (
                    <div key={index} style={styles.barChartRow}>
                      <div style={styles.barChartLabel}>{item.label}</div>
                      <div style={styles.barChartBarContainer}>
                        <div 
                          style={{
                            ...styles.barChartBar,
                            width: `${(item.value / Math.max(...matchQualityData.map(i => i.value))) * 100}%`,
                            backgroundColor: item.color || '#4285f4',
                          }}
                        ></div>
                      </div>
                      <div style={styles.barChartValue}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Recent Activity */}
              <div style={styles.analyticsCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Recent Activity</h3>
                  <button style={styles.cardAction}>View All</button>
                </div>
                <div style={styles.activityList}>
                  {recentActivity.map((item, index) => (
                    <div key={index} style={{
                      ...styles.activityItem,
                      borderLeft: `4px solid ${getStatusColor(item.status)}`
                    }}>
                      <div style={styles.activityIcon}>
                        {getActivityIcon(item.status)}
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
          </section>
          
          {/* Job Listings Section */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Job Listings</h2>
              <button style={styles.primaryButton}>
                <svg style={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Create New Job
              </button>
            </div>
            
            <div style={styles.jobsTable}>
              <div style={styles.tableResponsive}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Job Title</th>
                      <th style={styles.tableHeader}>Applicants</th>
                      <th style={styles.tableHeader}>Pipeline Progress</th>
                      <th style={styles.tableHeader}>Spam</th>
                      <th style={styles.tableHeader}>Status</th>
                      <th style={styles.tableHeader}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobListings.map((job, index) => (
                      <tr key={index} style={styles.tableRow}>
                        <td style={styles.tableCell}>
                          <div style={styles.jobTitle}>{job.title}</div>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.applicantCount}>{job.applicants}</div>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.progressContainer}>
                            <div style={styles.progressBar}>
                              <div 
                                style={{
                                  ...styles.progressFill,
                                  width: `${job.progress}%`,
                                  backgroundColor: getProgressColor(job.progress),
                                }}
                              ></div>
                            </div>
                            <span style={styles.progressText}>{job.progress}%</span>
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.spamCount}>{job.spam}</div>
                        </td>
                        <td style={styles.tableCell}>
                          <span style={{
                            ...styles.statusBadge,
                            backgroundColor: job.status === 'Active' ? '#e8f5e9' : '#fff3e0',
                            color: job.status === 'Active' ? '#0f9d58' : '#ff9800',
                          }}>
                            {job.status}
                          </span>
                        </td>
                        <td style={styles.tableCell}>
                          <button style={styles.tableActionButton}>
                            <svg style={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getStatusColor(status) {
  switch(status) {
    case 'completed': return '#0f9d58';
    case 'in-progress': return '#4285f4';
    case 'pending': return '#ffc107';
    case 'new': return '#9c27b0';
    default: return '#e2e8f0';
  }
}

function getActivityIcon(status) {
  let iconPath;
  switch(status) {
    case 'completed':
      iconPath = <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeWidth="2" strokeLinecap="round"/>;
      break;
    case 'in-progress':
      iconPath = <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeWidth="2" strokeLinecap="round"/>;
      break;
    case 'pending':
      iconPath = <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round"/>;
      break;
    default:
      iconPath = <path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round"/>;
  }
  
  return (
    <svg style={styles.activitySvg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {iconPath}
    </svg>
  );
}

function getProgressColor(progress) {
  if (progress >= 80) return '#0f9d58';
  if (progress >= 60) return '#4285f4';
  if (progress >= 40) return '#ffc107';
  return '#f44336';
}

// Styles
const styles = {
  container: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: "'Inter', system-ui, sans-serif",
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
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    '@media (max-width: 768px)': {
      padding: '1rem',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    '@media (max-width: 640px)': {
      flexDirection: 'column',
      gap: '1rem',
    },
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 0.25rem 0',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0,
  },
  dateFilter: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  filterSelect: {
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    color: '#334155',
    cursor: 'pointer',
  },
  section: {
    marginBottom: '2.5rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 1.5rem 0',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '1.5rem',
    marginBottom: '1.5rem',
    '@media (max-width: 768px)': {
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
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    height: '100%',
    border: '1px solid #e2e8f0',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#334155',
    margin: 0,
  },
  cardAction: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#4285f4',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#f1f5f9',
    },
  },
  metricsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
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
    gap: '2rem',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  pieChartWrapper: {
    flexShrink: 0,
  },
  pieChart: {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    background: "conic-gradient(#0f9d58 0% 90%, #f44336 90% 100%)",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieChartInner: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieChartLabel: {
    textAlign: 'center',
  },
  pieChartValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0f9d58',
    marginBottom: '0.25rem',
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
    width: '80px',
  },
  legendValue: {
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '500',
  },
  analyticsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '1.5rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  analyticsCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #e2e8f0',
  },
  barChartContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  barChartRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  barChartLabel: {
    width: '80px',
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '500',
  },
  barChartBarContainer: {
    flex: 1,
    height: '8px',
    backgroundColor: '#f1f5f9',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  barChartBar: {
    height: '100%',
    borderRadius: '4px',
  },
  barChartValue: {
    width: '30px',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#334155',
    textAlign: 'right',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  activityItem: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
    padding: '0.75rem',
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
  },
  activityIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#f1f5f9',
    color: '#4285f4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  activitySvg: {
    width: '18px',
    height: '18px',
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
  primaryButton: {
    backgroundColor: '#4285f4',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    '&:hover': {
      backgroundColor: '#3367d6',
    },
  },
  buttonIcon: {
    width: '16px',
    height: '16px',
  },
  jobsTable: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #e2e8f0',
  },
  tableResponsive: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    textAlign: 'left',
    padding: '0.75rem 1rem',
    backgroundColor: '#f8fafc',
    color: '#64748b',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tableRow: {
    borderBottom: '1px solid #e2e8f0',
    '&:hover': {
      backgroundColor: '#f8fafc',
    },
  },
  tableCell: {
    padding: '1rem',
    fontSize: '0.875rem',
    color: '#334155',
  },
  jobTitle: {
    fontWeight: '500',
  },
  applicantCount: {
    fontWeight: '600',
  },
  spamCount: {
    color: '#f44336',
    fontWeight: '600',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  progressBar: {
    flex: 1,
    height: '6px',
    backgroundColor: '#f1f5f9',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '3px',
  },
  progressText: {
    fontSize: '0.75rem',
    color: '#64748b',
    width: '40px',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
  },
  tableActionButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#64748b',
    cursor: 'pointer',
    padding: '0.25rem',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#f1f5f9',
    },
  },
  actionIcon: {
    width: '16px',
    height: '16px',
  },
};