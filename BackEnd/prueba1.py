import oracledb

from walletcredentials import uname, pwd, cdir, wltloc , wltpwd , dsn

with oracledb.connect(user=uname , password=pwd,dsn=dsn, config_dir=cdir,
                      wallet_location=wltloc,wallet_password=wltpwd) as connection:

    with connection.cursor() as cursor:

        sql = """select * from etiqueta"""

        for r in cursor.execute(sql):
            print(r)