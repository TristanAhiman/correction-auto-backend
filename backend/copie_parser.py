import re

def parser_copie(texte):
    reponses = re.split(r"QUESTION\s+\d+", texte, flags=re.I)[1:]
    return [r.strip() for r in reponses]
