def calculer_moyenne(matieres):
    total = 0
    total_coef = 0

    for m in matieres:
        total += m["note"] * m["coef"]
        total_coef += m["coef"]

    if total_coef == 0:
        return 0

    return round(total / total_coef, 2)


def appreciation_ia(moyenne):
    if moyenne >= 16:
        return "Excellent travail. Élève très sérieux et impliqué."
    elif moyenne >= 14:
        return "Très bon niveau. Résultats solides."
    elif moyenne >= 12:
        return "Bon travail dans l'ensemble. Peut encore progresser."
    elif moyenne >= 10:
        return "Résultats moyens. Des efforts supplémentaires sont attendus."
    else:
        return "Résultats insuffisants. Travail et encadrement nécessaires."
