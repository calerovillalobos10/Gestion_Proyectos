// Importaciones necesarias
import { getConnection, sql } from '../database/connection'
import ValidacionController from '../controllers/validationController'
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
import Functionary from '../models/functionary'
import MailerController from '../controllers/mailerController'

export default class FunctionaryController{

    validacionController;
    mailerController;

    // Constructor donde se inicializan las instancias
    constructor() {

        this.validacionController = new ValidacionController()
        this.mailerController = new MailerController()
    }

    // Esta función se encarga de enviar los parámetros del objeto functionary a la base de datos para que sean insertados
    insertFunctionary = async (dataLogin) => {

        let pool = null
        // Se llama al método que se encarga de verificar los atributos del objeto functionary. Este método devulve un mensaje si se produjo un error
        const verifyAtributes = this.verifyAttributesFunctionary(dataLogin)

        // Este if se encarga de llamar a las validaciones
        if ( verifyAtributes ) {

            try {
                // Se llama al método que crea el secret para el funcionario
                const secret = this.createSecret()
                // Conección a la base
                pool = await getConnection()
                // Parámetros de entrada y salida del sp
                const result = await pool.request()
                    .input("idSexoBE", sql.TinyInt, dataLogin.getSexo)
                    .input("idDepartamentoBE", sql.SmallInt, dataLogin.getDepartment)
                    .input("idTipoFuncionarioBE", sql.TinyInt, dataLogin.getTipoFuncionario)
                    .input("nombreBE", sql.VarChar(15), dataLogin.getNombre)
                    .input("apellido_1BE", sql.VarChar(15), dataLogin.getApellido_1)
                    .input("apellido_2BE", sql.VarChar(15), dataLogin.getApellido_2)
                    .input("fechaNacimientoBE", sql.Date, dataLogin.getFechaNacimiento)
                    .input("correoBE", sql.VarChar(50), dataLogin.getCorreo)
                    .input("contraseniaBE", sql.VarChar(16), dataLogin.getContrasenia)
                    .input("urlFotoBE", sql.VarChar(180), dataLogin.getUrlFoto)
                    .input("estadoBE", sql.Bit, dataLogin.getEstado)
                    .input("dobleAuthBE", sql.Bit, dataLogin.getDobleAuth)
                    .input("secretUrlBE", sql.VarChar(180), secret.ascii)
                    .execute('sp_insertFunctionary')
                // Ejecución del sp
                  //pool.request()
                // Verificación de la inserción en la base de datos
                if( result.returnValue === 1 ) {
                    // Obtiene el url de la base64 del qr y la envía a una función del node mailer que se encarga de enviar el qr al funcionario
                    this.findQRCode(secret).then( data => this.mailerController.mailer(process.env.CORREOENVIO, data) )

                    return true
                } else {

                    return false
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
    }


    // Esta función se encarga de verificar los atributos del objeto functionary 
    verifyAttributesFunctionary = (dataLogin) => {

        const sexoRes = dataLogin.getSexo
        const departmentoRes = dataLogin.getDepartment
        const tipoFuncionarioRes = dataLogin.getTipoFuncionario
        const nombreRes = dataLogin.getNombre
        const apellido_1Res = dataLogin.getApellido_1
        const apellido_2Res = dataLogin.getApellido_2
        const fechaNacimientoRes = dataLogin.getFechaNacimiento
        const correoRes = dataLogin.getCorreo
        const contraseniaRes = dataLogin.getContrasenia
        const urlFotoRes = dataLogin.getUrlFoto
        const estadoRes = dataLogin.getEstado

        // Verificaciones de los diferentes atributos del objeto functionary
        let verifySexo = ( sexoRes != null && this.validacionController.verifySpecialCharacters(parseInt(sexoRes, 10)) && this.validacionController.verifyMinSize(parseInt(sexoRes, 10), 1) && this.validacionController.verifyNumber(parseInt(sexoRes, 10)) ) ? true : false
        
        let verifyDepartmento = ( departmentoRes != null && this.validacionController.verifySpecialCharacters(parseInt(departmentoRes, 10)) && this.validacionController.verifyMinSize(parseInt(departmentoRes, 10), 1) && this.validacionController.verifyNumber(parseInt(departmentoRes, 10)) ) ? true : false
        
        let verifyTipoFuncionario = ( tipoFuncionarioRes != null && this.validacionController.verifySpecialCharacters(parseInt(tipoFuncionarioRes, 10)) && this.validacionController.verifyMinSize(parseInt(tipoFuncionarioRes, 10), 1) && this.validacionController.verifyNumber(parseInt(tipoFuncionarioRes, 10)) ) ? true : false
        
        let verifyNombre = ( nombreRes != null && this.validacionController.verifySpecialCharacters(nombreRes) && this.validacionController.verifyMinSize(nombreRes, 3) && this.validacionController.verifyMaxSize(nombreRes, 15) ) ? true : false
        
        let verifyApellido_1 = ( apellido_1Res != null && this.validacionController.verifySpecialCharacters(apellido_1Res) && this.validacionController.verifyMinSize(apellido_1Res, 3) && this.validacionController.verifyMaxSize(apellido_1Res, 15) ) ? true : false
        
        let verifyApellido_2 = ( apellido_2Res != null && this.validacionController.verifySpecialCharacters(apellido_2Res) && this.validacionController.verifyMinSize(apellido_2Res, 3) && this.validacionController.verifyMaxSize(apellido_2Res, 15) ) ? true : false
        
        let verifyFechaNacimiento = ( fechaNacimientoRes != null && this.validacionController.verifySpecialCharacters(fechaNacimientoRes) && this.validacionController.verifyDate(fechaNacimientoRes) ) ? true : false
        
        let verifyCorreo = ( correoRes != null && this.validacionController.verifyEmail(correoRes) && this.validacionController.verifyMinSize(correoRes, 12) && this.validacionController.verifyMaxSize(correoRes, 50) ) ? true : false
        
        let verifyContrasenia = ( contraseniaRes != null && this.validacionController.verifySpecialCharacters(contraseniaRes) && this.validacionController.verifyMinSize(contraseniaRes, 8) && this.validacionController.verifyMaxSize(contraseniaRes, 16) ) ? true : false
        
        let verifyUrlFoto = ( urlFotoRes != null && this.validacionController.verifySpecialCharacters(urlFotoRes) && this.validacionController.verifyMinSize(urlFotoRes, 5) && this.validacionController.verifyMaxSize(urlFotoRes, 180) ) ? true : false
        
        let verifyEstado = ( estadoRes != null && this.validacionController.verifySpecialCharacters(estadoRes) && this.validacionController.verifyMinSize(estadoRes, 1) && this.validacionController.verifyNumber(estadoRes) ) ? true : false
        
        return ( verifySexo &&  verifyDepartmento && verifyTipoFuncionario && verifyNombre && verifyApellido_1 && verifyApellido_2 && verifyFechaNacimiento && verifyCorreo && verifyContrasenia && verifyUrlFoto && verifyEstado) ? true : false
    }

    // Esta función se encarga de crear el secret para el funcionario. Este secret es el que se utiliza en el código qr
    createSecret = () => {

        const secret = speakeasy.generateSecret({
            name: "GestionDevs"
        })

        return secret
    }

    // Esta función se encarga de sacar la data del qr para poder formar la imagen
    findQRCode = async (secret) => {

        let qr = null

        try {
            // Extra el url del data, que está en base64 y corresponde al qr
            qr = await qrcode.toDataURL(secret.otpauth_url)
        } catch (err){
            console.log(err);
        }

        return qr
    }

    //getFunctionaryById
}

