import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, LogOut } from "lucide-react";
import { useStore } from "../store";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode, currentUser, setCurrentUser } =
    useStore();
  const navigate = useNavigate();
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);

    // Check localStorage for user details and set in state
    const jobToken = localStorage.getItem("jobToken");
    const userData = localStorage.getItem("userData");

    if (jobToken && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setCurrentUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse user data:", err);
      }
    }
  }, [setCurrentUser]);

  const handleLogout = () => {
    localStorage.removeItem("jobToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("role");
    localStorage.clear();
    setCurrentUser(null);
    navigate("/login");
  };

  const UserName = localStorage.getItem("userName");
  const getUserInitials = () => {
    if (UserName) {
      const names = UserName.split(" ");
      return names
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return "U";
  };

  const userInitials = getUserInitials();
  const isLoggedIn = localStorage.getItem("role") !== null;
  return (
    <nav
      className={`${
        isDarkMode ? "dark bg-gray-800" : "bg-white"
      } shadow-md fixed w-full z-20`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {isLoggedIn ? (
            <div
              className={`text-xl font-bold cursor-default ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              JobPortal
            </div>
          ) : (
            <Link
              to="/"
              className={`text-xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              JobPortal
            </Link>
          )}

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <Link
                to="/jobseeker/jobs"
                className={`text-sm font-medium ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Jobs
              </Link>
            ) : (
              <>
              </>
            )}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full p-0"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={UserName || undefined}
                        alt={UserName || "User"}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/login")}
                className="h-8"
              >
                Login
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full h-8 w-8"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
