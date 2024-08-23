from flask import Flask
from login import login_routes, register_route, logouto_route
from note import add_note_route, change_note_status_route, get_notes_route, unarchive_note_route, get_labels_route,updateNote
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
"""
@app.route("/hola", methods=['GET'])
def hola():
    return "hola mundo"
"""

login_routes(app)
register_route(app)
logouto_route(app)
add_note_route(app)
change_note_status_route(app)
get_notes_route(app)
unarchive_note_route(app)
get_labels_route(app)
updateNote(app)
if __name__ == '__main__':
    app.run(debug=True)
