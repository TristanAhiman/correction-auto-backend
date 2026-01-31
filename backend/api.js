from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime
from werkzeug.utils import secure_filename

# ---------------- CONFIG ----------------
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
CORRECTION_FOLDER = "corrections"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "pdf"}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(CORRECTION_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# ------------- UTILS -------------------
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def fake_correction(text):
    """
    Simulation de correction (remplacée plus tard par IA / OCR)
    """
    return {
        "note": 14,
        "commentaire_general": "Bon travail dans l’ensemble, quelques fautes à corriger.",
        "details": [
            {"ligne": 1, "erreur": "Orthographe", "correction": "accord du verbe"},
            {"ligne": 3, "erreur": "Syntaxe", "correction": "phrase mal structurée"}
        ],
        "conseils": [
            "Relire attentivement",
            "Faire attention aux accords"
        ]
    }

# ---------------- ROUTES ----------------

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "OK",
        "message": "Backend Correction Auto en ligne 🚀"
    })

# -------- CORRECTION TEXTE --------
@app.route("/api/correction/texte", methods=["POST"])
def correction_texte():
    data = request.json
    texte = data.get("texte", "")

    if not texte:
        return jsonify({"error": "Aucun texte fourni"}), 400

    correction = fake_correction(texte)

    return jsonify({
        "type": "texte",
        "resultat": correction
    })

# -------- CORRECTION FICHIER --------
@app.route("/api/correction/fichier", methods=["POST"])
def correction_fichier():
    if "fichier" not in request.files:
        return jsonify({"error": "Aucun fichier envoyé"}), 400

    file = request.files["fichier"]

    if file.filename == "":
        return jsonify({"error": "Nom de fichier vide"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], f"{timestamp}_{filename}")
        file.save(filepath)

        correction = fake_correction("contenu du fichier")

        return jsonify({
            "type": "fichier",
            "fichier": filename,
            "resultat": correction
        })

    return jsonify({"error": "Format non autorisé"}), 400

# -------- MODE EXAMEN (BASE) --------
@app.route("/api/examen/start", methods=["POST"])
def start_examen():
    return jsonify({
        "examen_id": datetime.now().timestamp(),
        "duree": 3600,
        "message": "Mode examen lancé"
    })

# -------- LANCEMENT SERVER --------
if __name__ == "__main__":
    app.run(debug=True, port=5000)