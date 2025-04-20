import {  Routes, Route } from 'react-router-dom';
import { useStore } from './store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import EmployerDashboard from './pages/EmployerDashboard';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';

function App() {
  const isDarkMode = useStore((state) => state.isDarkMode);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
    </div>
  );
}

export default App;