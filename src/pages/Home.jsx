import React from 'react';
import { useNavigate } from 'react-router-dom';

const differences = [
  {
    traditional: 'Manual resume screening',
    ai: 'Automated resume parsing & ranking',
  },
  {
    traditional: 'Time-consuming interview scheduling',
    ai: 'Instant interview scheduling & reminders',
  },
  {
    traditional: 'Subjective candidate evaluation',
    ai: 'Objective, data-driven scoring',
  },
  {
    traditional: 'Limited data insights',
    ai: 'Real-time analytics and reporting',
  },
  {
    traditional: 'Slower hiring process',
    ai: 'Faster, smarter hiring decisions',
  },
];

const features = [
  {
    title: 'AI-Powered Screening',
    description: 'Quickly identify the best candidates using intelligent algorithms.',
  },
  {
    title: 'Spam & Fraud Detection',
    description: 'Automatically filter suspicious applications for quality assurance.',
  },
  {
    title: 'Data-Driven Insights',
    description: 'Get real-time reports to make informed hiring decisions.',
  },
  {
    title: 'Faster Hiring',
    description: 'Streamline recruitment workflows for efficiency.',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Hero Banner */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to the AI-Powered Talent Acquisition System</h1>
        <p style={styles.heroSubtitle}>
          Revolutionize your recruitment process with cutting-edge AI technology designed to find the
          best talent faster and smarter.
        </p>
        <button
          style={styles.ctaButton}
          onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
          aria-label="Learn more about features"
        >
          Learn More
        </button>
      </section>

      {/* Features */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Why Choose Our Platform?</h2>
        <div style={styles.featuresGrid}>
          {features.map(({ title, description }) => (
            <div key={title} style={styles.featureCard}>
              <div style={styles.featureHeader}>
                <h3 style={styles.featureTitle}>{title}</h3>
              </div>
              <p style={styles.featureDesc}>{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section style={styles.comparisonSection}>
        <h2 style={styles.sectionTitle}>Traditional vs AI-Powered Recruitment</h2>
        <div style={styles.comparisonContainer}>
          <div style={styles.comparisonGrid}>
            {/* Traditional Column Header */}
            <div style={styles.traditionalHeader}>
              <span style={styles.headerText}>Traditional Recruitment</span>
            </div>
            
            {/* VS Column Header */}
            <div style={styles.vsHeader}></div>
            
            {/* AI Column Header */}
            <div style={styles.aiHeader}>
              <span style={styles.headerText}>AI-Powered Recruitment</span>
            </div>

            {/* Comparison Items */}
            {differences.map(({ traditional, ai }, idx) => (
              <React.Fragment key={idx}>
                <div style={styles.traditionalItem}>
                  <div style={styles.itemContent}>
                    <span style={styles.itemText}>{traditional}</span>
                  </div>
                </div>

                <div style={styles.vsColumn}>
                  <span style={styles.vsText}>VS</span>
                </div>

                <div style={styles.aiItem}>
                  <div style={styles.itemContent}>
                    <span style={styles.itemText}>{ai}</span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selector */}
      <section style={styles.roleSelectorContainer}>
        <h2>Who are you?</h2>
        <div style={styles.buttonGroup}>
          <button
            style={{ ...styles.roleButton, backgroundColor: '#4b6cb7', color: '#fff' }}
            onClick={() => navigate('/jobs')}
          >
            I am an Applicant
          </button>
          <button
            style={{ ...styles.roleButton, backgroundColor: '#0284c7', color: '#fff' }}
            onClick={() => navigate('/login')}
          >
            I am a Recruiter
          </button>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '1rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#1e293b',
  },
  hero: {
    textAlign: 'center',
    padding: '4rem 1rem',
    background: 'linear-gradient(135deg, #4285f4 0%, #0f9d58 100%)',
    color: '#fff',
    borderRadius: '8px',
    marginBottom: '3rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  heroTitle: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    fontWeight: '600',
    lineHeight: '1.2',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: '1.6',
    opacity: '0.9',
  },
  ctaButton: {
    backgroundColor: '#ffffff',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: '600',
    color: '#4285f4',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.2s ease',
  },

  featuresSection: {
    marginBottom: '4rem',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#334155',
  },
  featuresGrid: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  featureCard: {
    flex: '1 1 220px',
    backgroundColor: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    textAlign: 'left',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  featureHeader: {
    borderBottom: '2px solid #4285f4',
    paddingBottom: '0.75rem',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '1.2rem',
    marginBottom: '0',
    color: '#1e293b',
    fontWeight: '600',
  },
  featureDesc: {
    color: '#475569',
    fontSize: '0.95rem',
    lineHeight: '1.5',
  },

  comparisonSection: {
    marginBottom: '4rem',
    backgroundColor: '#f8fafc',
    padding: '3rem 2rem',
    borderRadius: '16px',
  },
  comparisonContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  comparisonGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 80px 1fr',
    gap: '1rem',
    alignItems: 'stretch',
  },
  
  // Headers
  traditionalHeader: {
    backgroundColor: '#ffffff',
    padding: '1rem 1.5rem',
    borderRadius: '8px 8px 0 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    borderBottom: '3px solid #475569',
    marginBottom: '0.5rem',
    fontWeight: '600',
  },
  aiHeader: {
    backgroundColor: '#ffffff',
    padding: '1rem 1.5rem',
    borderRadius: '8px 8px 0 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    borderBottom: '3px solid #4285f4',
    marginBottom: '0.5rem',
    fontWeight: '600',
  },
  vsHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.5rem',
  },
  headerText: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1e293b',
  },
  
  // Items
  traditionalItem: {
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    marginBottom: '0.75rem',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  aiItem: {
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    marginBottom: '0.75rem',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  itemContent: {
    padding: '1.25rem 1.5rem',
  },
  itemText: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#1e293b',
    lineHeight: '1.4',
  },
  vsColumn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.75rem',
  },
  vsText: {
    backgroundColor: '#475569',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: '600',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },

  roleSelectorContainer: {
    textAlign: 'center',
    marginBottom: '4rem',
    padding: '2rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  buttonGroup: {
    marginTop: '1.5rem',
    display: 'inline-flex',
    gap: '1.5rem',
  },
  roleButton: {
    padding: '0.75rem 2rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    fontWeight: '600',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
  },
};