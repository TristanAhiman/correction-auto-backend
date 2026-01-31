import pytesseract
from PIL import Image
from pdf2image import convert_from_path

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def ocr_image(path):
    img = Image.open(path)
    text = pytesseract.image_to_string(img, lang="fra")
    return text

def ocr_pdf(path):
    pages = convert_from_path(path)
    full_text = ""
    for page in pages:
        full_text += pytesseract.image_to_string(page, lang="fra")
    return full_text
