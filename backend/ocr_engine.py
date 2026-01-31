import pytesseract
from PIL import Image
from image_utils import preprocess_image

def ocr_tesseract(image_path):
    clean_path = preprocess_image(image_path)
    image = Image.open(clean_path)

    texte = pytesseract.image_to_string(
        image,
        lang="fra",
        config="--psm 6"
    )

    return texte
