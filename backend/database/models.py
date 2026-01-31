from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Bulletin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    eleve = db.Column(db.String(100))
    classe = db.Column(db.String(50))
    moyenne = db.Column(db.Float)
    appreciation = db.Column(db.Text)
