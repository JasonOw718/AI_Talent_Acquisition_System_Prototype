import React, { useState } from 'react';

// Enhanced dummy data
const dummyJobs = [
  { id: 1, title: 'Frontend Developer', posted: '2023-05-15', applicants: 24 },
  { id: 2, title: 'Backend Engineer', posted: '2023-06-01', applicants: 18 },
  { id: 3, title: 'UX Designer', posted: '2023-06-10', applicants: 12 },
];

const dummyApplicantsStage1 = {
  1: [
    {
      id: 101,
      name: 'Kai Zhi',
      email: 'kaizhi@example.com',
      phone: '(555) 123-4567',
      scores: { JavaScript: 92, React: 88, CSS: 85 },
      justification: 'Strong foundation in React with 3 years of experience at TechCorp. Excellent problem-solving skills demonstrated in coding challenge.',
      status: 'stage1',
      applied: '2023-05-20',
    },
    {
      id: 102,
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '(555) 987-6543',
      scores: { JavaScript: 78, React: 75, CSS: 82 },
      justification: 'Good understanding of frontend architecture. Needs some improvement in React optimization techniques.',
      status: 'stage1',
      applied: '2023-05-18',
    },
  ],
  2: [
    {
      id: 201,
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      phone: '(555) 456-7890',
      scores: { Python: 88, Django: 85, 'REST APIs': 90 },
      justification: 'Extensive experience with Django and building scalable backend systems. Led backend team at previous startup.',
      status: 'stage1',
      applied: '2023-06-05',
    },
    {
      id: 202,
      name: 'Diana Prince',
      email: 'diana@example.com',
      phone: '(555) 789-0123',
      scores: { Python: 92, 'Node.js': 85, Databases: 88 },
      justification: 'Strong database design skills with experience in both SQL and NoSQL. Quick learner and team player.',
      status: 'stage1',
      applied: '2023-06-03',
    },
  ],
  3: [
    {
      id: 301,
      name: 'Eve Adams',
      email: 'eve@example.com',
      phone: '(555) 234-5678',
      scores: { 'UI Design': 90, 'UX Research': 85, Figma: 92 },
      justification: 'Exceptional portfolio with innovative design solutions. Strong user research background.',
      status: 'stage1',
      applied: '2023-06-12',
    },
  ],
};

const dummyApplicantsStage2 = {
  1: [
    {
      id: 103,
      name: 'Olivia Garcia',
      email: 'olivia@example.com',
      phone: '(555) 111-2222',
      scores: { JavaScript: 94, React: 92, CSS: 88 },
      justification: 'Exceptional React skills with deep understanding of state management. Created impressive portfolio projects.',
      status: 'stage2',
      applied: '2023-05-19',
    },
    {
      id: 104,
      name: 'Jackson Wei',
      email: 'jackson@example.com',
      phone: '(555) 333-4444',
      scores: { JavaScript: 90, React: 87, CSS: 91 },
      justification: 'Strong UI development skills. Previous experience at a major tech company with similar tech stack.',
      status: 'stage2',
      applied: '2023-05-17',
    },
  ],
  2: [
    {
      id: 203,
      name: 'Sophia Kim',
      email: 'sophia@example.com',
      phone: '(555) 555-6666',
      scores: { Python: 95, Django: 90, 'REST APIs': 92 },
      justification: 'Expert in building scalable backend systems. Published author on API design.',
      status: 'stage2',
      applied: '2023-06-02',
    },
  ],
  3: [
    {
      id: 302,
      name: 'James Johnson',
      email: 'james@example.com',
      phone: '(555) 777-8888',
      scores: { 'UI Design': 94, 'UX Research': 88, Figma: 95 },
      justification: 'Award-winning designer with strong portfolio of enterprise applications.',
      status: 'stage2',
      applied: '2023-06-11',
    },
  ],
};

const spamApplicants = [
  { id: 901, name: 'Spam Bot 1', email: 'spam1@example.com', applied: '2023-06-15' },
  { id: 902, name: 'Spam Bot 2', email: 'spam2@example.com', applied: '2023-06-16' },
  { id: 903, name: 'Spam Bot 3', email: 'spam3@example.com', applied: '2023-06-16' },
  { id: 904, name: 'Spam Bot 4', email: 'spam4@example.com', applied: '2023-06-17' },
  { id: 905, name: 'Spam Bot 5', email: 'spam5@example.com', applied: '2023-06-17' },
];

const Dashboard = () => {
  const [view, setView] = useState('jobList');
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicantsStage1, setApplicantsStage1] = useState(dummyApplicantsStage1);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter applicants by search term
  const filteredApplicants = (applicantsStage1[selectedJobId] || [])
    .filter(applicant => 
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const selectedApplicant = filteredApplicants.find((a) => a.id === selectedApplicantId);

  const moveToStage2 = (appId) => {
    setApplicantsStage1((prev) => {
      const updated = { ...prev };
      updated[selectedJobId] = updated[selectedJobId].filter((a) => a.id !== appId);
      return updated;
    });
    setSelectedApplicantId(null);
  };

  // Render the job list view
  const renderJobList = () => (
    <div className="dashboard-main" style={styles.dashboardMain}>
      <div style={styles.header}>
        <h2 style={styles.dashboardTitle}>Recruiter Dashboard</h2>
        <button 
          style={styles.newJobButton}
          onClick={() => alert('Create New Job feature coming soon!')}
        >
          + Create New Job
        </button>
      </div>
      
      <div style={styles.statsBar}>
        <div style={styles.statsItem}>
          <span style={styles.statsIcon}>👥</span>
          <div style={styles.statsContent}>
            <h3 style={styles.statsValue}>5</h3>
            <p style={styles.statsLabel}>Stage 1 Applicants</p>
          </div>
        </div>
        <div style={styles.statsItem}>
          <span style={styles.statsIcon}>✅</span>
          <div style={styles.statsContent}>
            <h3 style={styles.statsValue}>8</h3>
            <p style={styles.statsLabel}>Stage 2 Applicants</p>
          </div>
        </div>
        <div style={styles.statsItem}>
          <span style={styles.statsIcon}>🚫</span>
          <div style={styles.statsContent}>
            <h3 style={styles.statsValue}>5</h3>
            <p style={styles.statsLabel}>Spam Applications</p>
          </div>
        </div>
      </div>

      <div style={styles.jobsContainer}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search jobs..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span style={styles.searchIcon}>🔍</span>
      </div>

        <table style={styles.jobsTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Job Title</th>
              <th style={styles.tableHeader}>Posted Date</th>
              <th style={styles.tableHeader}>Applicants</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyJobs.filter(job => 
              job.title.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((job) => (
              <tr key={job.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{job.title}</td>
                <td style={styles.tableCell}>{formatDate(job.posted)}</td>
                <td style={styles.tableCell}>
                  <div style={styles.applicantCount}>
                    <span style={styles.stage1Count}>
                      {applicantsStage1[job.id]?.length || 0}
                    </span>
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <button 
                    style={styles.viewButton}
              onClick={() => {
                setSelectedJobId(job.id);
                      setView('applicantList');
                    }}
                  >
                    View Applicants
                  </button>
                  <button 
                    style={styles.editButton}
                    onClick={() => alert(`Edit job ${job.id} (coming soon)`)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render the applicant list view
  const renderApplicantList = () => {
    const job = dummyJobs.find(j => j.id === selectedJobId);
    
    return (
      <div style={styles.applicantListContainer}>
        <div style={styles.applicantListHeader}>
          <button 
            style={styles.backButton}
            onClick={() => {
              setView('jobList');
              setSelectedApplicantId(null);
            }}
          >
            ← Back to Jobs
          </button>
          <h2 style={styles.applicantListTitle}>
            Applicants for: {job?.title}
          </h2>
        </div>

        <div style={styles.applicantsContent}>
          <div style={styles.applicantList}>
            <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search applicants..."
                style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
              <span style={styles.searchIcon}>🔍</span>
        </div>

            <div style={styles.applicantCards}>
              {filteredApplicants.map(app => (
              <div
                key={app.id}
                  style={{
                    ...styles.applicantCard,
                    ...(selectedApplicantId === app.id ? styles.selectedCard : {})
                  }}
                onClick={() => setSelectedApplicantId(app.id)}
              >
                  <div style={styles.applicantAvatar}>{app.name.charAt(0)}</div>
                  <div style={styles.applicantInfo}>
                    <h4 style={styles.applicantName}>{app.name}</h4>
                    <p style={styles.applicantEmail}>{app.email}</p>
                    <div style={styles.applicantMeta}>
                    <span>Applied: {formatDate(app.applied)}</span>
                    <span>Score: {averageScore(app.scores)}%</span>
                  </div>
                </div>
              </div>
              ))}
              {filteredApplicants.length === 0 && (
                <div style={styles.emptyState}>
                  <p>No applicants found</p>
                </div>
          )}
        </div>
      </div>

          <div style={styles.applicantDetails}>
        {!selectedApplicant ? (
              <div style={styles.emptyDetails}>
                <div style={styles.emptyIcon}>👈</div>
            <h3>Select an applicant</h3>
            <p>Choose from the list to view details</p>
          </div>
        ) : (
              <div style={styles.detailsContent}>
                <div style={styles.detailsHeader}>
                  <div style={styles.applicantAvatarLarge}>{selectedApplicant.name.charAt(0)}</div>
              <div>
                    <h2 style={styles.detailsName}>{selectedApplicant.name}</h2>
                    <p style={styles.detailsContact}>
                      <span>{selectedApplicant.email}</span>
                      <span>•</span>
                      <span>{selectedApplicant.phone}</span>
                    </p>
                    <p style={styles.appliedDate}>Applied: {formatDate(selectedApplicant.applied)}</p>
              </div>
            </div>

                <div style={styles.scoreSection}>
                  <h3 style={styles.sectionTitle}>Assessment Scores</h3>
                  <div style={styles.scoreGrid}>
                {Object.entries(selectedApplicant.scores).map(([skill, score]) => (
                      <div key={skill} style={styles.scoreCard}>
                        <div style={styles.scoreLabel}>{skill}</div>
                        <div style={{
                          ...styles.scoreValue,
                          color: getScoreColor(score)
                        }}>
                          {score}%
                    </div>
                  </div>
                ))}
              </div>
                  <div style={styles.averageScore}>
                    <span>Overall Score: </span>
                    <span style={{
                      fontWeight: 'bold',
                      color: getScoreColor(averageScore(selectedApplicant.scores))
                    }}>
                      {averageScore(selectedApplicant.scores)}%
                    </span>
                  </div>
            </div>

                <div style={styles.justificationSection}>
                  <h3 style={styles.sectionTitle}>AI Justification</h3>
                  <p style={styles.justificationText}>{selectedApplicant.justification}</p>
            </div>

                <div style={styles.actionsSection}>
              <button 
                    style={styles.promoteButton}
                onClick={() => moveToStage2(selectedApplicant.id)}
              >
                    Move to Stage 2 →
              </button>
              <button 
                    style={styles.rejectButton}
                    onClick={() => alert(`Reject ${selectedApplicant.name} (coming soon)`)}
                  >
                    Reject Candidate
              </button>
            </div>
              </div>
        )}
      </div>
    </div>
    </div>
  );
  };

  return (
    <div style={styles.container}>
      {view === 'jobList' ? renderJobList() : renderApplicantList()}
    </div>
  );
};

// Utility functions
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function averageScore(scores) {
  const values = Object.values(scores);
  return Math.round(values.reduce((sum, val) => sum + val, 0) / values.length);
}

function getScoreColor(score) {
  if (score >= 90) return '#388e3c';
  if (score >= 80) return '#689f38';
  if (score >= 70) return '#afb42b';
  if (score >= 60) return '#fbc02d';
  return '#e64a19';
}

// Styles
const styles = {
  container: {
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
    padding: '20px',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
  },
  dashboardMain: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  dashboardTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
    color: '#333',
  },
  newJobButton: {
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  statsBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },
  statsItem: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '16px',
    margin: '0 8px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  statsIcon: {
    fontSize: '24px',
    marginRight: '16px',
  },
  statsContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  statsValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
    color: '#333',
  },
  statsLabel: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '4px 0 0 0',
  },
  jobsContainer: {
    marginTop: '24px',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '16px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 16px 10px 40px',
    fontSize: '14px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: '#f9fafb',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
  },
  jobsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '16px',
  },
  tableHeader: {
    textAlign: 'left',
    padding: '12px 16px',
    borderBottom: '1px solid #e5e7eb',
    color: '#6b7280',
    fontWeight: '600',
    fontSize: '14px',
  },
  tableRow: {
    borderBottom: '1px solid #e5e7eb',
  },
  tableCell: {
    padding: '16px',
    fontSize: '14px',
    color: '#374151',
  },
  applicantCount: {
    display: 'flex',
    alignItems: 'center',
  },
  stage1Count: {
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  countDivider: {
    margin: '0 4px',
    color: '#9ca3af',
  },
  stage2Count: {
    fontWeight: 'bold',
    color: '#10b981',
  },
  viewButton: {
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '13px',
    marginRight: '8px',
    cursor: 'pointer',
  },
  editButton: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    padding: '8px 12px',
    fontSize: '13px',
    cursor: 'pointer',
  },
  applicantListContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
  },
  applicantListHeader: {
    padding: '20px 24px',
    borderBottom: '1px solid #e5e7eb',
  },
  backButton: {
    backgroundColor: 'transparent',
    color: '#4f46e5',
    border: 'none',
    padding: '8px 0',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '12px',
  },
  applicantListTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 16px 0',
    color: '#333',
  },
  applicantsContent: {
    display: 'flex',
    height: 'calc(100vh - 200px)',
  },
  applicantList: {
    width: '40%',
    borderRight: '1px solid #e5e7eb',
    padding: '20px',
    overflowY: 'auto',
  },
  applicantCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '16px',
  },
  applicantCard: {
    display: 'flex',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: '#fff',
  },
  selectedCard: {
    borderColor: '#4f46e5',
    boxShadow: '0 0 0 1px #4f46e5',
  },
  applicantAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#4f46e5',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    marginRight: '16px',
  },
  applicantInfo: {
    flex: 1,
  },
  applicantName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 4px 0',
    color: '#111827',
  },
  applicantEmail: {
    fontSize: '14px',
    margin: '0 0 8px 0',
    color: '#4b5563',
  },
  applicantMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#6b7280',
  },
  spamCard: {
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#fff',
  },
  spamHeader: {
    display: 'flex',
    marginBottom: '12px',
  },
  spamActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
  },
  recoverButton: {
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '13px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '13px',
    cursor: 'pointer',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 0',
    color: '#6b7280',
  },
  applicantDetails: {
    flex: 1,
    padding: '24px',
    overflowY: 'auto',
  },
  emptyDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#9ca3af',
  },
  emptyIcon: {
    fontSize: '32px',
    marginBottom: '16px',
  },
  detailsContent: {
    maxWidth: '800px',
  },
  detailsHeader: {
    display: 'flex',
    marginBottom: '24px',
  },
  applicantAvatarLarge: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#4f46e5',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginRight: '20px',
  },
  detailsName: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
    color: '#111827',
  },
  detailsContact: {
    display: 'flex',
    gap: '8px',
    fontSize: '14px',
    color: '#4b5563',
    margin: '0 0 4px 0',
  },
  appliedDate: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  scoreSection: {
    marginBottom: '24px',
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 16px 0',
    color: '#374151',
  },
  scoreGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '12px',
    marginBottom: '16px',
  },
  scoreCard: {
    backgroundColor: 'white',
    borderRadius: '6px',
    padding: '12px',
    textAlign: 'center',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  scoreLabel: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '8px',
  },
  scoreValue: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  averageScore: {
    textAlign: 'right',
    fontSize: '16px',
    color: '#4b5563',
  },
  justificationSection: {
    marginBottom: '24px',
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
  },
  justificationText: {
    fontSize: '14px',
    lineHeight: 1.6,
    color: '#4b5563',
    margin: 0,
  },
  actionsSection: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '32px',
  },
  promoteButton: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  rejectButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default Dashboard;