from difflib import SequenceMatcher

def similarite(a, b):
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

def corriger_question(reponse_eleve, reponse_attendue, points):
    score = similarite(reponse_eleve, reponse_attendue)
    note = round(score * points, 2)

    return {
        "similarite": round(score * 100, 2),
        "note": note,
        "points": points
    }