from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from models import db
from routes import routes

# ✅ Inicjalizacja aplikacji Flask
app = Flask(__name__)
app.config.from_object(Config)

# ✅ Inicjalizacja bazy danych
db.init_app(app)

# ✅ Tworzenie tabel w bazie danych (jeśli nie istnieją)
with app.app_context():
    db.create_all()

# ✅ Inicjalizacja JWT
jwt = JWTManager(app)

# ✅ CORS (React działa na localhost:3000)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# ✅ Rejestracja blueprintów
app.register_blueprint(routes)

# ✅ Uruchomienie aplikacji
if __name__ == '__main__':
    app.run(debug=True, threaded=True)
