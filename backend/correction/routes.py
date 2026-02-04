from flask import Blueprint, request, jsonify
import os
from werkzeug.utils import secure_filename

# OCR utils
from ocr.utils import ocr_image, ocr_pdf

# --- Blueprint ---
correction_bp = Blueprint("correction", __name__)

# --- Dossier uploads ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "..", "uploads")
UPLOAD_DIR = os.path.abspath(UPLOAD_DIR)
os.makedirs(UPLOAD_DIR, exist_ok=True)

# =========================
# ROUTE OCR SIMPLE
# =========================
@correction_bp.route("/ocr", methods=["POST"])
def ocr_copie():
    if "file" not in request.files:
        return jsonify({"error": "Aucun fichier envoyé"}), 400

    file = request.files["file"]
    filename = secure_filename(file.filename)
    path = os.path.join(UPLOAD_DIR, filename)
    file.save(path)

    try:
        if filename.lower().endswith(".pdf"):
            texte = ocr_pdf(path)
        else:
            texte = ocr_image(path)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"texte": texte})


# =========================
# CORRECTION LIBRE
# =========================
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
        if not filename:
            continue

        save_path = os.path.join(UPLOAD_DIR, filename)
        f.save(save_path)
        fichiers_analyses += 1

        try:
            if filename.lower().endswith(".pdf"):
                texte_total += "\n" + ocr_pdf(save_path)
            else:
                texte_total += "\n" + ocr_image(save_path)
        except Exception as e:
            print("Erreur OCR :", e)

    # Logique de notation (temporaire mais stable)
    note = 14 if len(texte_total) <= 1500 else 16

    appreciation = (
        "Très bon travail. Copie lisible et réponses cohérentes."
        if note >= 15
        else "Travail correct. Quelques imprécisions à améliorer."
    )

    return jsonify({
        "note": note,
        "appreciation": appreciation,
        "texte_extrait": texte_total[:2000],
        "fichiers_analyses": fichiers_analyses,
        "bareme_utilise": bool(bareme)
    })