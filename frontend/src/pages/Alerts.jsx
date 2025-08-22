import React from "react";
import AlertCard from "../components/AlertCard";

const alerts = [
  { type: "High Crowd Density", location: "City Mall", time: "Just now" },
  { type: "Suspicious Activity", location: "Metro Station", time: "10 mins ago" },
  { type: "Accident Reported", location: "Ring Road", time: "30 mins ago" },
];

const Alerts = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🚨 Active Alerts</h2>
      <div className="space-y-3">
        {alerts.map((alert, idx) => (
          <AlertCard key={idx} {...alert} />
        ))}
      </div>
    </div>
  );
};

export default Alerts;
