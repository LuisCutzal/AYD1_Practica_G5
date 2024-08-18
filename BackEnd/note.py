from flask import request, jsonify
from connection import get_connection

def add_note_route(app):
    @app.route('/note', methods=['POST'])
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
                JOIN etiqueta e ON n.ID_ETIQUETA_N = e.id_etiqueta WHERE n.ESTADO = 1 ORDER BY id_nota
            """

            cursor.execute(sql)
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
    @app.route('/note/change_status', methods=['PUT'])
    def update_status():
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

            response_data = get_notes(cursor)

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

def get_notes(cursor):

    sql = """
        SELECT n.ID_NOTA id, n.TITULO title, n.DESCRIPCION description, n.COMPARTIDO shared, e.NOMBRE name FROM nota n
        JOIN etiqueta e ON n.ID_ETIQUETA_N = e.id_etiqueta WHERE n.ESTADO = 1 ORDER BY id_nota
    """

    cursor.execute(sql)
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