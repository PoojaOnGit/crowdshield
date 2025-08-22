import React, { useState, useEffect } from "react";

const videos = [
  "/videos/video1.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
];

const LiveVideo = () => {
  const [current, setCurrent] = useState(0);

  // Auto-swipe every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % videos.length);
  };

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center">
      <video
        key={current}
        src={videos[current]}
        className="w-full h-full object-cover rounded-xl"
        autoPlay
        muted
        loop
      />

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
      >
        ◀
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
      >
        ▶
      </button>
    </div>
  );
};

export default LiveVideo;
