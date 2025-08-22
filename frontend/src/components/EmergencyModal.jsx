import React from "react";
import { XCircle } from "lucide-react";

const EmergencyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-96 p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
          <XCircle className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-red-600 mb-3">🚨 Emergency Alert</h2>
        <p className="text-gray-600 mb-5">
          High crowd density detected at <b>Main Square</b>. Please take action immediately!
        </p>

        <div className="flex gap-3">
          <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700">
            Send Alert
          </button>
          <button onClick={onClose} className="flex-1 bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyModal;
