import React from 'react';
import { Link } from 'react-router-dom';

const jobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Acme Corp',
    location: 'Remote',
    type: 'Full-Time',
    skills: ['React', 'Flask', 'AWS'],
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'Beta Tech',
    location: 'New York, NY',
    type: 'Contract',
    skills: ['SQL', 'Python', 'Tableau'],
  },
  {
    id: 3,
    title: 'AI Research Intern',
    company: 'DeepAI Labs',
    location: 'San Francisco, CA',
    type: 'Internship',
    skills: ['TensorFlow', 'NLP', 'Python'],
  },
];

export default function JobList() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Open Positions</h1>
      <div style={styles.grid}>
        {jobs.map((job) => (
          <div key={job.id} style={styles.card}>
            <h2 style={styles.title}>{job.title}</h2>
            <p style={styles.company}>{job.company} • {job.location}</p>
            <p style={styles.type}>{job.type}</p>

            <div style={styles.skills}>
              {job.skills.map((skill) => (
                <span key={skill} style={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>

            <div style={styles.actions}>
              <Link to={`/job/${job.id}`} style={styles.button}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2.2rem',
    marginBottom: '30px',
    textAlign: 'center',
    color: '#1e293b',
  },
  grid: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s ease',
  },
  title: {
    fontSize: '1.4rem',
    marginBottom: '8px',
    color: '#0f172a',
  },
  company: {
    color: '#475569',
    marginBottom: '4px',
    fontSize: '0.95rem',
  },
  type: {
    fontSize: '0.9rem',
    color: '#3b82f6',
    fontWeight: '500',
    marginBottom: '12px',
  },
  skills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '15px',
  },
  skill: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    padding: '4px 10px',
    borderRadius: '999px',
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  actions: {
    marginTop: 'auto',
    textAlign: 'right',
  },
  button: {
    textDecoration: 'none',
    backgroundColor: '#0ea5e9',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: '500',
    fontSize: '0.95rem',
    transition: 'background-color 0.2s ease',
  },
};
