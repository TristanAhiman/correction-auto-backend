def calcul_moyenne(notes):
    total = 0
    coef_total = 0

    for n in notes:
        total += n["note"] * n["coef"]
        coef_total += n["coef"]

    if coef_total == 0:
        return 0

    return round(total / coef_total, 2)


def appreciation_ia(moyenne):
    if moyenne >= 16:
        return "Excellent trimestre. Élève très sérieux et impliqué."
    elif moyenne >= 14:
        return "Bon travail. Résultats satisfaisants."
    elif moyenne >= 10:
        return "Résultats passables. Peut mieux faire."
    else:
        return "Trimestre difficile. Des efforts sont nécessaires."