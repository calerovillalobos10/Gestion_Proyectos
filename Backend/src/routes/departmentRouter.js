// Importaciones necesarias
import {Router} from 'express'
import LoginController from '../controllers/loginController'
import Department from '../models/department'
import DepartmentController from '../controllers/departmentController'

// Instancia
const router = Router()
const loginController = new LoginController()
const departmentController = new DepartmentController()

// Rutas de department

// Se encarga de comunicarse con el controller para insertar un departamento
router.post('/department', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    const verifyDepartment = departmentController.verifyDepartment(req.body.descripcion)

    // Valida si ya existe un departamento con esa descripción
    if ( (await verifyDepartment).estado ) {
        // Se llama a la función inserta el departamento
        const verifyInsert = await departmentController.insertDepartment(req.body)

        if (verifyInsert) {

            // Se envía el secret al frontend
            res.json({
                "estado": true
            })
        } else {
            // Si sucede algún error se le notifica al frontend
            res.json({
                "mensaje": "No se pudo insertar el departamento",
                "estado": false,
            })
        }
    } else {

        res.json({
            "mensaje": (await verifyDepartment).mensaje,
            /* 
                Se pone en true porque se actualiza el estado del departamento (como ya existe) en la base de datos y 
                se interpreta como que si hubiera realizado la inserción
            */
            "estado": true, 
        })
    }
})

// Se encarga de comunicarse con el controller para recuperar un listado de departamentos
router.get('/listDepartment', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    // Se llama a la función recupera la lista
    const list = await departmentController.listDepartment()

    if (list) {

        // Se envía el secret al frontend
        res.json({
            "list": list,
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo recuperar la lista de departamentos",
            "estado": false,
        })
    }
})

// Se encarga de comunicarse con el controller para recuperar un objeto departamento
router.post('/departmentById', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    // Se llama a la función recupera el departamento por el id
    const department = await departmentController.recoverDepartmentId(req.body)

    if (department) {

        // Se envía el secret al frontend
        res.json({
            "department": department,
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo recuperar el departamento",
            "estado": false,
        })
    }
})

// Se encarga de comunicarse con el controller para eliminar un departamento
router.post('/deleteDepartment', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    // Se llama a la función elimina el departamento por el id
    const verifyDelete = await departmentController.deleteDepartment(req.body)

    if (verifyDelete) {

        // Se envía el secret al frontend
        res.json({
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo eliminar el departamento",
            "estado": false,
        })
    }
})

// Se encarga de comunicarse con el controller para modificar un departamento
router.put('/department', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    // Se llama a la función modifica el departamento por el id
    const departament = new Department(req.body.id, req.body.descripcion, 1)
    const verifyModify = await departmentController.modifyDepartment(departament)

    if (verifyModify) {

        // Se envía el secret al frontend
        res.json({
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo modificar el departamento",
            "estado": false,
        })
    }
})

export default router