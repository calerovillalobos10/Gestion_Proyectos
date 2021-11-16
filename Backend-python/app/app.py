import http.server as server
import json

from routers.Default_Router import post_router, get_router
from utils.Verificator import validateToken
from utils.DefaultResponses import forbidden

HandlerClass = server.SimpleHTTPRequestHandler

class MyHTTPRequestHandler(server.SimpleHTTPRequestHandler):

    # Headers generales
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
        self.send_header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
        self.send_header("Access-Control-Allow-Credentials", "true")
        server.SimpleHTTPRequestHandler.end_headers(self)

    # Do options se activa en cada peticion
    def do_OPTIONS(self):
      self.send_response(200, "ok")
      self.end_headers()
      
    # Methodo que recibe POST
    def do_POST(self):
      # Revisa existencia y validez del token
      if not validateToken(self):
        return forbidden(self)

      try:
        content_length = int(self.headers['Content-Length'])
        data = self.rfile.read(content_length)
        body = json.loads(data)
      except:
        # Retornamos respuesta invalida ya que los post requieren body.
        return forbidden(self)

      post_router(self, body)

    # Methodo que recibe GET
    def do_GET(self):
      # Revisa existencia y validez del token
      if not validateToken(self):
        return forbidden(self)

      get_router(self)

if __name__ == '__main__':
  server.test(HandlerClass=MyHTTPRequestHandler, port=4600)