from app.extensions import db
from datetime import datetime


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=False, nullable=False)
    email = db.Column(db.String(320), unique=True, nullable=False)
    password = db.Column(db.String(300), nullable=False)
    role = db.Column(db.String(75), nullable=False)
    times = db.relationship("Times", back_populates="employee")


class Role(db.Model):
    __tablename__ = "roles"
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(75), unique=True, nullable=False)


class Session(db.Model):
    __tablename__ = "sessions"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    sign_in_time = db.Column(db.DateTime, nullable=False)
    sign_out_time = db.Column(db.DateTime)
    user = db.relationship("User", backref="session_backref")


class Status(db.Model):
    __tablename__ = "status"
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(125), unique=True, nullable=False)
    times = db.relationship("Times", back_populates="status_rel")


class Times(db.Model):
    __tablename__ = "times"
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    status_id = db.Column(db.Integer, db.ForeignKey("status.id"), nullable=False)
    time_in = db.Column(db.Time, nullable=False)
    time_out = db.Column(db.Time, nullable=False)
    total_hours = db.Column(db.Time, nullable=False)

    def calculate_total_hours(self):
        fmt = "%H:%M:%S"
        tdelta = datetime.strptime(str(self.time_out), fmt) - datetime.strptime(
            str(self.time_in), fmt
        )
        total_seconds = tdelta.total_seconds()
        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        return f"{int(hours):02d}:{int(minutes):02d}:00"

    date = db.Column(db.String(70), nullable=False)
    employee = db.relationship("User", back_populates="times")
    status_rel = db.relationship("Status", back_populates="times")
