import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const steps = [
  { label: 'Checking for spam' },
  { label: 'Cross-referencing LinkedIn' },
  { label: 'Ranking your application' },
];

export default function ApplyForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [formData, setFormData] = useState({ name: '', email: '', resume: null });

  // On mount, load saved applicant data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('applicantData');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData((f) => ({ ...f, ...parsed }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData((f) => ({ ...f, resume: files[0] }));
    } else {
      setFormData((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save name and email only (not resume) to localStorage
    localStorage.setItem('applicantData', JSON.stringify({
      name: formData.name,
      email: formData.email,
    }));

    setSubmitted(true);
    setCurrentStep(0);
  };

  // Sequential steps animation effect, same as before
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
      <div style={{ padding: '20px', maxWidth: 600, margin: 'auto' }}>
        <h2>Processing your application...</h2>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {steps.map((step, idx) => (
            <li
              key={idx}
              style={{
                margin: '12px 0',
                color: idx < currentStep ? 'green' : idx === currentStep ? '#007bff' : '#999',
                fontWeight: idx === currentStep ? 'bold' : 'normal',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {idx < currentStep && '✅'}
              {idx === currentStep && (
                <span
                  style={{
                    width: 16,
                    height: 16,
                    border: '3px solid #007bff',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    marginRight: 8,
                    animation: 'spin 1s linear infinite',
                    display: 'inline-block',
                  }}
                />
              )}
              <span>{step.label}</span>
            </li>
          ))}
        </ul>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: 600, margin: 'auto' }}>
      <h1>Apply for Job #{id}</h1>
      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: 4 }}>Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: 8, fontSize: 16 }}
            autoComplete="name"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 4 }}>Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: 8, fontSize: 16 }}
            autoComplete="email"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="resume" style={{ display: 'block', marginBottom: 4 }}>Upload Resume:</label>
          <input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            required
            onChange={handleChange}
            style={{ fontSize: 16 }}
          />
          {formData.resume && (
            <p style={{ marginTop: 6, fontStyle: 'italic', color: '#555' }}>
              Selected file: {formData.resume.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: '12px 24px',
            fontSize: 16,
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
