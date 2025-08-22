import React, { useState } from "react";
import LiveVideo from "../components/LiveVideo";
import MapView from "../components/MapView";
import AlertCard from "../components/AlertCard";
import GraphCard from "../components/GraphCard";
import EmergencyModal from "../components/EmergencyModal";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
      {/* Left column: Video + Map */}
      <div className="flex flex-col gap-2">
        {/* Live Video */}
        <div className="bg-white rounded-xl shadow-md h-80 flex flex-col overflow-hidden">
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

      {/* Right column: Alerts + Graph */}
      <div className="flex flex-col gap-2">
        {/* Alerts */}
        <div className="bg-white rounded-xl shadow-md h-80 flex flex-col overflow-hidden">
          <h2 className="text-md font-semibold p-2 border-b">🚨 Recent Alerts</h2>
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            <AlertCard />
            <AlertCard type="Stamped Alert" location="Market Area" time="5 mins ago" />
            <AlertCard type="Fire Alert" location="City Park" time="10 mins ago" />
            <button
              onClick={() => setModalOpen(true)}
              className="w-full bg-red-600 text-white py-1 rounded-lg hover:bg-red-700 mt-2 text-sm"
            >
              Trigger Emergency 🚨
            </button>
          </div>
        </div>

        {/* Crowd Density Graph */}
        <div className="bg-white rounded-xl shadow-md h-80 flex flex-col overflow-hidden">
          <h2 className="text-md font-semibold p-2 border-b">📊 Crowd Density Trends</h2>
          <div className="flex-1 p-2">
            <GraphCard />
          </div>
        </div>
      </div>

      {/* Emergency Modal */}
      <EmergencyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
