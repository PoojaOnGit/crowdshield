from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import os

app = Flask(__name__)
CORS(app)

# Uploads relative to backend folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# YOLO model
model = YOLO("yolov8n.pt")  # pretrained, GPU if available

@app.route("/")
def home():
    return "CrowdShield YOLO API is running!"

@app.route("/detect", methods=["POST"])
def detect():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    # Save uploaded image
    img_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(img_path)

    # Run YOLO detection
    results = model(img_path)

    # Save results
    save_path = os.path.join("runs", file.filename)
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    results.save(save_path)

    # Prepare JSON response
    output = []
    for r in results:
        for box in r.boxes.xyxy:  # x1, y1, x2, y2
            output.append(box.tolist())

    return jsonify({
        "filename": file.filename,
        "detections": output,
        "message": "Detection complete!"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
