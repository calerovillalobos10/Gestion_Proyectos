// Importaciones necesarias
import {Router} from 'express'
import Department from '../models/department'
import DepartmentController from '../controllers/departmentController'

// Instancia
const router = Router()
const departmentController = new DepartmentController()

// Rutas de department

// Se encarga de comunicarse con el controller para insertar un departamento
router.post('/department', async (req, res) => {

    const verifyDepartment = departmentController.verifyDepartment(req.body.descripcion)

    // Valida si ya existe un departamento con esa descripción
    if ( (await verifyDepartment).estado ) {
        // Se llama a la función inserta el departamento
        const verifyInsert = departmentController.modifyDepartmentId(req.body)

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
            "estado": (await verifyDepartment).estado,
        })
    }
})

// Se encarga de comunicarse con el controller para recuperar un listado de departamentos
router.get('/listDepartment', async (req, res) => {

    // Se llama a la función recupera la lista
    const list = departmentController.listDepartment()

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
router.get('/department', async (req, res) => {

    // Se llama a la función recupera el departamento por el id
    const department = departmentController.recoverDepartmentId(req.body)

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
router.delete('/department', async (req, res) => {

    // Se llama a la función elimina el departamento por el id
    const verifyDelete = departmentController.deleteDepartmentId(req.body)

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
router.put('/department', async (req, res) => {

    // Se llama a la función modifica el departamento por el id
    const departament = new Department(req.body.id, req.body.descripcion, req.body.estado)
    const verifyModify = departmentController.modifyDepartmentId(departament)

    if (verifyModify) {

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

export default router