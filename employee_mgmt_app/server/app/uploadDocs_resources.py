from flask_restx import Resource, Namespace
from app.api_models import uploadDocs_model
from app.extensions import db
from app.models import UploadDocs
from werkzeug.utils import secure_filename
from flask import current_app, request
import os
from app.models import Role


upload_docs_ns = Namespace("upload_docs", description="Document related operations")

ALLOWED_EXTENSIONS = {
    "txt",
    "pdf",
    "png",
    "jpg",
    "jpeg",
    "gif",
}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


from sqlalchemy.orm import joinedload


@upload_docs_ns.route("/getdocs")
class GetDocuments(Resource):
    @upload_docs_ns.marshal_with(uploadDocs_model)
    def get(self):
        docs = UploadDocs.query.options(joinedload(UploadDocs.user)).all()

        if not docs:
            print("No documents found")
            return {"message": "No documents found"}, 404

        docs_list = [
            {
                "id": doc.id,
                "title": doc.title,
                "file": doc.file,
                "description": doc.description,
                "file_path": doc.file_path,
                "file_type": doc.file_type,
                "file_size_kb": doc.file_size_kb,
                "employee_id": doc.employee_id,
                "privilege_lvl": doc.privilege_lvl,
                "username": doc.user.username,
            }
            for doc in docs
        ]
        return docs_list, 200


@upload_docs_ns.route("/upload")
class SimpleUpload(Resource):
    @upload_docs_ns.expect(uploadDocs_model)
    @upload_docs_ns.marshal_with(uploadDocs_model)
    def post(self):
        if "file" not in request.files:
            return {"message": "No file part"}, 400
        file = request.files["file"]

        if file.filename == "":
            return {"message": "No selected file"}, 400

        if not allowed_file(file.filename):
            return {"message": "Invalid file type or extension"}, 400

        filename = secure_filename(file.filename)
        filepath = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)

        if os.path.exists(filepath):
            print("A file with this name already exists")
            return {"message": "A file with this name already exists"}, 400

        file.save(filepath)

        title = request.form.get("title")
        description = request.form.get("description")
        file_type = filename.rsplit(".", 1)[1].lower()
        file_size = os.path.getsize(filepath)
        employee_id = request.form.get("employee_id")
        privilege_lvl = request.form.get("privilege_lvl")

        try:
            new_doc = UploadDocs(
                title=title,
                description=description,
                file=filename,
                file_type=file_type,
                file_size_kb=file_size,
                file_path=filepath,
                employee_id=employee_id,
                privilege_lvl=privilege_lvl,
            )

            db.session.add(new_doc)
            db.session.commit()

            return new_doc, 201
        except Exception as e:
            print("error", e)
            return {"message": str(e)}, 500
