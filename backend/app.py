from flask import Flask, jsonify
from flask_cors import CORS
import cv2
from ultralytics import YOLO
import numpy as np
import threading
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# --------------------------
# Video sources (use absolute paths if needed)
# --------------------------
CROWD_VIDEO = os.path.join(os.getcwd(), "crowd_video2.mp4")
FIRE_VIDEO = os.path.join(os.getcwd(), "fire_video1.mp4")

# --------------------------
# Initialize YOLO model on CPU
# --------------------------
device = "cpu"  # force CPU
model = YOLO("yolo11n.pt").to(device)  # Replace with your trained model

# --------------------------
# Shared status dictionary
# --------------------------
status = {
    "people_count": 0,
    "fire_detected": False,
    "recent_alerts": []
}

# --------------------------
# Crowd detection thread
# --------------------------
def detect_crowd():
    global status
    cap = cv2.VideoCapture(CROWD_VIDEO)
    if not cap.isOpened():
        print(f"Error: Could not open {CROWD_VIDEO}")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)  # loop video
            continue

        results = model(frame, conf=0.05, iou=0.3, imgsz=1280)
        people_count = sum(
            1 for box in results[0].boxes if results[0].names[int(box.cls)] == "person"
        )

        # Update status
        status["people_count"] = people_count
        if people_count > 50:
            if "High Crowd" not in status["recent_alerts"]:
                status["recent_alerts"].append("High Crowd")
        else:
            if "High Crowd" in status["recent_alerts"]:
                status["recent_alerts"].remove("High Crowd")

# --------------------------
# Fire detection thread
# --------------------------
def detect_fire():
    global status
    cap = cv2.VideoCapture(FIRE_VIDEO)
    if not cap.isOpened():
        print(f"Error: Could not open {FIRE_VIDEO}")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)  # loop video
            continue

        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        lower = np.array([0, 150, 150])
        upper = np.array([35, 255, 255])
        mask = cv2.inRange(hsv, lower, upper)
        fire_pixels = cv2.countNonZero(mask)

        fire_detected = fire_pixels > 500
        status["fire_detected"] = fire_detected

        if fire_detected:
            if "Fire Alert" not in status["recent_alerts"]:
                status["recent_alerts"].append("Fire Alert")
        else:
            if "Fire Alert" in status["recent_alerts"]:
                status["recent_alerts"].remove("Fire Alert")

# --------------------------
# Start detection threads
# --------------------------
threading.Thread(target=detect_crowd, daemon=True).start()
threading.Thread(target=detect_fire, daemon=True).start()

# --------------------------
# API route
# --------------------------
@app.route("/detect")
def get_status():
    return jsonify(status)

# --------------------------
# Run Flask app
# --------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
