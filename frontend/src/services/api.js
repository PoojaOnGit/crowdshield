// Mock APIs for now — later connect to Django/Flask backend

export const getAlerts = async () => {
  return [
    { type: "High Crowd Density", location: "City Mall", time: "Just now" },
    { type: "Suspicious Activity", location: "Metro Station", time: "10 mins ago" },
    { type: "Accident Reported", location: "Ring Road", time: "30 mins ago" },
  ];
};

export const getDensity = async () => {
  return [
    { time: "10AM", density: 40 },
    { time: "11AM", density: 65 },
    { time: "12PM", density: 80 },
    { time: "1PM", density: 50 },
    { time: "2PM", density: 90 },
  ];
};

export const sendEmergencyAlert = async (message) => {
  console.log("🚨 Sending emergency alert:", message);
  return { success: true, message: "Alert dispatched" };
};
