import { useState } from "react";
import { Outlet } from "react-router-dom";
import LeftSideBar from "../../components/shared/LeftSidebar";
import Navbar from "../../components/Navbar";


const Container = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <LeftSideBar
          isSideBarOpen={isSideBarOpen}
          toggleSideBar={toggleSideBar}
        />
        <main
          className={`w-full overflow-auto transition-all ${
            isSideBarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Container;
