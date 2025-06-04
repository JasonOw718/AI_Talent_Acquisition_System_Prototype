import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const jobs = [
  {
    id: 1,
    title: 'Full Stack Developer',
    company: 'Digital Nexus Solutions',
    location: 'Kuala Lumpur, Malaysia',
    type: 'Full-Time',
    skills: ['React', 'Node.js', 'MongoDB'],
    posted: '2 days ago',
    salary: 'RM 7,000 - RM 11,000',
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'Malaysian Analytics Group',
    location: 'Penang, Malaysia',
    type: 'Contract',
    skills: ['SQL', 'Python', 'Tableau', 'Power BI'],
    posted: '1 week ago',
    salary: 'RM 5,500 - RM 8,000',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'CreativeTech Malaysia',
    location: 'Petaling Jaya, Malaysia',
    type: 'Full-Time',
    skills: ['Figma', 'Adobe XD', 'UI Design', 'User Research'],
    posted: '3 days ago',
    salary: 'RM 6,000 - RM 9,000',
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'Cloud Innovate MY',
    location: 'Cyberjaya, Malaysia',
    type: 'Full-Time',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    posted: '5 days ago',
    salary: 'RM 8,000 - RM 14,000',
  },
  {
    id: 5,
    title: 'Frontend Developer',
    company: 'Tech Solutions Malaysia',
    location: 'Johor Bahru, Malaysia',
    type: 'Remote',
    skills: ['JavaScript', 'React', 'Next.js', 'TailwindCSS'],
    posted: '1 day ago',
    salary: 'RM 6,500 - RM 10,000',
  },
  {
    id: 6,
    title: 'Mobile App Developer',
    company: 'AppWorks MY',
    location: 'Kuala Lumpur, Malaysia',
    type: 'Full-Time',
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    posted: '2 weeks ago',
    salary: 'RM 7,500 - RM 12,000',
  },
];

export default function JobList() {
  const [filter, setFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  
  const locations = ['all', 'Kuala Lumpur', 'Penang', 'Petaling Jaya', 'Cyberjaya', 'Johor Bahru', 'Remote'];
  
  const filteredJobs = jobs.filter(job => {
    const textMatch = 
      job.title.toLowerCase().includes(filter.toLowerCase()) ||
      job.company.toLowerCase().includes(filter.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(filter.toLowerCase()));
      
    const locationMatch = locationFilter === 'all' || job.location.includes(locationFilter);
      
    return textMatch && locationMatch;
  });
  
  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <h1 style={styles.heading}>Find Your Next Career Opportunity</h1>
        <p style={styles.subheading}>Discover tech roles across Malaysia matching your expertise</p>
        
        <div style={styles.searchContainer}>
          <div style={styles.searchWrapper}>
            <svg style={styles.searchIcon} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search jobs by title, company, or skills..."
              style={styles.searchInput}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div style={styles.filtersSection}>
        <div style={styles.filterLabel}>Location:</div>
        <div style={styles.filtersContainer}>
          {locations.map(location => (
            <div 
              key={location} 
              style={locationFilter === location ? styles.chip : styles.inactiveChip}
              onClick={() => setLocationFilter(location)}
            >
              {location === 'all' ? 'All Locations' : location}
            </div>
          ))}
        </div>
      </div>
      
      <div style={styles.jobsContainer}>
        <div style={styles.jobCount}>{filteredJobs.length} jobs available in Malaysia</div>
        
        <div style={styles.jobsList}>
          {filteredJobs.map((job) => (
            <div key={job.id} style={styles.jobCard}>
              <div style={styles.jobHeader}>
                <div style={styles.jobInfo}>
                  <h2 style={styles.jobTitle}>{job.title}</h2>
                  <p style={styles.jobCompany}>{job.company}</p>
                </div>
                <div style={styles.jobType}>
                  <span style={{...styles.jobTypeBadge, backgroundColor: job.type === 'Full-Time' ? '#e6f7ff' : job.type === 'Contract' ? '#fff7e6' : '#f6ffed', color: job.type === 'Full-Time' ? '#1890ff' : job.type === 'Contract' ? '#fa8c16' : '#52c41a' }}>
                    {job.type}
                  </span>
                </div>
              </div>
              
              <div style={styles.jobDetails}>
                <div style={styles.jobDetail}>
                  <svg style={styles.detailIcon} viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{job.location}</span>
                </div>
                <div style={styles.jobDetail}>
                  <svg style={styles.detailIcon} viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path>
                  </svg>
                  <span>{job.salary} monthly</span>
                </div>
                <div style={styles.jobDetail}>
                  <svg style={styles.detailIcon} viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>{job.posted}</span>
                </div>
              </div>

              <div style={styles.skillsContainer}>
              {job.skills.map((skill) => (
                <span key={skill} style={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>

              <div style={styles.jobActions}>
                <Link to={`/job/${job.id}`} style={styles.viewButton}>
                View Details
              </Link>
                <Link to={`/apply/${job.id}`} style={styles.applyButton}>
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
          </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '90px 15px 40px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: '25px',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '8px',
    color: '#1e293b',
    fontWeight: '700',
  },
  subheading: {
    fontSize: '1rem',
    color: '#64748b',
    marginBottom: '25px',
  },
  searchContainer: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    color: '#94a3b8',
  },
  searchInput: {
    width: '100%',
    padding: '12px 12px 12px 44px',
    fontSize: '0.9rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    outline: 'none',
    transition: 'all 0.2s ease',
  },
  filtersSection: {
    marginBottom: '15px',
  },
  filterLabel: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '8px',
  },
  filtersContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '15px',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  inactiveChip: {
    backgroundColor: '#f1f5f9',
    color: '#475569',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '0.8rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  jobsContainer: {
    marginTop: '15px',
  },
  jobCount: {
    fontSize: '0.85rem',
    color: '#64748b',
    marginBottom: '12px',
  },
  jobsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  jobCard: {
    backgroundColor: '#ffffff',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
    border: '1px solid #f1f5f9',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  jobHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: '1.1rem',
    marginBottom: '4px',
    color: '#0f172a',
    fontWeight: '600',
  },
  jobCompany: {
    color: '#475569',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  jobType: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  jobTypeBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  jobDetails: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '12px',
  },
  jobDetail: {
    display: 'flex',
    alignItems: 'center',
    color: '#64748b',
    fontSize: '0.85rem',
  },
  detailIcon: {
    marginRight: '6px',
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '16px',
  },
  skill: {
    backgroundColor: '#f8fafc',
    color: '#475569',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '500',
    border: '1px solid #e2e8f0',
  },
  jobActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  viewButton: {
    textDecoration: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: '500',
    border: '1px solid #2563eb',
    color: '#2563eb',
    backgroundColor: 'transparent',
    transition: 'all 0.2s ease',
  },
  applyButton: {
    textDecoration: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '0.85rem',
    fontWeight: '500',
    backgroundColor: '#2563eb',
    color: 'white',
    border: '1px solid #2563eb',
    transition: 'all 0.2s ease',
  },
  '@media (max-width: 768px)': {
    heading: {
      fontSize: '1.6rem',
    },
    subheading: {
      fontSize: '0.9rem',
    },
    jobHeader: {
      flexDirection: 'column',
      gap: '8px',
    },
    jobDetails: {
      flexDirection: 'column',
      gap: '6px',
    },
    jobActions: {
      flexDirection: 'column',
      gap: '6px',
    },
  },
};
