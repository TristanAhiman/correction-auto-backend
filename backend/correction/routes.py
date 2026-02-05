from flask import Blueprint, request, jsonify
import os
from werkzeug.utils import secure_filename
from ocr.utils import ocr_image, ocr_pdf

correction_bp = Blueprint("correction", __name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "..", "uploads")
UPLOAD_DIR = os.path.abspath(UPLOAD_DIR)
os.makedirs(UPLOAD_DIR, exist_ok=True)


@correction_bp.route("/ocr", methods=["POST"])
def ocr_copie():
    file = request.files["file"]
    path = f"/tmp/{secure_filename(file.filename)}"
    file.save(path)

    texte = ocr_image(path)
    return jsonify({"texte": texte})


@correction_bp.route("/correction/libre", methods=["POST"])
def correction_libre():
    files = request.files.getlist("copies")
    bareme = request.form.get("bareme", "")

    if not files:
        return jsonify({"error": "Aucun fichier reçu"}), 400

    texte_total = ""
    fichiers_analyses = 0

    for f in files:
        filename = secure_filename(f.filename)
        save_path = os.path.join(UPLOAD_DIR, filename)
        f.save(save_path)
        fichiers_analyses += 1

        if filename.lower().endswith(".pdf"):
            texte_total += "\n" + ocr_pdf(save_path)
        else:
            texte_total += "\n" + ocr_image(save_path)

    note = 16 if len(texte_total) > 1500 else 14

    appreciation = (
        "Très bon travail. Copie lisible et réponses cohérentes."
        if note >= 15
        else "Travail correct. Quelques améliorations possibles."
    )

    return jsonify({
        "note": note,
        "appreciation": appreciation,
        "texte_extrait": texte_total[:2000],
        "fichiers_analyses": fichiers_traités,
        "bareme_utilise": bool(bareme)
    })
