// Importaciones necesarias
import { getConnection, sql } from '../database/connection'
import ValidacionController from '../controllers/validationController'
import Department from '../models/department'

export default class DeparmentController{

    validacionController;

    // Constructor donde se inicializan las instancias
    constructor() {
        this.validacionController = new ValidacionController()
    }

    // Esta función obtiene una lista de departamentos de la base de datos
    listDepartment = async () => {

        let pool = null

        try {
            // Conección a la base
            pool = await getConnection()
            // Ejecución del sp
            const result = await pool.request().execute('sp_listDepartment')
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

    // Esta función se encarga de enviar una descripción del departamento a la base de datos para que sea insertada
    insertDepartment = async (dataLogin) => {
        
        let pool = null
        let descripcionRes = dataLogin.descripcion

        // Este if se encarga de llamar a las validaciones
        if ( descripcionRes != null && this.validacionController.verifySpecialCharacters(descripcionRes) && this.validacionController.verifyMinSize(descripcionRes, 2)
            && this.validacionController.verifyMaxSize(descripcionRes, 30) ) {

            try {
                // Conección a la base
                pool = await getConnection()
                // Parámetros de entrada y salida del sp y ejecución del mismo
                const result = await pool.request()
                .input("descripcionBE", sql.VarChar(30), descripcionRes)
                .execute('sp_insertDepartment')
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

    // Esta función se encarga de cambiar el estado 
    deleteDepartment = async (dataLogin) => {
        
        let pool = null
        let idDepartmentRes = dataLogin.id

        // Este if se encarga de llamar a las validaciones
        if ( idDepartmentRes != null && this.validacionController.verifyNumber(idDepartmentRes) && this.validacionController.verifySpecialCharacters(idDepartmentRes) ) {

            try {
                // Conección a la base
                pool = await getConnection()
                // Parámetros de entrada y salida del sp y ejecución del mismo
                const result = await pool.request()
                .input("idDepartmentBE", sql.Int, idDepartmentRes)
                .execute('sp_deleteDepartment')
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

    // Esta función se encarga de enviar una descripción del departamento a la base de datos para que sea modificada
    modifyDepartment = async (dataLogin) => {
        
        let pool = null
        let idDepartamentoRes = dataLogin.getIdDepartamento
        let descripcionRes = dataLogin.getDescripcion

        // Este if se encarga de llamar a las validaciones
        if ( descripcionRes != null && this.validacionController.verifySpecialCharacters(descripcionRes)  && this.validacionController.verifyMinSize(descripcionRes, 2)
        && this.validacionController.verifyMaxSize(descripcionRes, 30) && idDepartamentoRes != null ) {

            try {
                // Conección a la base
                pool = await getConnection()
                // Parámetros de entrada y salida del sp y ejecución del mismo
                const result = await pool.request()
                .input("idDepartamentoBE", sql.Int, idDepartamentoRes)
                .input("descripcionBE", sql.VarChar(30), descripcionRes)
                .execute('sp_modifyDepartment')
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

    // Esta función recupera un objeto departamento mediante el id
    recoverDepartmentId = async (dataLogin) => {
        
        let pool = null
        let idDepartmentRes = dataLogin.id

        // Este if se encarga de llamar a las validaciones
        if ( idDepartmentRes != null && this.validacionController.verifyNumber(idDepartmentRes) && this.validacionController.verifySpecialCharacters(idDepartmentRes) ) {

            try {
                // Conección a la base
                pool = await getConnection()
                // Parámetros de entrada y salida del sp y ejecución del mismo
                const result = await pool.request()
                .input("idDepartamentoBE", sql.Int, idDepartmentRes)
                .execute('sp_recoverDepartmentId')
                // Creación del objeto departamento
                const departamento = new Department(result.recordset[0].idDepartamento, result.recordset[0].descripcion, result.recordset[0].estado)
                // validación sobre la inserción del objeto
                return ( result.recordset.length > 0) ? departamento : false
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

    // Esta función se encarga de verificar que no exista la misma descripción del departamento en la base de datos
    verifyDepartment = async (description) => {

        let pool = null

        // Este if se encarga de llamar a las validaciones
        if ( description != null && this.validacionController.verifySpecialCharacters(description) && this.validacionController.verifyText(description) ) {

            try {
                // Conección a la base
                pool = await getConnection()
                // Parámetros de entrada y salida del sp y ejecución del mismo
                const result = await pool.request()
                .input("descripcionBE", sql.VarChar(30), description)
                .execute('sp_verifyDepartment')
                // validación sobre la inserción del objeto
                return ( result.rowsAffected[0] > 0 ) ? {mensaje:'Se ingresó correctamente el departamento', estado: false} : {estado: true}
            } catch (err) {
                console.log(err);
                return {
                    mensaje: 'Ocurrió un error en el servidor',
                    estado: false
                }
            } finally {
                // Cerrar la conexión
                pool.close()
            }
        } else {
            console.log('Falló el proceso de validación de datos');
            return {
                mensaje: 'Por favor ingrese los datos correctamente',
                estado: false
            }
        }
    }

    // Esta función verifica si el departamento está relacionado con uno o más funcionarios, para permitir o no hacer la eliminación lógica
    verifyDeleteDepartment = async (dataLogin) => {

        let pool = null
        let idDepartmentRes = dataLogin.id

        // Este if se encarga de llamar a las validaciones
        if ( idDepartmentRes != null && this.validacionController.verifyNumber(idDepartmentRes) && this.validacionController.verifySpecialCharacters(idDepartmentRes) ) {
            
            try {
                // Conección a la base
                pool = await getConnection()
                // Parámetros de entrada y salida del sp y ejecución del mismo
                const result = await pool.request()
                .input("idDepartmentBE", sql.Int, idDepartmentRes)
                .execute('sp_verifyDeleteDepartment')
                console.log(result);
                return ( result.recordset.length > 0 ) ? false : true
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