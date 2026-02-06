import pytesseract
from PIL import Image

def extract_text(image_path):
    text = pytesseract.image_to_string(Image.open(image_path), lang="fra")
    return extract_text(image_path)