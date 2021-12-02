// Importaciones necesarias
import { getConnection, sql } from '../database/connection'
import ValidacionController from '../controllers/validationController'
import Advance from '../models/advance'
// TODO: hacer el método que recupera los avances relacionados a un id de solicitud
export default class AdvanceController{

    validacionController;

    // Constructor donde se inicializan las instancias
    constructor() {
        this.validacionController = new ValidacionController()
    }

    // Esta función obtiene una lista de avances de la base de datos
    listAdvance = async () => {

        let pool = null

        try {
            // Conección a la base
            pool = await getConnection()
            // Ejecución del sp
            const result = await pool.request().execute('sp_listAdvance')
            // Retorno del objeto con los parámetros que se ocupan en el frontend
            return result.recordset
        } catch (err) {
            console.log(err);
            return false
        } finally {
            // Cerrar la conexión
            pool.close()
        }
    }

    // Esta función obtiene una lista de avances que están relacionados al id de una solicitud desde la base de datos
    listAdvanceByIdSolicitation = async () => {

        let pool = null

        try {
            // Conección a la base
            pool = await getConnection()
            // Ejecución del sp
            const result = await pool.request().execute('sp_listAdvanceByIdSolicitation')
            // Retorno del objeto con los parámetros que se ocupan en el frontend
            return result.recordset
        } catch (err) {
            console.log(err);
            return false
        } finally {
            // Cerrar la conexión
            pool.close()
        }
    }
}

