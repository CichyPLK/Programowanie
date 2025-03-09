from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from models import db
from routes import routes

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
jwt = JWTManager(app)

# ✅ CORS poprawiony do współpracy z frontendem (React działa na localhost:3000)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.register_blueprint(routes)

if __name__ == '__main__':
    app.run(debug=True)
