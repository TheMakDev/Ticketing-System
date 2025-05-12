import React, { useState, useContext } from "react";
import {
  LayoutDashboard,
  ListChecks,
  FolderOpenDot,
  Archive,
  Settings2,
  Power,
  ChevronLeft,
  Menu,
  PlusSquare,
} from "lucide-react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { userData, setUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  const handleLogout = () => {
    setUserData(null);
    navigate("/login");
  };

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard />, route: "/dashboard" },
    { label: "All Tickets", icon: <ListChecks />, route: "/tickets" },
    { label: "Open Tickets", icon: <FolderOpenDot />, route: "/tickets/open" },
    { label: "Closed Tickets", icon: <Archive />, route: "/tickets/closed" },
    { label: "New Ticket", icon: <PlusSquare />, route: "/tickets/new" }, // ✅ New Ticket Form
    { label: "Settings", icon: <Settings2 />, route: "/settings" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        onClick={toggleMobileSidebar}
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 bg-white shadow-lg transition-transform duration-300
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:flex
          ${isCollapsed ? "w-16" : "w-64"}
        `}
      >
        <div className="h-full flex flex-col p-4 w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className={`${isCollapsed ? "hidden" : "flex"} items-center gap-2`}>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center">A</div>
              <span className="font-semibold">Ticketing System</span>
            </div>
            <button onClick={toggleCollapse} className="text-gray-600 hidden md:block">
              <ChevronLeft
                className={`transform transition-transform duration-200 ${
                  isCollapsed ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Menu Items */}
          <ul className="space-y-4 flex-1">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-100 rounded"
                onClick={() => navigate(item.route)}
              >
                <div className="text-gray-600">{item.icon}</div>
                {!isCollapsed && (
                  <span className="text-gray-800 flex-1">{item.label}</span>
                )}
              </li>
            ))}
          </ul>

          {/* User Profile + Logout */}
          <div className="pt-4 border-t mt-4">
            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex justify-center items-center">
                {userData?.name?.charAt(0) || "U"}
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-gray-800">{userData?.name || "User"}</span>
                  <span className="text-gray-500 text-sm">{userData?.email || ""}</span>
                </div>
              )}
            </div>

            <div
              onClick={handleLogout}
              className="flex items-center gap-4 p-2 mt-2 cursor-pointer hover:bg-red-100 rounded"
            >
              <div className="text-red-600">
                <Power />
              </div>
              {!isCollapsed && (
                <span className="text-red-700 font-medium">Logout</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
