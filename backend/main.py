from flask import Flask,request,jsonify
from flask_cors import CORS
from data import data as dataset
import random

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['POST'])
def get_data():
    data = request.get_json()
    reflection = data.get('reflection')
    random_index = random.randint(1, len(dataset) - 1)
    return jsonify(dataset[random_index])
    
@app.route('/api/check', methods=['GET'])
def check_api():
    return "hello"


if __name__ == '__main__':
    app.run(debug=True)
