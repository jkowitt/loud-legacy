import cv2
import numpy as np
import base64
from typing import List, Dict


def decode_base64_image(base64_str: str) -> np.ndarray:
    img_data = base64.b64decode(base64_str)
    np_arr = np.frombuffer(img_data, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    return image


def analyze_images(images: List[str]) -> Dict:
    # Simulated feature detection
    features = set()
    for img_str in images:
        image = decode_base64_image(img_str)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Simple metrics
        brightness = np.mean(gray)
        sharpness = cv2.Laplacian(gray, cv2.CV_64F).var()

        # Naive condition inference
        if brightness > 120 and sharpness > 100:
            condition = "good"
        else:
            condition = "fair"

        # Fake detection logic
        if brightness > 130:
            features.add("garage")
        if sharpness > 200:
            features.add("pool")

    return {
        "features": list(features),
        "condition": condition,
        "property_type": "single_family"  # hardcoded for now
    }
