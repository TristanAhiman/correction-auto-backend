from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import os

def generate_bulletin_pdf(data, output_path):
    c = canvas.Canvas(output_path, pagesize=A4)
    width, height = A4

    c.setFont("Helvetica-Bold", 18)
    c.drawString(50, height - 50, "BULLETIN SCOLAIRE")

    c.setFont("Helvetica", 12)
    c.drawString(50, height - 100, f"Élève : {data['eleve']}")
    c.drawString(50, height - 130, f"Classe : {data['classe']}")
    c.drawString(50, height - 160, f"Moyenne générale : {data['moyenne']}/20")

    y = height - 210
    for mat in data["notes"]:
        c.drawString(50, y, f"{mat['matiere']} : {mat['note']} (coef {mat['coef']})")
        y -= 25

    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, y - 20, "Appréciation :")
    c.setFont("Helvetica", 11)
    c.drawString(50, y - 45, data["appreciation"])

    c.drawString(50, 80, "Signature de l’établissement")

    c.save()
