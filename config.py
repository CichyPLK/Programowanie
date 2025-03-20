import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))  # Pobiera ścieżkę katalogu projektu
DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    f"sqlite:///{os.path.join(BASE_DIR, 'database.db')}"  # Tworzy bazę SQLite w pliku database.db
)

JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "super_secret_key")

class Config:
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = JWT_SECRET_KEY
    SQLALCHEMY_ECHO = True  # Pokazuje zapytania SQL w konsoli (opcjonalne)

