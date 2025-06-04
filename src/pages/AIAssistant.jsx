import React, { useState, useEffect } from 'react';
import RecruiterNavbar from '../components/RecruiterNavbar';

export default function AIAssistant() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your AI recruiting assistant. How can I help you today? I can help with job descriptions, candidate screening, interview questions, and more.'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    // Add user message to chat history
    setChatHistory([...chatHistory, { role: 'user', content: message }]);
    setMessage('');
    
    // Simulate AI response (in a real app, this would be an API call)
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "I've analyzed the candidate profiles and found 3 potential matches for your requirements.",
        "Based on market research, the salary range for this position should be between RM 7,000 - RM 10,000 per month.",
        "I can help you create a job description for this role. What specific skills and experience are you looking for?",
        "Here's a draft of screening questions you could use for initial candidate assessment.",
        "The analytics show that LinkedIn has been your most effective recruiting channel this quarter."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  // Scroll to bottom of chat when messages are added
  useEffect(() => {
    const chatEl = document.getElementById('chat-history');
    if (chatEl) {
      chatEl.scrollTop = chatEl.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div style={styles.container}>
      <RecruiterNavbar />
      <div style={styles.contentWithSidebar}>
        <div style={styles.content}>
          <div style={styles.header}>
            <div style={styles.titleContainer}>
              <div style={styles.iconContainer}>
                <svg style={styles.aiIcon} viewBox="0 0 24 24" width="24" height="24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h1 style={styles.title}>AI Recruiting Assistant</h1>
            </div>
            <div style={styles.statusBadge}>
              <span style={styles.statusIndicator}></span>
              <span style={styles.statusText}>Online</span>
            </div>
          </div>
          
          <div style={styles.chatContainer}>
            <div style={styles.chatHistory} id="chat-history">
              {chatHistory.map((msg, index) => (
                <div 
                  key={index} 
                  style={{
                    ...styles.chatMessage, 
                    ...(msg.role === 'user' ? styles.userMessage : styles.assistantMessage)
                  }}
                >
                  {msg.role === 'assistant' && (
                    <div style={styles.avatarContainer}>
                      <div style={styles.avatar}>AI</div>
                    </div>
                  )}
                  <div style={styles.messageContent}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{...styles.chatMessage, ...styles.assistantMessage}}>
                  <div style={styles.avatarContainer}>
                    <div style={styles.avatar}>AI</div>
                  </div>
                  <div style={styles.typingIndicator}>
                    <span style={styles.typingDot}></span>
                    <span style={styles.typingDot}></span>
                    <span style={styles.typingDot}></span>
                  </div>
                </div>
              )}
            </div>
            
            <form style={styles.inputForm} onSubmit={handleSubmit}>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={styles.messageInput}
                placeholder="Ask about job descriptions, candidate screening, or recruitment advice..."
              />
              <button 
                type="submit" 
                style={{
                  ...styles.sendButton,
                  ...(message.trim() === '' ? styles.sendButtonDisabled : {})
                }}
                disabled={message.trim() === ''}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>

          <div style={styles.footer}>
            <p style={styles.disclaimer}>AI responses are generated for demonstration purposes. In a real system, responses would be tailored to your specific recruitment needs and data.</p>
          </div>
        </div>
      </div>

      <div style={styles.decoration1}></div>
      <div style={styles.decoration2}></div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: "'Inter', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  contentWithSidebar: {
    marginLeft: '240px',
    width: 'calc(100% - 240px)',
    transition: 'margin 0.3s ease',
    '@media (max-width: 1024px)': {
      marginLeft: 0,
      width: '100%',
    },
    position: 'relative',
    zIndex: 1,
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
    marginBottom: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: '#3b82f6',
    color: 'white',
    marginRight: '12px',
  },
  aiIcon: {
    width: '20px',
    height: '20px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '16px',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  statusIndicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
  },
  statusText: {
    letterSpacing: '0.5px',
  },
  chatContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '65vh',
    border: '1px solid rgba(226, 232, 240, 0.8)',
  },
  chatHistory: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: '#fcfdfe',
  },
  chatMessage: {
    display: 'flex',
    borderRadius: '8px',
    maxWidth: '85%',
    fontSize: '0.9rem',
    lineHeight: '1.6',
  },
  userMessage: {
    backgroundColor: '#eef6ff',
    color: '#1e40af',
    alignSelf: 'flex-end',
    borderBottomRightRadius: '2px',
    padding: '12px 16px',
  },
  assistantMessage: {
    backgroundColor: '#f8fafc',
    color: '#334155',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: '2px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
    border: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px 16px',
  },
  avatarContainer: {
    marginRight: '12px',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  messageContent: {
    flex: 1,
  },
  typingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '8px 0',
  },
  typingDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#cbd5e1',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'typingAnimation 1.4s infinite ease-in-out both',
    '&:nth-child(1)': {
      animationDelay: '0s',
    },
    '&:nth-child(2)': {
      animationDelay: '0.2s',
    },
    '&:nth-child(3)': {
      animationDelay: '0.4s',
    },
  },
  inputForm: {
    display: 'flex',
    padding: '16px',
    borderTop: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
  },
  messageInput: {
    flex: 1,
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    backgroundColor: '#f8fafc',
    '&:focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    width: '42px',
    height: '42px',
    marginLeft: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#2563eb',
      transform: 'translateY(-1px)',
    },
  },
  sendButtonDisabled: {
    backgroundColor: '#94a3b8',
    cursor: 'not-allowed',
    '&:hover': {
      backgroundColor: '#94a3b8',
      transform: 'none',
    },
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: '0.8rem',
    padding: '0 20px',
  },
  disclaimer: {
    margin: '0',
    lineHeight: '1.6',
  },
  decoration1: {
    position: 'absolute',
    top: '-100px',
    right: '-100px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0) 70%)',
    zIndex: 0,
  },
  decoration2: {
    position: 'absolute',
    bottom: '-100px',
    left: '-100px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0) 70%)',
    zIndex: 0,
  },
}; 