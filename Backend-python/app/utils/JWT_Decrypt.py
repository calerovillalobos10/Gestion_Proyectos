import jwt
import os
from dotenv import load_dotenv

# Permite el uso de .env
load_dotenv()

#Desencripta el token
def token_validator(token):
    secret = os.getenv('SECRET') 
    try:
        jwt.decode( jwt=token, key=secret, algorithms=['HS256', ])
        return True
    except:
        return False