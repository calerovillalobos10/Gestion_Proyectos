from utils.DefaultResponses import not_found
from utils.Verificator import pathExists

from graphics.Graphicator import *

# Peticiones POST
def post_router(data, body):
  if not pathExists(data.path): 
    return not_found(data)

  if data.path == '/advances_by_year': 
    return adv_by_year(data, body['year'])  
  
  if data.path == '/solicitude_status_by_year': 
    return sol_stat_by_year(data, body['year'])  
  
  if data.path == '/solicitude_changed_by_year': 
    return sol_status_chan_by_year(data, body['year'])  
      
# Peticiones GET
def get_router(data):
  
  if not pathExists(data.path):
    return not_found(data)

  if data.path == '/advances_by_trim':
    return adv_by_trim(data)     

  if data.path == '/solicitude_status':
    return sol_status(data)   

  if data.path == '/solicitude_changed':
    return sol_status_chan(data) 
  pass

# Responde con los avances por año
def adv_by_trim(data):
  set_image_headers(data)
  resp = advances_by_trim()   
  data.wfile.write(resp)

# Responde con los avances en general
def adv_by_year(data, year):
  set_image_headers(data)
  resp = advances_by_year(year)   
  data.wfile.write(resp)

# Responde con las solicitudes finalizadas en general
def sol_status(data):
  set_image_headers(data)
  resp = solicitude_status()  
  data.wfile.write(resp)

# Responde con las solicitudes finalizadas por año
def sol_stat_by_year(data,year):
  set_image_headers(data)
  resp = solicitude_status_by_year(year)  
  data.wfile.write(resp)

# Responde con las solicitudes que cambiaron en general
def sol_status_chan(data):
  set_image_headers(data)
  resp = solicitude_changed()  
  data.wfile.write(resp)

# Responde con las solicitudes que cambiaron por año
def sol_status_chan_by_year(data,year):
  set_image_headers(data)
  resp = solicitude_changed_by_year(year)  
  data.wfile.write(resp)

# Coloca los headers generales
def set_image_headers(data): 
  data.send_response(200, "ok")
  data.send_header('Content-Type', 'image/png')
  data.end_headers()