from flask import Flask
from login import login_routes, register_route, logouto_route
from note import add_note_route

app = Flask(__name__)
"""
@app.route("/hola", methods=['GET'])
def hola():
    return "hola mundo"
"""

login_routes(app)
register_route(app)
logouto_route(app)
add_note_route(app)

if __name__ == '__main__':
    app.run(debug=True)
