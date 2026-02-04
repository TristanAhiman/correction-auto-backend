from flask import Blueprint, request, jsonify
import paydunya
import os

payment_bp = Blueprint("payment", __name__)

paydunya.api_keys = {
    "master_key": os.getenv("PAYDUNYA_MASTER_KEY"),
    "private_key": os.getenv("PAYDUNYA_PRIVATE_KEY"),
    "public_key": os.getenv("PAYDUNYA_PUBLIC_KEY"),
    "token": os.getenv("PAYDUNYA_TOKEN")
}

@payment_bp.route("/pay", methods=["POST"])
def pay():
    data = request.json

    invoice = paydunya.Invoice()
    invoice.add_item(
        name=data["plan"],
        quantity=1,
        unit_price=data["amount"],
        total_price=data["amount"],
        description="Abonnement Correction Auto"
    )

    invoice.total_amount = data["amount"]
    invoice.description = "Abonnement mensuel"
    invoice.return_url = "https://ton-frontend.vercel.app/success"
    invoice.cancel_url = "https://ton-frontend.vercel.app/cancel"

    if invoice.create():
        return jsonify({
            "payment_url": invoice.url
        })
    else:
        return jsonify({"error": invoice.response_text}), 400
