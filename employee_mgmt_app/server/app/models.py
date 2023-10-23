from app.extensions import db

class User(db.Model):
    __tablename__ = 'users'
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(150),unique=False,nullable=False)
    email=db.Column(db.String(320),unique=True,nullable=False)
    password=db.Column(db.String(300),nullable=False)
    role=db.Column(db.String(75),nullable=False)

class Role(db.Model):
    __tablename__ = 'roles'
    id=db.Column(db.Integer,primary_key=True)
    role=db.Column(db.String(75),unique=True,nullable=False)
  
class Session(db.Model):
    __tablename__ = 'sessions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    sign_in_time = db.Column(db.DateTime, nullable=False)
    sign_out_time = db.Column(db.DateTime)
    user = db.relationship('User', back_populates='sessions')

class Statuses(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    status=db.Column(db.String(125),unique=True,nullable=False)

class Times(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    time_in=db.Column(db.Time,nullable=False)
    time_out=db.Column(db.Time,nullable=False)
    total_hours=db.Column(db.Time,nullable=False)
    date=db.Column(db.Date,nullable=False)
    status=db.Column(db.String(50),nullable=False)
    