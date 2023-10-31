from app.extensions import db
from datetime import datetime


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=False, nullable=False)
    email = db.Column(db.String(320), unique=True, nullable=False)
    password = db.Column(db.String(300), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey("roles.id"), nullable=False)
    # sessions = db.relationship("Session", back_populates="user")
    times = db.relationship("Times", back_populates="employee")
    documents = db.relationship("UploadDocs", back_populates="user")


class Role(db.Model):
    __tablename__ = "roles"
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    role = db.Column(db.String(75), unique=True, nullable=False)


class Company(db.Model):
    __tablename__ = "companies"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(180), unique=True, nullable=False)
    company_admin = db.Column(
        db.Integer, db.ForeignKey("users.id"), unique=True, nullable=False
    )


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


class Privileges(db.Model):
    __tablename__ = "privileges"
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(150), unique=True, nullable=False)


class UploadDocs(db.Model):
    __tablename__ = "upload_docs"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    file = db.Column(db.String(300), nullable=False)
    file_type = db.Column(db.String(150), nullable=False)
    file_path = db.Column(db.String(300), nullable=False, unique=True)
    file_size_kb = db.Column(db.Integer, nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    privilege_lvl = db.Column(db.Integer, nullable=False)
    user = db.relationship("User", back_populates="documents")


# CREATE DATABASE IF NOT EXISTS `employee-mgmt-app` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
# USE `employee-mgmt-app`;


# INSERT INTO `roles` (`id`, `role`) VALUES
# (0, 'previous employee'),
# (1, 'staff'),
# (2, 'subadmin'),
# (3, 'admin');


# INSERT INTO `status` (`id`, `status`) VALUES
# (2, 'complete'),
# (3, 'incomplete'),
# (1, 'pending');
