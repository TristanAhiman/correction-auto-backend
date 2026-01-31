from flask import Flask
from flask_cors import CORS

# --- création app ---
app = Flask(__name__)
CORS(app)

# --- IMPORT DES ROUTES ---
from examen.routes import examen_bp
from auth.routes import auth_bp
from correction.routes import correction_bp
from bulletin.routes import bulletin_bp
from professor.routes import prof_bp

# --- ENREGISTREMENT DES MODULES ---
app.register_blueprint(examen_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(correction_bp)
app.register_blueprint(bulletin_bp)
app.register_blueprint(prof_bp)

# --- LANCEMENT SERVEUR ---
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)