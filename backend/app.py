from flask import Flask, jsonify
from flask_cors import CORS
import os

# --- création app ---
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# --- ROUTE TEST (OBLIGATOIRE POUR RENDER) ---
@app.route("/")
def home():
    return jsonify({
        "status": "OK",
        "message": "Correction Auto Backend opérationnel 🚀"
    })

@app.route("/health")
def health():
    return "OK", 200

# --- IMPORT DES ROUTES ---
from examen.routes import examen_bp
from auth.routes import auth_bp
from correction.routes import correction_bp
from bulletin.routes import bulletin_bp
from professor.routes import prof_bp
from ocr.routes import ocr_bp
from ia.routes import ia_bp

# --- ENREGISTREMENT DES MODULES ---
app.register_blueprint(examen_bp, url_prefix="/examen")
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(correction_bp, url_prefix="/correction")
app.register_blueprint(bulletin_bp, url_prefix="/bulletin")
app.register_blueprint(prof_bp, url_prefix="/prof")
app.register_blueprint(ocr_bp)
app.register_blueprint(ia_bp)

# --- LANCEMENT SERVEUR ---
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
