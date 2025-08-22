import React from "react";
import { AlertTriangle } from "lucide-react";

const AlertCard = ({ type = "High Crowd Density", location = "Downtown", time = "2 mins ago" }) => {
  return (
    <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-3 shadow-sm hover:shadow-md transition">
      <div className="p-2 bg-red-100 rounded-full">
        <AlertTriangle className="text-red-600 w-6 h-6" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800">{type}</h3>
        <p className="text-sm text-gray-500">{location} · {time}</p>
      </div>
    </div>
  );
};

export default AlertCard;
