def corriger_copie(texte_copie, bareme):
    score = 0
    commentaires = []

    if len(texte_copie.strip()) < 50:
        commentaires.append("Copie trop courte, développement insuffisant.")
        score = 5
    else:
        commentaires.append("Bonne compréhension globale du sujet.")
        commentaires.append("Quelques imprécisions dans l'argumentation.")
        score = 14

    return {
        "note": score,
        "commentaires": commentaires
    }