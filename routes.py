from flask import Blueprint, request, jsonify, Response
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User, ParkingSpot, Reservation
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import json

routes = Blueprint('routes', __name__)

@routes.route('/')
def index():
    return jsonify({'message': 'Serwer Flask działa poprawnie'})

@routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Użytkownik o tym e-mailu już istnieje'}), 400

    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        car_plate=data['car_plate'],
        password = generate_password_hash(data['password'], method='pbkdf2:sha256')

    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Rejestracja zakończona sukcesem'}), 201

@routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        token = create_access_token(identity=user.id)
        return jsonify({'token': token})
    return jsonify({'error': 'Błędne dane logowania'}), 401


@routes.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()

    sorted_users = [
        {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'car_plate': user.car_plate,
            'password': user.password  # ✅ Dodaj to!
        } for user in users
    ]

    return jsonify(sorted_users)


@routes.route('/parking-spots', methods=['GET'])
def get_parking_spots():
    spots = ParkingSpot.query.all()
    return jsonify([{'id': spot.id, 'name': spot.name, 'is_available': spot.is_available} for spot in spots])

@routes.route('/reserve', methods=['POST'])
@jwt_required()
def reserve_spot():
    user_id = get_jwt_identity()
    data = request.get_json()
    reservation = Reservation(
        user_id=user_id,
        parking_spot_id=data['parking_spot_id'],
        start_time=datetime.strptime(data['start_time'], '%Y-%m-%dT%H:%M'),
        end_time=datetime.strptime(data['end_time'], '%Y-%m-%dT%H:%M')
    )
    db.session.add(reservation)
    db.session.commit()
    return jsonify({'message': 'Rezerwacja utworzona'})
