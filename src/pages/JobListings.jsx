import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecruiterNavbar from '../components/RecruiterNavbar';
import RecruitmentFunnel from '../components/RecruitmentFunnel';

export default function JobListings() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeStage, setActiveStage] = useState('stage1');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
    <div style={styles.jobListingsContainer}>
      <div style={styles.jobsHeader}>
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
            placeholder="Search jobs by title, location, or department..." 
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
      </div>
      
      <div style={styles.jobsTable}>
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
              ))
            }
          </tbody>
        </table>
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
    if (!selectedApplicant || !isModalOpen) return null;
    
    const analysis = generateDetailedAnalysis(selectedApplicant);
    
    return (
      <div style={styles.modalOverlay} onClick={handleCloseModal}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div style={styles.modalHeader}>
            <div style={styles.modalHeaderContent}>
              <div style={styles.applicantAvatarLarge}>{selectedApplicant.name.charAt(0)}</div>
              <div style={styles.detailsHeaderInfo}>
                <h3 style={styles.detailsName}>{selectedApplicant.name}</h3>
                <p style={styles.detailsEmail}>{selectedApplicant.email}</p>
                <p style={styles.detailsApplied}>Applied on {formatDate(selectedApplicant.appliedDate)}</p>
              </div>
              {selectedApplicant.status !== 'spam' && analysis && (
                <div style={styles.overallScore}>
                  <div style={styles.scoreCircleLarge}>{Math.round(parseFloat(analysis.finalRankingScore) * 100)}%</div>
                  <span style={styles.scoreLabel}>Final Ranking Score</span>
                </div>
              )}
            </div>
            <button style={styles.closeModalButton} onClick={handleCloseModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div style={styles.modalBody}>
            {/* Document Download Section */}
            <div style={styles.documentsSection}>
              <h4 style={styles.documentSectionTitle}>Applicant Documents</h4>
              <div style={styles.documentsList}>
                <div style={styles.documentItem}>
                  <div style={styles.documentIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div style={styles.documentInfo}>
                    <div style={styles.documentName}>Resume.pdf</div>
                    <div style={styles.documentMeta}>Added on {formatDate(selectedApplicant.appliedDate)}</div>
                  </div>
          <button 
                    style={styles.downloadButton}
            onClick={() => {
                      // Simulate download functionality
                      alert(`Downloading resume for ${selectedApplicant.name}`);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
                    Download
          </button>
        </div>
        
                <div style={styles.documentItem}>
                  <div style={styles.documentIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
        </div>
                  <div style={styles.documentInfo}>
                    <div style={styles.documentName}>CoverLetter.pdf</div>
                    <div style={styles.documentMeta}>Added on {formatDate(selectedApplicant.appliedDate)}</div>
                </div>
                  <button 
                    style={styles.downloadButton}
                    onClick={() => {
                      // Simulate download functionality
                      alert(`Downloading cover letter for ${selectedApplicant.name}`);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download
                  </button>
                        </div>

                {/* Portfolio or additional documents conditionally rendered */}
                {selectedApplicant.portfolioUrl && (
                  <div style={styles.documentItem}>
                    <div style={styles.documentIcon}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"></path>
                      </svg>
                      </div>
                    <div style={styles.documentInfo}>
                      <div style={styles.documentName}>Portfolio</div>
                      <div style={styles.documentMeta}>External link</div>
                      </div>
                    <a 
                      href="#" 
                      style={styles.viewLinkButton}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Opening portfolio for ${selectedApplicant.name}`);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                      View
                    </a>
              </div>
            )}
                  </div>
                </div>
                
                {selectedApplicant.spamReason && (
                  <div style={styles.spamReasonSection}>
                    <div style={styles.spamReasonHeader}>
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                      <h4 style={styles.spamReasonTitle}>Flagged as Spam</h4>
                    </div>
                    <p style={styles.spamReasonText}>{selectedApplicant.spamReason}</p>
                  </div>
                )}
                
            {selectedApplicant.status !== 'spam' && (
              <>
                <div style={styles.tabsContainer}>
                  <div style={styles.tabs}>
                    <div style={styles.tabActive}>Assessment</div>
                  </div>
                </div>
                
                {/* Generate the detailed analysis for the selected applicant */}
                {(() => {
                  if (!analysis) return null;
                  
                  return (
                    <>
                      {/* LinkedIn Profile Verification Section */}
                <div style={styles.analysisSection}>
                        <h4 style={styles.analysisTitle}>LinkedIn Profile Verification</h4>
                        <div style={styles.linkedinScoreContainer}>
                          <div style={styles.linkedinScoreCircle(analysis.linkedinComparison.overall_profile_validity.score)}>
                            {parseFloat(analysis.linkedinComparison.overall_profile_validity.score).toFixed(2)}
                          </div>
                          <div style={styles.linkedinScoreLabel}>
                            Profile Validity Score
                          </div>
                        </div>
                        
                        <div style={styles.comparisonTable}>
                          <div style={styles.comparisonTableHeader}>
                            <div style={styles.comparisonField}>Field</div>
                            <div style={styles.comparisonScore}>Score</div>
                            <div style={styles.comparisonJustification}>Justification</div>
                          </div>
                          
                          {Object.entries(analysis.linkedinComparison)
                            .filter(([key]) => key !== 'overall_profile_validity')
                            .map(([field, data]) => (
                              <div key={field} style={styles.comparisonTableRow}>
                                <div style={styles.comparisonField}>{field.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</div>
                                <div style={styles.comparisonScore}>
                                  <span style={getScoreColorStyle(data.score)}>{parseFloat(data.score).toFixed(2)}</span>
                                </div>
                                <div style={styles.comparisonJustification}>{data.justification}</div>
                              </div>
                            ))}
                            
                          <div style={{...styles.comparisonTableRow, ...styles.comparisonTableFooter}}>
                            <div style={styles.comparisonField}>Overall Profile Validity</div>
                            <div style={styles.comparisonScore}>
                              <span style={getScoreColorStyle(analysis.linkedinComparison.overall_profile_validity.score)}>
                                {parseFloat(analysis.linkedinComparison.overall_profile_validity.score).toFixed(3)}
                              </span>
                            </div>
                            <div style={styles.comparisonJustification}>{analysis.linkedinComparison.overall_profile_validity.justification}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Combined Job Match Analysis & Skills Section */}
                      <div style={styles.analysisSection}>
                        <h4 style={styles.analysisTitle}>Job Match Analysis</h4>
                        <div style={styles.linkedinScoreContainer}>
                          <div style={styles.linkedinScoreCircle(analysis.jobMatch.overall_job_match.score)}>
                            {parseFloat(analysis.jobMatch.overall_job_match.score).toFixed(2)}
                          </div>
                          <div style={styles.linkedinScoreLabel}>
                            Job Match Score
                          </div>
                        </div>
                        
                        <h5 style={styles.subSectionTitle}>Education Match</h5>
                        <div style={styles.comparisonTable}>
                          <div style={styles.comparisonTableRow}>
                            <div style={styles.comparisonField}>Education</div>
                            <div style={styles.comparisonScore}>
                              <span style={getScoreColorStyle(analysis.jobMatch.education.score)}>{parseFloat(analysis.jobMatch.education.score).toFixed(2)}</span>
                            </div>
                            <div style={styles.comparisonJustification}>{analysis.jobMatch.education.justification}</div>
                          </div>
                        </div>
                        
                        <h5 style={styles.subSectionTitle}>Skills Assessment</h5>
                  <div style={styles.skillsGrid}>
                    {Object.entries(selectedApplicant.scores).map(([skill, score]) => (
                      <div key={skill} style={styles.skillCardExpanded}>
                        <div style={styles.skillHeader}>
                          <div style={styles.skillName}>{skill}</div>
                          <div style={{...styles.skillScore, color: getScoreColor(score)}}>{score}%</div>
                        </div>
                        <div style={styles.skillScoreBar}>
                          <div 
                            style={{
                              ...styles.skillScoreFill,
                              width: `${score}%`,
                              backgroundColor: getScoreColor(score),
                            }}
                          ></div>
                        </div>
                        <div style={styles.justificationContainer}>
                          <p style={styles.justificationText}>{selectedApplicant.justifications[skill]}</p>
                        </div>
                      </div>
                    ))}
                </div>
                
                        <h5 style={styles.subSectionTitle}>Soft Skills Assessment</h5>
                  <div style={styles.skillsGrid}>
                    {Object.entries(selectedApplicant.softSkills).map(([skill, score]) => (
                      <div key={skill} style={styles.skillCardExpanded}>
                        <div style={styles.skillHeader}>
                          <div style={styles.skillName}>{skill}</div>
                          <div style={{...styles.skillScore, color: getScoreColor(score)}}>{score}%</div>
                        </div>
                        <div style={styles.skillScoreBar}>
                          <div 
                            style={{
                              ...styles.skillScoreFill,
                              width: `${score}%`,
                              backgroundColor: getScoreColor(score),
                            }}
                          ></div>
                        </div>
                        <div style={styles.justificationContainer}>
                          <p style={styles.justificationText}>{selectedApplicant.justifications[skill]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                        
                        <h5 style={styles.subSectionTitle}>Other Factors</h5>
                        <div style={styles.comparisonTable}>
                          <div style={styles.comparisonTableRow}>
                            <div style={styles.comparisonField}>Languages</div>
                            <div style={styles.comparisonScore}>
                              <span style={getScoreColorStyle(analysis.jobMatch.languages.score)}>{analysis.jobMatch.languages.score.toFixed(2)}</span>
                            </div>
                            <div style={styles.comparisonJustification}>{analysis.jobMatch.languages.justification}</div>
                </div>
                
                          <div style={styles.comparisonTableRow}>
                            <div style={styles.comparisonField}>Location</div>
                            <div style={styles.comparisonScore}>
                              <span style={getScoreColorStyle(analysis.jobMatch.location.score)}>{analysis.jobMatch.location.score.toFixed(2)}</span>
                            </div>
                            <div style={styles.comparisonJustification}>{analysis.jobMatch.location.justification}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Final Ranking Score */}
                      <div style={styles.finalScoreSection}>
                        <h4 style={styles.finalScoreTitle}>Final Ranking Score</h4>
                        <div style={styles.finalScoreCircle}>
                          {parseFloat(analysis.finalRankingScore).toFixed(2)}
                        </div>
                        <div style={styles.finalScoreFormula}>
                          <p>LinkedIn Validity ({parseFloat(analysis.linkedinComparison.overall_profile_validity.score).toFixed(2)}) × 0.25 + 
                          Job Match ({parseFloat(analysis.jobMatch.overall_job_match.score).toFixed(2)}) × 0.75</p>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </>
            )}
            
            {/* Action Buttons Section */}
            <div style={styles.modalActions}>
                  {activeStage === 'spam' && (
                    <button style={styles.moveToStage1Button}>
                      Move to Stage 1
                    </button>
                  )}
                  {activeStage === 'stage1' && (
                    <button style={styles.advanceButton}>
                      Advance to Stage 2
                    </button>
                  )}
                  {activeStage === 'stage2' && (
                    <button style={styles.offerButton}>
                  Advance to Offer
                    </button>
                  )}
              {activeStage !== 'spam' && activeStage !== 'offered' && (
                    <button style={styles.moveToSpamButton}>
                      Mark as Spam
                    </button>
                  )}
              {activeStage !== 'offered' && (
                  <button style={styles.rejectButton}>
                    Reject Candidate
                </button>
              )}
              <button style={styles.closeButton} onClick={handleCloseModal}>
                Close
                  </button>
                </div>
              </div>
        </div>
      </div>
    );
  };

  // Modify renderApplicantsView to use the finalRankingScore for display
  const renderApplicantsView = () => {
    // Get applicants for the current stage and job
    const jobApplicants = getApplicantsForJob(selectedJob.id, activeStage);
    
    // Set up funnel stages including spam stage
    const funnelStages = [
      { id: 'spam', name: 'Spam', count: getApplicantsForJob(selectedJob.id, 'spam').length },
      { id: 'stage1', name: 'Stage 1', count: getApplicantsForJob(selectedJob.id, 'stage1').length },
      { id: 'stage2', name: 'Stage 2', count: getApplicantsForJob(selectedJob.id, 'stage2').length },
      { id: 'offered', name: 'Offered', count: getApplicantsForJob(selectedJob.id, 'offered').length },
    ];
    
    return (
      <div style={styles.applicantsContainer}>
        <div style={styles.applicantsHeader}>
          <button 
            style={styles.backButton}
            onClick={() => {
              setSelectedJob(null);
              setSelectedApplicant(null);
              setIsModalOpen(false);
            }}
          >
            <svg style={styles.backIcon} viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
            Back to Job Listings
          </button>
          <h2 style={styles.jobTitle}>{selectedJob.title}</h2>
          <div style={styles.jobMeta}>
            <span style={styles.jobDetail}>{selectedJob.department}</span>
            <span style={styles.separator}>•</span>
            <span style={styles.jobDetail}>{selectedJob.location}</span>
            <span style={styles.separator}>•</span>
            <span style={styles.jobDetail}>Posted: {formatDate(selectedJob.posted)}</span>
                </div>
        </div>
        
        <div style={styles.funnelSection}>
          <RecruitmentFunnel 
            stages={funnelStages} 
            activeStage={activeStage}
            onStageChange={handleStageChange}
          />
        </div>
        
        <div style={styles.fullWidthApplicantsList}>
          <div style={styles.stageHeader}>
            <h3 style={styles.sectionTitle}>{funnelStages.find(s => s.id === activeStage).name} Applicants</h3>
            {activeStage === 'spam' && (
              <div style={styles.spamActions}>
                <button style={styles.spamSelectAll}>Select All</button>
                <button style={styles.spamDeleteSelected}>Delete Selected</button>
              </div>
            )}
          </div>
          
          {jobApplicants.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>No applicants in this stage.</p>
        </div>
          ) : (
            <div style={styles.applicantsGrid}>
              {jobApplicants.map((applicant) => (
                <div 
                  key={applicant.id} 
                  style={{
                    ...styles.applicantCard,
                    ...(selectedApplicant?.id === applicant.id ? styles.selectedCard : {})
                  }}
                  onClick={() => handleApplicantSelect(applicant)}
                >
                  <div style={styles.applicantHeader}>
                    {activeStage === 'spam' && (
                      <div style={styles.spamCheckbox}>
                        <input 
                          type="checkbox" 
                          onClick={(e) => e.stopPropagation()} 
                        />
                      </div>
                    )}
                    <div style={styles.applicantAvatar}>{applicant.name.charAt(0)}</div>
                    <div style={styles.applicantInfo}>
                      <h4 style={styles.applicantName}>{applicant.name}</h4>
                      <p style={styles.applicantEmail}>{applicant.email}</p>
                    </div>
                    {applicant.status !== 'spam' && (
                    <div style={styles.applicantScore}>
                      <div style={styles.scoreCircle}>
                        {Math.round(parseFloat(generateDetailedAnalysis(applicant)?.finalRankingScore || 0) * 100)}%
                      </div>
                    </div>
                    )}
                  </div>
                  <div style={styles.applicantMeta}>
                    <span style={styles.metaItem}>Applied: {formatDate(applicant.appliedDate)}</span>
                    {applicant.spamReason && (
                      <span style={styles.spamFlag}>
                        <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none">
                          <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                        Spam
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Render the candidate modal */}
        {renderCandidateModal()}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <RecruiterNavbar />
      <div style={styles.contentWithSidebar}>
        <div style={styles.content}>
          {selectedJob ? renderApplicantsView() : renderJobListings()}
        </div>
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
    backgroundColor: '#f1f5f9',
    minHeight: '100vh',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  contentWithSidebar: {
    marginLeft: '240px', // width of sidebar
    paddingTop: 0,
    minHeight: '100vh',
    background: 'none',
  },
  content: {
    paddingTop: '2.5rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    paddingBottom: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
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