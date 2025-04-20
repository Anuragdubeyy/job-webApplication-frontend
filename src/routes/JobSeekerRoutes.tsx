import { Route } from "react-router-dom";
import JobSeekerDashboard from "../pages/jobseekDashbord/JobSeekerDashboard";

const JobSeekerRoutes = () => {
  return (
    <>
      <Route path="jobseeker" element={<JobSeekerDashboard />} />
    </>
  );
};

export default JobSeekerRoutes;
