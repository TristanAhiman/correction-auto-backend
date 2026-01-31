from flask import Blueprint, jsonify, send_file
import os
from bulletin.calcul import calcul_moyenne, appreciation_ia
from bulletin.pdf_generator import generate_bulletin_pdf

bulletin_bp = Blueprint("bulletin", __name__)

@bulletin_bp.route("/bulletin/generate", methods=["POST"])
def generate_bulletin():
    notes = [
        {"matiere": "Maths", "note": 15, "coef": 4},
        {"matiere": "Français", "note": 13, "coef": 3},
        {"matiere": "SVT", "note": 16, "coef": 2},
    ]

    moyenne = calcul_moyenne(notes)
    appreciation = appreciation_ia(moyenne)

    data = {
        "eleve": "Kouassi Jean",
        "classe": "3ème A",
        "notes": notes,
        "moyenne": moyenne,
        "appreciation": appreciation,
    }

    output_path = "bulletin.pdf"
    generate_bulletin_pdf(data, output_path)

    return send_file(output_path, as_attachment=True)
