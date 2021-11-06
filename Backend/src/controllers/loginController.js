// Importaciones necesarias
import { getConnection, sql } from '../database/connection'
import jwt from 'jsonwebtoken'
import speakeasy from 'speakeasy'
import ValidacionController from '../controllers/validationController'

export default class LoginController {

    validacionController;
 
    // Constructor vacío
    constructor() {

        this.validacionController = new ValidacionController()
    }

    // Recupera el nombre y el correo del funcionario una vez valido la existencia del mismo en la bd
    getNombreCorreo = async (dataLogin) => {
        
        let pool = null
        let request = null
        let correoRes = dataLogin.correo
        let contraseniaRes = dataLogin.contrasenia

        // Este if se encarga de llamar a las validaciones
        if ( this.validacionController.verifyEmail(correoRes) && this.validacionController.verifySpecialCharacters(contraseniaRes) && 
        this.validacionController.verifyMinSize(contraseniaRes, 8) && this.validacionController.verifyMaxSize(correoRes, 50) && correoRes != null && contraseniaRes != null ) {

            try {
                pool = await getConnection()
                request = pool.request()
                // Parámetros de entrada y salida del sp
                request.input("correoBE", sql.VarChar(50), correoRes)
                request.input("contraseniaBE", sql.VarChar(16), contraseniaRes)
                // Ejecución del sp
                const result = await request.execute('sp_login')
                // Retorno del objeto con los parámetros que se ocupan en el frontend
                return {
                    nombre: result.recordset[0].nombre,
                    correo: result.recordset[0].correo,
                    dobleAuth: result.recordset[0].dobleAuth,
                    estado: true
                }
            } catch (err) {

                console.log(err);
                return false
            } finally {
                // Cerrar la conexión
                pool.close()
            }
        } else {

            console.log('Falló el proceso de validación de datos');
            return false
        }
    };

    // Esta función genera el Secret
    createSecret = () => {

        const secret = speakeasy.generateSecret({
            name: "GestionDevs"
        })
    }

    // Recupera el secret para la autentificación de google
    getSecret = async (correo) => {

        let pool = null;

        try {
            pool = await getConnection()
            const request = pool.request()
            // Parámetros de entrada y salida del sp
            request.input("correoBE", sql.VarChar(50), correo)
            // Ejecución del sp
            const result = await request.execute('sp_recuperarSecret')
            // Retorno del objeto con los parámetros que se ocupan en el frontend
            return {
                secretUrl: result.recordset[0].secretUrl,
                estado: true
            }
        } catch (err) {

            console.log(err);
            return false
        } finally {
            // Cerrar la conexión
            pool.close()
        }
    };

    // Función para que valide el pin
    verifySecret = (secret, token) => {
        console.log("Llego el verify token");

        const verify = speakeasy.totp.verify({

            secret: secret,
            encoding: 'ascii',
            token: token
        })

        return (verify) ? true : false
    }

    // Crea el toquen para el funcionario
    getToken = (dataBD, res) => {

        /* 
          La función sign de jwt permite crear el token, agregandole una cadena de caracteres (SECRETKEY), la cual se obtiene de las env
          {expiresIn: '10h'} funciona para que el token expire en cierto tiempo, y así hacer que el usuario tenga que loguear nuevamente
        */
        jwt.sign({ dataBD }, process.env.SECRETKEY + '', { expiresIn: '10h' }, (err, token) => {

            if (err) {

                res.send('Error al crear el token')
            } else {

                res.json({
                    token
                })
            }
        });
    }

    // Esta función recupera el token del usuario
    // Authorization: Bearer <token>
    recuperarToken = (req, res, next) => {

        // Obtener del lado del cliente los datos de authorization
        const bearerHeader = req.headers['authorization']

        if (typeof bearerHeader !== 'undefined') {

            /*
                Se obtiene el token siempre y cuando se cumpla la condición del if. Además, se recuperar dos elementos
                con el .split se obtiene el segundo, el token
            */
            const bearerToken = bearerHeader.split(" ")[1]
            req.token = bearerToken

            // Al obtener el token correcto se ejecuta la función next
            next()
        } else {

            // Ruta o acceso prohibido
            res.sendStatus(403)
        }
    }

    // Se encarga de comunicarse con la función de recuperar token y verifica el mismo
    verifyToken = (req, res, next) => {

        // La información de authData debe ser la enviada al getToken
        jwt.verify(req.token, process.env.SECRETKEY + '', (err) => {

            if (err) {
                // Ruta o acceso prohibido
                res.sendStatus(403)
            } else {
                // Si el token coincide entonces se indica que el acceso es permitido
                next()
            }
        })
    }

}
