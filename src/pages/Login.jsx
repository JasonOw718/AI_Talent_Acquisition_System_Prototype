import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Keep this

export default function Login() {
  const navigate = useNavigate(); // ✅ This stays

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
        localStorage.setItem('recruiterLoggedIn', 'true');  // <-- THIS LINE ADDED
        
        alert('Login successful! Redirecting to dashboard...');
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div style={styles.container}>
      {/* Background Elements */}
      <div style={styles.bgShape1}></div>
      <div style={styles.bgShape2}></div>
      <div style={styles.bgShape3}></div>

      <div style={styles.loginCard}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>🚀</div>
            <span style={styles.logoText}>TalentAI</span>
          </div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>
            Sign in to your recruiter dashboard and discover amazing talent
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <div style={styles.inputIcon}>👤</div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  ...styles.input,
                  ...(username ? styles.inputFilled : {})
                }}
                placeholder="Username"
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <div style={styles.inputIcon}>🔐</div>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  ...styles.input,
                  ...(password ? styles.inputFilled : {})
                }}
                placeholder="Password"
                required
              />
              <button
                type="button"
                style={styles.toggleButton}
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {error && (
            <div style={styles.errorContainer}>
              <span style={styles.errorIcon}>⚠️</span>
              <span style={styles.errorText}>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            style={{
              ...styles.loginBtn,
              ...(isLoading ? styles.loginBtnLoading : {})
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div style={styles.loader}>
                <div style={styles.spinner}></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <>
                <span>Sign In</span>
                <span style={styles.btnIcon}>→</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.divider}>
            <span style={styles.dividerText}>Demo Credentials</span>
          </div>
          <div style={styles.demoInfo}>
            <p style={styles.demoText}>
              <strong>Username:</strong> recruiter<br/>
              <strong>Password:</strong> admin1111
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden',
  },
  
  // Background shapes
  bgShape1: {
    position: 'absolute',
    top: '-10%',
    right: '-10%',
    width: '300px',
    height: '300px',
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
    borderRadius: '50%',
    transform: 'rotate(45deg)',
  },
  bgShape2: {
    position: 'absolute',
    bottom: '-15%',
    left: '-15%',
    width: '400px',
    height: '400px',
    background: 'linear-gradient(45deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
    borderRadius: '50%',
    transform: 'rotate(-45deg)',
  },
  bgShape3: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '150px',
    height: '150px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '30px',
    transform: 'rotate(15deg)',
  },

  loginCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    padding: '3rem 2.5rem',
    borderRadius: '24px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.3)',
    maxWidth: '440px',
    width: '100%',
    position: 'relative',
    zIndex: 10,
  },

  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  logoIcon: {
    fontSize: '2rem',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderRadius: '12px',
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  title: {
    fontSize: '2.2rem',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '0.5rem',
    letterSpacing: '-0.02em',
    background: 'linear-gradient(135deg, #2d3748, #4a5568)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  subtitle: {
    color: '#64748b',
    fontSize: '1rem',
    lineHeight: '1.5',
    maxWidth: '300px',
    margin: '0 auto',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },

  inputGroup: {
    position: 'relative',
  },

  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    background: '#f8fafc',
    borderRadius: '16px',
    border: '2px solid transparent',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
  },

  inputIcon: {
    padding: '1rem',
    fontSize: '1.2rem',
    color: '#64748b',
    background: 'rgba(102, 126, 234, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    flex: 1,
    padding: '1rem 1.25rem',
    border: 'none',
    background: 'transparent',
    fontSize: '1rem',
    color: '#1a202c',
    outline: 'none',
    transition: 'all 0.3s ease',
  },

  inputFilled: {
    color: '#1a202c',
    fontWeight: '500',
  },

  toggleButton: {
    position: 'absolute',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
  },

  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '12px',
    marginTop: '-0.5rem',
  },
  errorIcon: {
    fontSize: '1rem',
  },
  errorText: {
    color: '#dc2626',
    fontSize: '0.9rem',
    fontWeight: '500',
  },

  loginBtn: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    marginTop: '0.5rem',
  },

  loginBtnLoading: {
    background: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
    cursor: 'not-allowed',
    boxShadow: '0 4px 15px rgba(156, 163, 175, 0.3)',
  },

  btnIcon: {
    fontSize: '1.2rem',
    transition: 'transform 0.3s ease',
  },

  loader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },

  spinner: {
    width: '18px',
    height: '18px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },

  footer: {
    marginTop: '2rem',
    textAlign: 'center',
  },

  divider: {
    position: 'relative',
    margin: '1.5rem 0',
  },

  dividerText: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#64748b',
    fontSize: '0.9rem',
    padding: '0 1rem',
    position: 'relative',
    zIndex: 1,
  },

  demoInfo: {
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid rgba(102, 126, 234, 0.2)',
  },

  demoText: {
    color: '#475569',
    fontSize: '0.9rem',
    margin: 0,
    lineHeight: '1.5',
  },
};