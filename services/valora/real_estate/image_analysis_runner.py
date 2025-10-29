import base64
from ml.model_inference import analyze_images

# Load a sample image and convert to base64
def encode_image_to_base64(path: str) -> str:
    with open(path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode("utf-8")

if __name__ == "__main__":
    # Replace with the path to a local image on your Mac
    image_path = "sample.jpg"
    image_b64 = encode_image_to_base64(image_path)

    result = analyze_images([image_b64])
    print("Analysis Result:")
    print(result)
