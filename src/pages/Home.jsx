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
    icon: '🤖',
    title: 'AI-Powered Screening',
    description: 'Quickly identify the best candidates using intelligent algorithms.',
  },
  {
    icon: '🔒',
    title: 'Spam & Fraud Detection',
    description: 'Automatically filter suspicious applications for quality assurance.',
  },
  {
    icon: '📊',
    title: 'Data-Driven Insights',
    description: 'Get real-time reports to make informed hiring decisions.',
  },
  {
    icon: '⚡',
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
          {features.map(({ icon, title, description }) => (
            <div key={title} style={styles.featureCard}>
              <div style={styles.featureIcon}>{icon}</div>
              <h3 style={styles.featureTitle}>{title}</h3>
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
              <span style={styles.headerIcon}>⏱️</span>
              <span style={styles.headerText}>Traditional Recruitment</span>
            </div>
            
            {/* VS Column Header */}
            <div style={styles.vsHeader}></div>
            
            {/* AI Column Header */}
            <div style={styles.aiHeader}>
              <span style={styles.headerIcon}>⚡</span>
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
    background: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
    color: '#fff',
    borderRadius: '12px',
    marginBottom: '3rem',
  },
  heroTitle: {
    fontSize: '2.8rem',
    marginBottom: '1rem',
    fontWeight: '700',
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    marginBottom: '2rem',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: '1.5',
  },
  ctaButton: {
    backgroundColor: '#ffd700',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '6px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    fontWeight: '700',
    color: '#182848',
    boxShadow: '0 4px 12px rgba(255, 215, 0, 0.6)',
    transition: 'background-color 0.3s ease',
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
    backgroundColor: '#f0f9ff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  featureIcon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '1.3rem',
    marginBottom: '0.5rem',
    color: '#1e293b',
  },
  featureDesc: {
    color: '#475569',
    fontSize: '1rem',
    lineHeight: '1.4',
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
    backgroundColor: '#f1f5f9',
    padding: '1rem 1.5rem',
    borderRadius: '12px 12px 0 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    borderBottom: '3px solid #ef4444',
    marginBottom: '0.5rem',
  },
  aiHeader: {
    backgroundColor: '#dbeafe',
    padding: '1rem 1.5rem',
    borderRadius: '12px 12px 0 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    borderBottom: '3px solid #3b82f6',
    marginBottom: '0.5rem',
  },
  vsHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.5rem',
  },
  headerIcon: {
    fontSize: '1.5rem',
  },
  headerText: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1e293b',
  },
  
  // Items
  traditionalItem: {
    backgroundColor: '#fef2f2',
    borderRadius: '8px',
    marginBottom: '0.75rem',
    border: '1px solid #fecaca',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  aiItem: {
    backgroundColor: '#eff6ff',
    borderRadius: '8px',
    marginBottom: '0.75rem',
    border: '1px solid #bfdbfe',
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
    backgroundColor: '#6366f1',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '700',
    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
  },

  roleSelectorContainer: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  buttonGroup: {
    marginTop: '1rem',
    display: 'inline-flex',
    gap: '1.5rem',
  },
  roleButton: {
    padding: '0.75rem 2rem',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1.25rem',
    cursor: 'pointer',
    fontWeight: '600',
    boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
    transition: 'background-color 0.3s ease',
  },
};