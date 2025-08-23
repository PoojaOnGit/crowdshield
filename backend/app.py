from flask import Flask, jsonify, send_from_directory, Response
from flask_cors import CORS
import cv2
from ultralytics import YOLO
import numpy as np
import threading
import os
import time

app = Flask(__name__)
CORS(app)

# --------------------------
# Video sources
# --------------------------
VIDEO_FOLDER = os.path.join(os.getcwd(), "videos")  # put videos in backend/videos
CROWD_VIDEO = os.path.join(VIDEO_FOLDER, "crowd_video.mp4")
FIRE_VIDEO = os.path.join(VIDEO_FOLDER, "fire_video.mp4")

# --------------------------
# Load YOLO model
# --------------------------
model = YOLO("yolov8n.pt").to("cpu")  # pretrained on COCO, detects "person"

# --------------------------
# Shared status
# --------------------------
status = {
    "people_count": 0,
    "fire_detected": False,
    "recent_alerts": []
}

lock = threading.Lock()  # ✅ to avoid race conditions

# --------------------------
# Crowd detection thread
# --------------------------
def detect_crowd():
    cap = cv2.VideoCapture(CROWD_VIDEO)
    if not cap.isOpened():
        print(f"Error: Could not open {CROWD_VIDEO}")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            continue

        results = model(frame, conf=0.05, iou=0.3, imgsz=640)
        people_count = sum(1 for box in results[0].boxes if results[0].names[int(box.cls)] == "person")

        with lock:
            status["people_count"] = people_count
            if people_count > 10:
                if "High Crowd" not in status["recent_alerts"]:
                    status["recent_alerts"].append("High Crowd")
            else:
                if "High Crowd" in status["recent_alerts"]:
                    status["recent_alerts"].remove("High Crowd")

        time.sleep(0.2)  # ✅ prevents overloading CPU

# --------------------------
# Fire detection thread
# --------------------------
def detect_fire():
    cap = cv2.VideoCapture(FIRE_VIDEO)
    if not cap.isOpened():
        print(f"Error: Could not open {FIRE_VIDEO}")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            continue

        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        mask = cv2.inRange(hsv, np.array([0,150,150]), np.array([35,255,255]))
        fire_detected = cv2.countNonZero(mask) > 200

        with lock:
            status["fire_detected"] = fire_detected
            if fire_detected:
                if "Fire Alert" not in status["recent_alerts"]:
                    status["recent_alerts"].append("Fire Alert")
            else:
                if "Fire Alert" in status["recent_alerts"]:
                    status["recent_alerts"].remove("Fire Alert")

        time.sleep(0.2)

# --------------------------
# Start background threads
# --------------------------
threading.Thread(target=detect_crowd, daemon=True).start()
threading.Thread(target=detect_fire, daemon=True).start()

# --------------------------
# API routes
# --------------------------
@app.route("/detect")
def get_status():
    with lock:
        return jsonify(status)

@app.route("/videos/<path:filename>")
def serve_video(filename):
    return send_from_directory(VIDEO_FOLDER, filename)

# --------------------------
# Live streaming for frontend
# --------------------------
def generate_stream(video_path, is_crowd=True):
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 25
    delay = int(1000 / fps)

    while True:
        ret, frame = cap.read()
        if not ret:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            continue

        if is_crowd:
            results = model(frame, conf=0.05, iou=0.3, imgsz=1024)
            frame = results[0].plot()
        else:
            hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
            mask = cv2.inRange(hsv, np.array([0,150,150]), np.array([35,255,255]))
            if cv2.countNonZero(mask) > 500:
                cv2.putText(frame, "🔥 Fire Detected!", (10,50),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)

        ret, buffer = cv2.imencode('.jpg', cv2.cvtColor(frame, cv2.COLOR_RGB2BGR))
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

        cv2.waitKey(delay)

@app.route("/video_feed/<video_name>")
def video_feed(video_name):
    if video_name == "crowd":
        return Response(generate_stream(CROWD_VIDEO, is_crowd=True),
                        mimetype='multipart/x-mixed-replace; boundary=frame')
    elif video_name == "fire":
        return Response(generate_stream(FIRE_VIDEO, is_crowd=False),
                        mimetype='multipart/x-mixed-replace; boundary=frame')
    else:
        return "Video not found", 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
