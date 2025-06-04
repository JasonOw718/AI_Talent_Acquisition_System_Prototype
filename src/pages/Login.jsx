import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (username === 'recruiter' && password === 'admin1111') {
        // Set logged in flag
        localStorage.setItem('recruiterLoggedIn', 'true');
        
        alert('Login successful! Redirecting to dashboard...');
        navigate('/recruiter/dashboard');
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div style={styles.container}>
      {/* Background Elements */}
      <div style={styles.bgGradient}></div>
      <div style={styles.bgPattern}></div>
      <div style={styles.bgShape1}></div>
      <div style={styles.bgShape2}></div>
      
      {/* Back Button */}
      <div style={styles.navBar}>
        <Link to="/" style={styles.backButton}>
          <svg style={styles.backIcon} viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </Link>
      </div>
      
      <div style={styles.loginWrapper}>
        <div style={styles.formColumn}>
          <div style={styles.logoWrapper}>
            <div style={styles.logoIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4.35c-4.3 0-7.79 3.4-7.79 7.58 0 1.58.5 3.05 1.35 4.27l-1.35 4.1 4.36-1.36c1.2.72 2.6 1.14 4.1 1.14 4.3 0 7.8-3.4 7.8-7.58 0-4.19-3.5-7.58-7.8-7.58a8.75 8.75 0 00-3.87.9"></path>
              </svg>
            </div>
            <div style={styles.logoText}>RecruitIQ</div>
          </div>

          <div style={styles.formHeader}>
            <h1 style={styles.formTitle}>Welcome back</h1>
            <p style={styles.formSubtitle}>Log in to your recruiter dashboard to manage job applications and candidates</p>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="username" style={styles.inputLabel}>Username</label>
              <div style={styles.inputContainer}>
                <svg style={styles.inputIcon} viewBox="0 0 24 24" width="20" height="20">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" fill="none"></path>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none"></circle>
                </svg>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.inputLabel}>Password</label>
              <div style={styles.inputContainer}>
                <svg style={styles.inputIcon} viewBox="0 0 24 24" width="20" height="20">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"></rect>
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" fill="none"></path>
                </svg>
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  placeholder="Enter your password"
                  required
                />
                <button 
                  type="button" 
                  style={styles.eyeButton}
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div style={styles.errorMessage}>
                <svg style={styles.errorIcon} viewBox="0 0 24 24" width="18" height="18">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"></circle>
                  <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2"></line>
                </svg>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              style={{
                ...styles.loginButton,
                ...(isLoading ? styles.loginButtonLoading : {})
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div style={styles.loadingWrapper}>
                  <div style={styles.spinner}></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div style={styles.demoInfo}>
            <div style={styles.demoInfoTitle}>Demo Credentials</div>
            <div style={styles.demoCredentials}>
              <div style={styles.demoCred}>
                <strong>Username:</strong> recruiter
              </div>
              <div style={styles.demoCred}>
                <strong>Password:</strong> admin1111
              </div>
            </div>
          </div>
        </div>

        <div style={styles.imageColumn}>
          <div style={styles.heroContent}>
            <h2 style={styles.heroTitle}>AI-Powered Talent Acquisition</h2>
            <p style={styles.heroText}>
              Streamline your recruitment process with our advanced AI tools that help you find the perfect candidates faster.
            </p>
            <div style={styles.featureList}>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span>AI-powered candidate screening</span>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span>Automated resume analysis</span>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span>Smart candidate matching</span>
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
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f8fafc',
    padding: '2rem',
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  
  // Background elements
  bgGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(226, 232, 240, 0.2) 0%, rgba(248, 250, 252, 0.8) 100%)',
    zIndex: -2,
  },
  bgPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
    backgroundSize: '30px 30px',
    opacity: 0.4,
    zIndex: -1,
  },
  bgShape1: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, rgba(66, 133, 244, 0.05), rgba(15, 157, 88, 0.05))',
    top: '-200px',
    right: '-100px',
  },
  bgShape2: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, rgba(15, 157, 88, 0.03), rgba(66, 133, 244, 0.03))',
    bottom: '-250px',
    left: '-150px',
  },
  
  loginWrapper: {
    display: 'flex',
    borderRadius: '12px',
    overflow: 'hidden',
    maxWidth: '720px',
    width: '100%',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    backgroundColor: 'white',
    height: 'auto',
    transform: 'scale(0.95)',
    '@media (max-width: 1024px)': {
      flexDirection: 'column',
      height: 'auto',
      maxWidth: '350px',
    },
  },
  
  navBar: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 10,
  },
  
  formColumn: {
    flex: '1',
    padding: '1.8rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '@media (max-width: 1024px)': {
      padding: '1.2rem',
    },
  },
  
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  logoIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '9px',
    background: 'linear-gradient(45deg, #4285f4, #0f9d58)',
    marginRight: '0.75rem',
    color: 'white',
  },
  logoText: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #4285f4, #0f9d58)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginLeft: '0.5rem',
  },
  
  formHeader: {
    marginBottom: '1.2rem',
  },
  formTitle: {
    fontSize: '1.35rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.4rem',
    marginTop: 0,
  },
  formSubtitle: {
    fontSize: '0.82rem',
    color: '#64748b',
    marginTop: 0,
    marginBottom: 0,
    lineHeight: '1.5',
  },
  
  form: {
    marginBottom: '1.8rem',
  },
  formGroup: {
    marginBottom: '1.3rem',
  },
  inputLabel: {
    display: 'block',
    fontSize: '0.82rem',
    fontWeight: '500',
    color: '#4a5568',
    marginBottom: '0.4rem',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    transition: 'all 0.2s ease',
    '&:focus-within': {
      borderColor: '#4285f4',
      boxShadow: '0 0 0 3px rgba(66, 133, 244, 0.15)',
    },
  },
  input: {
    width: '100%',
    padding: '0.7rem 1rem 0.7rem 2.3rem',
    fontSize: '0.94rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'all 0.2s',
    backgroundColor: '#f8fafc',
    color: '#1a202c',
    '&:focus': {
      borderColor: '#4285f4',
      boxShadow: '0 0 0 3px rgba(66, 133, 244, 0.15)',
    },
  },
  inputIcon: {
    color: '#94a3b8',
    marginRight: '0.75rem',
  },
  eyeButton: {
    position: 'absolute',
    right: '0.75rem',
    background: 'transparent',
    border: 'none',
    color: '#a0aec0',
    cursor: 'pointer',
    padding: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  loginButton: {
    backgroundColor: '#4285f4',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    marginTop: '1.5rem',
    transition: 'all 0.2s ease',
    background: 'linear-gradient(90deg, #4285f4, #0f9d58)',
    boxShadow: '0 2px 6px rgba(66, 133, 244, 0.3)',
  },
  loginButtonLoading: {
    opacity: 0.8,
    cursor: 'not-allowed',
  },
  loadingWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    border: '3px solid rgba(255, 255, 255, 0.2)',
    borderTopColor: 'white',
    animation: 'spin 0.8s linear infinite',
    marginRight: '0.75rem',
  },
  
  errorMessage: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.7rem 0.94rem',
    backgroundColor: '#fff5f5',
    color: '#e53e3e',
    borderRadius: '8px',
    fontSize: '0.82rem',
    marginBottom: '1rem',
  },
  errorIcon: {
    marginRight: '0.5rem',
    flexShrink: 0,
  },
  
  demoInfo: {
    marginTop: '1.8rem',
    padding: '1.1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px dashed #cbd5e0',
  },
  demoInfoTitle: {
    fontSize: '0.82rem',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '0.7rem',
  },
  demoCredentials: {
    fontSize: '0.82rem',
    color: '#4a5568',
  },
  demoCred: {
    marginBottom: '0.4rem',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  
  // Right column with image and content
  imageColumn: {
    flex: '1',
    backgroundColor: '#f1f5f9',
    borderRadius: '0 12px 12px 0',
    padding: '3rem',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #4285f4, #0f9d58)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 1023px)': {
      display: 'none',
    },
  },
  
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '380px',
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    lineHeight: 1.2,
    color: 'white',
  },
  heroText: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginBottom: '2rem',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  featureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.9rem',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
  },
  featureIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'rgba(15, 157, 88, 0.1)',
    color: '#0f9d58',
    marginRight: '0.75rem',
  },
  
  backButton: {
    display: 'flex',
    alignItems: 'center',
    color: '#1e293b',
    fontSize: '0.9rem',
    fontWeight: '500',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    backgroundColor: 'white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
    transition: 'all 0.2s ease',
    border: '1px solid #e2e8f0',
  },
  
  backIcon: {
    marginRight: '8px',
  },
};