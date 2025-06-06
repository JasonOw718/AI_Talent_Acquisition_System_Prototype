import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import JobList from './pages/JobList'
import JobDetails from './pages/JobDetails'
import ApplyForm from './pages/form'
import Login from './pages/Login'
import RecruiterDashboard from './pages/RecruiterDashboard'
import JobListings from './pages/JobListings'
import AIAssistant from './pages/AIAssistant'
import ProfilePage from './pages/ProfilePage'
import CreateJob from './pages/CreateJob'
import ProtectedRoute from './pages/ProtectedRoute'
import './App.css'

// Helper component to set body data attribute based on route
function PageTypeHandler() {
  const location = useLocation();
  
  useEffect(() => {
    // Set data-page attribute based on the current route
    if (location.pathname.startsWith('/recruiter')) {
      document.body.setAttribute('data-page', 'recruiter-dashboard');
    } else {
      document.body.setAttribute('data-page', 'job-portal');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.removeAttribute('data-page');
    };
  }, [location.pathname]);
  
  return null;
}

function App() {
  return (
    <Router basename="/AI_Talent_Acquisition_System_Prototype">
      <PageTypeHandler />
      <Routes>
        {/* Recruiter Routes */}
        <Route path="/recruiter">
          <Route path="login" element={<Login />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="jobs"
            element={
              <ProtectedRoute>
                <JobListings />
              </ProtectedRoute>
            }
          />
          <Route
            path="jobs/create"
            element={
              <ProtectedRoute>
                <CreateJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="chatbot"
            element={
              <ProtectedRoute>
                <AIAssistant />
              </ProtectedRoute>
            }
          />
          <Route
            path="aiassistant"
            element={
              <ProtectedRoute>
                <AIAssistant />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Job Portal Routes */}
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
          </>
        } />
        <Route path="/jobs" element={
          <>
            <Navbar />
            <JobList />
          </>
        } />
        <Route path="/job/:id" element={
          <>
            <Navbar />
            <JobDetails />
          </>
        } />
        <Route path="/apply/:id" element={
          <>
            <Navbar />
            <ApplyForm />
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App 