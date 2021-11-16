from utils.DefaultResponses import not_found
from utils.Verificator import pathExists

from graphics.Graphicator import advances_by_trim, solicitude_status, advances_by_year

# Peticiones POST
def post_router(data, body):
  if not pathExists(data.path): 
    return not_found(data)

  if data.path == '/advances_by_year': 
    return adv_by_year(data, body['year'])  
      
# Peticiones GET
def get_router(data):
  
  if not pathExists(data.path):
    return not_found(data)

  if data.path == '/advances_by_trim':
    return adv_by_trim(data)     

  if data.path == '/solicitude_status':
    return sol_status(data)    

  pass

def adv_by_trim(data):
  set_image_headers(data)
  resp = advances_by_trim()   
  data.wfile.write(resp)

def adv_by_year(data, year):
  set_image_headers(data)
  resp = advances_by_year(year)   
  data.wfile.write(resp)

def sol_status(data):
  set_image_headers(data)
  resp = solicitude_status()  
  data.wfile.write(resp)

def set_image_headers(data): 
  data.send_response(200, "ok")
  data.send_header('Content-Type', 'image/png')
  data.end_headers()