// Importaciones necesarias
import { getConnection, sql } from '../database/connection'
import ValidacionController from '../controllers/validationController'
import Solicitation from '../models/solicitation'

export default class SolicitationController{

    validacionController;

    // Constructor donde se inicializan las instancias
    constructor() {
        this.validacionController = new ValidacionController()
    }

    // Esta función obtiene una lista de solicitudes de la base de datos
    listSolicitation = async (idFuncionarioAplicativo) => {

        let pool = null

        if ( idFuncionarioAplicativo != null && this.validacionController.verifyNumber(idFuncionarioAplicativo) && this.validacionController.verifySpecialCharacters(idFuncionarioAplicativo) && this.validacionController.verifyMinSize(idFuncionarioAplicativo) ) {
            
            try {
                // Conección a la base
                pool = await getConnection()
                // Ejecución del sp
                const result = await pool.request()
                .input("idFuncionarioAplicativoBE", sql.SmallInt, idFuncionarioAplicativo)
                .execute('sp_listSolicitation')
                // Retorno del objeto con los parámetros que se ocupan en el frontend
                return result.recordset
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

    // Esta función se encarga de enviar los parámetros del objeto solicitation a la base de datos para que sean insertados
    insertSolicitation = async (dataLogin) => {

        let pool = null
        // Se llama al método que se encarga de verificar los atributos del objeto solicitation
        const verifyAtributes = this.verifyAttributesSolicitation(dataLogin)

        // Este if se encarga de llamar a las validaciones
        if ( verifyAtributes ) {

            try {
                // Conección a la base
                pool = await getConnection()
                // Parámetros de entrada y salida del sp y ejecución del mismo
                const result = await pool.request()
                    .input("idFuncionarioAplicativoBE", sql.SmallInt, dataLogin.getFuncionarioAplicativo)
                    .input("idFuncionarioResponsableBE", sql.SmallInt, dataLogin.getFuncionarioResponsable)
                    .input("idFuncionarioFinalBE", sql.SmallInt, dataLogin.getFuncionarioFinal)
                    .input("fechaSolicitudBE", sql.SmallDateTime, dataLogin.getFechaSolicitud)
                    .input("fechaInicioBE", sql.Date, dataLogin.getFechaIncio)
                    .input("fechaFinBE", sql.Date, dataLogin.getFechaFin)
                    .input("documentoActaConstBE", sql.VarBinary, dataLogin.getDocumentoActaConst.data)
                    .input("estadoBE", sql.Bit, dataLogin.getEstado)
                    .input("terminadoBE", sql.Bit, dataLogin.getTerminado)
                    .execute('sp_insertSolicitation')
                // validación sobre la inserción del objeto
                return ( result.rowsAffected[0] > 0 ) ? true : false
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

    // Esta función se encarga de verificar los atributos del objeto solicitation 
    verifyAttributesSolicitation = (dataLogin) => {

        const idFuncionarioAplicativo = dataLogin.getFuncionarioAplicativo
        const idFuncionarioResponsable = dataLogin.getFuncionarioResponsable
        const idFuncionarioFinal = dataLogin.getFuncionarioFinal
        const fechaSolicitud = dataLogin.getFechaSolicitud
        const fechaInicio = dataLogin.getFechaIncio
        const fechaFin = dataLogin.getFechaFin
        const documentoActaConst = dataLogin.getDocumentoActaConst

        // Verificaciones de los diferentes atributos del objeto solicitation
        let verifyIdFuncionarioAplicativo = ( idFuncionarioAplicativo != null && this.validacionController.verifySpecialCharacters(parseInt(idFuncionarioAplicativo, 10)) && this.validacionController.verifyMinSize(parseInt(idFuncionarioAplicativo, 10), 1) && this.validacionController.verifyNumber(parseInt(idFuncionarioAplicativo, 10)) ) ? true : false
        
        let verifyIdFuncionarioResponsable = ( idFuncionarioResponsable != null && this.validacionController.verifySpecialCharacters(parseInt(idFuncionarioResponsable, 10)) && this.validacionController.verifyMinSize(parseInt(idFuncionarioResponsable, 10), 1) && this.validacionController.verifyNumber(parseInt(idFuncionarioResponsable, 10)) ) ? true : false
        
        let verifyIdFuncionarioFinal = ( idFuncionarioFinal != null && this.validacionController.verifySpecialCharacters(parseInt(idFuncionarioFinal, 10)) && this.validacionController.verifyMinSize(parseInt(idFuncionarioFinal, 10), 1) && this.validacionController.verifyNumber(parseInt(idFuncionarioFinal, 10)) ) ? true : false
        
        let verifyFechaSolicitud = ( fechaSolicitud != null && this.validacionController.verifySpecialCharacters(fechaSolicitud) && this.validacionController.verifyDateTime(fechaSolicitud) ) ? true : false
        
        let verifyFechaInicio = ( fechaInicio != null && this.validacionController.verifySpecialCharacters(fechaInicio) && this.validacionController.verifyDate(fechaInicio) ) ? true : false
        
        let verifyFechaFin = ( fechaFin != null && this.validacionController.verifySpecialCharacters(fechaFin) && this.validacionController.verifyDate(fechaFin) ) ? true : false
        
        let verifyDocumentoActaConst = ( documentoActaConst != null ) && this.validacionController.verifyExtDocument(documentoActaConst) ? true : false;
        
        return ( verifyIdFuncionarioAplicativo &&  verifyIdFuncionarioResponsable && verifyIdFuncionarioFinal && verifyFechaSolicitud && verifyFechaInicio && verifyFechaFin ) ? true : false
    }

    /* 
        Esta función se encarga de verificar si ya existe una solicitud con los campos que se le pasan por atributo a la función.
        Esto con el fin de evitar algún conflicto u error cuando dos o más usarios modifican al mismo tiempo. Por otra parte, si existe
        la solicitud con los mismos valores se cambia el estado a 1 para que sea visible si es que el método se llama cuando se 
        quiere insertar a la bd
    */
    verifySolicitation = async (dataLogin) => {

        let pool = null

        // Se llama al método que se encarga de verificar los atributos del objeto solicitation
        const verifyAtributes = this.verifyAttributesSolicitation(dataLogin)

        // Este if se encarga de llamar a las validaciones
        if ( verifyAtributes ) {

            try {
                // Conección a la base
                pool = await getConnection()
                // Parámetros de entrada del sp y ejecución del mismo
                const result = await pool.request()
                .input("idFuncionarioAplicativoBE", sql.SmallInt, dataLogin.getFuncionarioAplicativo)
                .input("idFuncionarioResponsableBE", sql.SmallInt, dataLogin.getFuncionarioResponsable)
                .input("idFuncionarioFinalBE", sql.SmallInt, dataLogin.getFuncionarioFinal)
                .input("fechaSolicitudBE", sql.SmallDateTime, dataLogin.getFechaSolicitud)
                .input("fechaInicioBE", sql.Date, dataLogin.getFechaIncio)
                .input("fechaFinBE", sql.Date, dataLogin.getFechaFin)
                .input("documentoActaConstBE", sql.VarBinary, dataLogin.getDocumentoActaConst.data)
                .input("estadoBE", sql.Bit, dataLogin.getEstado)
                .input("terminadoBE", sql.Bit, dataLogin.getTerminado)
                .execute('sp_verifySolicitation')
                // validación sobre la inserción del objeto
                return ( result.rowsAffected[0] > 0 ) ? true : false
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

    // Esta función recupera un objeto solicitud mediante el id
    recoverSolicitationById = async (idSolicitud, idFuncionarioAplicativo) => {
        
        let pool = null

        // Este if se encarga de llamar a las validaciones
        if ( idSolicitud != null && this.validacionController.verifyNumber(idSolicitud) && this.validacionController.verifySpecialCharacters(idSolicitud) && this.validacionController.verifyMinSize(idSolicitud)
            && idFuncionarioAplicativo != null && this.validacionController.verifyNumber(idFuncionarioAplicativo) && this.validacionController.verifySpecialCharacters(idFuncionarioAplicativo) && this.validacionController.verifyMinSize(idFuncionarioAplicativo) ) {

            try {
                // Conección a la base
                pool = await getConnection()
                // Parámetros de entrada y ejecución del sp
                const result = await pool.request()
                    .input("idFuncionarioAplicativoBE", sql.SmallInt, idFuncionarioAplicativo)
                    .input("idSolicitudBE", sql.SmallInt, idSolicitud)
                    .execute('sp_recoverSolicitationById')
                // Creación del objeto funcionario
                const solicitation = new Solicitation(
                    result.recordset[0].idSolicitud, 
                    result.recordset[0].idFuncionario_Aplicativo, 
                    result.recordset[0].idFuncionario_Responsable,
                    result.recordset[0].idFuncionario_Final, 
                    result.recordset[0].fechaSolicitud, 
                    result.recordset[0].fechaInicio, 
                    result.recordset[0].fechaFin, 
                    result.recordset[0].documentoActa,
                    result.recordset[0].estado, 
                    result.recordset[0].terminado)
                // validación sobre la inserción del objeto
                return ( result.recordset.length > 0) ? solicitation : false
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

    // Esta función se encarga de cambiar el estado 
    deleteSolicitation = async (idSolicitud, idFuncionarioAplicativo) => {
        
        let pool = null
        // Este if se encarga de llamar a las validaciones
        if ( idSolicitud != null && this.validacionController.verifyNumber(idSolicitud) && this.validacionController.verifySpecialCharacters(idSolicitud) && this.validacionController.verifyMinSize(idSolicitud)
            && idFuncionarioAplicativo != null && this.validacionController.verifyNumber(idFuncionarioAplicativo) && this.validacionController.verifySpecialCharacters(idFuncionarioAplicativo) && this.validacionController.verifyMinSize(idFuncionarioAplicativo) ) {

            try {
                // Conección a la base
                pool = await getConnection()
                // Parámetros de entrada y ejecución del sp
                const result = await pool.request()
                    .input("idFuncionarioAplicativoBE", sql.SmallInt, idFuncionarioAplicativo)
                    .input("idSolicitudBE", sql.SmallInt, idSolicitud)
                    .execute('sp_deleteSolicitation')
                // validación sobre la inserción del objeto
                return ( result.rowsAffected[0] > 0 ) ? true : false
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

    // Esta función se encarga de modificar la solicitud en la base de datos
    modifySolicitation = async (dataLogin) => {

        let pool = null
        const idSolicitud = parseInt(dataLogin.getIdSolicitud, 10)
        const terminado = parseInt(dataLogin.getTerminado, 10)
        // Se llama al método que se encarga de verificar los atributos del objeto solicitation
        const verifyAtributes = this.verifyAttributesSolicitation(dataLogin)

        if ( verifyAtributes && idSolicitud != null && this.validacionController.verifyNumber(idSolicitud) && this.validacionController.verifySpecialCharacters(idSolicitud) && this.validacionController.verifyMinSize(idSolicitud) 
           && terminado != null && this.validacionController.verifySpecialCharacters(terminado) && this.validacionController.verifyMinSize(terminado, 1) && this.validacionController.verifyNumber(terminado) ){
            
            try {
                // Conección a la base
                pool = await getConnection()
                // Parámetros de entrada y ejecución del sp
                const result = await pool.request()
                .input("idSolicitudBE", sql.SmallInt, idSolicitud)
                .input("idFuncionarioAplicativoBE", sql.SmallInt, dataLogin.getFuncionarioAplicativo)
                .input("idFuncionarioResponsableBE", sql.SmallInt, dataLogin.getFuncionarioResponsable)
                .input("idFuncionarioFinalBE", sql.SmallInt, dataLogin.getFuncionarioFinal)
                .input("fechaSolicitudBE", sql.SmallDateTime, dataLogin.getFechaSolicitud)
                .input("fechaInicioBE", sql.Date, dataLogin.getFechaIncio)
                .input("fechaFinBE", sql.Date, dataLogin.getFechaFin)
                .input("documentoActaConstBE", sql.VarBinary, dataLogin.getDocumentoActaConst.data)
                .input("estadoBE", sql.Bit, dataLogin.getEstado)
                .input("terminadoBE", sql.Bit, dataLogin.getTerminado)
                .execute('sp_modifySolicitation')
                // validación sobre la inserción del objeto
                return (result.rowsAffected[0] > 0) ? true : false
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
}

