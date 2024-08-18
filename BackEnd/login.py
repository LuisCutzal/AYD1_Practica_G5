from flask import request, jsonify
from connection import get_connection

#funcion para el login de los usuarios
def login_routes(app):
    @app.route('/login', methods=['POST'])
    def login():
        data = request.json
        email = data.get('email')
        password = data.get('password')
        try:
            connection = get_connection()
            cursor = connection.cursor()
            sql = """
            SELECT CORREO FROM USUARIO WHERE CORREO = :email AND CONTRASEÑA = :password
            """
            cursor.execute(sql, {'email': email, 'password': password})
            result = cursor.fetchone()
            if result:
                token = result[0].split('@')[0] #para mantener el login usando localstorage
                return jsonify({"user": email, "token": token}), 200
            else:
                return jsonify({"Msg": "correo o contraseña invalidas"}), 401
        except Exception as e:
            return jsonify({"Msg": "Error en el login", "error": str(e)}), 500
        finally:
            cursor.close()
            connection.close()
            
        """
        endpoint: http://127.0.0.1:5000/login
        json:
            {
            "email": "correo usuario",
            "password": "contraseña usuario"
            }
        
        salida de postman
        {
            "user": "correo del usuario"
            "token": "token que es una parte del correo del usuario",
        }
        el token es para usarlo en el localstorage y mantener la sesion del usuario activa
        """
        
#funcion para el registro de los usuarios
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
        
def logouto_route(app):
    def logOut():
        return jsonify({"msg": "Logout successful"}), 200
    
        """se debera de limpiar el localstorage
        localStorage.removeItem('userToken');
        """