import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { USER_TYPE } from './constant';
import Home from './pages/Home';
import JobApplyPage from './pages/jobseekDashbord/JobApplyPage';

import JobSeekerDashboard from './pages/jobseekDashbord/JobSeekerDashboard';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import { useStore } from './store';
import Jobs from './pages/jobseekDashbord/Jobs';
import JobDetails from './pages/jobseekDashbord/JobDetails';
import EmployerDashboard from './pages/employDashbord/EmployerDashboard';

// Protected Route component
const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole?: string }) => {
  const userRole = localStorage.getItem('role');
  const isAuthenticated = localStorage.getItem('jobToken'); // or use your store

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const isDarkMode = useStore((state) => state.isDarkMode);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route path="/jobs" element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          } />
          <Route path="/jobs/:id" element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          } />
          <Route path="/employer/dashboard" element={
            <ProtectedRoute requiredRole={USER_TYPE.EMPLOYER}>
              <EmployerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/jobseeker/dashboard" element={
            <ProtectedRoute requiredRole={USER_TYPE.JOBSEEKER}>
              <JobSeekerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/apply-job" element={
            <ProtectedRoute requiredRole={USER_TYPE.JOBSEEKER}>
              <JobApplyPage />
            </ProtectedRoute>
          } />
          
          {/* Redirect to login for any other route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;