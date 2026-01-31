from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/auth/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if email == "prof@test.com" and password == "1234":
        return jsonify({
            "token": "fake-jwt-token",
            "role": "prof"
        })

    return jsonify({"error": "Identifiants incorrects"}), 401
