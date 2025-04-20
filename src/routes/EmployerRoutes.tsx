import { Route } from "react-router-dom";
import EmployerDashboard from "../pages/EmployerDashboard";

const EmployerRoutes = () => {
  return (
    <>
      <Route path="employer" element={<EmployerDashboard />} />
    </>
  );
};

export default EmployerRoutes;
