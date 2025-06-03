import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const jobs = [
  { id: 1, title: 'Software Engineer', company: 'Acme Corp', location: 'Remote', description: 'Work with React and Flask.' },
  { id: 2, title: 'Data Analyst', company: 'Beta Tech', location: 'New York', description: 'Analyze data using Python and SQL.' },
];

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === parseInt(id));

  if (!job) return <p style={{ padding: 20 }}>Job not found</p>;

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 600,
        margin: 'auto',
        animation: 'fadeIn 0.6s ease',
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 16,
          backgroundColor: '#eee',
          border: 'none',
          padding: '8px 12px',
          borderRadius: 4,
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        ← Back
      </button>

      <h1>{job.title}</h1>
      <p style={{ fontStyle: 'italic', color: '#555', marginTop: 4 }}>
        {job.company} — {job.location}
      </p>
      <hr style={{ margin: '20px 0' }} />
      <p>{job.description}</p>
      <Link to={`/apply/${job.id}`}>
        <button
          style={{
            marginTop: 20,
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 16,
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          Apply Now
        </button>
      </Link>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
