import React from "react";
import GraphCard from "../components/GraphCard";

const Analytics = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📈 Analytics & Predictions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GraphCard />
        <GraphCard />
      </div>
    </div>
  );
};

export default Analytics;
