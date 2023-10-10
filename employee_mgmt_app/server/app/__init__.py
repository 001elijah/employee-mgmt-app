import os
from flask import Flask
import pymysql
from flask_cors import CORS
from app.resources import ns, Login, Signup
from flask_sqlalchemy import SQLAlchemy
from app.extensions import db, api
from flask_migrate import Migrate
from dotenv import load_dotenv


load_dotenv()



pymysql.install_as_MySQLdb()
migrate = Migrate()
environment_configuration = os.environ['CONFIGURATION_SETUP']


def create_app(config_class=environment_configuration):
    app = Flask(__name__)
    CORS(app)

    app.config.from_object(config_class)
    api.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    api.add_namespace(ns)
    api.add_resource(Login, '/auth/login')
    api.add_resource(Signup, '/auth/signup')
    return app







