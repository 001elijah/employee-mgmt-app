# Welcome to employy_mgmt_app

## How to run the server

to run the server locally, download or clone the repo, go to `cd employee_mgmt_app/server/app`;

run `python -m venv env`;

run `source env/bin/activate`;

run `pip list`;

(optional) run `pip install --upgrade pip`;

run `pip3 install -r requirements.txt` to install all dependencies.

run Flask: `virtualenv flask`, `cd flask`, `source bin/activate`, `cd..`;

Set Flask environment: `export FLASK_APP=__init__.py`, `export FLASK_ENV=development` for dev mode or `export FLASK_ENV=production` for production mode;

Then run `flask run` to run the app;

To generate [requirements.txt] use command `pip freeze > requirements.txt`;

To run project directly go to root folder and run `python3 __init__.py`;

## Documentation

[pip](https://pypi.org/project/pip/)
[Python3](https://www.python.org/downloads/)
[Flask](https://flask.palletsprojects.com/en/2.0.x/installation/)