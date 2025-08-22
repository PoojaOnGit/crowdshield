import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const token = import.meta.env.VITE_MAPBOX_TOKEN;
mapboxgl.accessToken = token;

const MapView = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [73.7898, 19.9975], // Example coordinates
      zoom: 12,
    });

    // Sample heatmap data
    const heatmapData = {
      type: "FeatureCollection",
      features: [
        { type: "Feature", properties: { density: 5 }, geometry: { type: "Point", coordinates: [77.5946, 12.9716] } },
        { type: "Feature", properties: { density: 10 }, geometry: { type: "Point", coordinates: [77.6, 12.975] } },
        { type: "Feature", properties: { density: 3 }, geometry: { type: "Point", coordinates: [77.59, 12.965] } },
        { type: "Feature", properties: { density: 8 }, geometry: { type: "Point", coordinates: [77.585, 12.97] } },
      ],
    };

    map.on("load", () => {
      map.addSource("crowd-data", { type: "geojson", data: heatmapData });

      map.addLayer({
        id: "crowd-heatmap",
        type: "heatmap",
        source: "crowd-data",
        maxzoom: 15,
        paint: {
          "heatmap-weight": ["interpolate", ["linear"], ["get", "density"], 0, 0, 10, 1],
          "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 15, 3],
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0, "rgba(33,102,172,0)",
            0.2, "rgb(103,169,207)",
            0.4, "rgb(209,229,240)",
            0.6, "rgb(253,219,199)",
            0.8, "rgb(239,138,98)",
            1, "rgb(178,24,43)"
          ],
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 15, 20],
        },
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className="w-full h-full rounded-2xl" />;
};

export default MapView;
