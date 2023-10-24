from flask_restful import reqparse


signup_parser = reqparse.RequestParser()
signup_parser.add_argument(
    "username", type=str, required=True, help="Username is required"
)
signup_parser.add_argument(
    "password", type=str, required=True, help="Password is required"
)
signup_parser.add_argument("email", type=str, required=True, help="Email is required")
signup_parser.add_argument("role", type=str, required=True, help="Role is required")


login_parser = reqparse.RequestParser()
login_parser.add_argument("email", type=str, required=True, help="email is required")
login_parser.add_argument(
    "password", type=str, required=True, help="Password is required"
)


times_parser = reqparse.RequestParser()
times_parser.add_argument(
    "employee_id", type=int, required=True, help="Employee ID cannot be blank"
)
times_parser.add_argument(
    "time_in", type=str, required=True, help="Time in cannot be blank"
)
times_parser.add_argument(
    "time_out", type=str, required=True, help="Time out cannot be blank"
)
times_parser.add_argument("total_hours", type=str, required=False)
times_parser.add_argument("date", type=str, required=True, help="Date cannot be blank")
times_parser.add_argument(
    "status_id", type=int, required=True, help="Status cannot be blank"
)
