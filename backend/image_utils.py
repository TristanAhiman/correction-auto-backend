from PIL import Image
import cv2
import numpy as np

def preprocess_image(image_path):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    # Amélioration contraste
    image = cv2.adaptiveThreshold(
        image, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11, 2
    )

    temp_path = image_path.replace(".", "_clean.")
    cv2.imwrite(temp_path, image)

    return temp_path
