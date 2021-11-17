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
  if conn:
    try:
      query = 'exec [sp_graph_all_trimester_advance]'
      points = pd.read_sql_query(query, conn)
      conn.close()
      
      fig = points.descripcion.value_counts().plot(kind='barh', color="orange", figsize=(15,5))
      fig.set_title('Avances por trimestres (General)')
      fig.set_xlabel('Año')
    
      file_name = generate_file_name('adv_by_trim_')
      plt.savefig( file_name )

      return (prepare_file(file_name))
    except:
      return False
# -------------------------------------------------------------------------------

# Imprime los avances de todos los trimestres de un determinado año
def advances_by_year(year): 
  conn = get_conn()
  if conn:
    try:
      query = 'exec [sp_graph_year_trimester_advance] @year =' + year
            
      points = pd.read_sql_query(query, conn)
      conn.close()
      
      fig = points.descripcion.value_counts().plot(kind='barh', color="orange", figsize=(15,5))
      fig.set_title('Avances por trimestres ' + year)
      fig.set_xlabel('Año')
    
      file_name = generate_file_name('adv_by_')
      plt.savefig( file_name )
      return (prepare_file(file_name))
    except:
      return False
# -------------------------------------------------------------------------------

# Muestra el grafico pie de solicitudes completas e incompletas
def solicitude_status():
  conn = get_conn()
  if conn:
    try:
        query = ' exec [sp_graph_all_finished_solicitude]'
        data = pd.read_sql_query(query, conn)

        labels = 'Completas', 'Incompletas'
        sizes = [data.unfinished[0], data.finished[0]]
        if sizes[0] == 0 and sizes[1] == 0:
          return False
        explode = (0, 0.1)  # Mueve un poco el primero

        fig1, ax1 = plt.subplots()
        ax1.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%',
                  shadow=True, startangle=90)
        ax1.axis('equal')  
        ax1.set_title("Solicitudes finalizadas (General)")
        plt.legend(loc="upper left")
        file_name = generate_file_name('sol_status_')
        
        plt.savefig( file_name )
        
        return (prepare_file(file_name))
    except:
      return False

# -------------------------------------------------------------------------------
# Muestra el grafico pie de solicitudes completas e incompletas segun el año.
def solicitude_status_by_year(year):
    conn = get_conn()
    if conn:
      try:
        query = ' exec [sp_graph_year_finished_solicitude] @year =' + year
        data = pd.read_sql_query(query, conn)
        labels = 'Completas', 'Incompletas'
      
        sizes = [data.unfinished[0], data.finished[0]]
        if sizes[0] == 0 and sizes[1]== 0:
          return False

        explode = (0, 0.1)  # Mueve un poco el primero

        fig1, ax1 = plt.subplots()
        ax1.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%',
                  shadow=True, startangle=90)
        ax1.axis('equal')  
        file_name = generate_file_name('sol_status_')

        ax1.set_title("Solicitudes finalizadas (" + year +")")
        plt.legend(loc="upper left")
        plt.savefig( file_name )
    
        return (prepare_file(file_name))
      except:
        return False
# -------------------------------------------------------------------------------

def solicitude_changed_by_year(year):
    conn = get_conn()
    if conn:
      try:
        query = ' exec [sp_graph_year_changed_solicitude] @year =' + year
        data = pd.read_sql_query(query, conn)
      
        labels = 'Con cambios', 'Sin cambios'
        sizes = [data.changed[0], data.unchanged[0]]
        explode = (0, 0.1)  # Mueve un poco el primero

        fig1, ax1 = plt.subplots()
        ax1.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%',
                  shadow=True, startangle=90)
        ax1.axis('equal')  
        file_name = generate_file_name('sol_change_')

        ax1.set_title("Solicitudes con cambios (" + year +")")
        plt.legend(loc="upper left")
        plt.savefig( file_name )
        return (prepare_file(file_name))
      except:
        return False

# Generacion de un nombre de archivo temporal.
def generate_file_name(prefix):
  return 'app/graphics/' + prefix + str(datetime.today().timestamp()) + '.png'

# -------------------------------------------------------------------------------
# Muestra el grafico pie de solicitudes que han realizado cambios
def solicitude_changed():
  conn = get_conn()
  if conn:
    try:
      query = ' exec [sp_graph_all_changed_solicitude]'
      data = pd.read_sql_query(query, conn)

      labels = 'Con cambios', 'Sin cambios'
      sizes = [data.changed[0], data.unchanged[0]]
      explode = (0, 0.1)  # Mueve un poco el primero

      fig1, ax1 = plt.subplots()
      ax1.pie(sizes, explode=explode, labels=labels, autopct='%1.1f%%',
                shadow=True, startangle=90)
      ax1.axis('equal')  
      ax1.set_title("Solicitudes con cambios (General)")
      plt.legend(loc="upper left")

      file_name = generate_file_name('sol_change_')
      
      plt.savefig( file_name )
      return (prepare_file(file_name))
    except:
      return False

# Métodos extra ajenos a la graficacion 

# Generacion de un nombre de archivo temporal.
def generate_file_name(prefix):
  return 'app/graphics/' + prefix + str(datetime.today().timestamp()) + '.png'

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