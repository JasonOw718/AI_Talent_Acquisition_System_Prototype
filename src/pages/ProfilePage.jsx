import React, { useState, useEffect } from 'react';
import RecruiterNavbar from '../components/RecruiterNavbar';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: 'Sarah Lee',
    email: 'sarah.lee@talentai.com',
    role: 'Senior Recruiter',
    department: 'Tech Recruitment',
    phone: '+60 12-345-6789',
    location: 'Kuala Lumpur, Malaysia',
    bio: 'Experienced technical recruiter with 7+ years focusing on engineering and product roles. Specialized in talent acquisition for AI, machine learning and data science positions.',
    avatar: 'SL'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({...profileData});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({
      ...editableProfile,
      [name]: value
    });
  };

  const handleSave = () => {
    setProfileData({...editableProfile});
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableProfile({...profileData});
    setIsEditing(false);
  };
  
  // Determine if we're on a mobile/small screen
  const isMobile = windowWidth < 768;

  return (
    <div style={styles.container}>
      <RecruiterNavbar />
      <div style={{
        ...styles.contentWithSidebar,
        ...(isMobile ? styles.contentMobile : {})
      }}>
        <div style={{
          ...styles.content,
          ...(isMobile ? styles.contentMobile : {})
        }}>
          <div style={{
            ...styles.header,
            ...(isMobile ? styles.headerMobile : {})
          }}>
            <h1 style={styles.title}>Profile Settings</h1>
            {!isEditing ? (
              <button 
                style={styles.editButton}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <div style={{
                ...styles.actionButtons,
                ...(isMobile ? styles.actionButtonsMobile : {})
              }}>
                <button style={styles.cancelButton} onClick={handleCancel}>
                  Cancel
                </button>
                <button style={styles.saveButton} onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            )}
          </div>
          
          <div style={styles.card}>
            <div style={styles.profileSection}>
              <div style={{
                ...styles.profileHeader,
                ...(isMobile ? styles.profileHeaderMobile : {})
              }}>
                <div style={styles.avatarSection}>
                  <div style={styles.avatar}>{editableProfile.avatar}</div>
                  {isEditing && (
                    <button style={styles.changeAvatarButton}>
                      Change
                    </button>
                  )}
                </div>
                <div style={styles.profileDetails}>
                  {isEditing ? (
                    <>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={editableProfile.name} 
                          onChange={handleInputChange}
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Job Title</label>
                        <input 
                          type="text" 
                          name="role" 
                          value={editableProfile.role} 
                          onChange={handleInputChange}
                          style={styles.input}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 style={styles.profileName}>{profileData.name}</h2>
                      <p style={styles.profileRole}>{profileData.role} • {profileData.department}</p>
                    </>
                  )}
                </div>
              </div>
              
              <div style={styles.divider}></div>
              
              <div style={styles.infoSection}>
                <h3 style={styles.sectionTitle}>Contact Information</h3>
                
                <div style={{
                  ...styles.infoGrid,
                  ...(isMobile ? styles.infoGridMobile : {})
                }}>
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Email</div>
                    {isEditing ? (
                      <input 
                        type="email" 
                        name="email" 
                        value={editableProfile.email} 
                        onChange={handleInputChange}
                        style={styles.input}
                      />
                    ) : (
                      <div style={styles.infoValue}>{profileData.email}</div>
                    )}
                  </div>
                  
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Phone</div>
                    {isEditing ? (
                      <input 
                        type="tel" 
                        name="phone" 
                        value={editableProfile.phone} 
                        onChange={handleInputChange}
                        style={styles.input}
                      />
                    ) : (
                      <div style={styles.infoValue}>{profileData.phone}</div>
                    )}
                  </div>
                  
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Department</div>
                    {isEditing ? (
                      <input 
                        type="text" 
                        name="department" 
                        value={editableProfile.department} 
                        onChange={handleInputChange}
                        style={styles.input}
                      />
                    ) : (
                      <div style={styles.infoValue}>{profileData.department}</div>
                    )}
                  </div>
                  
                  <div style={styles.infoItem}>
                    <div style={styles.infoLabel}>Location</div>
                    {isEditing ? (
                      <input 
                        type="text" 
                        name="location" 
                        value={editableProfile.location} 
                        onChange={handleInputChange}
                        style={styles.input}
                      />
                    ) : (
                      <div style={styles.infoValue}>{profileData.location}</div>
                    )}
                  </div>
                </div>
              </div>
              
              <div style={styles.divider}></div>
              
              <div style={styles.infoSection}>
                <h3 style={styles.sectionTitle}>Bio</h3>
                {isEditing ? (
                  <textarea 
                    name="bio" 
                    value={editableProfile.bio} 
                    onChange={handleInputChange}
                    style={styles.textarea}
                  ></textarea>
                ) : (
                  <p style={styles.bioText}>{profileData.bio}</p>
                )}
              </div>
            </div>
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
    paddingTop: '30px',
    paddingBottom: '30px',
  },
  contentMobile: {
    marginLeft: 0,
    width: '100%',
    paddingTop: '70px', // Account for mobile header
  },
  content: {
    padding: '0 30px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  contentPaddingMobile: {
    padding: '0 15px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  headerMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
  },
  editButton: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
  },
  actionButtonsMobile: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
    color: '#334155',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#e2e8f0',
    },
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  profileSection: {
    padding: '24px',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  profileHeaderMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px',
  },
  avatarSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: '700',
  },
  changeAvatarButton: {
    backgroundColor: 'transparent',
    color: '#3b82f6',
    border: '1px solid #3b82f6',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '0.75rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(59, 130, 246, 0.05)',
    },
  },
  profileDetails: {
    flex: '1',
  },
  profileName: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#0f172a',
    marginTop: 0,
    marginBottom: '4px',
  },
  profileRole: {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: 0,
  },
  divider: {
    height: '1px',
    backgroundColor: '#e2e8f0',
    margin: '24px 0',
  },
  infoSection: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#0f172a',
    marginTop: 0,
    marginBottom: '16px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  infoGridMobile: {
    gridTemplateColumns: '1fr',
    gap: '16px',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  infoLabel: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#64748b',
  },
  infoValue: {
    fontSize: '0.95rem',
    color: '#0f172a',
  },
  formGroup: {
    marginBottom: '12px',
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#64748b',
    marginBottom: '4px',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '0.95rem',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    outline: 'none',
    transition: 'all 0.2s ease',
    '&:focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.15)',
    },
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '0.95rem',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    minHeight: '120px',
    outline: 'none',
    transition: 'all 0.2s ease',
    resize: 'vertical',
    '&:focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.15)',
    },
  },
  bioText: {
    fontSize: '0.95rem',
    color: '#334155',
    lineHeight: '1.6',
    margin: 0,
  },
}; 