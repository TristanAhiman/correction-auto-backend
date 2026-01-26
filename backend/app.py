from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend CORRECTION AUTO en ligne"

@app.route("/correct", methods=["POST"])
def correct():
    data = request.json
    text = data.get("text", "")

    # SIMULATION de correction (pour l’instant)
    result = {
        "original": text,
        "score": 15,
        "comment": "Correction automatique simulée",
        "details": "Orthographe correcte, idées claires."
    }

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
