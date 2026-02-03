from flask import request, jsonify

def require_auth(role=None):
    def decorator(func):
        def wrapper(*args, **kwargs):
            token = request.headers.get("Authorization")

            if not token:
                return jsonify({"error": "Non autorisé"}), 401

            # pour l’instant on simule
            user_role = request.headers.get("Role")

            if role and user_role != role:
                return jsonify({"error": "Accès refusé"}), 403

            return func(*args, **kwargs)
        wrapper.__name__ = func.__name__
        return wrapper
    return decorator
