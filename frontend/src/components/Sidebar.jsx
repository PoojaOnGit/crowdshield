import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, AlertTriangle, BarChart2, Settings } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/" },
    { name: "Alerts", icon: <AlertTriangle className="w-5 h-5" />, path: "/alerts" },
    { name: "Analytics", icon: <BarChart2 className="w-5 h-5" />, path: "/analytics" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/settings" },
  ];

  return (
    <aside className="w-60 bg-white shadow-md flex flex-col p-4">
      {/* Menu Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`
                }
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Instant mini stats below links */}
        <div className="mt-6 space-y-2">
          <div className="bg-gray-100 p-2 rounded-lg text-sm text-gray-700">
            Crowd Density: <span className="font-semibold">1200</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-lg text-sm text-gray-700">
            Active Alerts: <span className="font-semibold">3</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-lg text-sm text-gray-700">
            Fire Incidents: <span className="font-semibold">1</span>
          </div>
        </div>
      </nav>

      <div className="text-sm text-gray-400 text-center mt-auto">© 2025 CrowdShield</div>
    </aside>
  );
};

export default Sidebar;
