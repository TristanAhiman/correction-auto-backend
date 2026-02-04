from openai import OpenAI
client = OpenAI()

def corriger(texte, bareme):
    prompt = f"""
    Barème :
    {bareme}

    Copie élève :
    {texte}

    Donne :
    - une note sur 20
    - des commentaires pédagogiques
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content