import { Navigate, Route, Routes } from "react-router-dom";
import JobApplyPage from "./components/form/JobApplyPage";
import Navbar from "./components/Navbar";
import { USER_TYPE } from "./constant";
import Home from "./pages/Home";

import EmployerDashbord from "./pages/employDashbord";
import EmployerDashboard from "./pages/employDashbord/EmployerDashboard";
import EmployerJobPost from "./pages/employDashbord/job/EmployerJobPost";
import JobseekDashbord from "./pages/jobseekDashbord";
import JobDetails from "./pages/jobseekDashbord/JobDetails";
import Jobs from "./pages/jobseekDashbord/Jobs";
import JobSeekerDashboard from "./pages/jobseekDashbord/JobSeekerDashboard";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import { useStore } from "./store";

// Protected Route component
const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: JSX.Element;
  requiredRole?: string;
}) => {
  const userRole = localStorage.getItem("role");
  const isAuthenticated = localStorage.getItem("jobToken"); // or use your store

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
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Navbar />
      <main className="container px-0 py-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/application/:id"
            element={
              <ProtectedRoute requiredRole={USER_TYPE.JOBSEEKER}>
                <JobApplyPage />
              </ProtectedRoute>
            }
          />

          <Route
            element={
              <ProtectedRoute requiredRole={USER_TYPE.EMPLOYER}>
                <EmployerDashbord />
              </ProtectedRoute>
            }
          >
            <Route
              path="/employer/dashboard"
              element={
                <ProtectedRoute requiredRole={USER_TYPE.EMPLOYER}>
                  <EmployerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/jobPost"
              element={
                <ProtectedRoute requiredRole={USER_TYPE.EMPLOYER}>
                  <EmployerJobPost />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            element={
              <ProtectedRoute requiredRole={USER_TYPE.EMPLOYER}>
                <JobseekDashbord />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/jobseeker/dashboard"
            element={
              <ProtectedRoute requiredRole={USER_TYPE.JOBSEEKER}>
                <JobSeekerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect to login for any other route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
