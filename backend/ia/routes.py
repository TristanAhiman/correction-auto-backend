from flask import Blueprint, request, jsonify
from .service import corriger_copie

ia_bp = Blueprint("ia", __name__)

@ia_bp.route("/ia/corriger", methods=["POST"])
def corriger():
    data = request.get_json() or {}
    texte = data.get("texte", "")
    bareme = data.get("bareme", "")

    return jsonify(corriger_copie(texte, bareme))
