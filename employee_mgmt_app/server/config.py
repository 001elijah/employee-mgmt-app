import os
from dotenv import load_dotenv


load_dotenv()

db_server = os.environ['DB_SERVER']
db_port = os.environ['DB_PORT']
db_database = os.environ['DB_DATABASE']
db_username = os.environ['DB_USERNAME']
db_password = os.environ['DB_PASSWORD']

class DevelopmentConfig():
    ENV = "development"
    DEBUG = True
    SQLALCHEMY_ECHO = True
    PORT = os.environ['DEV_PORT']
    if db_password:
        SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{db_username}:{db_password}@{db_server}:{db_port}/{db_database}"
    else:
        SQLALCHEMY_DATABASE_URI = (
            f"mysql+pymysql://{db_username}@{db_server}:{db_port}/{db_database}"
        )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
