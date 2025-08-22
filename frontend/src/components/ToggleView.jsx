import React, { useState, useEffect, useRef } from "react";
import LiveVideo from "./LiveVideo";
import MapView from "./MapView";

const ToggleView = () => {
  const [showVideo, setShowVideo] = useState(true);
  const mapRef = useRef(null);

  // Force Mapbox to resize when toggled
  useEffect(() => {
    if (!showVideo && mapRef.current) {
      mapRef.current.resize();
    }
  }, [showVideo]);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setShowVideo(!showVideo)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showVideo ? "Show Map" : "Show Live Video"}
      </button>

      {/* Conditional rendering */}
      {showVideo ? (
        <LiveVideo />
      ) : (
        <MapView mapRef={mapRef} />
      )}
    </div>
  );
};

export default ToggleView;
