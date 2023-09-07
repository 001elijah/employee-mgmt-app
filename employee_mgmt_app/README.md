# Welcome to employee_mgmt_app

## How to run the server

to run the server locally, download or clone the repo, go to `cd employee_mgmt_app/server/app`;

run `python -m venv env`;

run `source env/bin/activate`;

run `pip list`;

(optional) run `pip install --upgrade pip`;

run `pip3 install -r requirements.txt` to install all dependencies.

run Flask: `virtualenv flask`, `cd flask`, `source bin/activate`, `cd..`;

Set Flask environment: `export FLASK_APP=__init__.py`, `export FLASK_ENV=development` for dev mode or `export FLASK_ENV=production` for production mode;

Before running the App migrate DB to Flask: `flask shell` => `from app import db` => `db.create_all()` => `quit() or exit()`

Then run `flask run` to run the app;

To generate [requirements.txt] use command `pip freeze > requirements.txt`;

To run project directly go to root folder and run `python3 __init__.py`;

## Set up Ngrok before running the client

**Explanation from Illia:** *The issue was that Expo app runs on /192.168.0.100:8081, and server runs on http://127.0.0.1:5000/*
*And when I fetch from Expo App to localhost it doesn't see the server there*
*Because the App runs on one device, and the server runs on my laptop*
*Ngrok is the tool to connect two different localhosts*
*It provides a middleware address, which I use on client to fetch data, and redirects to my localhost 5000*
*that's it*

Follow [Ngrok guide](https://ngrok.com/docs/getting-started/) steps (first 4 steps enough).
After you have **Ngrok** up and running, go to **backendAPI.js**, and put Ngrok URI to **axios.defaults.baseURL**.
**Example:** *axios.defaults.baseURL = "https://f4d6-91-90-11-228.ngrok-free.app";*

## How to run the client

run `npm i` to install all dependencies;

run `npm start` to start the app;

open your camera and scan the QR code you see at your console.

### Documentation

[Expo](https://docs.expo.dev/)

[TailwindCSS](https://www.nativewind.dev/quick-starts/expo)

[pip](https://pypi.org/project/pip/)

[Python3](https://www.python.org/downloads/)

[Flask](https://flask.palletsprojects.com/en/2.0.x/installation/)