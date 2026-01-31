from .calcul import calculer_moyenne, appreciation_ia


def generate_bulletin(data):
    moyenne = calculer_moyenne(data["matieres"])
    appreciation = appreciation_ia(moyenne)

    return {
        "eleve": data["eleve"],
        "classe": data["classe"],
        "matieres": data["matieres"],
        "moyenne": moyenne,
        "appreciation": appreciation
    }
