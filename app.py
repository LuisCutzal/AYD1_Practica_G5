from flask import Flask
from login import setup_login_routes

app = Flask(__name__)

"""
@app.route("/hola", methods=['GET'])
def hola():
    return "hola mundo"
"""

setup_login_routes(app)


if __name__ == '__main__':
    app.run(debug=True)
