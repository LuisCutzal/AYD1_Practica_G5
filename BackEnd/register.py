from flask import request, jsonify
from connection import get_connection

def register_route(app):
    @app.route('/register', methods=['POST'])
    def register():
        data = request.json
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        try:
            connection = get_connection()
            cursor = connection.cursor()
            sql = """
            INSERT INTO USUARIO (NOMBRE, CORREO, CONTRASEÑA)
            VALUES (:name, :email, :password)
            """
            cursor.execute(sql, {'name': name, 'email': email, 'password': password})
            connection.commit()
            return jsonify({"Msg": "Usuario registrado correctamente"}), 201
        except Exception as e:
            return jsonify({"Msg": "Error al registrar usuario", "error": str(e)}), 500
        finally:
            cursor.close()
            connection.close()
        
        """
        endpoint: http://127.0.0.1:5000/register
        json:
            {
            "name": nombre usuario,
            "email": correo usuario,
            "password": contraseña usuario
            }
        """