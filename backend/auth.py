from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import User
from database import db
import bcrypt

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["POST"])
def register():
    data = request.json
    hashed = bcrypt.hashpw(
        data["password"].encode(),
        bcrypt.gensalt()
    )

    user = User(
        nom=data["nom"],
        email=data["email"],
        password=hashed.decode(),
        role=data["role"]
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Compte créé"})


@auth.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()

    if not user:
        return {"error": "Utilisateur introuvable"}, 401

    if not bcrypt.checkpw(
        data["password"].encode(),
        user.password.encode()
    ):
        return {"error": "Mot de passe incorrect"}, 401

    token = create_access_token(
        identity={"id": user.id, "role": user.role}
    )

    return {"token": token}