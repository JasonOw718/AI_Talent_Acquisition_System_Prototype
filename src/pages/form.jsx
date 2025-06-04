import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const steps = [
  { label: 'Checking for spam' },
  { label: 'Cross-referencing LinkedIn' },
  { label: 'Ranking your application' },
];

// File types mapping
const fileTypesMap = {
  'application/pdf': 'PDF',
  'application/msword': 'DOC',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
};

export default function ApplyForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingSupportingDocs, setIsDraggingSupportingDocs] = useState(false);
  
  const [formData, setFormData] = useState({
    personal_information: {
      first_name: '',
      last_name: '',
      email: '',
      city: '',
      phone_number: ''
    },
    education: [{
      institution: '',
      major: '',
      degree: '',
      school_location: '',
      description: '',
      from: '',
      to: ''
    }],
    skills: [{
      name: '',
      years_of_experience: '',
      description: ''
    }],
    languages_spoken: [{
      language: '',
      proficiency: ''
    }],
    profiles: {
      linkedin: '',
      facebook: '',
      x_twitter: '',
      website: ''
    },
    documents: {
      resume: null,
      supporting_documents: []
    }
  });

  // On mount, load saved applicant data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('applicantData');
    if (saved) {
      try {
      const parsed = JSON.parse(saved);
        // Only load non-file data from localStorage
        const { documents, ...nonFileData } = parsed;
        setFormData(prevData => ({
          ...prevData,
          ...nonFileData
        }));
      } catch (e) {
        console.error("Error parsing saved applicant data", e);
      }
    }
  }, []);

  // Drag and drop handlers for resume
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleResumeUpload = useCallback((files) => {
    if (files && files.length > 0) {
      const file = files[0];
      setFormData(prevData => ({
        ...prevData,
        documents: {
          ...prevData.documents,
          resume: file
        }
      }));
    }
  }, []);

  const handleResumeDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const { files } = e.dataTransfer;
    handleResumeUpload(files);
  }, [handleResumeUpload]);

  // Drag and drop handlers for supporting documents
  const handleSupportingDocsDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingSupportingDocs(true);
  }, []);

  const handleSupportingDocsDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingSupportingDocs(false);
  }, []);

  const handleSupportingDocsDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleSupportingDocsUpload = useCallback((files) => {
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setFormData(prevData => ({
        ...prevData,
        documents: {
          ...prevData.documents,
          supporting_documents: [
            ...(prevData.documents.supporting_documents || []),
            ...newFiles
          ]
        }
      }));
    }
  }, []);

  const handleSupportingDocsDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingSupportingDocs(false);
    
    const { files } = e.dataTransfer;
    handleSupportingDocsUpload(files);
  }, [handleSupportingDocsUpload]);

  // Helper functions for form arrays
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education, 
        {
          institution: '',
          major: '',
          degree: '',
          school_location: '',
          description: '',
          from: '',
          to: ''
        }
      ]
    });
  };

  const removeEducation = (index) => {
    const newEducation = [...formData.education];
    newEducation.splice(index, 1);
    setFormData({ ...formData, education: newEducation });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [
        ...formData.skills, 
        {
          name: '',
          years_of_experience: '',
          description: ''
        }
      ]
    });
  };

  const removeSkill = (index) => {
    const newSkills = [...formData.skills];
    newSkills.splice(index, 1);
    setFormData({ ...formData, skills: newSkills });
  };

  const addLanguage = () => {
    setFormData({
      ...formData,
      languages_spoken: [
        ...formData.languages_spoken, 
        {
          language: '',
          proficiency: ''
        }
      ]
    });
  };

  const removeLanguage = (index) => {
    const newLanguages = [...formData.languages_spoken];
    newLanguages.splice(index, 1);
    setFormData({ ...formData, languages_spoken: newLanguages });
  };

  // Handle basic input changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      personal_information: {
        ...formData.personal_information,
        [name]: value
      }
    });
  };

  // Handle education array changes
  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData({
      ...formData,
      education: newEducation
    });
  };

  // Handle skills array changes
  const handleSkillChange = (index, field, value) => {
    const newSkills = [...formData.skills];
    newSkills[index][field] = field === 'years_of_experience' ? parseInt(value, 10) || '' : value;
    setFormData({
      ...formData,
      skills: newSkills
    });
  };

  // Handle languages array changes
  const handleLanguageChange = (index, field, value) => {
    const newLanguages = [...formData.languages_spoken];
    newLanguages[index][field] = value;
    setFormData({
      ...formData,
      languages_spoken: newLanguages
    });
  };

  // Handle profiles changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      profiles: {
        ...formData.profiles,
        [name]: value
      }
    });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'resume') {
      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          resume: files[0]
        }
      });
    } else if (name === 'supporting_documents') {
      const fileArray = Array.from(files);
      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          supporting_documents: [
            ...(formData.documents.supporting_documents || []),
            ...fileArray
          ]
        }
      });
    }
  };

  // Parse resume and autofill form with dummy data
  const parseResume = () => {
    if (!formData.documents.resume) {
      alert('Please upload a resume first');
      return;
    }

    setIsParsingResume(true);

    // Simulate parsing delay
    setTimeout(() => {
      // Dummy data to simulate resume parsing
      const dummyData = {
        personal_information: {
          first_name: 'Alex',
          last_name: 'Tan',
          email: 'alex.tan@example.com',
          city: 'Kuala Lumpur',
          phone_number: '+60123456789'
        },
        education: [
          {
            institution: 'University of Malaysia',
            major: 'Computer Science',
            degree: 'Bachelor',
            school_location: 'Kuala Lumpur',
            description: 'Specialized in software development and artificial intelligence',
            from: '2016-09',
            to: '2020-05'
          }
        ],
        skills: [
          {
            name: 'React',
            years_of_experience: 3,
            description: 'Developed multiple web applications using React and Redux'
          },
          {
            name: 'Node.js',
            years_of_experience: 2,
            description: 'Created RESTful APIs and backend services'
          },
          {
            name: 'Python',
            years_of_experience: 4,
            description: 'Data analysis and machine learning applications'
          }
        ],
        languages_spoken: [
          {
            language: 'English',
            proficiency: 'Fluent'
          },
          {
            language: 'Malay',
            proficiency: 'Native'
          },
          {
            language: 'Mandarin',
            proficiency: 'Conversational'
          }
        ],
        profiles: {
          linkedin: 'https://linkedin.com/in/alex-tan',
          facebook: '',
          x_twitter: '',
          website: 'https://alextan.dev'
        }
      };

      // Update form with parsed data
      setFormData({
        ...formData,
        ...dummyData
      });
      
      setIsParsingResume(false);
      alert('Resume parsed successfully! Form has been filled with extracted information.');
    }, 2000);
  };

  // Remove uploaded document from an array
  const removeSupportingDocument = (index) => {
    const newFiles = [...formData.documents.supporting_documents];
    newFiles.splice(index, 1);
    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        supporting_documents: newFiles
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save non-file data to localStorage
    const { documents, ...dataToSave } = formData;
    localStorage.setItem('applicantData', JSON.stringify(dataToSave));

    setSubmitted(true);
    setCurrentStep(0);
    
    // In a real application, you would upload the files to a server here
    console.log('Form data to submit:', formData);
  };

  // Sequential steps animation effect
  useEffect(() => {
    if (currentStep < 0 || currentStep >= steps.length) return;

    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((s) => s + 1);
      } else {
        setTimeout(() => {
          alert('Application processed ✅');
          navigate('/');
        }, 1500);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentStep, navigate]);

  if (submitted) {
    return (
      <div style={styles.submissionContainer}>
        <div style={styles.submissionCard}>
          <div style={styles.submissionHeader}>
            <div style={styles.logoIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4.35c-4.3 0-7.79 3.4-7.79 7.58 0 1.58.5 3.05 1.35 4.27l-1.35 4.1 4.36-1.36c1.2.72 2.6 1.14 4.1 1.14 4.3 0 7.8-3.4 7.8-7.58 0-4.19-3.5-7.58-7.8-7.58a8.75 8.75 0 00-3.87.9"></path>
              </svg>
            </div>
            <h2 style={styles.submissionTitle}>Processing your application</h2>
            <p style={styles.submissionSubtitle}>Our AI is analyzing your information</p>
          </div>

          <div style={styles.progressContainer}>
          {steps.map((step, idx) => (
              <div 
              key={idx}
                style={{
                  ...styles.progressStep,
                  ...(idx < currentStep ? styles.completedStep : {}),
                  ...(idx === currentStep ? styles.activeStep : {}),
                }}
              >
                <div style={styles.progressIcon}>
                  {idx < currentStep && (
                    <svg style={styles.checkIcon} viewBox="0 0 24 24" width="24" height="24">
                      <path 
                        d="M20 6L9 17L4 12" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  )}
                  {idx === currentStep && (
                    <div style={styles.spinner} />
                  )}
                  {idx > currentStep && (
                    <div style={styles.waitingIcon}>{idx + 1}</div>
                  )}
                </div>
                <div style={styles.stepContent}>
                  <div style={styles.stepLabel}>{step.label}</div>
                  <div style={styles.stepDescription}>
                    {idx === 0 && "Filtering potential spam submissions..."}
                    {idx === 1 && "Verifying your professional profile details..."}
                    {idx === 2 && "Calculating your job match score..."}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.progressBar}>
            <div 
              style={{
                ...styles.progressFill,
                width: `${((currentStep + 1) / steps.length) * 100}%`
              }}
            />
          </div>

          <div style={styles.submissionFooter}>
            <div style={styles.submissionNote}>
              <svg style={styles.noteIcon} viewBox="0 0 24 24" width="20" height="20">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Your application will be saved even if you close this page
            </div>
          </div>
        </div>

        <div style={styles.submissionBackground}>
          <div style={styles.backgroundCircle1}></div>
          <div style={styles.backgroundCircle2}></div>
          <div style={styles.backgroundCircle3}></div>
        </div>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0% { transform: scale(0.95); opacity: 0.7; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.7; }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: 800, margin: '20px auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <SpinnerAnimation />
      <h1 style={{ color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>Apply for {id ? `Job #${id}` : 'Job'}</h1>
      
      <p style={styles.instruction}>Upload your resume PDF to autofill your application. You can still fill your profile manually.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Resume Upload Section */}
        <div style={styles.resumeSection}>
          <div
            style={{
              ...styles.dropZone,
              ...(isDragging ? styles.dropZoneActive : {}),
            }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleResumeDrop}
          >
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={(e) => handleResumeUpload(e.target.files)}
              style={styles.fileInput}
              accept=".pdf,.doc,.docx"
            />
            <label htmlFor="resume" style={styles.dropZoneLabel}>
              <svg style={styles.uploadIcon} viewBox="0 0 24 24" width="24" height="24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <polyline points="17 8 12 3 7 8" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></polyline>
                <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></line>
              </svg>
              <div style={styles.dropZoneText}>
                <span style={styles.primaryText}>Choose a file</span> or drop it here
                <p style={styles.secondaryText}>10MB size limit</p>
              </div>
            </label>
          </div>
          
          {formData.documents.resume && (
            <div style={styles.resumePreview}>
              <div style={styles.fileDetails}>
                <svg style={styles.fileIcon} viewBox="0 0 24 24" width="24" height="24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <polyline points="14 2 14 8 20 8" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></polyline>
                </svg>
                <span style={styles.fileName}>{formData.documents.resume.name}</span>
                <span style={styles.fileType}>
                  {fileTypesMap[formData.documents.resume.type] || formData.documents.resume.type}
                </span>
              </div>
              <button
                type="button"
                onClick={parseResume}
                disabled={isParsingResume}
                style={styles.parseResumeButton}
              >
                {isParsingResume ? 'Parsing...' : 'Auto-fill from Resume'}
              </button>
            </div>
          )}
          
          {isParsingResume && (
            <div style={styles.parsingIndicator}>
              <div style={styles.spinner}></div>
              <span>Parsing resume content...</span>
            </div>
          )}
        </div>
        
        {/* Personal Information */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={styles.sectionHeading}>Personal Information</h2>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label htmlFor="first_name" style={styles.label}>First Name*</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                value={formData.personal_information.first_name}
                onChange={handlePersonalInfoChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="last_name" style={styles.label}>Last Name*</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                value={formData.personal_information.last_name}
                onChange={handlePersonalInfoChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email*</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.personal_information.email}
                onChange={handlePersonalInfoChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="phone_number" style={styles.label}>Phone Number*</label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                required
                value={formData.personal_information.phone_number}
                onChange={handlePersonalInfoChange}
                style={styles.input}
                placeholder="+60123456789"
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="city" style={styles.label}>City*</label>
            <input
              id="city"
              name="city"
              type="text"
              required
              value={formData.personal_information.city}
              onChange={handlePersonalInfoChange}
              style={styles.input}
            />
          </div>
        </div>

        {/* Education */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={styles.sectionHeading}>Education</h2>
          
          {formData.education.map((edu, index) => (
            <div key={index} style={{ 
              marginBottom: '16px',
              padding: '16px', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              position: 'relative'
            }}>
              {index > 0 && (
                <button 
                  type="button"
                  onClick={() => removeEducation(index)}
                  style={styles.removeButton}
                >
                  &times;
                </button>
              )}
              
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Institution*</label>
                  <input
                    type="text"
                    required
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    style={styles.input}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Degree*</label>
                  <select
                    required
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    style={styles.input}
                  >
                    <option value="">Select Degree</option>
                    <option value="High School">High School</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Associate">Associate</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="Doctorate">Doctorate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Major/Field of Study*</label>
                  <input
                    type="text"
                    required
                    value={edu.major}
                    onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
                    style={styles.input}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Location</label>
                  <input
                    type="text"
                    value={edu.school_location}
                    onChange={(e) => handleEducationChange(index, 'school_location', e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>From*</label>
                  <input
                    type="month"
                    required
                    value={edu.from}
                    onChange={(e) => handleEducationChange(index, 'from', e.target.value)}
                    style={styles.input}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>To*</label>
                  <input
                    type="month"
                    required
                    value={edu.to}
                    onChange={(e) => handleEducationChange(index, 'to', e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  value={edu.description}
                  onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                  style={styles.textarea}
                  placeholder="Describe what you learned or achieved"
                  rows={3}
                />
              </div>
            </div>
          ))}
          
          <button 
            type="button" 
            onClick={addEducation} 
            style={styles.addButton}
          >
            + Add Another Education
          </button>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={styles.sectionHeading}>Skills</h2>
          
          {formData.skills.map((skill, index) => (
            <div key={index} style={{ 
              marginBottom: '16px',
              padding: '16px', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              position: 'relative'
            }}>
              {index > 0 && (
                <button 
                  type="button"
                  onClick={() => removeSkill(index)}
                  style={styles.removeButton}
                >
                  &times;
                </button>
              )}
              
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Skill Name*</label>
                  <input
                    type="text"
                    required
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                    style={styles.input}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Years of Experience*</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1"
                    value={skill.years_of_experience}
                    onChange={(e) => handleSkillChange(index, 'years_of_experience', e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  value={skill.description}
                  onChange={(e) => handleSkillChange(index, 'description', e.target.value)}
                  style={styles.textarea}
                  placeholder="Describe your experience with this skill"
                  rows={2}
                />
              </div>
            </div>
          ))}
          
          <button 
            type="button" 
            onClick={addSkill} 
            style={styles.addButton}
          >
            + Add Another Skill
          </button>
        </div>

        {/* Languages */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={styles.sectionHeading}>Languages</h2>
          
          {formData.languages_spoken.map((lang, index) => (
            <div key={index} style={{ 
              marginBottom: '16px',
              padding: '16px', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              position: 'relative',
              display: 'flex',
              gap: '16px'
            }}>
              {index > 0 && (
                <button 
                  type="button"
                  onClick={() => removeLanguage(index)}
                  style={styles.removeButton}
                >
                  &times;
                </button>
              )}
              
              <div style={{ ...styles.formGroup, flex: 1 }}>
                <label style={styles.label}>Language*</label>
                <input
                  type="text"
                  required
                  value={lang.language}
                  onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                  style={styles.input}
                />
              </div>
              
              <div style={{ ...styles.formGroup, flex: 1 }}>
                <label style={styles.label}>Proficiency*</label>
                <select
                  required
                  value={lang.proficiency}
                  onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                  style={styles.input}
                >
                  <option value="">Select Proficiency</option>
                  <option value="Basic">Basic</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Proficient">Proficient</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Native">Native</option>
                </select>
              </div>
            </div>
          ))}
          
          <button 
            type="button" 
            onClick={addLanguage} 
            style={styles.addButton}
          >
            + Add Another Language
          </button>
        </div>

        {/* Online Profiles */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={styles.sectionHeading}>Online Profiles</h2>

          <div style={styles.formGroup}>
            <label htmlFor="linkedin" style={styles.label}>LinkedIn</label>
            <input
              id="linkedin"
              name="linkedin"
              type="url"
              value={formData.profiles.linkedin}
              onChange={handleProfileChange}
              style={styles.input}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="website" style={styles.label}>Personal Website</label>
            <input
              id="website"
              name="website"
              type="url"
              value={formData.profiles.website}
              onChange={handleProfileChange}
              style={styles.input}
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label htmlFor="facebook" style={styles.label}>Facebook</label>
              <input
                id="facebook"
                name="facebook"
                type="url"
                value={formData.profiles.facebook}
                onChange={handleProfileChange}
                style={styles.input}
                placeholder="https://facebook.com/yourprofile"
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="x_twitter" style={styles.label}>X / Twitter</label>
              <input
                id="x_twitter"
                name="x_twitter"
                type="url"
                value={formData.profiles.x_twitter}
                onChange={handleProfileChange}
                style={styles.input}
                placeholder="https://x.com/yourusername"
              />
            </div>
          </div>
        </div>
        
        {/* Supporting Documents - Moved to bottom */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={styles.sectionHeading}>Supporting Documents</h2>
          <p style={styles.sectionDescription}>
            Upload additional documents to support your application (cover letter, certificates, portfolios, etc.)
          </p>
          
          <div
            style={{
              ...styles.supportingDocsDropZone,
              ...(isDraggingSupportingDocs ? styles.dropZoneActive : {}),
            }}
            onDragEnter={handleSupportingDocsDragEnter}
            onDragLeave={handleSupportingDocsDragLeave}
            onDragOver={handleSupportingDocsDragOver}
            onDrop={handleSupportingDocsDrop}
          >
            <input
              type="file"
              id="supporting_documents"
              name="supporting_documents"
              onChange={(e) => handleSupportingDocsUpload(e.target.files)}
              style={styles.fileInput}
              accept=".pdf,.doc,.docx"
              multiple
            />
            <label htmlFor="supporting_documents" style={styles.dropZoneLabel}>
              <svg style={styles.uploadIcon} viewBox="0 0 24 24" width="24" height="24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <polyline points="17 8 12 3 7 8" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></polyline>
                <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></line>
              </svg>
              <div style={styles.dropZoneText}>
                <span style={styles.primaryText}>Choose files</span> or drop them here
                <p style={styles.secondaryText}>Cover letters, certificates, portfolios (PDF, DOC, DOCX)</p>
              </div>
            </label>
          </div>
          
          {formData.documents.supporting_documents && formData.documents.supporting_documents.length > 0 && (
            <div style={styles.supportingDocsList}>
              {formData.documents.supporting_documents.map((file, index) => (
                <div key={index} style={styles.supportingDocItem}>
                  <div style={styles.fileDetails}>
                    <svg style={styles.fileIcon} viewBox="0 0 24 24" width="20" height="20">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <polyline points="14 2 14 8 20 8" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></polyline>
                    </svg>
                    <span style={styles.fileName}>{file.name}</span>
                    <span style={styles.fileType}>
                      {fileTypesMap[file.type] || file.type}
                    </span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeSupportingDocument(index)}
                    style={styles.fileRemoveButton}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: '16px' }}>
          <button
            type="submit"
            style={styles.submitButton}
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  sectionHeading: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '16px',
    marginTop: '0',
    paddingBottom: '8px',
    borderBottom: '1px solid #e2e8f0'
  },
  sectionDescription: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginBottom: '16px'
  },
  instruction: {
    fontSize: '1rem',
    color: '#64748b',
    marginBottom: '24px',
    textAlign: 'center'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '0.95rem',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    color: '#334155',
  },
  textarea: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '0.95rem',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    color: '#334155',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  resumeSection: {
    marginBottom: '24px',
    border: '1px dashed #cbd5e1',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#f8fafc',
  },
  dropZone: {
    position: 'relative',
    border: '2px dashed #cbd5e1',
    borderRadius: '8px',
    padding: '32px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  },
  dropZoneActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  fileInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 0,
    cursor: 'pointer',
    zIndex: 10,
  },
  uploadIcon: {
    color: '#64748b',
    marginBottom: '12px',
  },
  dropZoneText: {
    textAlign: 'center',
    color: '#64748b',
  },
  primaryText: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  secondaryText: {
    fontSize: '0.8rem',
    marginTop: '8px',
    color: '#94a3b8',
  },
  dropZoneLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    width: '100%',
    height: '100%',
  },
  supportingDocsDropZone: {
    position: 'relative',
    border: '2px dashed #cbd5e1',
    borderRadius: '8px',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    marginBottom: '16px'
  },
  resumePreview: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '6px',
    padding: '12px 16px',
    marginTop: '16px',
    border: '1px solid #e2e8f0',
    gap: '12px',
    flexWrap: 'wrap'
  },
  fileDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1
  },
  fileIcon: {
    color: '#3b82f6',
  },
  fileName: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#334155',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '200px'
  },
  fileType: {
    fontSize: '0.8rem',
    padding: '2px 6px',
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    borderRadius: '4px',
    fontWeight: '500',
  },
  parseResumeButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#2563eb',
    },
    '&:disabled': {
      backgroundColor: '#94a3b8',
      cursor: 'not-allowed',
    }
  },
  parsingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
    fontSize: '0.85rem',
    color: '#4b5563',
    justifyContent: 'center'
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(59, 130, 246, 0.2)',
    borderTop: '2px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  supportingDocsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '16px'
  },
  supportingDocItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '6px',
    padding: '10px 12px',
    border: '1px solid #e2e8f0',
  },
  fileRemoveButton: {
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0
  },
  addButton: {
    backgroundColor: '#f1f5f9',
    color: '#334155',
    border: '1px dashed #cbd5e1',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.2s',
  },
  removeButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0,
    lineHeight: 1,
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  submissionContainer: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    position: 'relative',
    overflow: 'hidden',
    padding: '2rem',
  },
  
  submissionCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    padding: '2rem',
    width: '100%',
    maxWidth: '650px',
    zIndex: 10,
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid rgba(226, 232, 240, 0.8)',
  },
  
  submissionHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  
  logoIcon: {
    width: '60px',
    height: '60px',
    backgroundColor: '#3b82f6',
    color: 'white',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
  },
  
  submissionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 0.75rem 0',
  },
  
  submissionSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    margin: 0,
  },
  
  progressContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  
  progressStep: {
    display: 'flex',
    alignItems: 'flex-start',
    position: 'relative',
    padding: '0 0.5rem',
  },
  
  completedStep: {
    color: '#10b981',
  },
  
  activeStep: {
    color: '#3b82f6',
  },
  
  progressIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '1rem',
    flexShrink: 0,
    border: '2px solid #e2e8f0',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#64748b',
    position: 'relative',
  },
  
  checkIcon: {
    color: 'white',
    width: '16px',
    height: '16px',
  },
  
  waitingIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  
  stepContent: {
    flex: 1,
  },
  
  stepLabel: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
  },
  
  stepDescription: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginBottom: '0.5rem',
  },
  
  progressBar: {
    height: '8px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '1.5rem',
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: '4px',
    transition: 'width 0.6s ease',
  },
  
  submissionFooter: {
    display: 'flex',
    justifyContent: 'center',
  },
  
  submissionNote: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#64748b',
    padding: '0.75rem 1rem',
    backgroundColor: '#f1f5f9',
    borderRadius: '6px',
    maxWidth: 'fit-content',
  },
  
  noteIcon: {
    color: '#64748b',
    flexShrink: 0,
  },
  
  submissionBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 1,
  },
  
  backgroundCircle1: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    top: '-100px',
    right: '-50px',
    animation: 'float 8s ease-in-out infinite',
  },
  
  backgroundCircle2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    bottom: '-150px',
    left: '-100px',
    animation: 'float 12s ease-in-out infinite reverse',
  },
  
  backgroundCircle3: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: 'rgba(249, 115, 22, 0.05)',
    top: '40%',
    left: '60%',
    animation: 'float 10s ease-in-out infinite 1s',
  },
};

// Add global CSS animation for the spinner
const SpinnerAnimation = () => (
  <style>{`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `}</style>
);
