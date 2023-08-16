import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

arr = []

@app.route('/', methods=['POST'])
def addData():
    data = request.json
    arr.append(data)  
    with open('data.json', 'w') as file:
        json.dump(arr, file) 
    return {'message': 'Data added successfully'}

@app.route('/get', methods=['GET'])
def getData():
    
        with open('data.json') as file:
            data = json.load(file)
        return jsonify(data)
  

if __name__ == '__main__':
    app.run(debug=True)