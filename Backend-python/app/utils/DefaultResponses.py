# Respuestas por defecto

# Peticiones con error de token.
def forbidden(data):
  data.send_response(403)
  data.send_header('Content-Type', 'application/json')
  data.end_headers()
  message = "{Error: 'Forbidden'}"
  return data.wfile.write(message.encode(encoding='utf_8'))

# Endpoint no encontrado.
def not_found(data):
  data.send_response(404)
  data.send_header('Content-Type', 'application/json')
  data.end_headers()
  message = "{Error: 'Not Found'}"
  return data.wfile.write(message.encode(encoding='utf_8'))