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

const Dashboard = () => {
  const [view, setView] = useState('main');
  const [selectedJobId, setSelectedJobId] = useState(dummyJobs[0].id);
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

  // Enhanced render functions

  const renderMain = () => (
    <div className="dashboard-main">
      <h2>Recruiter Dashboard Overview</h2>
      
      <div className="stats-grid">
        <StatCard 
          icon="📊" 
          label="Active Jobs" 
          value={dummyJobs.length} 
          onClick={() => setView('manageJobs')} 
        />
        <StatCard 
          icon="👥" 
          label="Stage 1 Applicants" 
          value={Object.values(applicantsStage1).flat().length} 
          onClick={() => setView('stage1')} 
        />
        <StatCard 
          icon="✅" 
          label="Stage 2 Applicants" 
          value={8} 
          onClick={() => alert('Stage 2 View Coming Soon')} 
        />
        <StatCard 
          icon="🚫" 
          label="Spam Applications" 
          value={5} 
          onClick={() => alert('Spam Review Coming Soon')} 
        />
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <ActionButton 
            icon="👀" 
            label="Review Stage 1" 
            onClick={() => setView('stage1')} 
          />
          <ActionButton 
            icon="📝" 
            label="Create New Job" 
            onClick={() => alert('Coming Soon')} 
          />
          <ActionButton 
            icon="🛠️" 
            label="Manage Jobs" 
            onClick={() => setView('manageJobs')} 
          />
          <ActionButton 
            icon="📊" 
            label="View Analytics" 
            onClick={() => alert('Coming Soon')} 
          />
        </div>
      </div>

      <div className="recent-jobs">
        <h3>Recent Job Postings</h3>
        <div className="job-cards">
          {dummyJobs.slice(0, 3).map(job => (
            <JobCard 
              key={job.id}
              job={job}
              applicants={applicantsStage1[job.id]?.length || 0}
              onClick={() => {
                setSelectedJobId(job.id);
                setView('stage1');
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderStage1 = () => (
    <div className="stage1-container">
      <div className="applicant-list-panel">
        <div className="panel-header">
          <h3>Applicants for {dummyJobs.find(j => j.id === selectedJobId)?.title || 'Selected Job'}</h3>
          <select
            value={selectedJobId}
            onChange={(e) => {
              setSelectedJobId(parseInt(e.target.value));
              setSelectedApplicantId(null);
            }}
          >
            {dummyJobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title} ({applicantsStage1[job.id]?.length || 0})
              </option>
            ))}
          </select>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search applicants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span>🔍</span>
        </div>

        <div className="applicant-list">
          {filteredApplicants.length === 0 ? (
            <div className="empty-state">No applicants found</div>
          ) : (
            filteredApplicants.map((app) => (
              <div
                key={app.id}
                className={`applicant-card ${selectedApplicantId === app.id ? 'selected' : ''}`}
                onClick={() => setSelectedApplicantId(app.id)}
              >
                <div className="applicant-avatar">{app.name.charAt(0)}</div>
                <div className="applicant-info">
                  <h4>{app.name}</h4>
                  <p>{app.email}</p>
                  <div className="applicant-meta">
                    <span>Applied: {formatDate(app.applied)}</span>
                    <span>Score: {averageScore(app.scores)}%</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <button 
          className="back-button"
          onClick={() => {
            setView('main');
            setSelectedApplicantId(null);
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="applicant-detail-panel">
        {!selectedApplicant ? (
          <div className="empty-detail">
            <div className="empty-icon">👈</div>
            <h3>Select an applicant</h3>
            <p>Choose from the list to view details</p>
          </div>
        ) : (
          <>
            <div className="applicant-header">
              <div className="applicant-avatar large">{selectedApplicant.name.charAt(0)}</div>
              <div>
                <h2>{selectedApplicant.name}</h2>
                <p className="applicant-contact">
                  {selectedApplicant.email} • {selectedApplicant.phone}
                </p>
                <p className="applicant-meta">
                  Applied on {formatDate(selectedApplicant.applied)} • Overall Score: {averageScore(selectedApplicant.scores)}%
                </p>
              </div>
            </div>

            <div className="section">
              <h3>Skills Assessment</h3>
              <div className="skills-grid">
                {Object.entries(selectedApplicant.scores).map(([skill, score]) => (
                  <div key={skill} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill}</span>
                      <span className="skill-score">{score}%</span>
                    </div>
                    <div className="skill-bar-container">
                      <div 
                        className="skill-bar" 
                        style={{ width: `${score}%`, backgroundColor: getScoreColor(score) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section">
              <h3>Application Details</h3>
              <div className="justification-box">
                <p>{selectedApplicant.justification}</p>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="action-button primary"
                onClick={() => moveToStage2(selectedApplicant.id)}
              >
                Move to Stage 2
              </button>
              <button 
                className="action-button secondary"
                onClick={() => alert('Schedule interview')}
              >
                Schedule Interview
              </button>
              <button 
                className="action-button danger"
                onClick={() => {
                  if (window.confirm(`Are you sure you want to reject ${selectedApplicant.name}?`)) {
                    moveToStage2(selectedApplicant.id);
                  }
                }}
              >
                Reject Application
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderManageJobs = () => (
    <div className="manage-jobs">
      <div className="header-with-button">
        <h2>Manage Job Postings</h2>
        <button 
          className="create-job-button"
          onClick={() => alert('Create new job form')}
        >
          + Create New Job
        </button>
      </div>

      <div className="jobs-table">
        <div className="table-header">
          <div>Job Title</div>
          <div>Posted Date</div>
          <div>Applicants</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {dummyJobs.map((job) => (
          <div key={job.id} className="table-row">
            <div className="job-title">{job.title}</div>
            <div>{formatDate(job.posted)}</div>
            <div>{applicantsStage1[job.id]?.length || 0}</div>
            <div><span className="status-badge active">Active</span></div>
            <div className="job-actions">
              <button onClick={() => {
                setSelectedJobId(job.id);
                setView('stage1');
              }}>View Applicants</button>
              <button onClick={() => alert(`Edit ${job.title}`)}>Edit</button>
              <button className="danger" onClick={() => alert(`Archive ${job.title}`)}>Archive</button>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="back-button"
        onClick={() => setView('main')}
      >
        ← Back to Dashboard
      </button>
    </div>
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>RecruiterPro</h1>
          <nav className="view-switcher">
            <button 
              className={view === 'main' ? 'active' : ''}
              onClick={() => setView('main')}
            >
              Dashboard
            </button>
            <button 
              className={view === 'stage1' ? 'active' : ''}
              onClick={() => setView('stage1')}
            >
              Applicants
            </button>
            <button 
              className={view === 'manageJobs' ? 'active' : ''}
              onClick={() => setView('manageJobs')}
            >
              Jobs
            </button>
          </nav>
        </div>
        <div className="user-menu">
          <span className="user-name">John Recruiter</span>
          <button className="sign-out-button" onClick={() => alert('Sign Out')}>
            Sign Out
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        {view === 'main' && renderMain()}
        {view === 'stage1' && renderStage1()}
        {view === 'manageJobs' && renderManageJobs()}
      </main>

      <style jsx>{`
        /* Base Styles */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: #f5f7fa;
          color: #333;
        }
        
        /* Dashboard Container */
        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        /* Header Styles */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          margin-bottom: 30px;
          border-bottom: 1px solid #e1e5eb;
        }
        
        .header-left {
          display: flex;
          align-items: center;
          gap: 40px;
        }
        
        .dashboard-header h1 {
          font-size: 24px;
          font-weight: 700;
          color: #2d3748;
        }
        
        .view-switcher {
          display: flex;
          gap: 15px;
        }
        
        .view-switcher button {
          background: none;
          border: none;
          padding: 8px 16px;
          font-size: 15px;
          color: #64748b;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        
        .view-switcher button:hover {
          color: #334155;
          background-color: #f1f5f9;
        }
        
        .view-switcher button.active {
          color: #2563eb;
          background-color: #dbeafe;
          font-weight: 500;
        }
        
        .user-menu {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .user-name {
          font-weight: 500;
        }
        
        .sign-out-button {
          background: none;
          border: 1px solid #e2e8f0;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .sign-out-button:hover {
          background-color: #f8fafc;
          border-color: #cbd5e1;
        }
        
        /* Main Dashboard View */
        .dashboard-main {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        
        .dashboard-main h2 {
          font-size: 24px;
          color: #1e293b;
          margin-bottom: 10px;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        
        .quick-actions {
          background-color: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .action-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }
        
        .recent-jobs {
          background-color: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .job-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        
        /* Stage 1 View */
        .stage1-container {
          display: flex;
          height: calc(100vh - 150px);
          gap: 20px;
        }
        
        .applicant-list-panel {
          width: 350px;
          background-color: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        .panel-header {
          margin-bottom: 20px;
        }
        
        .panel-header select {
          width: 100%;
          padding: 10px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          margin-top: 10px;
          font-size: 14px;
        }
        
        .search-box {
          position: relative;
          margin-bottom: 20px;
        }
        
        .search-box input {
          width: 100%;
          padding: 10px 10px 10px 35px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 14px;
        }
        
        .search-box span {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }
        
        .applicant-list {
          flex: 1;
          overflow-y: auto;
          padding-right: 5px;
        }
        
        .applicant-card {
          display: flex;
          gap: 15px;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid #f1f5f9;
        }
        
        .applicant-card:hover {
          background-color: #f8fafc;
          border-color: #e2e8f0;
        }
        
        .applicant-card.selected {
          background-color: #eff6ff;
          border-color: #bfdbfe;
        }
        
        .applicant-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }
        
        .applicant-info {
          flex: 1;
          overflow: hidden;
        }
        
        .applicant-info h4 {
          font-size: 15px;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .applicant-info p {
          font-size: 13px;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .applicant-meta {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #94a3b8;
          margin-top: 5px;
        }
        
        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #94a3b8;
          font-size: 14px;
        }
        
        .applicant-detail-panel {
          flex: 1;
          background-color: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          overflow-y: auto;
        }
        
        .empty-detail {
          text-align: center;
          padding: 60px 20px;
          color: #94a3b8;
        }
        
        .empty-icon {
          font-size: 40px;
          margin-bottom: 15px;
        }
        
        .applicant-header {
          display: flex;
          gap: 20px;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .applicant-avatar.large {
          width: 70px;
          height: 70px;
          font-size: 24px;
        }
        
        .applicant-header h2 {
          font-size: 22px;
          margin-bottom: 5px;
        }
        
        .applicant-contact {
          color: #64748b;
          margin-bottom: 5px;
        }
        
        .applicant-meta {
          font-size: 14px;
          color: #94a3b8;
        }
        
        .section {
          margin-bottom: 30px;
        }
        
        .section h3 {
          font-size: 18px;
          margin-bottom: 15px;
          color: #1e293b;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
        }
        
        .skill-item {
          margin-bottom: 10px;
        }
        
        .skill-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        
        .skill-name {
          font-weight: 500;
        }
        
        .skill-score {
          color: #64748b;
        }
        
        .skill-bar-container {
          height: 8px;
          background-color: #f1f5f9;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .skill-bar {
          height: 100%;
          border-radius: 4px;
        }
        
        .justification-box {
          background-color: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          line-height: 1.6;
        }
        
        .action-buttons {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }
        
        .action-button {
          padding: 12px 20px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }
        
        .action-button.primary {
          background-color: #3b82f6;
          color: white;
        }
        
        .action-button.primary:hover {
          background-color: #2563eb;
        }
        
        .action-button.secondary {
          background-color: #e2e8f0;
          color: #334155;
        }
        
        .action-button.secondary:hover {
          background-color: #cbd5e1;
        }
        
        .action-button.danger {
          background-color: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }
        
        .action-button.danger:hover {
          background-color: #fee2e2;
        }
        
        /* Manage Jobs View */
        .manage-jobs {
          background-color: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .header-with-button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }
        
        .create-job-button {
          background-color: #3b82f6;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .create-job-button:hover {
          background-color: #2563eb;
        }
        
        .jobs-table {
          margin-bottom: 30px;
        }
        
        .table-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
          padding: 15px 0;
          border-bottom: 1px solid #f1f5f9;
          font-weight: 500;
          color: #64748b;
        }
        
        .table-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
          padding: 15px 0;
          border-bottom: 1px solid #f1f5f9;
          align-items: center;
        }
        
        .job-title {
          font-weight: 500;
        }
        
        .status-badge {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .status-badge.active {
          background-color: #dcfce7;
          color: #166534;
        }
        
        .job-actions {
          display: flex;
          gap: 10px;
        }
        
        .job-actions button {
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 13px;
          cursor: pointer;
          border: 1px solid #e2e8f0;
          background-color: white;
          transition: all 0.2s ease;
        }
        
        .job-actions button:hover {
          background-color: #f8fafc;
        }
        
        .job-actions button.danger {
          color: #dc2626;
          border-color: #fecaca;
          background-color: #fef2f2;
        }
        
        .job-actions button.danger:hover {
          background-color: #fee2e2;
        }
        
        /* Back Button */
        .back-button {
          background: none;
          border: none;
          color: #64748b;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 0;
          transition: color 0.2s ease;
        }
        
        .back-button:hover {
          color: #334155;
        }
        
        /* Utility Classes */
        .empty-state {
          color: #94a3b8;
          text-align: center;
          padding: 40px 20px;
        }
      `}</style>
    </div>
  );
};

// Helper Components
const StatCard = ({ icon, label, value, onClick }) => (
  <div className="stat-card" onClick={onClick}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

const JobCard = ({ job, applicants, onClick }) => (
  <div className="job-card" onClick={onClick}>
    <h3>{job.title}</h3>
    <p className="job-meta">Posted {formatDate(job.posted)}</p>
    <div className="applicant-count">
      <span>{applicants} applicant{applicants !== 1 ? 's' : ''}</span>
    </div>
    <button className="view-button">View Applicants →</button>
  </div>
);

const ActionButton = ({ icon, label, onClick }) => (
  <button className="action-btn" onClick={onClick}>
    <span className="action-icon">{icon}</span>
    <span>{label}</span>
  </button>
);

// Utility Functions
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function averageScore(scores) {
  const values = Object.values(scores);
  if (values.length === 0) return 0;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

function getScoreColor(score) {
  if (score >= 85) return '#10b981'; // Green
  if (score >= 70) return '#3b82f6'; // Blue
  if (score >= 50) return '#f59e0b'; // Yellow
  return '#ef4444'; // Red
}

export default Dashboard;