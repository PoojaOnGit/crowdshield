import React, { useEffect, useState } from "react";

const AlertsComponent = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/alerts");
        const data = await res.json();
        setAlerts(data);
      } catch (err) {
        console.error("Error fetching alerts:", err);
      }
    };

    // fetch alerts every 3 seconds
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Alerts</h1>
      {alerts.length === 0 ? (
        <p>No alerts yet.</p>
      ) : (
        <ul className="space-y-2">
          {alerts.map((alert, idx) => (
            <li
              key={idx}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg"
            >
              <strong>{alert.type}:</strong> {alert.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertsComponent;
