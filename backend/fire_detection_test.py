import cv2
import numpy as np

# Video file path for fire detection
VIDEO_SOURCE = "fire_video1.mp4"
cap = cv2.VideoCapture(VIDEO_SOURCE)

if not cap.isOpened():
    print("Error: Could not open video file")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break  # End of video

    # Convert to HSV color space
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Define fire-like color range
    lower = np.array([0, 150, 150])
    upper = np.array([35, 255, 255])

    # Mask for fire pixels
    mask = cv2.inRange(hsv, lower, upper)

    # Count fire pixels
    fire_pixels = cv2.countNonZero(mask)

    # Highlight fire regions
    fire_detected_frame = cv2.bitwise_and(frame, frame, mask=mask)

    # Add alert text if fire detected
    if fire_pixels > 500:  # Adjust threshold based on video
        cv2.putText(fire_detected_frame, "🔥 Fire Detected!", (10,50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)

    # Display
    cv2.imshow("Fire Detection", fire_detected_frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
