import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthContext';
import PrivateRoute from '../auth/PrivateRoute';

// Auth pages
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Unauthorized from '../pages/Unauthorized';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Applicant
import DashboardApplicant from '../pages/applicant/Dashboard';
import ApplyLoan from '../pages/applicant/ApplyLoan';
import MyApplications from '../pages/applicant/MyApplications';
import ApplicationView from '../pages/applicant/ApplicationView';

// Admin
import AdminDashboard from '../pages/admin/AdminDashboard';
import ApplicationsAdmin from '../pages/admin/ApplicationsAdmin';
import LoanTypesAdmin from '../pages/admin/LoanTypesAdmin';
import UsersAdmin from '../pages/admin/UsersAdmin';

// Agent
import AgentDashboard from '../pages/agent/AgentDashboard';
import AssignedApplications from '../pages/agent/AssignedApplications';
import ApplicationReview from '../pages/agent/ApplicationReview';
import Footer from '../components/Footer';

export default function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Applicant */}
          <Route path="/applicant/dashboard" element={<PrivateRoute roles={['APPLICANT']}><DashboardApplicant/></PrivateRoute>} />
          <Route path="/applicant/apply" element={<PrivateRoute roles={['APPLICANT']}><ApplyLoan/></PrivateRoute>} />
          <Route path="/applicant/my-applications" element={<PrivateRoute roles={['APPLICANT']}><MyApplications/></PrivateRoute>} />
          <Route path="/applicant/applications/:id" element={<PrivateRoute roles={['APPLICANT']}><ApplicationView/></PrivateRoute>} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<PrivateRoute roles={['ADMIN']}><AdminDashboard/></PrivateRoute>} />
          <Route path="/admin/applications" element={<PrivateRoute roles={['ADMIN']}><ApplicationsAdmin/></PrivateRoute>} />
          <Route path="/admin/loan-types" element={<PrivateRoute roles={['ADMIN']}><LoanTypesAdmin/></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute roles={['ADMIN']}><UsersAdmin/></PrivateRoute>} />

          {/* Agent */}
          <Route path="/agent/dashboard" element={<PrivateRoute roles={['AGENT']}><AgentDashboard/></PrivateRoute>} />
          <Route path="/agent/assigned" element={<PrivateRoute roles={['AGENT']}><AssignedApplications/></PrivateRoute>} />
          <Route path="/agent/applications/:id" element={<PrivateRoute roles={['AGENT']}><ApplicationReview/></PrivateRoute>} />

          <Route path="*" element={<div className="p-4">404 - Not Found</div>} />
        </Routes>
        <Footer/>
      </AuthProvider>
    </Router>
  );
}
