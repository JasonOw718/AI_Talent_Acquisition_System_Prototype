import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// Expanded job data that aligns with the job posting creation form
const jobs = [
  { 
    id: 1, 
    title: 'Software Engineer', 
    company: 'Tech Innovations', 
    location: 'Kuala Lumpur', 
    type: 'Full-Time',
    salary: 'RM 7,000 - RM 9,000',
    posted: '3 days ago',
    description: 'We are looking for a skilled Software Engineer to join our development team. You will be responsible for building high-quality, innovative, and fully functional applications according to project requirements. You will work with React for frontend development and Flask for backend services.', 
    education_required: [
      {
        degree: 'Bachelor',
        major: 'Computer Science or related field',
        description: 'Strong understanding of software engineering principles and practices'
      }
    ],
    skills_required: [
      {
        name: 'React',
        description: 'Experienced in building complex web applications with React and related libraries'
      },
      {
        name: 'Python',
        description: 'Proficient in Python programming with experience in Flask or similar frameworks'
      },
      {
        name: 'JavaScript',
        description: 'Advanced knowledge of modern JavaScript (ES6+)'
      }
    ],
    languages_required: [
      {
        language: 'English',
        proficiency: 'Fluent'
      },
      {
        language: 'Malay',
        proficiency: 'Conversational'
      }
    ]
  },
  { 
    id: 2, 
    title: 'Data Analyst', 
    company: 'Analytics Pro', 
    location: 'Penang', 
    type: 'Contract',
    salary: 'RM 6,000 - RM 8,000',
    posted: '1 week ago',
    description: 'We are seeking a Data Analyst who will be responsible for analyzing data, identifying patterns and trends, and providing actionable insights. The ideal candidate has strong analytical skills and is proficient with data analysis tools and programming languages.', 
    education_required: [
      {
        degree: 'Bachelor',
        major: 'Statistics, Mathematics, Computer Science or related field',
        description: 'Strong foundation in statistical analysis and data modeling'
      }
    ],
    skills_required: [
      {
        name: 'SQL',
        description: 'Advanced SQL querying skills for data extraction and manipulation'
      },
      {
        name: 'Python',
        description: 'Experience with data analysis libraries like Pandas, NumPy, and Matplotlib'
      },
      {
        name: 'Tableau',
        description: 'Ability to create informative data visualizations and dashboards'
      }
    ],
    languages_required: [
      {
        language: 'English',
        proficiency: 'Fluent'
      },
      {
        language: 'Mandarin',
        proficiency: 'Basic'
      }
    ]
  },
];

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === parseInt(id));

  if (!job) return <p style={{ padding: 20 }}>Career posting not found</p>;

  return (
    <div style={styles.container}>
      <button
        onClick={() => navigate(-1)}
        style={styles.backButton}
      >
        ← Back
      </button>

      <div style={styles.jobHeader}>
        <h1 style={styles.jobTitle}>{job.title}</h1>
        <div style={styles.jobMeta}>
          <div style={styles.company}>{job.company}</div>
          <div style={styles.metaDetails}>
            <div style={styles.metaItem}>
              <svg style={styles.icon} viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{job.location}</span>
            </div>
            <div style={styles.metaItem}>
              <svg style={styles.icon} viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path>
              </svg>
              <span>{job.salary} monthly</span>
            </div>
            <div style={styles.metaItem}>
              <svg style={styles.icon} viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Posted {job.posted}</span>
            </div>
          </div>
          <div style={styles.jobType}>
            <span style={{...styles.jobTypeBadge, backgroundColor: '#e6f7ff', color: '#1890ff'}}>
              {job.type}
            </span>
          </div>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Career Description</h2>
          <p style={styles.description}>{job.description}</p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Education Requirements</h2>
          {job.education_required.map((edu, index) => (
            <div key={index} style={styles.requirementItem}>
              <h3 style={styles.requirementTitle}>{edu.degree} in {edu.major}</h3>
              <p style={styles.requirementDescription}>{edu.description}</p>
            </div>
          ))}
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Required Skills</h2>
          <div style={styles.skillsContainer}>
            {job.skills_required.map((skill, index) => (
              <div key={index} style={styles.requirementItem}>
                <h3 style={styles.requirementTitle}>{skill.name}</h3>
                <p style={styles.requirementDescription}>{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Language Requirements</h2>
          <div style={styles.languagesContainer}>
            {job.languages_required.map((lang, index) => (
              <div key={index} style={styles.languageItem}>
                <span style={styles.language}>{lang.language}</span>
                <span style={styles.proficiency}>{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.applySection}>
          <p style={styles.applyText}>Ready to join our team? Submit your application now!</p>
          <Link to={`/apply/${job.id}`}>
            <button style={styles.applyButton}>
              Apply Now
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px 20px 60px',
    maxWidth: '800px',
    margin: 'auto',
    fontFamily: "'Inter', system-ui, sans-serif",
    animation: 'fadeIn 0.6s ease',
    lineHeight: 1.5,
  },
  backButton: {
    marginBottom: '24px',
    backgroundColor: '#f1f5f9',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    color: '#475569',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
  },
  jobHeader: {
    marginBottom: '32px',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '24px',
  },
  jobTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '12px',
    marginTop: 0,
  },
  jobMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  company: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#334155',
  },
  metaDetails: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    marginTop: '8px',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#64748b',
    fontSize: '0.95rem',
  },
  icon: {
    color: '#64748b',
  },
  jobType: {
    marginTop: '12px',
  },
  jobTypeBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 0,
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '1px solid #f1f5f9',
  },
  description: {
    fontSize: '1rem',
    color: '#475569',
    marginTop: 0,
    marginBottom: 0,
    lineHeight: 1.6,
  },
  skillsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  requirementItem: {
    marginBottom: '16px',
    backgroundColor: '#f8fafc',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #f1f5f9',
  },
  requirementTitle: {
    fontSize: '1.05rem',
    fontWeight: '600',
    color: '#334155',
    marginTop: 0,
    marginBottom: '8px',
  },
  requirementDescription: {
    fontSize: '0.95rem',
    color: '#475569',
    marginTop: 0,
    marginBottom: 0,
  },
  languagesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },
  languageItem: {
    backgroundColor: '#f1f5f9',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#334155',
  },
  language: {
    fontWeight: '500',
  },
  proficiency: {
    color: '#64748b',
    fontSize: '0.85rem',
  },
  applySection: {
    textAlign: 'center',
    backgroundColor: '#f8fafc',
    padding: '24px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
  },
  applyText: {
    fontSize: '1.1rem',
    color: '#334155',
    marginBottom: '16px',
    marginTop: 0,
  },
  applyButton: {
    padding: '12px 30px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }
};
