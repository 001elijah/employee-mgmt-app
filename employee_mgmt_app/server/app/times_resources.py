from flask_restx import Resource, Namespace
from app.api_models import times_model
from app.requestParsing import times_parser
from app.extensions import db
from app.models import Times


times_ns = Namespace("times", description="Time related operations")


@times_ns.route("/times")
class RegTimes(Resource):
    @times_ns.expect(times_model)
    @times_ns.marshal_with(times_model)
    def post(self):
        data = times_parser.parse_args()
        employee_id = data["employee_id"]
        time_in = data["time_in"]
        time_out = data["time_out"]
        total_hours = data["total_hours"]
        date = data["date"]
        status_id = data["status_id"]

        new_time = Times(
            employee_id=employee_id,
            time_in=time_in,
            time_out=time_out,
            total_hours=total_hours,
            date=date,
            status_id=status_id,
        )
        new_time.total_hours = new_time.calculate_total_hours()
        db.session.add(new_time)
        db.session.commit()
        return new_time, 201


@times_ns.route("/gettimes/<int:employee_id>")
class GetTimes(Resource):
    @times_ns.marshal_with(times_model)
    def get(self, employee_id):
        times = Times.query.filter_by(employee_id=employee_id).all()
        return times, 200
