from flask import Blueprint, request, jsonify
import json

examen_bp = Blueprint("examen", __name__)

@examen_bp.route("/examen/corriger", methods=["POST"])
def corriger_examen():

    texte = request.form.get("texte_examen")
    bareme = json.loads(request.form.get("bareme"))
    copies = request.files.getlist("copies")

    # (OCR + IA ici plus tard)
    note = 14.5
    appreciation = "Bon travail. Réponses globalement correctes."

    return jsonify({
        "note": note,
        "appreciation": appreciation
    })
