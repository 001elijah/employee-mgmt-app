from flask_restx import fields
from app.extensions import api

user_signup_model = api.model(
    "UserSignup",
    {
        "id": fields.Integer(readonly=True),
        "username": fields.String(required=True),
        "email": fields.String(required=True),
        "password": fields.String(required=True),
        "role_id": fields.Integer(required=True),
    },
)

user_login_model = api.model(
    "UserLogin",
    {
        "username": fields.String(required=True),
        "password": fields.String(required=True),
    },
)

times_model = api.model(
    "Times",
    {
        "id": fields.Integer(readonly=True),
        "employee_id": fields.Integer(required=True),
        "time_in": fields.String(required=True),
        "time_out": fields.String(required=True),
        "total_hours": fields.String(readonly=True),
        "date": fields.String(required=True),
        "status_id": fields.Integer(required=True),
    },
)


uploadDocs_model = api.model(
    "UploadDocs",
    {
        "id": fields.Integer(readonly=True),
        "title": fields.String(required=True),
        "description": fields.String(required=True),
        "file": fields.String(required=True),
        "file_path": fields.String(required=False),
        "file_type": fields.String(required=False),
        "file_size": fields.Integer(required=False),
        "employee_id": fields.Integer(required=True),
        "privilege_lvl": fields.Integer(required=True),
    },
)
