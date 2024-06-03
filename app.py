from flask import Flask, jsonify
from flask_cors import CORS
from flasgger import Swagger

app = Flask(__name__)
CORS(app)
Swagger(app)

@app.route('/api/v1/some_endpoint', methods=['GET'])
def some_endpoint():
    return jsonify({'message': 'Hello World'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
