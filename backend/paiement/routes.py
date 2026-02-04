import stripe
from flask import Blueprint, request, jsonify

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

paiement_bp = Blueprint("paiement", __name__, url_prefix="/paiement")

@paiement_bp.route("/checkout", methods=["POST"])
def checkout():
    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        mode="subscription",
        line_items=[{
            "price_data": {
                "currency": "eur",
                "product_data": {"name": "Correction Auto – Abonnement"},
                "unit_amount": 1500,
                "recurring": {"interval": "month"}
            },
            "quantity": 1
        }],
        success_url="https://correction-auto.vercel.app/success",
        cancel_url="https://correction-auto.vercel.app/cancel"
    )
    return jsonify({"url": session.url})
