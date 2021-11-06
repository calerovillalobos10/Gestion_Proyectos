// Importaciones necesarias
import { getConnection, sql } from '../database/connection'
import ValidacionController from '../controllers/validationController'
import Department from '../models/department'

export default class DeparmentController{

    validacionController;

    // Constructor vacío
    constructor() {

        this.validacionController = new ValidacionController()
    }

    // Esta función obtiene una lista de departamentos de la base de datos
    listDepartment = async () => {

        let pool = null
        let request = null

        try {
            // Conección a la base
            pool = await getConnection()
            request = pool.request()
            // Ejecución del sp
            const result = await request.execute('sp_listDepartment')
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
        let request = null
        let descripcionRes = dataLogin.descripcion

        // Este if se encarga de llamar a las validaciones
        if ( descripcionRes != null && this.validacionController.verifySpecialCharacters(descripcionRes) && this.validacionController.verifyMinSize(descripcionRes, 2)
            && this.validacionController.verifyMaxSize(descripcionRes, 30) ) {

            try {
                // Conección a la base
                pool = await getConnection()
                request = pool.request()
                // Parámetros de entrada y salida del sp
                request.input("descripcionBE", sql.VarChar(30), descripcionRes)
                // Ejecución del sp
                const result = await request.execute('sp_insertDepartment')
                // validación sobre la inserción del objeto
                return (result) ? true : false
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
        let request = null
        let idDepartmentRes = dataLogin.id

        // Este if se encarga de llamar a las validaciones
        if ( idDepartmentRes != null && this.validacionController.verifyNumber(idDepartmentRes) && this.validacionController.verifySpecialCharacters(idDepartmentRes) ) {

            try {
                // Conección a la base
                pool = await getConnection()
                request = pool.request()
                // Parámetros de entrada y salida del sp
                request.input("idDepartmentBE", sql.Int, idDepartmentRes)
                // Ejecución del sp
                const result = await request.execute('sp_deleteDepartment')
                // validación sobre la inserción del objeto
                return (result) ? true : false
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
        let request = null
        let idDepartamentoRes = dataLogin.id
        let descripcionRes = dataLogin.descripcion

        // Este if se encarga de llamar a las validaciones
        if ( descripcionRes != null && this.validacionController.verifySpecialCharacters(descripcionRes) && this.validacionController.verifyMinSize(descripcionRes, 2)
            && this.validacionController.verifyMaxSize(descripcionRes, 30) ) {

            try {
                // Conección a la base
                pool = await getConnection()
                request = pool.request()
                // Parámetros de entrada y salida del sp
                request.input("idDepartamentoBE", sql.Int, idDepartamentoRes)
                request.input("descripcionBE", sql.VarChar(30), descripcionRes)
                // Ejecución del sp
                const result = await request.execute('sp_modifyDepartment')
                // validación sobre la inserción del objeto
                return (result) ? true : false
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
        let request = null
        let idDepartmentRes = dataLogin.id

        // Este if se encarga de llamar a las validaciones
        if ( idDepartmentRes != null && this.validacionController.verifyNumber(idDepartmentRes) && this.validacionController.verifySpecialCharacters(idDepartmentRes) ) {

            try {
                // Conección a la base
                pool = await getConnection()
                request = pool.request()
                // Parámetros de entrada y salida del sp
                request.input("idDepartamentoBE", sql.Int, idDepartmentRes)
                // Ejecución del sp
                const result = await request.execute('sp_recoverDepartmentId')
                // Creación del objeto departamento
                const departamento = new Department(result.recordset[0].idDepartamento, result.recordset[0].descripcion, result.recordset[0].estado)
                // validación sobre la inserción del objeto
                return ( result ) ? departamento : false
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
        let request = null

        // Este if se encarga de llamar a las validaciones
        if ( idDepartmentRes != null && this.validacionController.verifySpecialCharacters(idDepartmentRes) && verifyText(description) ) {

            try {
                // Conección a la base
                pool = await getConnection()
                request = pool.request()
                // Parámetros de entrada y salida del sp
                request.input("descripcionBE", sql.VarChar(30), description)
                // Ejecución del sp
                const result = await request.execute('sp_verifyDepartment')
                // validación sobre la inserción del objeto
                return ( result ) ? {mensaje:'El departamento ingresado ya existe', estado: false} : {estado: true}
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
}