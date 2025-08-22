import React, { useState } from "react";
import { LayoutDashboard, AlertTriangle, BarChart2, Settings } from "lucide-react";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Alerts", icon: <AlertTriangle className="w-5 h-5" /> },
    { name: "Analytics", icon: <BarChart2 className="w-5 h-5" /> },
    { name: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-60 bg-white shadow-md flex flex-col p-4">
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
                active === item.name
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="text-sm text-gray-400 text-center">© 2025 CrowdShield</div>
    </aside>
  );
};

export default Sidebar;
