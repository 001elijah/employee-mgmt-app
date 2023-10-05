from flask import Flask
import pymysql
from flask_cors import CORS
from .resources import ns, Login, Signup
from .extensions import  api, db

pymysql.install_as_MySQLdb()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://employeeMgmtAppUser:employee@127.0.0.1:3306/employeeMgmtApp'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    api.init_app(app)
    db.init_app(app)
    api.add_namespace(ns)
    api.add_resource(Login, '/auth/login')
    api.add_resource(Signup, '/auth/signup')
    return app


create_app().run(debug=True)






