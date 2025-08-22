import cv2
from ultralytics import YOLO

# Load YOLOv8 model
model = YOLO("yolo11n.pt")  # replace with your trained model

# Video file path
VIDEO_SOURCE = "crowd_video2.mp4"
cap = cv2.VideoCapture(VIDEO_SOURCE)

if not cap.isOpened():
    print("Error: Could not open video file")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break  # End of video

    # YOLO detection
    results = model(frame, conf=0.05, iou=0.3, imgsz=1280)

    # Annotate frame
    annotated_frame = results[0].plot()
    annotated_frame = cv2.cvtColor(annotated_frame, cv2.COLOR_RGB2BGR)

    # Count people
    people_count = sum(1 for box in results[0].boxes if results[0].names[int(box.cls)] == 'person')
    cv2.putText(annotated_frame, f"People: {people_count}", (10,50),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)

    # Display
    cv2.imshow("Crowd Detection", annotated_frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
