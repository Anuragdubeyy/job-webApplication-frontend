import EmployerLeftSideBar from "../../components/shared/EmplyerLeftSidebar";
import { Outlet } from "react-router-dom";

export default function EmployerDashbord() {
  return (
    <div className="flex w-full min-h-screen m-0 p-0">
      <div className="fixed left-0  w-64 h-full ">
        <EmployerLeftSideBar />
      </div>

      <main className="ml-16 w-full overflow-auto p-3 h-full">
        <Outlet />
      </main>
    </div>
  );
}
