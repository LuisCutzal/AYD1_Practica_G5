from flask import request, jsonify
from connection import get_connection
from functools import wraps


def token_required(f):
    @wraps(f)
    def decorador(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'Msg': 'Token es necesario'}), 403
        token = token.split(" ")[1]
        if len(token) == 0:  # Verifica que el token no esté vacío
            return jsonify({'Msg': 'Token inválido'}), 403
        return f(*args, **kwargs)
    return decorador


def add_note_route(app):
    @app.route('/note', methods=['POST'])
    @token_required
    def add_note():
        """ 
        # Request
        # Con etiqueta nueva
        {
            "title": "Practica AyD1",
            "description": "Practica Unica",
            "id_user": 1,
            "id_label": null,
            "label": "Prioritario"
        }

        # Con etiqueta existente
        {
            "title": "Practica AyD1",
            "description": "Practica Unica",
            "id_user": 1,
            "id_label": 1,
            "label": null
        }

        # Response
        {
            "msg": "mensaje",
            "data": [
                {
                    "description": "Practica Unica",
                    "id": 1,
                    "label": "PRODUCTOS",
                    "shared": 0,
                    "title": "Practica AyD1"
                }
            ]
        }
        """

        data = request.json

        try:
            connection = get_connection()
            cursor = connection.cursor()

            id_label = data.get("id_label")
            
            if data.get("label"):
                id_label = add_label(data.get("label"))
                if not id_label:
                    return jsonify({"Msg": "Error al registrar la nota", "error": str(e)}), 500

            sql = """
                INSERT INTO nota (TITULO, DESCRIPCION, ESTADO, COMPARTIDO, ID_ETIQUETA_N, ID_USUARIO_N)
                VALUES (:title, :description, 1, 0, :id_label, :id_user)
            """

            cursor.execute(sql, {'title': data.get("title"), 'description': data.get("description"), 'id_label': id_label, 'id_user': data.get("id_user")})
            connection.commit()

            sql = """
                SELECT n.ID_NOTA id, n.TITULO title, n.DESCRIPCION description, n.COMPARTIDO shared, e.NOMBRE name FROM nota n
                JOIN etiqueta e ON n.ID_ETIQUETA_N = e.id_etiqueta WHERE n.ESTADO = 1 and n.ID_USUARIO_N = :id_user ORDER BY id_nota
            """

            cursor.execute(sql, {'id_user': data.get("id_user")})
            results = cursor.fetchall()

            response_data = [{"id": result[0], "title": result[1], "description": result[2], "shared": result[3], "label": result[4]} for result in results]

            return jsonify({"msg": "Nota registrada correctamente", "data": response_data}), 200
        
        except Exception as e:
            return jsonify({"msg": "Error al registrar la nota", "error": str(e)}), 500
        
        finally:
            cursor.close()
            connection.close()

def add_label(label):
    try:
        connection = get_connection()
        cursor = connection.cursor()

        id_label = get_id_label(label, cursor)
        
        if not id_label:
            sql = """
                INSERT INTO etiqueta (NOMBRE)
                VALUES (:label)
            """
            cursor.execute(sql, {'label': label})
            connection.commit()
            
            id_label = get_id_label(label, cursor)

            return id_label[0]
        
        return id_label[0]
    
    except Exception as e:
        return None
    
    finally:
        cursor.close()
        connection.close()

def get_id_label(label, cursor):
    sql = """ 
        SELECT * FROM etiqueta WHERE NOMBRE = :label
    """
    
    cursor.execute(sql, {'label': label})

    record = cursor.fetchone()

    return record

def change_note_status_route(app):
    @app.route('/note/change_status/<int:user_id>', methods=['PUT'])
    @token_required
    def update_status(user_id):
        """
        # status:
        # delete - 0
        # unpinned - 1 
        # pinned - 2
        # archive - 3

        # REQUEST
        {
            "id": 1,
            "status": 2
        }

        # RESPONSE
        {
            "msg": "Archivado correctamente",
            "data": {
                "recent": [
                    {
                        "description": "Practica Unica",
                        "id": 1,
                        "label": "PRODUCTOS",
                        "shared": 0,
                        "title": "Practica AyD1"
                    }
                ],
                "pinned": [
                    {
                        "description": "Practica Unica",
                        "id": 1,
                        "label": "PRODUCTOS",
                        "shared": 0,
                        "title": "Practica AyD1"
                    }
                ]
            }
        }
        """

        data = request.json

        try:
            connection = get_connection()
            cursor = connection.cursor()

            sql = """
                UPDATE nota SET ESTADO = :status where id_nota = :id
            """

            cursor.execute(sql, {'status': data.get('status'), 'id': data.get('id')})
            connection.commit()

            response_data = get_notes(cursor, user_id)

            status = {
                0: 'Eliminada',
                1: 'Desfijada',
                2: 'Fijada',
                3: 'Archivada'
            }

            return jsonify({"msg": "Nota " + status[data['status']] + " correctamente", "data": response_data}), 200
        
        except Exception as e:
            return jsonify({"msg": "Error al actualizar la nota", "error": str(e)}), 500
        
        finally:
            cursor.close()
            connection.close()

def get_notes(cursor, user_id):

    sql = """
        SELECT n.ID_NOTA id, n.TITULO title, n.DESCRIPCION description, n.COMPARTIDO shared, e.NOMBRE name FROM nota n
        JOIN etiqueta e ON n.ID_ETIQUETA_N = e.id_etiqueta WHERE n.ESTADO = 1 and n.ID_USUARIO_N = :user_id ORDER BY id_nota
    """

    cursor.execute(sql, {'user_id': user_id})
    results = cursor.fetchall()
    recent = [{"id": result[0], "title": result[1], "description": result[2], "shared": result[3], "label": result[4]} for result in results]

    sql = """
        SELECT n.ID_NOTA id, n.TITULO title, n.DESCRIPCION description, n.COMPARTIDO shared, e.NOMBRE name FROM nota n
        JOIN etiqueta e ON n.ID_ETIQUETA_N = e.id_etiqueta WHERE n.ESTADO = 2 ORDER BY id_nota
    """

    cursor.execute(sql)
    results = cursor.fetchall()

    pinned = [{"id": result[0], "title": result[1], "description": result[2], "shared": result[3], "label": result[4]} for result in results]

    return {"recent": recent, "pinned": pinned}

def get_notes_route(app):
    @app.route('/note/<action>/<user_id>', methods=['GET'])
    @token_required
    def get_note(action, user_id):
        """
        # action:
        # pinned and recent notes - 1
        # archived notes - 2

        # RESPONSE
        # Pinned and recent
        {
            "msg": "Lista de notas",
            "data": {
                "recent": [
                    {
                        "description": "Practica Unica",
                        "id": 1,
                        "label": "PRODUCTOS",
                        "shared": 0,
                        "title": "Practica AyD1"
                    }
                ],
                "pinned": [
                    {
                        "description": "Practica Unica",
                        "id": 1,
                        "label": "PRODUCTOS",
                        "shared": 0,
                        "title": "Practica AyD1"
                    }
                ]
            }
        }

        # Archived
        {
            "msg": "Lista de notas",
            "data": [
                {
                    "description": "Practica Unica",
                    "id": 1,
                    "label": "PRODUCTOS",
                    "shared": 0,
                    "title": "Practica AyD1"
                }
            ]
        }
        """

        try:
            connection = get_connection()
            cursor = connection.cursor()
            response_data=get_notes(cursor, user_id)
            return jsonify({"msg": "Lista de notas", "data": response_data}), 200
        
        except Exception as e:
            print(e)
            return jsonify({"msg": "Error al obtener las notas", "error": str(e)}), 500
        
        finally:
            cursor.close()
            connection.close()

def get_archived_notes(cursor, user_id):

    sql = """
        SELECT n.ID_NOTA id, n.TITULO title, n.DESCRIPCION description, n.COMPARTIDO shared, e.NOMBRE name FROM nota n
        JOIN etiqueta e ON n.ID_ETIQUETA_N = e.id_etiqueta WHERE n.ESTADO = 3 and n.ID_USUARIO_N = :user_id ORDER BY id_nota
    """

    cursor.execute(sql, {'user_id': user_id})
    results = cursor.fetchall()

    response_data = [{"id": result[0], "title": result[1], "description": result[2], "shared": result[3], "label": result[4]} for result in results]

    return response_data

def unarchive_note_route(app):
    @app.route('/note/unarchive/<int:user_id>', methods=['PUT'])
    @token_required
    def unarchive_note(user_id):
        """
        # REQUEST
        {
            "id": 1
        }

        # RESPONSE - arreglo con las notas aun archivadas
        {
            "msg": "Nota Desarchivada correctamente",
            "data": [
                {
                    "description": "Practica Unica",
                    "id": 1,
                    "label": "PRODUCTOS",
                    "shared": 0,
                    "title": "Practica AyD1"
                }
            ]
        }
        """

        data = request.json

        try:
            connection = get_connection()
            cursor = connection.cursor()

            sql = """
                UPDATE nota SET ESTADO = 1 where id_nota = :id
            """

            cursor.execute(sql, {'id': data.get('id')})
            connection.commit()

            response_data = get_archived_notes(cursor, user_id)

            return jsonify({"msg": "Nota desarchivada correctamente", "data": response_data}), 200
        
        except Exception as e:
            return jsonify({"msg": "Error al desarchivar la nota", "error": str(e)}), 500
        
        finally:
            cursor.close()
            connection.close()

def get_labels_route(app):
    @app.route('/label', methods=['GET'])
    @token_required
    def get_label():
        """
        # RESPONSE
        {
            "data": [
                {
                    "id": 1,
                    "name": "PRODUCTOS"
                }
            ],
            "msg": "Lista de etiquetas"
        }
        """
        try:
            connection = get_connection()
            cursor = connection.cursor()

            response_data = get_labels(cursor)

            return jsonify({"msg": "Lista de etiquetas", "data": response_data}), 200
        
        except Exception as e:
            return jsonify({"msg": "Error al obtener las etiquetas", "error": str(e)}), 500
        
        finally:
            cursor.close()
            connection.close()

def get_labels(cursor):

    sql = """
        SELECT * FROM etiqueta
    """
    cursor.execute(sql)
    results = cursor.fetchall()

    return [{"id": result[0], "name": result[1]} for result in results]