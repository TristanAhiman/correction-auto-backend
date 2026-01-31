from flask import Blueprint, jsonify

prof_bp = Blueprint("professor", __name__)

@prof_bp.route("/prof/dashboard", methods=["GET"])
def dashboard_prof():
    return jsonify({
        "copies_corrigees": 124,
        "classes": ["3ème A", "3ème B", "Terminale D"],
        "dernieres_corrections": [
            {"eleve": "Kouassi Jean", "note": 15},
            {"eleve": "Yao Awa", "note": 17},
            {"eleve": "Traoré Moussa", "note": 12}
        ]
    })