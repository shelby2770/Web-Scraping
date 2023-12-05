import subprocess
from flask import Flask, request, json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return 'Hello, Flask!'

@app.route('/<loc>', methods=['POST'])
def devices(loc):
    data= request.json.replace(" ", "+")
    path = request.path
    root_name = path.split('/')[-1]
    command = ['python', f'{loc}.py', f'{data}']
    result = subprocess.run(command, check=True, capture_output=True, text=True)
    output = result.stdout
    return json.dumps(output)

# @app.route('/kry_links', methods=['POST'])
# def kry_links():
#     data= request.json.replace(" ", "+")
#     command = ['python', 'kry_links.py', f'{data}']
#     result = subprocess.run(command, check=True, capture_output=True, text=True)
#     output = result.stdout
#     return json.dumps(output)

# @app.route('/kry_spider', methods=['POST'])
# def kry_spider():
#     data= request.json.replace(" ", "+")
#     command = ['python', 'kry_spider.py', f'{data}']
#     result = subprocess.run(command, check=True, capture_output=True, text=True)
#     output = result.stdout
#     return json.dumps(output)