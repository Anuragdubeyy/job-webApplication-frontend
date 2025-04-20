import loadable from "@loadable/component";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_TYPE } from "../constant";
import EmployerDashboard from "../pages/EmployerDashboard";
import Home from "../pages/Home";
import JobDetails from "../pages/JobDetails";
import Jobs from "../pages/Jobs";
import JobSeekerDashboard from "../pages/jobseekDashbord/JobSeekerDashboard";
import Register from "../pages/Register";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setApiMessage } from "../store/slices/apiMessage";
import EmployerRoutes from "./EmployerRoutes";
import JobSeekerRoutes from "./JobSeekerRoutes";

const App = loadable(() => import("../container/App"));
const LoginPage = loadable(() => import("../pages/LoginPage"));
export const UserLoggedInType = () => localStorage.getItem("role")!;
const JobSeekerLoggedIn = () => !!localStorage.getItem("jobToken");
const ProtectedRoute = ({
  children,
  check,
  to = "/",
}: {
  children: JSX.Element;
  check?: boolean;
  to?: string;
}) => {
  if (check) return children;
  return <Navigate to={to} replace />;
};
const AppRoutes = () => {
  //   const isDarkMode = useStore((state) => state.isDarkMode);
  const dispatch = useAppDispatch();
  const apiMessage = useAppSelector((state) => state.apiMessage);
  const accessToken = useAppSelector((state) => state.authState.accessToken);

  useEffect(() => {}, [accessToken]);
  console.log(accessToken);

  useEffect(() => {
    if (apiMessage.message) {
      toast(apiMessage.message, {
        type: apiMessage.type === "Error" ? "error" : "success",
      });
    }

    const timeoutId = setTimeout(() => {
      dispatch(
        setApiMessage({
          message: "",
          type: "",
        })
      );
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [dispatch, apiMessage]);
  return (
    <Routes>
      <Route
        index
        element={
          <Navigate to={JobSeekerLoggedIn() ? "/jobseeker/dashboard" : "/"} replace />
        }
      />
      <Route
        path="login"
        element={
          <ProtectedRoute
            check={!JobSeekerLoggedIn()}
            to={
              UserLoggedInType() === USER_TYPE.JOBSEEKER
                ? "/jobseeker/dashboard"
                : "/employer/dashboard"
            }
          >
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        element={
          <ProtectedRoute check={JobSeekerLoggedIn()}>
            <App />
          </ProtectedRoute>
        }
      >
        {UserLoggedInType() === USER_TYPE.JOBSEEKER
          ? JobSeekerRoutes()
          : EmployerRoutes()}
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
