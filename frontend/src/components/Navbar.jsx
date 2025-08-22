import React from "react";
import { Bell, UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between bg-white shadow-md px-6 py-3">
      <h1 className="text-2xl font-bold text-blue-600">🚨 CrowdShield</h1>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>
        <UserCircle className="w-9 h-9 text-gray-600 cursor-pointer hover:text-blue-600" />
      </div>
    </header>
  );
};

export default Navbar;
