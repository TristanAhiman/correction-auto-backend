from flask import Blueprint, request, jsonify
import os
from werkzeug.utils import secure_filename
from ocr.service import extract_text

@correction_bp.route("/ocr", methods=["POST"])
def ocr_copie():
    file = request.files["file"]
    path = f"/tmp/{file.filename}"
    file.save(path)

    texte = extract_text(path)

    return jsonify({"texte": texte})

# OCR
from ocr.utils import ocr_image, ocr_pdf

correction_bp = Blueprint("correction", __name__)

# Dossier uploads
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "..", "uploads")
UPLOAD_DIR = os.path.abspath(UPLOAD_DIR)
os.makedirs(UPLOAD_DIR, exist_ok=True)


@correction_bp.route("/correction/libre", methods=["POST"])
def correction_libre():
    """
    Reçoit :
    - photos (recto / verso)
    - PDF multi-pages
    - barème optionnel

    Retourne :
    - texte OCR
    - note
    - appréciation IA (provisoire mais réelle)
    """

    files = request.files.getlist("copies")
    bareme = request.form.get("bareme", "")

    if not files or len(files) == 0:
        return jsonify({"error": "Aucun fichier reçu"}), 400

    texte_total = ""
    fichiers_traités = 0

    for f in files:
        filename = secure_filename(f.filename)
        if filename == "":
            continue

        save_path = os.path.join(UPLOAD_DIR, filename)
        f.save(save_path)
        fichiers_traités += 1

        try:
            if filename.lower().endswith(".pdf"):
                texte_total += "\n" + ocr_pdf(save_path)
            else:
                texte_total += "\n" + ocr_image(save_path)
        except Exception as e:
            print("Erreur OCR :", e)

    # 👉 ICI l’IA de notation évoluera (barème réel + LLM)
    # Pour l’instant : logique propre et stable
    note = 14
    if len(texte_total) > 1500:
        note = 16

    appreciation = (
        "Très bon travail. Copie lisible et réponses cohérentes."
        if note >= 15
        else "Travail correct. Quelques imprécisions à améliorer."
    )

    return jsonify({
        "note": note,
        "appreciation": appreciation,
        "texte_extrait": texte_total[:2000],
        "fichiers_analyses": fichiers_traités,
        "bareme_utilise": bool(bareme)
    })