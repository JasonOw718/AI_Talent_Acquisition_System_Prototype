import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecruiterNavbar from '../components/RecruiterNavbar';

export default function CreateJob() {
  const [jobForm, setJobForm] = useState({
    job_id: `job_${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`, // Generate a random job ID
    recruiter_id: 'r_001', // Default recruiter ID (in a real app, this would be from user session)
    title: '',
    location: 'Kuala Lumpur',
    description: '',
    education_required: [{
      degree: '',
      major: '',
      description: ''
    }],
    skills_required: [{
      name: '',
      description: ''
    }],
    languages_required: [{
      language: '',
      proficiency: ''
    }],
    weights: {
      profile_integrity: 0.4,
      job_match: 0.6,
      job_match_weights: {
        hard_skills: 0.4,
        soft_skills: 0.2,
        education: 0.3,
        language: 0.1
      }
    },
    stage: 'draft',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  // Helper functions for form arrays
  const addEducation = () => {
    setJobForm({
      ...jobForm,
      education_required: [
        ...jobForm.education_required,
        {
          degree: '',
          major: '',
          description: ''
        }
      ]
    });
  };

  const removeEducation = (index) => {
    const newEducation = [...jobForm.education_required];
    newEducation.splice(index, 1);
    setJobForm({
      ...jobForm,
      education_required: newEducation
    });
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...jobForm.education_required];
    newEducation[index][field] = value;
    setJobForm({
      ...jobForm,
      education_required: newEducation
    });
  };

  const addSkill = () => {
    setJobForm({
      ...jobForm,
      skills_required: [
        ...jobForm.skills_required,
        {
          name: '',
          description: ''
        }
      ]
    });
  };

  const removeSkill = (index) => {
    const newSkills = [...jobForm.skills_required];
    newSkills.splice(index, 1);
    setJobForm({
      ...jobForm,
      skills_required: newSkills
    });
  };

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...jobForm.skills_required];
    newSkills[index][field] = value;
    setJobForm({
      ...jobForm,
      skills_required: newSkills
    });
  };

  const addLanguage = () => {
    setJobForm({
      ...jobForm,
      languages_required: [
        ...jobForm.languages_required,
        {
          language: '',
          proficiency: ''
        }
      ]
    });
  };

  const removeLanguage = (index) => {
    const newLanguages = [...jobForm.languages_required];
    newLanguages.splice(index, 1);
    setJobForm({
      ...jobForm,
      languages_required: newLanguages
    });
  };

  const handleLanguageChange = (index, field, value) => {
    const newLanguages = [...jobForm.languages_required];
    newLanguages[index][field] = value;
    setJobForm({
      ...jobForm,
      languages_required: newLanguages
    });
  };

  const handleWeightChange = (field, value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    
    if (field === 'profile_integrity' || field === 'job_match') {
      // When changing profile_integrity, adjust job_match to maintain sum = 1
      const otherField = field === 'profile_integrity' ? 'job_match' : 'profile_integrity';
      const otherValue = Math.max(0, Math.min(1, 1 - numValue));
      
      setJobForm({
        ...jobForm,
        weights: {
          ...jobForm.weights,
          [field]: numValue,
          [otherField]: otherValue
        }
      });
    } else {
      // For job_match subcategories
      const currentWeights = { ...jobForm.weights.job_match_weights };
      currentWeights[field] = numValue;
      
      // Normalize to ensure sum = 1
      const sum = Object.values(currentWeights).reduce((acc, val) => acc + val, 0);
      if (sum > 0) {
        const factor = 1 / sum;
        Object.keys(currentWeights).forEach(key => {
          currentWeights[key] = parseFloat((currentWeights[key] * factor).toFixed(2));
        });
      }
      
      setJobForm({
        ...jobForm,
        weights: {
          ...jobForm.weights,
          job_match_weights: currentWeights
        }
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobForm({
      ...jobForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update stage and timestamps
    const updatedJobForm = {
      ...jobForm,
      stage: 'published',
      updated_at: new Date().toISOString()
    };
    
    // Here you would typically make an API call to save the job posting
    console.log('Job posting to be saved:', updatedJobForm);
    alert('Job posting created successfully!');
    // Reset form or redirect
  };

  // Calculate the sum of weights to ensure they total to 1.0
  const mainWeightsSum = jobForm.weights.profile_integrity + jobForm.weights.job_match;
  const jobMatchWeightsSum = Object.values(jobForm.weights.job_match_weights).reduce((sum, weight) => sum + weight, 0);

  return (
    <div style={styles.container}>
      <RecruiterNavbar />
      <div style={styles.contentWithSidebar}>
        <div style={styles.content}>
          <div style={styles.header}>
            <h1 style={styles.title}>Create New Career Posting</h1>
          </div>

          <div style={styles.card}>
            <form onSubmit={handleSubmit}>
              <div style={styles.formSection}>
                <h2 style={styles.sectionTitle}>Basic Information</h2>
                
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="job_id">Job ID</label>
                  <input
                    type="text"
                    id="job_id"
                    name="job_id"
                    value={jobForm.job_id}
                    onChange={handleInputChange}
                    style={styles.input}
                    disabled
                  />
                  <p style={styles.helperText}>Auto-generated unique identifier</p>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="title">Job Title*</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={jobForm.title}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                    placeholder="e.g. Digital Marketing Associate"
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="location">Location*</label>
                  <select
                    id="location"
                    name="location"
                    value={jobForm.location}
                    onChange={handleInputChange}
                    style={styles.select}
                    required
                  >
                    <option value="Kuala Lumpur">Kuala Lumpur</option>
                    <option value="Penang">Penang</option>
                    <option value="Johor Bahru">Johor Bahru</option>
                    <option value="Petaling Jaya">Petaling Jaya</option>
                    <option value="Cyberjaya">Cyberjaya</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="description">Job Description*</label>
                  <textarea
                    id="description"
                    name="description"
                    value={jobForm.description}
                    onChange={handleInputChange}
                    style={styles.textarea}
                    required
                    placeholder="Describe the responsibilities and objectives of this position..."
                    rows={5}
                  ></textarea>
                </div>
              </div>
              
              <div style={styles.divider}></div>
              
              {/* Education Requirements */}
              <div style={styles.formSection}>
                <h2 style={styles.sectionTitle}>Education Requirements</h2>
                
                {jobForm.education_required.map((edu, index) => (
                  <div key={index} style={styles.requiredItem}>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        style={styles.removeButton}
                      >
                        &times;
                      </button>
                    )}
                    
                    <div style={styles.formGridTwo}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Degree*</label>
                        <select
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                          style={styles.select}
                          required
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
                      
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Major/Field of Study*</label>
                        <input
                          type="text"
                          value={edu.major}
                          onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
                          style={styles.input}
                          required
                          placeholder="e.g. Marketing or Communication"
                        />
                      </div>
                    </div>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Description</label>
                      <textarea
                        value={edu.description}
                        onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                        style={styles.textarea}
                        placeholder="Describe specific knowledge or skills relevant to this educational background"
                        rows={2}
                      ></textarea>
                    </div>
                  </div>
                ))}
                
                <button 
                  type="button" 
                  onClick={addEducation} 
                  style={styles.addButton}
                >
                  + Add Another Education Requirement
                </button>
              </div>
              
              <div style={styles.divider}></div>
              
              {/* Skills Requirements */}
              <div style={styles.formSection}>
                <h2 style={styles.sectionTitle}>Skills Requirements</h2>
                
                {jobForm.skills_required.map((skill, index) => (
                  <div key={index} style={styles.requiredItem}>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        style={styles.removeButton}
                      >
                        &times;
                      </button>
                    )}
                    
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Skill Name*</label>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                        style={styles.input}
                        required
                        placeholder="e.g. SEO"
                      />
                    </div>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Description</label>
                      <textarea
                        value={skill.description}
                        onChange={(e) => handleSkillChange(index, 'description', e.target.value)}
                        style={styles.textarea}
                        placeholder="Describe the specific requirements for this skill"
                        rows={2}
                      ></textarea>
                    </div>
                  </div>
                ))}
                
                <button 
                  type="button" 
                  onClick={addSkill} 
                  style={styles.addButton}
                >
                  + Add Another Skill Requirement
                </button>
              </div>
              
              <div style={styles.divider}></div>
              
              {/* Language Requirements */}
              <div style={styles.formSection}>
                <h2 style={styles.sectionTitle}>Language Requirements</h2>
                
                {jobForm.languages_required.map((lang, index) => (
                  <div key={index} style={styles.requiredItem}>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeLanguage(index)}
                        style={styles.removeButton}
                      >
                        &times;
                      </button>
                    )}
                    
                    <div style={styles.formGridTwo}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Language*</label>
                        <input
                          type="text"
                          value={lang.language}
                          onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                          style={styles.input}
                          required
                          placeholder="e.g. English"
                        />
                      </div>
                      
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Proficiency*</label>
                        <select
                          value={lang.proficiency}
                          onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                          style={styles.select}
                          required
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
                  </div>
                ))}
                
                <button 
                  type="button" 
                  onClick={addLanguage} 
                  style={styles.addButton}
                >
                  + Add Another Language Requirement
                </button>
              </div>
              
              <div style={styles.divider}></div>
              
              {/* Matching Weights */}
              <div style={styles.formSection}>
                <h2 style={styles.sectionTitle}>Matching Weights</h2>
                <p style={styles.sectionDescription}>
                  Define the importance of each factor for candidate matching.
                </p>
                
                <div style={(mainWeightsSum !== 1 || jobMatchWeightsSum !== 1) ? styles.warningBox : null}>
                  {mainWeightsSum !== 1 && (
                    <p style={styles.warningText}>
                      Warning: Profile Integrity + Job Match weights should sum to 1.0 (currently {mainWeightsSum.toFixed(2)})
                    </p>
                  )}
                  {jobMatchWeightsSum !== 1 && (
                    <p style={styles.warningText}>
                      Warning: Job Match subcategory weights should sum to 1.0 (currently {jobMatchWeightsSum.toFixed(2)})
                    </p>
                  )}
                </div>
                
                <h3 style={styles.subSectionTitle}>Main Categories</h3>
                <div style={styles.weightsGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Profile Integrity</label>
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={jobForm.weights.profile_integrity}
                      onChange={(e) => handleWeightChange('profile_integrity', e.target.value)}
                      style={styles.input}
                    />
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Job Match</label>
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={jobForm.weights.job_match}
                      onChange={(e) => handleWeightChange('job_match', e.target.value)}
                      style={styles.input}
                    />
                  </div>
                </div>
                
                <h3 style={styles.subSectionTitle}>Job Match Categories</h3>
                <div style={styles.weightsGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Hard Skills</label>
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={jobForm.weights.job_match_weights.hard_skills}
                      onChange={(e) => handleWeightChange('hard_skills', e.target.value)}
                      style={styles.input}
                    />
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Soft Skills</label>
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={jobForm.weights.job_match_weights.soft_skills}
                      onChange={(e) => handleWeightChange('soft_skills', e.target.value)}
                      style={styles.input}
                    />
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Education</label>
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={jobForm.weights.job_match_weights.education}
                      onChange={(e) => handleWeightChange('education', e.target.value)}
                      style={styles.input}
                    />
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Language</label>
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={jobForm.weights.job_match_weights.language}
                      onChange={(e) => handleWeightChange('language', e.target.value)}
                      style={styles.input}
                    />
                  </div>
                </div>
              </div>
              
              <div style={styles.formActions}>
                <Link to="/recruiter/jobs" style={styles.cancelButton}>
                  Cancel
                </Link>
                <button 
                  type="submit" 
                  style={styles.submitButton}
                  disabled={mainWeightsSum !== 1 || jobMatchWeightsSum !== 1}
                >
                  Create Career Posting
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  contentWithSidebar: {
    marginLeft: '240px',
    width: 'calc(100% - 240px)',
    transition: 'margin 0.3s ease',
    '@media (max-width: 1024px)': {
      marginLeft: 0,
      width: '100%',
    },
  },
  content: {
    padding: '25px',
    paddingTop: '80px',
    width: '100%',
    boxSizing: 'border-box',
    maxWidth: '1000px',
    margin: '0 auto',
    '@media (max-width: 768px)': {
      padding: '15px',
      paddingTop: '70px',
    },
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '20px',
  },
  formSection: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#334155',
    marginTop: 0,
    marginBottom: '15px',
  },
  sectionDescription: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginTop: 0,
    marginBottom: '15px',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e2e8f0',
    margin: '20px 0',
  },
  formGroup: {
    marginBottom: '15px',
  },
  formGridTwo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
  weightsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr 1fr',
    },
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
  label: {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#475569',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '0.9rem',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    color: '#334155',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '0.9rem',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    color: '#334155',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '0.9rem',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    color: '#334155',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
  },
  requiredItem: {
    padding: '15px',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    marginBottom: '15px',
    border: '1px solid #e2e8f0',
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1.2rem',
    padding: 0,
  },
  addButton: {
    backgroundColor: '#f1f5f9',
    color: '#334155',
    border: '1px dashed #cbd5e1',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.2s',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    color: '#64748b',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  warningBox: {
    backgroundColor: '#fff7ed',
    border: '1px solid #ffedd5',
    borderRadius: '6px',
    padding: '10px 15px',
    marginBottom: '15px',
  },
  warningText: {
    color: '#c2410c',
    fontSize: '0.85rem',
    margin: 0,
  },
  helperText: {
    fontSize: '0.75rem',
    color: '#64748b',
    margin: '5px 0 0 0',
  },
  subSectionTitle: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#475569',
    marginTop: '15px',
    marginBottom: '10px',
  },
}; 