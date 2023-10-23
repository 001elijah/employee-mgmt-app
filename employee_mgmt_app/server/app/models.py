from app.extensions import db

class User(db.Model):
    __tablename__ = 'users'
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(80),unique=False,nullable=False)
    email=db.Column(db.String(120),unique=True,nullable=False)
    password=db.Column(db.String(120),nullable=False)
    role=db.Column(db.String(120),nullable=False)
  
class Session(db.Model):
    __tablename__ = 'sessions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    sign_in_time = db.Column(db.DateTime, nullable=False)
    sign_out_time = db.Column(db.DateTime)
    user = db.relationship('User', back_populates='sessions')

