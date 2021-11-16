import os
import pyodbc as db

# Asignacion de variables de entorno.
host = os.getenv('HOST') 
base = os.getenv('BASE') 
user = os.getenv('USER') 
pwrd = os.getenv('PWRD') 

# Conexion a base de datos.
def get_conn(): 
  try:
    conexion = db.connect('DRIVER={};SERVER={};DATABASE={};UID={};PWD={}'
                              .format('{ODBC Driver 17 for SQL Server}',host,base,user,pwrd))
    return conexion
    
  except Exception as e:
    return False