## validateMail(userMail: string)
  ** Envia Correo a validar
  ** Recibe validacion de existencia del back 
  Method: POST
  JSON: {coreo: []}

## changePass(pass:string)
  ** Envia correo y nueva contraseña.
  ** Recibe validacion del cambio.
  
  Method: POST
  JSON: {coreo: [], contrasenia: []}

## sendCode()
  ** Envia codigo a enviar por email y temporal de acceso.
  ** Recibe validacion del envio.

  Method: POST
  JSON: {coreo:[], codigo:[]}