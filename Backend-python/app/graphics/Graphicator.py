import pandas as pd
import matplotlib
matplotlib.use('Agg') # Utiliza el matplot sin GUI

import matplotlib.pyplot as plt
from datetime import datetime
from data.DB import get_conn
from os import remove

# -------------------------------------------------------------------------------
# Imprime los avances generales de todos los trimestres
def advances_by_trim():
  conn = get_conn()
  if not conn:
    print('Error al obtener conexion')

  else:
    query = '''
            select descripcion from tb_Trimestres t 
            inner join tb_Avances s on t.idTrimestre = s.idTrimestre
          '''
    points = pd.read_sql_query(query, conn)
    conn.close()
    
    fig = points.descripcion.value_counts().plot(kind='barh', color="orange", figsize=(15,5))
    fig.set_title('Avances por trimestres (General)')
    fig.set_xlabel('Año')
  
    file_name = generate_file_name('adv_by_trim_')
    plt.savefig( file_name )

    return (prepare_file(file_name))
# -------------------------------------------------------------------------------


# -------------------------------------------------------------------------------
# Imprime los avances de todos los trimestres de un determinado año
def advances_by_year(year): 
  conn = get_conn()
  if not conn:
    print('Error al obtener conexion')

  else:
    query = '''
            select descripcion from tb_Trimestres t 
            inner join tb_Avances s on t.idTrimestre = s.idTrimestre
            where YEAR(fechaAvance) = ''' + year
          
    points = pd.read_sql_query(query, conn)
    conn.close()
    
    fig = points.descripcion.value_counts().plot(kind='barh', color="orange", figsize=(15,5))
    fig.set_title('Avances por trimestres ' + year)
    fig.set_xlabel('Año')
    
    file_name = generate_file_name('adv_by_')
    plt.savefig( file_name )
    return (prepare_file(file_name))
# -------------------------------------------------------------------------------


# -------------------------------------------------------------------------------
# Muestra el grafico pie de solicitudes completas e incompletas
def solicitude_status():
  labels = 'Completas', 'Incompletas'
  sizes = [25, 75]
  explode = (0, 0.1)  # Mueve un poco el primero

  fig1, ax1 = plt.subplots()
  ax1.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%',
          shadow=True, startangle=90)
  ax1.axis('equal')  

  file_name = generate_file_name('sol_status_')
  
  plt.savefig( file_name )
  return (prepare_file(file_name))

# Generacion de un nombre de archivo temporal.
def generate_file_name(prefix):
  return 'app/graphics/' + prefix + str(datetime.today().timestamp()) + '.png'
# -------------------------------------------------------------------------------


# -------------------------------------------------------------------------------
# Métodos extra ajenos a la graficacion 

# Se prepara el binario de respuesta.
def prepare_file(file_name):
  binary = load_binary(file_name)
  plt.close('all')
  remove(file_name)
  return binary

# Generacion del binario.
def load_binary(filename):
  with open(filename, 'rb') as file_handle:
    return file_handle.read()