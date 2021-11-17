from utils.JWT_Decrypt import token_validator

# Paths verificados para enrutamiento.
validated_paths = ['/solicitude_status','/advances_by_trim','/advances_by_year',
'/solicitude_status_by_year','/solicitude_changed_by_year', '/solicitude_changed']

# Verificacion de existencia y validez del token.
def validateToken(data):
  if not tokenExists(data.headers) or not tokenValid(data.headers): 
    return False
  return True

# Verifica la existencia del token.
def tokenExists(headers):
  try: 
    token = headers['Authorization'].split(' ')[1]
    return True
    # Si no existe un Token en la peticion.
  except AttributeError as err:
    return False

# Verifica la validez del token.
def tokenValid(token):
    return token_validator(token['Authorization'].split(' ')[1])

# Verifica la existencia del path.
def pathExists(inner_path):
  for path in validated_paths:
    if path == inner_path:
      return True
  return False