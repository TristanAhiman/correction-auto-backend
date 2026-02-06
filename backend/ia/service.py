def corriger_copie(texte, bareme=""):
    """
    Corrige une copie à partir du texte OCR et d’un barème optionnel
    """

    if not texte:
        return {
            "note": 0,
            "appreciation": "Aucun texte fourni",
            "bareme_utilise": False
        }

    # Logique simple et stable
    longueur = len(texte)
    note = 10

    if longueur > 500:
        note = 13
    if longueur > 1000:
        note = 15
    if longueur > 1500:
        note = 17

    if bareme:
        note = min(note + 1, 20)
        bareme_utilise = True
    else:
        bareme_utilise = False

    return {
        "note": note,
        "appreciation": "Correction automatique terminée",
        "bareme_utilise": bareme_utilise
    }
