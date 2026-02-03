from flask import Blueprint, jsonify
from auth.utils import require_auth

admin_bp = Blueprint("admin", __name__, url_prefix="/admin")

@admin_bp.route("/dashboard")
@require_auth(role="admin")
def dashboard_admin():
    return jsonify({"message": "Bienvenue Admin"})
