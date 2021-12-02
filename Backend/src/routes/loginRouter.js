// Importaciones necesarias
import {Router} from 'express'
import LoginController from '../controllers/loginController'

// Instancia
const router = Router()
const loginController = new LoginController()

// Rutas de login
/*
    Verificar el pin del 2fa que ingresa el usuario
    Envía el secret mediante el código, para ver si es válido
    Obtiene el correo del frontend y un pin
*/
router.post('/autenticar', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    const correo = req.body.correo; // TODO: Falta validar este dato
    const pin = req.body.pin; // Falta validar este dato
    const secret = await loginController.getSecret(correo);

    // Se llama a la función que valida el Pin
    const validarPin = loginController.verifySecret(secret.secretUrl, pin);

    if (validarPin) {

        // Se envía el secret al frontend
        res.json({
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo autentificar el usuario",
            "estado": false,
        })
    }
})

/*
    Obtiene el nombre, correo y LA dobleAuth (el bit) si el correo y contraseña se encuentra en la bd
    Obtiene el correo y la contraseña del frontend
*/
router.post('/login', async (req, res) => {

    const dataLogin = req.body; // Falta validar estos datos
    const dataBD = await loginController.getNombreCorreo(dataLogin);

    if ( dataBD ) {

        // Llamado para crear el token del usuario
        const token = loginController.getToken(dataBD, res);

        if ( token ) {
            // TODO: nunca se envía ya que el res lo tiene el getToken
            // Se envía el nombre, correo y dobleaAuth al frontend
            res.json({
                "id": dataBD.id,
                "nombre": dataBD.nombre,
                "correo": dataBD.correo,
                "dobleAuth": dataBD.dobleAuth,
                "urlFoto": dataBD.urlFoto,
                "estado": dataBD.estado,
            })
        }
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "Usuario o contraseña incorrectos",
            "estado": false,
        })
    }
})

export default router