from flask import request, jsonify

users = {
    "user1": "pass1",
    "user2": "pass2",
    "user3": "pass3"
}

def setup_login_routes(app):
    @app.route('/login', methods=['POST'])
    def login():
        data = request.json
        username = data.get('username')
        password = data.get('password')
        if username in users and users[username] == password:
            # Enviar un mensaje simple en lugar de un token
            return jsonify({"msg": "Login successful", "user": username}), 200
        else:
            return jsonify({"msg": "Bad username or password"}), 401
