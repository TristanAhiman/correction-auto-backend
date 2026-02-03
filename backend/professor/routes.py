from flask import Blueprint, jsonify
from auth.utils import require_auth

prof_bp = Blueprint("prof", __name__, url_prefix="/prof")

@prof_bp.route("/dashboard")
@require_auth(role="prof")
def dashboard_prof():
    return jsonify({"message": "Bienvenue Professeur"})
