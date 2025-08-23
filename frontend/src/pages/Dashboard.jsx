import React, { useState, useEffect } from "react";
import LiveVideo from "../components/LiveVideo";
import MapView from "../components/MapView";
import AlertCard from "../components/AlertCard";
import DensityChart from "../components/DensityChart"; // New
import EmergencyModal from "../components/EmergencyModal";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // Backend data states
  const [peopleCount, setPeopleCount] = useState(0);
  const [fireDetected, setFireDetected] = useState(false);
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [densityHistory, setDensityHistory] = useState([]);

  // Fetch backend status every 2 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:5001/detect");
        const data = await res.json();
        setPeopleCount(data.people_count);
        setFireDetected(data.fire_detected);
        setRecentAlerts(data.recent_alerts);

        // Update density history for chart
        setDensityHistory(prev => [
          ...prev,
          { time: new Date().toLocaleTimeString(), count: data.people_count }
        ].slice(-20)); // keep last 20 points
      } catch (err) {
        console.error(err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
      {/* Left Column */}
      <div className="flex flex-col gap-2">
        {/* Live Video */}
        <div className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden h-[550px] md:h-[520px]">
          <h2 className="text-md font-semibold p-2 border-b">🎥 Live Video</h2>
          <div className="flex-1">
            <LiveVideo />
          </div>
        </div>

        {/* Map / Heatmap */}
        <div className="bg-white rounded-xl shadow-md h-80 flex flex-col overflow-hidden">
          <h2 className="text-md font-semibold p-2 border-b">🗺 Crowd Heatmap</h2>
          <div className="flex-1">
            <MapView />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-2">
        {/* Alerts */}
        <div className="bg-white rounded-xl shadow-md h-80 flex flex-col overflow-hidden">
          <h2 className="text-md font-semibold p-2 border-b">🚨 Recent Alerts</h2>
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {recentAlerts.length > 0
              ? recentAlerts.map((alert, index) => (
                  <AlertCard key={index} type={alert} />
                ))
              : <AlertCard type="No Alerts" />}
            <button
              onClick={() => setModalOpen(true)}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 mt-1 text-sm"
            >
              Trigger Emergency 🚨
            </button>
          </div>
        </div>

        {/* Crowd Density Graph */}
        <div className="bg-white rounded-xl shadow-md h-80 flex flex-col overflow-hidden p-2">
          <h2 className="text-md font-semibold border-b p-2">📊 Crowd Density Trends</h2>
          <DensityChart data={densityHistory} />
        </div>
      </div>

      {/* Emergency Modal */}
      <EmergencyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
