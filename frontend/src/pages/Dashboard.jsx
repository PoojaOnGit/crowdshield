import React, { useState } from "react";
import MapView from "../components/MapView";
import AlertCard from "../components/AlertCard";
import GraphCard from "../components/GraphCard";
import EmergencyModal from "../components/EmergencyModal";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Map */}
      <div className="md:col-span-2">
        <MapView />
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Recent Alerts</h2>
        <AlertCard />
        <AlertCard type="Suspicious Activity" location="Market Area" time="5 mins ago" />
        <button
          onClick={() => setModalOpen(true)}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
        >
          Trigger Emergency 🚨
        </button>
      </div>

      {/* Graph Section */}
      <div className="md:col-span-3">
        <GraphCard />
      </div>

      <EmergencyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
