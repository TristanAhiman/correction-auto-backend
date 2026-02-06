from flask import Blueprint, request, jsonify
from .service import extract_text

ocr_bp = Blueprint("ocr", __name__, url_prefix="/ocr")

@ocr_bp.route("/extract", methods=["POST"])
def extract():
    if "file" not in request.files:
        return jsonify({"error": "Aucun fichier envoyé"}), 400

    file = request.files["file"]
    text = extract_text(path)

    return jsonify({
        "status": "success",
        "text": text
    })
