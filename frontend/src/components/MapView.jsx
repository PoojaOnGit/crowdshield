import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN"; // 🔑 replace with your token

const MapView = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [77.5946, 12.9716], // Default: Bangalore
      zoom: 11,
    });

    // Add heatmap layer here later
    return () => map.remove();
  }, []);

  return (
    <div ref={mapContainer} className="w-full h-80 rounded-2xl shadow-md" />
  );
};

export default MapView;
