from flask_restx import Resource, Namespace
from app.services import generate_token, hash_password, check_password
from app.models import User
from app.extensions import api
from app.extensions import db
from app.requestParsing import signup_parser, login_parser
from app.api_models import user_signup_model, user_login_model
from app.models import Session
from datetime import datetime

ns = Namespace('auth', description='Authentication related operations')
session_ns = Namespace('sessions', description='Track user sessions')

@ns.route('/signup')
class Signup(Resource):
    @ns.expect(user_signup_model)
    @ns.marshal_with(user_signup_model)
    def post(self):
        data = signup_parser.parse_args()
        username = data['username']
        password = data['password']
        email = data['email']
        role = data['role']
        hashed_password = hash_password(password)
        user = User.query.filter_by(email=email).first()
        
        #Message here will not be shown, see message for response 409 in authOperations.js
        if user: return {"message": "User already exists"}, 409 
        
        else: new_user = User(username=username, email=email, password=hashed_password, role=role)
        db.session.add(new_user)
        db.session.commit()
        return new_user, 201

@ns.route('/login')
class Login(Resource):
    @ns.expect(user_login_model)
    def post(self):
        data = login_parser.parse_args()
        email = data['email']
        password = data['password']
        user = User.query.filter_by(email=email).first()
        
        if not user:
            return {'message': 'User does not exist'}, 404     
        
        if not check_password(password, user.password):
            return {'message': 'Incorrect password'}, 400
        
        sign_in_session = Session(user_id=user.id, sign_in_time=datetime.now())
        db.session.add(sign_in_session)
        db.session.commit()

        token = generate_token(user.id)
        return {'id': user.id, 'email': user.email, 'username': user.username, 'role': user.role, 'token': token}, 200
    

@ns.route('/signout')
class SignOut(Resource):
    def post(self):
        data = login_parser.parse_args()
        email = data['email']
        user = User.query.filter_by(email=email).first()

        if not user:
            return {'message': 'User does not exist'}, 404

        # Find the most recent sign-in session for the user and update the sign-out time
        sign_in_session = Session.query.filter_by(user_id=user.id, sign_out_time=None).order_by(Session.sign_in_time.desc()).first()
        if sign_in_session:
            sign_in_session.sign_out_time = datetime.now()
            db.session.commit()

        return {'message': 'User signed out and session updated'}, 200