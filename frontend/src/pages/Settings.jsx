import React, { useState } from "react";

const Settings = () => {
  const [name, setName] = useState("Admin");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">⚙️ Settings</h2>
      <div className="bg-white shadow rounded-xl p-4 max-w-md">
        <label className="block text-gray-700 mb-2">Authority Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
