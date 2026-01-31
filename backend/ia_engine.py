from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def corriger_ia(question, reponse_attendue, reponse_eleve, points):
    prompt = f"""
Tu es un professeur officiel d'examen.

QUESTION :
{question}

RÉPONSE ATTENDUE :
{reponse_attendue}

RÉPONSE DE L'ÉLÈVE :
{reponse_eleve}

Attribue une note sur {points} points.

Règles :
- accepte synonymes
- accepte reformulation
- pénalise hors sujet
- explique la note

Réponds strictement au format JSON :

{{
  "note": number,
  "commentaire": "explication claire"
}}
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )

    return response.choices[0].message.content