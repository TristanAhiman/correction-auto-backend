from fpdf import FPDF


def generer_bulletin_pdf(bulletin):
    pdf = FPDF()
    pdf.add_page()

    pdf.set_font("Arial", "B", 16)
    pdf.cell(0, 10, "BULLETIN SCOLAIRE OFFICIEL", ln=True)

    pdf.set_font("Arial", size=12)
    pdf.cell(0, 10, f"Élève : {bulletin['eleve']}", ln=True)
    pdf.cell(0, 10, f"Classe : {bulletin['classe']}", ln=True)
    pdf.ln(5)

    for m in bulletin["matieres"]:
        pdf.cell(
            0,
            8,
            f"{m['nom']} : {m['note']} (coef {m.get('coef',1)})",
            ln=True
        )

    pdf.ln(5)
    pdf.cell(0, 10, f"Moyenne générale : {bulletin['moyenne']}", ln=True)
    pdf.cell(0, 10, f"Appréciation : {bulletin['appreciation']}", ln=True)

    fichier = "bulletin.pdf"
    pdf.output(fichier)

    return fichier
