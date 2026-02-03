from flask import Blueprint, request, jsonify
from .service import corriger_copie

ia_bp = Blueprint("ia", __name__, url_prefix="/ia")

@ia_bp.route("/corriger", methods=["POST"])
def corriger():
    data = request.json

    texte = data.get("texte")
    bareme = data.get("bareme", "")

    if not texte:
        return jsonify({"error": "Texte manquant"}), 400

    resultat = corriger_copie(texte, bareme)

    return jsonify({
        "status": "success",
        "resultat": resultat
    })
