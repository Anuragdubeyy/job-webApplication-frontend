import EmployerLeftSideBar from "../../components/shared/EmplyerLeftSidebar";
import { Outlet } from "react-router-dom";

export default function EmployerDashbord() {
  return (
    <div className="flex w-full min-h-screen m-0 p-0">
      <EmployerLeftSideBar />
      <main
        className={`w-full  m-0 p-3  transition-all
              `}
      >
        <Outlet />
      </main>
    </div>
  );
}
