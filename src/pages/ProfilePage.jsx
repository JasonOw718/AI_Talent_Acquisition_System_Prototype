import React, { useState } from 'react';
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

  return (
    <div style={styles.container}>
      <RecruiterNavbar />
      <div style={styles.contentWithSidebar}>
        <div style={styles.content}>
          <div style={styles.header}>
            <h1 style={styles.title}>Profile Settings</h1>
            {!isEditing ? (
              <button 
                style={styles.editButton}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <div style={styles.actionButtons}>
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
              <div style={styles.profileHeader}>
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
                
                <div style={styles.infoGrid}>
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
  },
  editButton: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
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
  },
  saveButton: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '20px',
  },
  profileSection: {
    marginBottom: '20px',
  },
  profileHeader: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
    '@media (max-width: 640px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  avatarSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#2563eb',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: '600',
    '@media (max-width: 768px)': {
      width: '80px',
      height: '80px',
      fontSize: '1.5rem',
    },
  },
  changeAvatarButton: {
    backgroundColor: 'transparent',
    color: '#2563eb',
    border: 'none',
    fontSize: '0.8rem',
    cursor: 'pointer',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#0f172a',
    margin: '0 0 4px 0',
  },
  profileRole: {
    fontSize: '0.9rem',
    color: '#64748b',
    margin: 0,
  },
  divider: {
    height: '1px',
    backgroundColor: '#e2e8f0',
    margin: '20px 0',
  },
  infoSection: {
    marginBottom: '10px',
  },
  sectionTitle: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#334155',
    margin: '0 0 15px 0',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
  infoItem: {
    marginBottom: '5px',
  },
  infoLabel: {
    fontSize: '0.8rem',
    color: '#64748b',
    marginBottom: '4px',
  },
  infoValue: {
    fontSize: '0.9rem',
    color: '#334155',
  },
  bioText: {
    fontSize: '0.9rem',
    color: '#334155',
    lineHeight: '1.5',
    margin: 0,
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontSize: '0.8rem',
    color: '#64748b',
    marginBottom: '4px',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '0.9rem',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    color: '#334155',
  },
  textarea: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '0.9rem',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    color: '#334155',
    minHeight: '100px',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
}; 