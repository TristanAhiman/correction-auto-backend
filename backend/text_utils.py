def fusionner_textes(textes):
    texte_final = ""

    for i, texte in enumerate(textes):
        texte = texte.strip()

        if texte:
            texte_final += f"\n\n--- PAGE {i+1} ---\n"
            texte_final += texte

    return texte_final.strip()
