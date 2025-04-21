import { LogOut, Text } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import AlertConfirmation from "../common/AlertConfirmation";
import { EmployerLeftSideBarLinks } from "../../constant";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useState } from "react";
import { Popover, PopoverTrigger } from "../ui/popover";
import { useStore } from "../../store";

// interface Props {
//   isSideBarOpen: boolean;
//   toggleSideBar: () => void;
// }

export default function EmployerLeftSideBar() {
  const location = useLocation();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { isDarkMode} = useStore()

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  const isLinkActive = (subLink: any) => location.pathname.includes(subLink.to);

  return (
    <aside
    className={`sticky left-0 top-0  flex h-screen min-w-fit ${ isDarkMode ? "dark bg-gray-800" : "bg-teal-800 "} w-10 flex-col justify-between  border-r pt-3 pb-5 pr-1`}
    >
      {/* <div className="relative flex items-center justify-start p-2 ml-2 w-11 gap-4 rounded-lg bg-gray-100 mb-6 text-teal-700 font-bold transition-all ">
        <button onClick={toggleSideBar}>
          <Text />
        </button>
      </div> */}
      <TooltipProvider>
        <div className="flex flex-1 flex-col gap-4">
          {EmployerLeftSideBarLinks.map((link) => (
            <Tooltip key={link.label}>
              <TooltipTrigger asChild>
                {link.type === "dialog" ? (
                  <Popover open={isDialogOpen} onOpenChange={setDialogOpen}>
                    <PopoverTrigger asChild>
                      <button
                        onClick={() => setDialogOpen(true)}
                        className="relative flex  items-center justify-start p-2 ml-2 gap-4 rounded-lg text-rose-100 hover:text-teal-300 transition-all"
                      >
                        <div className="flex items-center">{link.icon}</div>
                      </button>
                    </PopoverTrigger>
                  </Popover>
                ) : (
                  <Link
                    to={link.to!}
                    className={`relative flex items-center justify-start p-2 ml-2 w-11 gap-4 rounded-lg ${
                      isLinkActive(link)
                        ? "bg-teal-600 text-teal-100 font-bold transition-all"
                        : "text-rose-100 hover:text-teal-300 transition-all"
                    }`}
                  >
                    <div className="flex items-center relative">
                      {link.icon}
                    </div>
                  </Link>
                )}
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-teal-300 border-none">
                {link.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

      <AlertConfirmation
        onConfirm={handleLogout}
        title="Are you sure you want to logout?"
      >
        <Button className="w-full justify-start inline-flex gap-4 items-start bg-transparent hover:text-teal-300 transition-all text-rose-100 hover:bg-transparent">
          <LogOut />
        </Button>
      </AlertConfirmation>
    </aside>
  );
}
