import os

DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "mysql+pymysql://sql7765834:CQ6FJLnQ2C@sql7.freesqldatabase.com:3306/sql7765834"
)

JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "super_secret_key")

class Config:
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = JWT_SECRET_KEY
    SQLALCHEMY_ECHO = True  # opcjonalnie, do debugowania zapytań SQL
