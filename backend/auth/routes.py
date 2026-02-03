from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

# utilisateurs mock (pour commencer)
USERS = {
    "prof@ecole.com": {
        "password": "1234",
        "role": "prof"
    },
    "admin@correction-auto.com": {
        "password": "admin123",
        "role": "admin"
    }
}

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = USERS.get(email)

    if not user or user["password"] != password:
        return jsonify({"error": "Identifiants invalides"}), 401

    return jsonify({
        "email": email,
        "role": user["role"],
        "token": "fake-jwt-token"
    })
