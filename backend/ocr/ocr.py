import pytesseract
from PIL import Image

def ocr_image(image_path):
    img = Image.open(image_path)
    texte = pytesseract.image_to_string(img, lang="fra")
    return texte
