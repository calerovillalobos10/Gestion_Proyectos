// Importaciones necesarias
import { getConnection, sql } from '../database/connection';

export default class BinnacleController{

    // Constructor vacío
    constructor(){}

    // Esta función obtiene una lista de bitácoras de la base de datos
    listBinnacle = async () => {

        let pool = null;

        try {
            // Conección a la base
            pool = await getConnection();
            // Ejecución del sp
            const result = await pool.request().execute('sp_listBinnacle');
            // Retorno del objeto con los parámetros que se ocupan en el frontend
            return result.recordset;
        } catch (err) {
            console.log(err);
            return false;
        } finally {
            // Cerrar la conexión
            pool.close();
        }
    }
}