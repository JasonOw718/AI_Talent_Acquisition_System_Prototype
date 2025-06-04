import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecruiterNavbar from '../components/RecruiterNavbar';
import RecruitmentFunnel from '../components/RecruitmentFunnel';

export default function JobListings() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeStage, setActiveStage] = useState('stage1');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Track window size for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Determine if we're on a mobile/small screen
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  
  // Mock job data with Malaysian locations
  const jobs = [
    { id: 1, title: 'Frontend Developer', location: 'Kuala Lumpur', department: 'Engineering', posted: '2023-05-15', status: 'Active' },
    { id: 2, title: 'Backend Engineer', location: 'Penang', department: 'Engineering', posted: '2023-06-01', status: 'Active' },
    { id: 3, title: 'UX Designer', location: 'Remote', department: 'Design', posted: '2023-06-10', status: 'Active' },
    { id: 4, title: 'Data Analyst', location: 'Johor Bahru', department: 'Data Science', posted: '2023-06-15', status: 'Active' },
    { id: 5, title: 'DevOps Engineer', location: 'Kuala Lumpur', department: 'Engineering', posted: '2023-06-20', status: 'Active' },
  ];

  // Mock applicant data with Malaysian names
  const applicants = {
    stage1: [
      { 
        id: 101, 
        name: 'Ahmad bin Abdullah', 
        email: 'ahmad@example.com', 
        status: 'stage1', 
        appliedDate: '2023-06-01', 
        jobId: 1, 
        scores: { 
          'JavaScript': 85, 
          'React': 92, 
          'CSS': 78 
        },
        softSkills: {
          'Communication': 90,
          'Teamwork': 85,
          'Problem Solving': 88
        },
        justifications: {
          'JavaScript': 'Demonstrated strong JavaScript fundamentals in technical assessment. Familiar with ES6+ features and asynchronous programming.',
          'React': 'Has built several React applications with modern hooks. Experience with state management solutions like Redux.',
          'CSS': 'Good knowledge of CSS grid and flexbox layouts. Implemented responsive designs for multiple projects.',
          'Communication': 'Clear communication during interview process. Effectively explained complex technical concepts.',
          'Teamwork': 'Worked in agile teams for 3+ years. Good collaboration skills as reported by references.',
          'Problem Solving': 'Strong analytical thinking shown in coding challenges. Approaches problems methodically.'
        }
      },
      { 
        id: 102, 
        name: 'Siti binti Mohamed', 
        email: 'siti@example.com', 
        status: 'stage1', 
        appliedDate: '2023-06-02', 
        jobId: 1, 
        scores: { 
          'JavaScript': 90, 
          'React': 88, 
          'CSS': 85 
        },
        softSkills: {
          'Communication': 85,
          'Teamwork': 92,
          'Problem Solving': 80
        },
        justifications: {
          'JavaScript': 'Strong JavaScript skills with experience in advanced patterns. Good knowledge of newer language features.',
          'React': 'Built multiple production React applications. Understands component lifecycle and optimization.',
          'CSS': 'Experience with CSS frameworks like Tailwind. Strong knowledge of modern CSS techniques.',
          'Communication': 'Articulate and concise in interview. Well-structured responses to technical questions.',
          'Teamwork': 'Led small development teams. Strong references from past team members.',
          'Problem Solving': 'Good at breaking down complex problems. Demonstrated creative solutions during assessment.'
        }
      },
      { 
        id: 103, 
        name: 'Tan Wei Ming', 
        email: 'tan@example.com', 
        status: 'stage1', 
        appliedDate: '2023-06-03', 
        jobId: 1, 
        scores: { 
          'JavaScript': 82, 
          'React': 85, 
          'CSS': 80 
        },
        softSkills: {
          'Communication': 82,
          'Teamwork': 88,
          'Problem Solving': 85
        },
        justifications: {
          'JavaScript': 'Solid grasp of JavaScript fundamentals. Has experience building interactive web applications.',
          'React': 'Experience with React hooks and context API. Understands component-based architecture.',
          'CSS': 'Knowledge of responsive design principles. Experience with CSS preprocessors.',
          'Communication': 'Clear communication style. Asks good clarifying questions.',
          'Teamwork': 'Experience in collaborative environments. Positive feedback from past collaborators.',
          'Problem Solving': 'Analytical approach to challenges. Demonstrated ability to debug complex issues.'
        }
      },
      { 
        id: 201, 
        name: 'Chong Li Mei', 
        email: 'chong@example.com', 
        status: 'stage1', 
        appliedDate: '2023-06-05', 
        jobId: 2, 
        scores: { 
          'Python': 88, 
          'Node.js': 90, 
          'Databases': 85 
        },
        softSkills: {
          'Communication': 78,
          'Teamwork': 85,
          'Problem Solving': 92
        },
        justifications: {
          'Python': 'Strong Python skills with experience in web frameworks like Django and Flask.',
          'Node.js': 'Built scalable backend services with Express. Good understanding of async patterns.',
          'Databases': 'Experience with both SQL and NoSQL databases. Knowledge of query optimization.',
          'Communication': 'Adequate communication skills. Sometimes needs to improve clarity in technical discussions.',
          'Teamwork': 'Works well in collaborative environments. Values input from team members.',
          'Problem Solving': 'Exceptional analytical skills. Quickly identifies root causes of issues.'
        }
      },
      { 
        id: 202, 
        name: 'Rajesh Kumar', 
        email: 'rajesh@example.com', 
        status: 'stage1', 
        appliedDate: '2023-06-07', 
        jobId: 2, 
        scores: { 
          'Python': 92, 
          'Node.js': 84, 
          'Databases': 90 
        },
        softSkills: {
          'Communication': 88,
          'Teamwork': 80,
          'Problem Solving': 90
        },
        justifications: {
          'Python': 'Expert Python developer with data science experience. Strong algorithmic skills.',
          'Node.js': 'Good understanding of Node.js environment. Experience building RESTful APIs.',
          'Databases': 'Deep knowledge of database design and optimization. Experience with high-load systems.',
          'Communication': 'Articulate in explaining technical concepts. Good documentation practices.',
          'Teamwork': 'Functions well in team settings. Sometimes prefers independent work.',
          'Problem Solving': 'Excellent analytical mindset. Approaches problems systematically with creative solutions.'
        }
      },
    ],
    stage2: [
      { 
        id: 104, 
        name: 'Nurul Huda binti Hassan', 
        email: 'nurul@example.com', 
        status: 'stage2', 
        appliedDate: '2023-05-28', 
        jobId: 1, 
        scores: { 
          'JavaScript': 95, 
          'React': 94, 
          'CSS': 90 
        },
        softSkills: {
          'Communication': 92,
          'Teamwork': 88,
          'Problem Solving': 94
        },
        justifications: {
          'JavaScript': 'Exceptional JavaScript skills. Deep understanding of language intricacies and optimization techniques.',
          'React': 'Advanced React developer with experience building complex applications. Expert in performance optimization.',
          'CSS': 'Strong CSS skills with experience in advanced animations and layouts. Knowledge of CSS architecture patterns.',
          'Communication': 'Excellent communicator. Articulates ideas clearly and tailors explanations to audience knowledge level.',
          'Teamwork': 'Thrives in collaborative environments. Previous experience mentoring junior developers.',
          'Problem Solving': 'Outstanding problem solver. Approaches challenges methodically and creatively.'
        }
      },
      { 
        id: 203, 
        name: 'Lim Jian Wei', 
        email: 'lim@example.com', 
        status: 'stage2', 
        appliedDate: '2023-06-02', 
        jobId: 2, 
        scores: { 
          'Python': 94, 
          'Node.js': 92, 
          'Databases': 93 
        },
        softSkills: {
          'Communication': 90,
          'Teamwork': 87,
          'Problem Solving': 95
        },
        justifications: {
          'Python': 'Expert Python developer with experience in machine learning applications and web development.',
          'Node.js': 'Advanced Node.js skills with focus on scalable architecture and real-time applications.',
          'Databases': 'Deep expertise in database optimization and design. Experience with high-throughput systems.',
          'Communication': 'Strong communicator who can explain complex concepts clearly. Good documentation practices.',
          'Teamwork': 'Works well in team settings with experience leading small technical teams.',
          'Problem Solving': 'Exceptional problem solver with analytical approach. Consistently finds elegant solutions.'
        }
      },
    ],
    offered: [
      { 
        id: 105, 
        name: 'Aisha binti Rahman', 
        email: 'aisha@example.com', 
        status: 'offered', 
        appliedDate: '2023-05-25', 
        jobId: 1, 
        scores: { 
          'JavaScript': 98, 
          'React': 96, 
          'CSS': 94 
        },
        softSkills: {
          'Communication': 95,
          'Teamwork': 93,
          'Problem Solving': 97
        },
        justifications: {
          'JavaScript': 'Top-tier JavaScript developer with expert-level understanding of the language and ecosystem.',
          'React': 'Outstanding React skills. Has designed and implemented complex component architectures and design systems.',
          'CSS': 'Expert-level CSS knowledge including animations, advanced layouts, and cross-browser compatibility.',
          'Communication': 'Exceptional communication skills. Able to convey complex ideas clearly to both technical and non-technical audiences.',
          'Teamwork': 'Excellent team player with leadership experience. Known for fostering collaborative environments.',
          'Problem Solving': 'Superior problem-solving abilities. Consistently approaches challenges with innovative solutions.'
        }
      },
    ],
    spam: [
      { 
        id: 301, 
        name: 'Mohd Faizal bin Aziz', 
        email: 'faizal@example.com', 
        status: 'spam', 
        appliedDate: '2023-06-04', 
        jobId: 1, 
        scores: { 
          'JavaScript': 25, 
          'React': 15, 
          'CSS': 30 
        },
        softSkills: {
          'Communication': 20,
          'Teamwork': 15,
          'Problem Solving': 10
        },
        spamReason: 'Application flagged by system.',
        justifications: {
          'JavaScript': 'Very limited knowledge of JavaScript fundamentals. Unable to demonstrate basic concepts.',
          'React': 'No practical experience with React. Only theoretical knowledge from online courses.',
          'CSS': 'Basic understanding of CSS but lacks knowledge of modern techniques.',
          'Communication': 'Poor communication skills shown in application materials.',
          'Teamwork': 'No evidence of collaborative work experience provided.',
          'Problem Solving': 'Limited problem-solving skills demonstrated in assessment.'
        }
      },
      { 
        id: 302, 
        name: 'Lee Mei Ling', 
        email: 'leemei@example.com', 
        status: 'spam', 
        appliedDate: '2023-06-05', 
        jobId: 1, 
        scores: { 
          'JavaScript': 20, 
          'React': 10, 
          'CSS': 25 
        },
        softSkills: {
          'Communication': 30,
          'Teamwork': 25,
          'Problem Solving': 15
        },
        spamReason: 'Application flagged by system.',
        justifications: {
          'JavaScript': 'Very basic JavaScript knowledge. Unable to complete simple coding tasks.',
          'React': 'No React experience shown in assessment or resume.',
          'CSS': 'Limited CSS skills, only familiar with basic styling.',
          'Communication': 'Adequate written communication but unclear expression of technical concepts.',
          'Teamwork': 'Some team experience but limited evidence of effectiveness.',
          'Problem Solving': 'Weak analytical skills shown in technical assessment.'
        }
      },
      { 
        id: 401, 
        name: 'Kamal bin Hassan', 
        email: 'kamal@example.com', 
        status: 'spam', 
        appliedDate: '2023-06-06', 
        jobId: 2, 
        scores: { 
          'Python': 15, 
          'Node.js': 20, 
          'Databases': 25 
        },
        softSkills: {
          'Communication': 40,
          'Teamwork': 35,
          'Problem Solving': 20
        },
        spamReason: 'Application flagged by system.',
        justifications: {
          'Python': 'Very limited Python knowledge. Unable to demonstrate basic syntax understanding.',
          'Node.js': 'Claims Node.js experience but failed basic assessment questions.',
          'Databases': 'Minimal database knowledge limited to basic SQL queries.',
          'Communication': 'Reasonable communication skills but inconsistencies in technical explanations.',
          'Teamwork': 'Some evidence of team experience in resume.',
          'Problem Solving': 'Poor performance on logical and analytical problems.'
        }
      },
    ],
  };

  // Reset selected applicant when changing stage or job
  const handleStageChange = (stageId) => {
    setActiveStage(stageId);
    setSelectedApplicant(null);
    setIsModalOpen(false);
  };

  const handleJobSelection = (job) => {
    setSelectedJob(job);
    setActiveStage('stage1');
    setSelectedApplicant(null);
    setIsModalOpen(false);
  };

  // Handle selecting an applicant
  const handleApplicantSelect = (applicant) => {
    setSelectedApplicant(applicant);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Filter jobs by search term
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get applicants for selected job and stage
  const getApplicantsForJob = (jobId, stage) => {
    return applicants[stage].filter(applicant => applicant.jobId === jobId);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate average score
  const getAverageScore = (scores) => {
    const values = Object.values(scores);
    return Math.round(values.reduce((sum, val) => sum + val, 0) / values.length);
  };

  // Render the job listings view
  const renderJobListings = () => (
    <div style={{
      ...styles.jobListingsContainer,
      ...(isMobile ? styles.jobListingsContainerMobile : {})
    }}>
      <div style={{
        ...styles.jobsHeader,
        ...(isMobile ? styles.jobsHeaderMobile : {})
      }}>
        <div style={styles.headerContent}>
          <h2 style={styles.title}>Job Listings</h2>
        </div>
        <Link to="/recruiter/jobs/create" style={styles.createButton}>
          <svg style={styles.createIcon} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create New Job
        </Link>
      </div>

      <div style={styles.searchContainer}>
        <div style={styles.searchWrapper}>
          <svg style={styles.searchIcon} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder={isMobile ? "Search jobs..." : "Search jobs by title, location, or department..."} 
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div style={{
        ...styles.jobsTable,
        ...(isMobile ? styles.jobsTableMobile : {})
      }}>
        {isMobile ? (
          // Card view for mobile
          <div style={styles.mobileCardContainer}>
            {jobs
              .filter(job => 
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.department.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(job => (
                <div
                  key={job.id}
                  style={{
                    ...styles.mobileJobCard,
                    ...(selectedJob?.id === job.id ? styles.selectedMobileCard : {})
                  }}
                  onClick={() => handleJobSelection(job)}
                >
                  <div style={styles.mobileCardHeader}>
                    <h3 style={styles.mobileJobTitle}>{job.title}</h3>
                    <span style={styles.statusBadge}>{job.status}</span>
                  </div>
                  <div style={styles.mobileJobDetails}>
                    <p style={styles.mobileJobInfo}>
                      <svg style={styles.mobileIcon} viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {job.location}
                    </p>
                    <p style={styles.mobileJobInfo}>
                      <svg style={styles.mobileIcon} viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                      </svg>
                      {job.department}
                    </p>
                    <p style={styles.mobileJobInfo}>
                      <svg style={styles.mobileIcon} viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {formatDate(job.posted)}
                    </p>
                  </div>
                  <div style={styles.mobileCardActions}>
                    <button 
                      style={styles.mobileViewButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJobSelection(job);
                      }}
                    >
                      View Applicants
                    </button>
                    <button 
                      style={styles.mobileArchiveButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        if(confirm(`Are you sure you want to archive the job "${job.title}"?`)) {
                          alert(`Job "${job.title}" has been archived`);
                          // Here you would implement the actual archiving logic
                        }
                      }}
                    >
                      Archive
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        ) : (
          // Table view for desktop/tablet
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Job Title</th>
                <th style={styles.tableHeader}>Location</th>
                <th style={styles.tableHeader}>Department</th>
                <th style={styles.tableHeader}>Posted Date</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs
                .filter(job => 
                  job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  job.department.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(job => (
                  <tr 
                    key={job.id} 
                    style={{
                      ...styles.tableRow,
                      ...(selectedJob?.id === job.id ? styles.selectedRow : {})
                    }}
                    onClick={() => handleJobSelection(job)}
                  >
                    <td style={styles.tableCell}>{job.title}</td>
                    <td style={styles.tableCell}>{job.location}</td>
                    <td style={styles.tableCell}>{job.department}</td>
                    <td style={styles.tableCell}>{formatDate(job.posted)}</td>
                    <td style={styles.tableCell}>
                      <span style={styles.statusBadge}>{job.status}</span>
                    </td>
                    <td style={styles.tableCell}>
                      <button 
                        style={styles.viewButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJobSelection(job);
                        }}
                      >
                        View Applicants
                      </button>
                      <button 
                        style={styles.archiveButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          if(confirm(`Are you sure you want to archive the job "${job.title}"?`)) {
                            alert(`Job "${job.title}" has been archived`);
                            // Here you would implement the actual archiving logic
                          }
                        }}
                      >
                        Archive
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  // Generate a more detailed analysis for the selected applicant if available
  const generateDetailedAnalysis = (applicant) => {
    if (!applicant) return null;
    
    // Don't generate analysis for spam applicants
    if (applicant.status === 'spam') return null;
    
    // Mock data for LinkedIn comparison
    const linkedinComparison = {
      full_name: {
        score: Math.random() > 0.5 ? 1.0 : 0.0,
        justification: Math.random() > 0.5 
          ? `'${applicant.name}' matches LinkedIn name.`
          : `'${applicant.name}' does not match LinkedIn name 'Different Name'.`
      },
      city: {
        score: Math.random() > 0.5 ? 1.0 : 0.0,
        justification: Math.random() > 0.5 
          ? `Candidate city 'Kuala Lumpur' matches LinkedIn city.`
          : `Candidate city 'Kuala Lumpur' differs from LinkedIn city 'Kajang'.`
      },
      education: {
        score: (Math.random() * 0.9 + 0.1).toFixed(2),
        justification: `Candidate's degree vs LinkedIn's degree: semantic similarity ~${(Math.random() * 0.9 + 0.1).toFixed(2)}.`
      },
      skills: {
        score: (Math.random() * 0.9 + 0.1).toFixed(2),
        justification: `Some skills were found in LinkedIn profile (average similarity ~${(Math.random() * 0.9 + 0.1).toFixed(2)}).`
      },
      languages: {
        score: 1.0,
        justification: `Languages appear both in candidate and LinkedIn.`
      },
      handle: {
        score: Math.random() > 0.5 ? 1.0 : 0.0,
        justification: Math.random() > 0.5 
          ? `LinkedIn handle matches.`
          : `LinkedIn handle not found or differs.`
      },
      overall_profile_validity: {
        score: (Math.random() * 0.8 + 0.1).toFixed(3),
        justification: `Weighted sum: ${(Math.random() * 0.8 + 0.1).toFixed(3)}.`
      }
    };
    
    // Mock data for job match analysis
    const skillKeys = Object.keys(applicant.scores);
    const jobMatch = {
      education: {
        score: (Math.random() * 0.3 + 0.7).toFixed(2),
        justification: `Candidate's education semantically matches job's requirements (similarity ~${(Math.random() * 0.3 + 0.7).toFixed(2)}).`
      },
      skills: {},
      languages: {
        score: 1.0,
        justification: `Job requires English (Fluent); candidate has English (Fluent).`
      },
      location: {
        score: 1.0,
        justification: `Candidate city 'Kuala Lumpur' matches job location 'Kuala Lumpur'.`
      },
      overall_job_match: {
        score: (Math.random() * 0.2 + 0.8).toFixed(3)
      }
    };
    
    // Generate skill-specific scores
    skillKeys.forEach(skill => {
      jobMatch.skills[skill] = {
        score: (Math.random() * 0.15 + 0.85).toFixed(2),
        justification: `${Math.random() > 0.5 ? 'Exact' : 'Close'} name match; embedding similarity ~${(Math.random() * 0.15 + 0.85).toFixed(2)}.`
      };
    });
    
    // Add overall skills score
    const skillScores = Object.values(jobMatch.skills).map(s => parseFloat(s.score));
    const avgSkillScore = skillScores.reduce((a, b) => a + b, 0) / skillScores.length;
    jobMatch.skills.overall_skills = {
      score: avgSkillScore.toFixed(2),
      justification: `(${skillScores.map(s => s.toFixed(2)).join(' + ')}) / ${skillScores.length} = ${avgSkillScore.toFixed(2)}.`
    };
    
    // Calculate final ranking score
    const finalScore = (parseFloat(linkedinComparison.overall_profile_validity.score) * 0.25 + 
                        parseFloat(jobMatch.overall_job_match.score) * 0.75).toFixed(4);
    
    return {
      linkedinComparison,
      jobMatch,
      finalRankingScore: finalScore
    };
  };

  // Render the candidate analysis modal
  const renderCandidateModal = () => {
    if (!selectedApplicant) return null;
    
    return (
      <div 
        style={{
          ...styles.modalBackdrop,
          display: isModalOpen ? 'flex' : 'none'
        }}
        onClick={handleCloseModal}
      >
        <div 
          style={{
            ...styles.modalContent,
            ...(isMobile ? styles.modalContentMobile : {})
          }}
          onClick={e => e.stopPropagation()}
        >
          <div style={styles.modalHeader}>
            <h2 style={styles.modalTitle}>
              {selectedApplicant.name}
              {selectedApplicant.status === 'spam' && (
                <span style={styles.spamBadge}>Spam</span>
              )}
            </h2>
            <button style={styles.closeButton} onClick={handleCloseModal}>
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          {selectedApplicant.status === 'spam' ? (
            <div style={styles.spamWarning}>
              <div style={styles.warningIcon}>⚠️</div>
              <h3 style={styles.warningTitle}>Application flagged by system</h3>
              <p style={styles.warningText}>
                Our AI system has detected potential issues with this application.
                It may be fraudulent or contain misleading information.
              </p>
              <div style={styles.warningActions}>
                <button style={styles.ignoreButton}>Ignore Warning</button>
                <button style={styles.deleteButton}>Delete Application</button>
              </div>
            </div>
          ) : (
            <div style={{
              ...styles.candidateDetails,
              ...(isMobile ? styles.candidateDetailsMobile : {})
            }}>
              {/* Rest of the candidate details content */}
              {/* ...existing code... */}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render the applicants view based on stage
  const renderApplicantsView = () => {
    if (!selectedJob) return null;
    
    const applicantsForStage = getApplicantsForJob(selectedJob.id, activeStage);
    
    return (
      <div style={{
        ...styles.applicantsContainer,
        ...(isMobile ? styles.applicantsContainerMobile : {})
      }}>
        <div style={{
          ...styles.applicantsHeader,
          ...(isMobile ? styles.applicantsHeaderMobile : {})
        }}>
          <h3 style={styles.subtitle}>
            {selectedJob.title} - {selectedJob.location}
          </h3>
          <div style={styles.stageSelector}>
            <button
              style={{
                ...styles.stageButton,
                ...(activeStage === 'stage1' ? styles.activeStageButton : {})
              }}
              onClick={() => handleStageChange('stage1')}
            >
              Initial Review
            </button>
            <button
              style={{
                ...styles.stageButton,
                ...(activeStage === 'stage2' ? styles.activeStageButton : {})
              }}
              onClick={() => handleStageChange('stage2')}
            >
              Interview
            </button>
            <button
              style={{
                ...styles.stageButton,
                ...(activeStage === 'offered' ? styles.activeStageButton : {})
              }}
              onClick={() => handleStageChange('offered')}
            >
              Offered
            </button>
            <button
              style={{
                ...styles.stageButton,
                ...(activeStage === 'spam' ? styles.activeStageButton : {})
              }}
              onClick={() => handleStageChange('spam')}
            >
              Spam
            </button>
          </div>
        </div>
        
        <div style={{
          ...styles.applicantsList,
          ...(isMobile ? styles.applicantsListMobile : {})
        }}>
          {applicantsForStage.length === 0 ? (
            <div style={styles.noApplicants}>
              <p>No applicants in this stage</p>
            </div>
          ) : (
            applicantsForStage.map(applicant => (
              <div
                key={applicant.id}
                style={{
                  ...styles.applicantCard,
                  ...(isMobile ? styles.applicantCardMobile : {})
                }}
                onClick={() => handleApplicantSelect(applicant)}
              >
                <div style={styles.applicantHeader}>
                  <h4 style={styles.applicantName}>{applicant.name}</h4>
                  {applicant.status === 'spam' && (
                    <span style={styles.applicantSpamBadge}>Spam</span>
                  )}
                </div>
                <div style={styles.applicantEmail}>{applicant.email}</div>
                <div style={styles.applicantDate}>Applied: {formatDate(applicant.appliedDate)}</div>
                
                {applicant.status === 'spam' ? (
                  <div style={styles.spamDetails}>
                    <p style={styles.spamReason}>Application flagged by system</p>
                  </div>
                ) : (
                  <div style={styles.scoreSection}>
                    <div style={styles.scoreCircle}>
                      <div 
                        style={{
                          ...styles.scoreValue,
                          color: getScoreColor(getAverageScore(applicant.scores))
                        }}
                      >
                        {getAverageScore(applicant.scores)}%
                      </div>
                      <div style={styles.scoreLabel}>Final Ranking Score</div>
                    </div>
                    
                    <div style={styles.skillsPreview}>
                      {Object.entries(applicant.scores).map(([skill, score], index) => (
                        <div key={index} style={styles.skillItem}>
                          <div style={styles.skillName}>{skill}</div>
                          <div style={styles.skillBarContainer}>
                            <div 
                              style={{
                                ...styles.skillBar,
                                width: `${score}%`,
                                backgroundColor: getScoreColor(score)
                              }}
                            ></div>
                          </div>
                        </div>
                      )).slice(0, isMobile ? 1 : 2)}
                      {Object.keys(applicant.scores).length > (isMobile ? 1 : 2) && (
                        <div style={styles.moreSkills}>
                          +{Object.keys(applicant.scores).length - (isMobile ? 1 : 2)} more skills
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <RecruiterNavbar />
      <div style={{
        ...styles.content,
        ...(isMobile ? styles.contentMobile : {})
      }}>
        {renderJobListings()}
        {selectedJob && renderApplicantsView()}
        {renderCandidateModal()}
      </div>
    </div>
  );
}

// Helper function to get color based on score
const getScoreColor = (score) => {
  if (score >= 90) return '#10b981'; // green
  if (score >= 80) return '#3b82f6'; // blue
  if (score >= 70) return '#8b5cf6'; // purple
  if (score >= 60) return '#f59e0b'; // amber
  return '#ef4444'; // red
};

// Add helper function to generate color styling based on score
const getScoreColorStyle = (score) => {
  score = parseFloat(score);
  if (score >= 0.9) return { color: '#10b981' }; // green
  if (score >= 0.8) return { color: '#3b82f6' }; // blue
  if (score >= 0.7) return { color: '#8b5cf6' }; // purple
  if (score >= 0.6) return { color: '#f59e0b' }; // amber
  return { color: '#ef4444' }; // red
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
  },
  
  content: {
    marginLeft: '240px',
    width: 'calc(100% - 240px)',
    backgroundColor: '#f8fafc',
  },
  
  contentMobile: {
    marginLeft: 0,
    width: '100%',
    paddingTop: '60px', // Space for mobile navbar
  },
  
  jobListingsContainerMobile: {
    padding: '15px',
  },
  
  jobsHeaderMobile: {
    flexDirection: 'column',
    gap: '12px',
  },
  
  jobsTableMobile: {
    overflowX: 'visible',
  },
  
  mobileCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  
  mobileJobCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderLeft: '3px solid transparent',
  },
  
  selectedMobileCard: {
    borderLeft: '3px solid #4285f4',
    backgroundColor: '#f8fafd',
  },
  
  mobileCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  
  mobileJobTitle: {
    margin: 0,
    fontSize: '1rem',
    fontWeight: '600',
    color: '#0f172a',
  },
  
  mobileJobDetails: {
    marginBottom: '16px',
  },
  
  mobileJobInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.875rem',
    color: '#64748b',
    margin: '4px 0',
  },
  
  mobileIcon: {
    color: '#94a3b8',
  },
  
  mobileCardActions: {
    display: 'flex',
    gap: '8px',
  },
  
  mobileViewButton: {
    flex: 1,
    padding: '8px 0',
    backgroundColor: '#4285f4',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  
  mobileArchiveButton: {
    padding: '8px 0',
    backgroundColor: 'transparent',
    color: '#64748b',
    border: '1px solid #cbd5e1',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    width: '80px',
  },
  
  modalContentMobile: {
    width: '95%',
    maxWidth: 'none',
    height: '90vh',
    borderRadius: '12px',
  },
  
  candidateDetailsMobile: {
    padding: '15px',
  },
  
  applicantsContainerMobile: {
    margin: '15px',
  },
  
  applicantsHeaderMobile: {
    flexDirection: 'column',
    gap: '12px',
  },
  
  applicantsListMobile: {
    gridTemplateColumns: '1fr',
  },
  
  applicantCardMobile: {
    padding: '12px',
  },
  
  jobListingsContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  jobsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },
  searchContainer: {
    maxWidth: '700px',
    margin: '0 auto 20px',
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
  jobsTable: {
    width: '100%',
    overflowX: 'auto',
    '@media (max-width: 640px)': {
      marginLeft: '-1rem',
      marginRight: '-1rem',
      width: 'calc(100% + 2rem)',
    },
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    '@media (max-width: 768px)': {
      fontSize: '0.875rem',
    },
  },
  tableHeader: {
    textAlign: 'left',
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    color: '#64748b',
    fontSize: '0.75rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    '@media (max-width: 768px)': {
      padding: '0.75rem 0.5rem',
    },
  },
  tableRow: {
    borderBottom: '1px solid #e2e8f0',
  },
  tableCell: {
    padding: '1rem',
    fontSize: '0.875rem',
    color: '#334155',
    whiteSpace: 'nowrap',
    '@media (max-width: 768px)': {
      padding: '0.75rem 0.5rem',
    },
  },
  statusBadge: {
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    backgroundColor: '#dcfce7',
    color: '#166534',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    marginRight: '0.5rem',
    cursor: 'pointer',
  },
  archiveButton: {
    backgroundColor: 'transparent',
    color: '#64748b',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    padding: '0.5rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  applicantsContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  applicantsHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #e2e8f0',
  },
  backButton: {
    backgroundColor: 'transparent',
    color: '#3b82f6',
    border: 'none',
    padding: '0',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '1rem',
    display: 'inline-block',
  },
  jobTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 0.5rem 0',
  },
  jobMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
    fontSize: '0.875rem',
  },
  jobDetail: {
    color: '#64748b',
  },
  separator: {
    color: '#cbd5e1',
  },
  funnelSection: {
    padding: '1.5rem',
    borderBottom: '1px solid #e2e8f0',
  },
  fullWidthApplicantsList: {
    padding: '1.5rem',
    width: '100%',
  },
  stageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  sectionTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 1rem 0',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 0',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: '0.875rem',
  },
  applicantsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  applicantCard: {
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    padding: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid transparent',
    '@media (max-width: 640px)': {
      padding: '0.75rem',
    },
  },
  selectedCard: {
    borderColor: '#3b82f6',
    backgroundColor: '#f0f9ff',
  },
  applicantHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  applicantAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '1rem',
  },
  applicantInfo: {
    flex: '1',
  },
  applicantName: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 0.25rem 0',
  },
  applicantEmail: {
    fontSize: '0.75rem',
    color: '#64748b',
    margin: 0,
  },
  applicantScore: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreCircle: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#eff6ff',
    color: '#3b82f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '0.75rem',
  },
  applicantMeta: {
    marginTop: '0.75rem',
    display: 'flex',
    gap: '0.75rem',
  },
  metaItem: {
    fontSize: '0.75rem',
    color: '#64748b',
  },
  spamActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  spamSelectAll: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  spamDeleteSelected: {
    backgroundColor: 'transparent',
    color: '#64748b',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  spamCheckbox: {
    marginRight: '0.5rem',
  },
  spamFlag: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    color: '#64748b',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  spamReasonSection: {
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  spamReasonHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  spamReasonTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 0.25rem 0',
  },
  spamReasonText: {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: 0,
  },
  backIcon: {
    width: '18px',
    height: '18px',
    marginRight: '0.5rem',
  },
  moveToStage1Button: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  moveToSpamButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  noSelectionSvg: {
    width: '2rem',
    height: '2rem',
    color: '#94a3b8',
  },
  createButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  createIcon: {
    color: 'white',
  },
  documentsSection: {
    marginBottom: '1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    padding: '1rem',
  },
  documentSectionTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '1rem',
    marginTop: 0,
  },
  documentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  documentItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem',
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    '@media (max-width: 640px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '0.75rem',
    },
  },
  documentIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    marginRight: '1rem',
    flexShrink: 0,
    '@media (max-width: 640px)': {
      marginRight: '0',
    },
  },
  documentInfo: {
    flex: 1,
    '@media (max-width: 640px)': {
      width: '100%',
      marginBottom: '0.5rem',
    },
  },
  documentName: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '0.25rem',
  },
  documentMeta: {
    fontSize: '0.75rem',
    color: '#64748b',
  },
  downloadButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    borderRadius: '6px',
    border: 'none',
    fontSize: '0.75rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  },
  viewLinkButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    backgroundColor: '#f8fafc',
    color: '#3b82f6',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    fontSize: '0.75rem',
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#f1f5f9',
    },
  },
  subSectionTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#334155',
    marginTop: '1.25rem',
    marginBottom: '0.75rem',
  },
  linkedinScoreContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  linkedinScoreCircle: (score) => ({
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    backgroundColor: '#f1f5f9',
    color: score >= 0.8 ? '#10b981' : score >= 0.6 ? '#3b82f6' : '#ef4444',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
    border: `2px solid ${score >= 0.8 ? '#10b981' : score >= 0.6 ? '#3b82f6' : '#ef4444'}`,
  }),
  linkedinScoreLabel: {
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '500',
  },
  comparisonTable: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '6px',
    overflow: 'hidden',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    border: '1px solid #e2e8f0',
    marginBottom: '1.5rem',
  },
  comparisonTableHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 0.6fr 2fr',
    padding: '0.75rem 1rem',
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
    fontWeight: '600',
    color: '#475569',
    fontSize: '0.8rem',
  },
  comparisonTableRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 0.6fr 2fr',
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '0.875rem',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  comparisonTableFooter: {
    backgroundColor: '#f8fafc',
    fontWeight: '600',
  },
  comparisonField: {
    color: '#334155',
  },
  comparisonScore: {
    fontWeight: '600',
    textAlign: 'center',
  },
  comparisonJustification: {
    color: '#64748b',
    fontSize: '0.8rem',
  },
  finalScoreSection: {
    backgroundColor: '#f1f5f9',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  finalScoreTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#334155',
    margin: '0 0 1rem 0',
  },
  finalScoreCircle: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6, #10b981)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '1.75rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  finalScoreFormula: {
    fontSize: '0.875rem',
    color: '#64748b',
    maxWidth: '80%',
  },
  sectionDivider: {
    height: '1px',
    backgroundColor: '#e2e8f0',
    margin: '2rem 0',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    width: '100%',
    maxWidth: '900px',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
  },
  modalHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  modalHeaderContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1,
  },
  closeModalButton: {
    background: 'transparent',
    border: 'none',
    color: '#64748b',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#f1f5f9',
    },
  },
  modalBody: {
    padding: '1.5rem',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    padding: '1rem 0 0',
    borderTop: '1px solid #e2e8f0',
    marginTop: '1rem',
  },
  closeButton: {
    backgroundColor: '#e2e8f0',
    color: '#334155',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#cbd5e1',
    },
  },
  tabsContainer: {
    marginBottom: '1.5rem',
  },
  tabs: {
    display: 'flex',
    gap: '0.5rem',
    borderBottom: '1px solid #e2e8f0',
  },
  tabActive: {
    padding: '0.5rem 1rem',
    borderBottom: '2px solid #3b82f6',
    color: '#3b82f6',
    fontWeight: '600',
    fontSize: '0.875rem',
  },
  analysisSection: {
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  analysisTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 1rem 0',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
  },
  skillCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  skillCardExpanded: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    marginBottom: '1rem',
  },
  skillHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillName: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#1e293b',
  },
  skillScoreBar: {
    height: '8px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  skillScoreFill: {
    height: '100%',
    borderRadius: '4px',
  },
  skillScore: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#64748b',
    alignSelf: 'flex-end',
  },
  justificationContainer: {
    marginTop: '0.5rem',
    padding: '0.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '4px',
    borderLeft: '3px solid #cbd5e1',
  },
  justificationText: {
    fontSize: '0.75rem',
    lineHeight: '1.5',
    color: '#334155',
    margin: 0,
  },
  overallScore: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
  },
  scoreCircleLarge: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#eff6ff',
    color: '#3b82f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '1.25rem',
  },
  scoreLabel: {
    fontSize: '0.75rem',
    color: '#64748b',
  },
  detailsHeaderInfo: {
    flex: 1,
  },
  detailsName: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 0.25rem 0',
  },
  detailsEmail: {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: '0 0 0.25rem 0',
  },
  detailsApplied: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    margin: 0,
  },
  overallScore: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
  },
  scoreCircleLarge: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#eff6ff',
    color: '#3b82f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '1.25rem',
  },
  scoreLabel: {
    fontSize: '0.75rem',
    color: '#64748b',
  },
  analysisSection: {
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  analysisTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 1rem 0',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
  },
  skillCardExpanded: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    marginBottom: '1rem',
  },
  skillHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillName: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#1e293b',
  },
  skillScoreBar: {
    height: '8px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  skillScoreFill: {
    height: '100%',
    borderRadius: '4px',
  },
  justificationContainer: {
    marginTop: '0.5rem',
    padding: '0.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '4px',
    borderLeft: '3px solid #cbd5e1',
  },
  justificationText: {
    fontSize: '0.75rem',
    lineHeight: '1.5',
    color: '#334155',
    margin: 0,
  },
  actionsSection: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
  },
  advanceButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  offerButton: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  rejectButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  tabsContainer: {
    marginBottom: '1.5rem',
  },
  tabs: {
    display: 'flex',
    gap: '0.5rem',
    borderBottom: '1px solid #e2e8f0',
  },
  tabActive: {
    padding: '0.5rem 1rem',
    borderBottom: '2px solid #3b82f6',
    color: '#3b82f6',
    fontWeight: '600',
    fontSize: '0.875rem',
  },
  spamActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  spamSelectAll: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  spamDeleteSelected: {
    backgroundColor: 'transparent',
    color: '#64748b',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  spamCheckbox: {
    marginRight: '0.5rem',
  },
  spamReasonSection: {
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  spamReasonHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  spamReasonTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 0.25rem 0',
  },
  spamReasonText: {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: 0,
  },
  backIcon: {
    width: '18px',
    height: '18px',
    marginRight: '0.5rem',
  },
  moveToStage1Button: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  moveToSpamButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '0.75rem 1.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  noSelectionSvg: {
    width: '2rem',
    height: '2rem',
    color: '#94a3b8',
  },
  createButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  createIcon: {
    color: 'white',
  },
  documentsSection: {
    marginBottom: '1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    padding: '1rem',
  },
  documentSectionTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '1rem',
    marginTop: 0,
  },
  documentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  documentItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem',
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    '@media (max-width: 640px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '0.75rem',
    },
  },
  documentIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    marginRight: '1rem',
    flexShrink: 0,
    '@media (max-width: 640px)': {
      marginRight: '0',
    },
  },
  documentInfo: {
    flex: 1,
    '@media (max-width: 640px)': {
      width: '100%',
      marginBottom: '0.5rem',
    },
  },
  documentName: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '0.25rem',
  },
  documentMeta: {
    fontSize: '0.75rem',
    color: '#64748b',
  },
  downloadButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    borderRadius: '6px',
    border: 'none',
    fontSize: '0.75rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  },
  viewLinkButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    backgroundColor: '#f8fafc',
    color: '#3b82f6',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    fontSize: '0.75rem',
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#f1f5f9',
    },
  },
  subSectionTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#334155',
    marginTop: '1.25rem',
    marginBottom: '0.75rem',
  },
  linkedinScoreContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  linkedinScoreCircle: (score) => ({
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    backgroundColor: '#f1f5f9',
    color: score >= 0.8 ? '#10b981' : score >= 0.6 ? '#3b82f6' : '#ef4444',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
    border: `2px solid ${score >= 0.8 ? '#10b981' : score >= 0.6 ? '#3b82f6' : '#ef4444'}`,
  }),
  linkedinScoreLabel: {
    fontSize: '0.875rem',
    color: '#64748b',
    fontWeight: '500',
  },
  comparisonTable: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '6px',
    overflow: 'hidden',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    border: '1px solid #e2e8f0',
    marginBottom: '1.5rem',
  },
  comparisonTableHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 0.6fr 2fr',
    padding: '0.75rem 1rem',
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
    fontWeight: '600',
    color: '#475569',
    fontSize: '0.8rem',
  },
  comparisonTableRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 0.6fr 2fr',
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '0.875rem',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  comparisonTableFooter: {
    backgroundColor: '#f8fafc',
    fontWeight: '600',
  },
  comparisonField: {
    color: '#334155',
  },
  comparisonScore: {
    fontWeight: '600',
    textAlign: 'center',
  },
  comparisonJustification: {
    color: '#64748b',
    fontSize: '0.8rem',
  },
  finalScoreSection: {
    backgroundColor: '#f1f5f9',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  finalScoreTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#334155',
    margin: '0 0 1rem 0',
  },
  finalScoreCircle: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6, #10b981)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '1.75rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  finalScoreFormula: {
    fontSize: '0.875rem',
    color: '#64748b',
    maxWidth: '80%',
  },
  sectionDivider: {
    height: '1px',
    backgroundColor: '#e2e8f0',
    margin: '2rem 0',
  },
  actionButtonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
  },
  noApplicantSelected: {
    textAlign: 'center',
    padding: '3rem 0',
    color: '#94a3b8',
  },
}; 