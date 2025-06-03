import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JobList from './pages/JobList';
import JobDetails from './pages/JobDetails';
import ApplyForm from './pages/form';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <Router>
      {/* ✅ Navbar is placed outside Routes so it shows on all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/apply/:id" element={<ApplyForm />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
