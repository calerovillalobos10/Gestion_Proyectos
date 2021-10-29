// Importaciones necesarias
import {Router} from 'express'
import {getNombreCorreo, getToken, getSecret, verifyToken, recuperarToken, jwt} from '../controllers/loginController'

// Instancia
const router = Router()

// Rutas de login
/*
    Envía el secret mediante el código, para ver si es válido
    Obtiene el correo del frontend
*/
router.post('/autenticar', recuperarToken, verifyToken, async (req, res) => {

    const correo = req.body.correo; // Falta validar este dato
    const secret = await getSecret(correo);

    if (secret) {

        // Se envía el secret al frontend
        res.json({
            "secretUrl": secret.secretUrl,
            "estado": secret.estado,
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
    const dataBD = await getNombreCorreo(dataLogin);

    if ( dataBD ) {

        // Llamado para crear el token del usuario
        const token = getToken(dataLogin, res);

        if ( token ) {

            // Se envía el nombre, correo y dobleaAuth al frontend
            res.json({
                "nombre": dataBD.nombre,
                "correo": dataBD.correo,
                "dobleAuth": dataBD.dobleAuth,
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