// Importaciones necesarias
import { getConnection, sql } from '../database/connection';
import ValidacionController from '../controllers/validationController';
import Advance from '../models/advance';

export default class AdvanceController{

    validacionController;

    // Constructor donde se inicializan las instancias
    constructor() {
        this.validacionController = new ValidacionController();
    }

    // Esta función obtiene una lista de avances de la base de datos
    listAdvance = async (idFuncionarioAplicativo) => {

        let pool = null;

        if ( idFuncionarioAplicativo != null && this.validacionController.verifyNumber(idFuncionarioAplicativo) && this.validacionController.verifySpecialCharacters(idFuncionarioAplicativo) && this.validacionController.verifyMinSize(idFuncionarioAplicativo) ) {
            
            try {
                // Conección a la base
                pool = await getConnection();
                // Ejecución del sp
                const result = await pool.request()
                .input("idFuncionarioAplicativoBE", sql.SmallInt, idFuncionarioAplicativo)
                .execute('sp_listAdvance');
                // Retorno del objeto con los parámetros que se ocupan en el frontend
                return result.recordset;
            } catch (err) {
                console.log(err);
                return false;
            } finally {
                // Cerrar la conexión
                pool.close();
            }
        } else {
            console.log('Falló el proceso de validación de datos');
            return false;
        }  
    }

    // Esta función se encarga de enviar los parámetros del objeto avance a la base de datos para que sean insertados
    insertAdvance = async (dataLogin) => {

        let pool = null;
        // Se llama al método que se encarga de verificar los atributos del objeto avance
        const verifyAtributes = this.verifyAttributesAdvance(dataLogin);
        // Este if se encarga de llamar a las validaciones
        if ( verifyAtributes && dataLogin.getDocumento != null && this.validacionController.verifyExtDocument(dataLogin.getDocumento) ) {

            try {
                // Conección a la base
                pool = await getConnection();
                // Parámetros de entrada y salida del sp y ejecución del mismo
                const result = await pool.request()
                    .input("idTrimestreBE", sql.TinyInt, parseInt(dataLogin.getTrimestre,10))
                    .input("idFuncionarioAplicativoBE", sql.SmallInt, parseInt(dataLogin.getFuncionarioAplicativo, 10))
                    .input("idSolicitudBE", sql.SmallInt, parseInt(dataLogin.getIdSolicitud, 10))
                    .input("fechaAvanceBE", sql.SmallDateTime, dataLogin.getFechaAvance)
                    .input("documentoBE", sql.VarBinary, dataLogin.getDocumento.data)
                    .input("estadoBE", sql.Bit, dataLogin.getEstado)
                    .execute('sp_insertAdvance');
                // validación sobre la inserción del objeto
                return ( result.rowsAffected[0] > 0 ) ? true : false;
            } catch (err) {
                console.log(err);
                return false;
            } finally {
                // Cerrar la conexión
                pool.close();
            }
        } else {
            console.log('Falló el proceso de validación de datos');
            return false;
        }
    }

    // Esta función se encarga de verificar los atributos del objeto avance 
    verifyAttributesAdvance = (dataLogin) => {
        
        const idTrimestre = dataLogin.getTrimestre,
              idFuncionarioAplicativo = dataLogin.getFuncionarioAplicativo,
              idSolicitud = dataLogin.getIdSolicitud,
              fechaAvance = dataLogin.getFechaAvance;

        // Verificaciones de los diferentes atributos del objeto avance
        let verifyIdTrimestre = ( idTrimestre != null && this.validacionController.verifySpecialCharacters(parseInt(idTrimestre, 10)) && this.validacionController.verifyMinSize(parseInt(idTrimestre, 10), 1) && this.validacionController.verifyNumber(parseInt(idTrimestre, 10)) ) ? true : false,
        
            verifyIdFuncionarioAplicativo = ( idFuncionarioAplicativo != null && this.validacionController.verifySpecialCharacters(parseInt(idFuncionarioAplicativo, 10)) && this.validacionController.verifyMinSize(parseInt(idFuncionarioAplicativo, 10), 1) && this.validacionController.verifyNumber(parseInt(idFuncionarioAplicativo, 10)) ) ? true : false,
        
            verifyIdSolicitud = ( idSolicitud != null && this.validacionController.verifySpecialCharacters(parseInt(idSolicitud, 10)) && this.validacionController.verifyMinSize(parseInt(idSolicitud, 10), 1) && this.validacionController.verifyNumber(parseInt(idSolicitud, 10)) ) ? true : false,
        
            verifyFechaAvance = ( fechaAvance != null && this.validacionController.verifySpecialCharacters(fechaAvance) && this.validacionController.verifyDate(fechaAvance) ) ? true : false;
        
        return ( verifyIdTrimestre && verifyIdFuncionarioAplicativo && verifyIdSolicitud && verifyFechaAvance ) ? true : false;
    }

    /* 
        Esta función se encarga de verificar si ya existe un avance con los campos que se le pasan por atributo a la función.
        Esto con el fin de evitar algún conflicto u error cuando dos o más usarios modifican al mismo tiempo. Por otra parte, si existe
        el avance con los mismos valores se cambia el estado a 1 para que sea visible si es que el método se llama cuando se 
        quiere insertar a la bd
    */
    verifyAdvance = async (dataLogin) => {

        let pool = null;
        // Se llama al método que se encarga de verificar los atributos del objeto avance
        const verifyAtributes = this.verifyAttributesAdvance(dataLogin);
        // Este if se encarga de llamar a las validaciones
        if ( verifyAtributes ) {

            try {
                // Conección a la base
                pool = await getConnection();
                // Parámetros de entrada del sp y ejecución del mismo
                const result = await pool.request()
                .input("idTrimestreBE", sql.TinyInt, parseInt(dataLogin.getTrimestre, 10))
                .input("idFuncionarioAplicativoBE", sql.SmallInt, parseInt(dataLogin.getFuncionarioAplicativo, 10))
                .input("idSolicitudBE", sql.SmallInt, parseInt(dataLogin.getTrimestre, 10))
                .input("fechaAvanceBE", sql.SmallDateTime, dataLogin.getFechaSolicitud)
                .input("documentoBE", sql.VarBinary, dataLogin.getDocumento.data)
                .input("estadoBE", sql.Bit, dataLogin.getEstado)
                .execute('sp_verifyAdvance');
                // validación sobre la inserción del objeto
                return ( result.rowsAffected[0] > 0 ) ? true : false;
            } catch (err) {
                console.log(err);
                return false;
            } finally {
                // Cerrar la conexión
                pool.close();
            }
        } else {
            console.log('Falló el proceso de validación de datos');
            return false;
        }
    }

    // Esta función recupera un objeto avance mediante el id
    recoverAdvanceById = async (idAvance, idFuncionarioAplicativo) => {
        
        let pool = null;
        // Este if se encarga de llamar a las validaciones
        if ( idAvance != null && this.validacionController.verifyNumber(idAvance) && this.validacionController.verifySpecialCharacters(idAvance) && this.validacionController.verifyMinSize(idAvance)
            && idFuncionarioAplicativo != null && this.validacionController.verifyNumber(idFuncionarioAplicativo) && this.validacionController.verifySpecialCharacters(idFuncionarioAplicativo) && this.validacionController.verifyMinSize(idFuncionarioAplicativo) ) {

            try {
                // Conección a la base
                pool = await getConnection();
                // Parámetros de entrada y ejecución del sp
                const result = await pool.request()
                    .input("idFuncionarioAplicativoBE", sql.SmallInt, idFuncionarioAplicativo)
                    .input("idAvanceBE", sql.TinyInt, idAvance)
                    .execute('sp_recoverAdvanceById'),
                // Creación del objeto avance
                advance = new Advance(
                    result.recordset[0].idAvance, 
                    result.recordset[0].idTrimestre, 
                    result.recordset[0].idFuncionario_Aplicativo,
                    result.recordset[0].idSolicitud, 
                    result.recordset[0].fechaAvance, 
                    result.recordset[0].documento,
                    result.recordset[0].estado);
                // validación sobre la inserción del objeto
                return ( result.recordset.length > 0) ? advance : false;
            } catch (err) {
                console.log(err);
                return false;
            } finally {
                // Cerrar la conexión
                pool.close();
            }
        } else {
            console.log('Falló el proceso de validación de datos');
            return false;
        }
    }

    // Esta función recupera un documento del avance mediante el id
    recoverDocumentAdvanceById = async (idAvance, idFuncionarioAplicativo) => {
        
        let pool = null;
        // Este if se encarga de llamar a las validaciones
        if ( idAvance != null && this.validacionController.verifyNumber(idAvance) && this.validacionController.verifySpecialCharacters(idAvance) && this.validacionController.verifyMinSize(idAvance)
            && idFuncionarioAplicativo != null && this.validacionController.verifyNumber(idFuncionarioAplicativo) && this.validacionController.verifySpecialCharacters(idFuncionarioAplicativo) && this.validacionController.verifyMinSize(idFuncionarioAplicativo) ) {

            try {
                // Conección a la base
                pool = await getConnection();
                // Parámetros de entrada y ejecución del sp
                const result = await pool.request()
                    .input("idFuncionarioAplicativoBE", sql.SmallInt, idFuncionarioAplicativo)
                    .input("idAvanceBE", sql.TinyInt, idAvance)
                    .execute('sp_recoverDocumentAdvanceById');
                // validación sobre la recuperación del objeto
                return ( result.recordset.length > 0) ? result.recordset[0].documento : false;
            } catch (err) {
                console.log(err);
                return false;
            } finally {
                // Cerrar la conexión
                pool.close();
            }
        } else {
            console.log('Falló el proceso de validación de datos');
            return false;
        }
    }

    // Esta función se encarga de cambiar el estado 
    deleteAdvance = async (idAvance, idFuncionarioAplicativo) => {
        
        let pool = null;
        // Este if se encarga de llamar a las validaciones
        if ( idAvance != null && this.validacionController.verifyNumber(idAvance) && this.validacionController.verifySpecialCharacters(idAvance) && this.validacionController.verifyMinSize(idAvance)
            && idFuncionarioAplicativo != null && this.validacionController.verifyNumber(idFuncionarioAplicativo) && this.validacionController.verifySpecialCharacters(idFuncionarioAplicativo) && this.validacionController.verifyMinSize(idFuncionarioAplicativo) ) {

            try {
                // Conección a la base
                pool = await getConnection();
                // Parámetros de entrada y ejecución del sp
                const result = await pool.request()
                    .input("idFuncionarioAplicativoBE", sql.SmallInt, idFuncionarioAplicativo)
                    .input("idAvanceBE", sql.TinyInt, idAvance)
                    .execute('sp_deleteAdvance');
                // validación sobre la inserción del objeto
                return ( result.rowsAffected[0] > 0 ) ? true : false;
            } catch (err) {
                console.log(err);
                return false;
            } finally {
                // Cerrar la conexión
                pool.close();
            }
        } else {
            console.log('Falló el proceso de validación de datos');
            return false;
        }
    }

    // Esta función se encarga de modificar el avance en la base de datos
    modifyAdvance = async (dataLogin, inputData, sp) => {

        let pool = null;
        const idAvance = parseInt(dataLogin.getIdAvance, 10),
        // Se llama al método que se encarga de verificar los atributos del objeto avance
        verifyAtributes = this.verifyAttributesAdvance(dataLogin);
        
        if ( verifyAtributes && dataLogin.idAvance != null && this.validacionController.verifyNumber(idAvance) && this.validacionController.verifySpecialCharacters(idAvance) && this.validacionController.verifyMinSize(idAvance) ){
          
            try {
                // Conección a la base
                pool = await getConnection();
                // Parámetros de entrada y ejecución del sp
                const request = pool.request();
                inputData.forEach( field => request.input( field.name, field.type, field.data) );
                const result = await request.execute(sp);
                // validación sobre la inserción del objeto

                console.log(result);

                return (result.rowsAffected[0] > 0) ? true : false;
            } catch (err) {
                console.log(err);
                return false;
            } finally {
                // Cerrar la conexión
                pool.close();
            }
        } else {
            console.log('Falló el proceso de validación de datos');
            return false;
        }
    }

    // Este método se encarga de crear los inputs que necesita el sp de modificar avance
    inputDataModifyAdvance = async (dataLogin) => {
        
        const inputData = [
            { name: "idAvanceBE", type: sql.TinyInt, data: parseInt(dataLogin.getIdAvance, 10) },
            { name: "idTrimestreBE", type: sql.TinyInt, data: parseInt(dataLogin.getTrimestre, 10) },
            { name: "idFuncionarioAplicativoBE", type: sql.SmallInt, data: parseInt(dataLogin.getFuncionarioAplicativo, 10) },
            { name: "idSolicitudBE", type: sql.SmallInt, data: parseInt(dataLogin.getIdSolicitud, 10) },
            { name: "fechaAvanceBE", type: sql.SmallDateTime, data: dataLogin.getFechaAvance },
            { name: "estadoBE", type: sql.Bit, data: dataLogin.getEstado }
        ];

        let sp = 'sp_modifyAdvance';
        // Si el documento está nulo llama a un sp donde se modifica el avance sin modificar el docuemnto
        ( dataLogin.getDocumento != null ) ? inputData.push({ name: "documentoBE", type: sql.VarBinary, data: dataLogin.getDocumento.data }) : sp = 'sp_modifyAdvanceWithoutDocument';
        // Se llama a la función que modifica el avance
        return await this.modifyAdvance(dataLogin, inputData, sp);
    }
}

