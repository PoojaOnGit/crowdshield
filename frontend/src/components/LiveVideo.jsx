import React, { useState } from "react";

const videos = [
  "http://localhost:5001/video_feed/crowd",
  "http://localhost:5001/video_feed/fire",
];

const LiveVideo = () => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () =>
    setCurrent((prev) => (prev - 1 + videos.length) % videos.length);
  const handleNext = () =>
    setCurrent((prev) => (prev + 1) % videos.length);

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <img
        src={videos[current]}
        className="w-full h-[550px] md:h-[520px] object-cover rounded-xl"
        alt="Live feed"
      />

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
