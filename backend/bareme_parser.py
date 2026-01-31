import re

def parser_bareme(texte):
    questions = []

    blocs = re.split(r"QUESTION\s+\d+", texte, flags=re.I)[1:]

    for bloc in blocs:
        pts = re.search(r"\((\d+)\s*pts?\)", bloc)
        points = int(pts.group(1)) if pts else 1

        attendu = bloc.split(":", 1)[-1].strip()

        questions.append({
            "attendu": attendu,
            "points": points
        })

    return questions
