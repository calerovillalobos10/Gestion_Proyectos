// Importaciones necesarias
import { Router } from 'express'
import LoginController from '../controllers/loginController'
import Advance from '../models/advance'
import AdvanceController from '../controllers/advanceController'

// Instancia
const router = Router()
const loginController = new LoginController()
const advanceController = new AdvanceController()

// Rutas de department
// Se encarga de comunicarse con el controller para insertar un avance
router.post('/advance', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    const advance = new Advance(1, req.body.idTrimestre, req.body.idFuncionario_Aplciativo, req.body.idSolicitud, req.body.fechaAvance, req.files.documento, 1)
    // Se llama al método del controller para que verifique si existe el avance en la bd y está con estado 0
    const verifyAdvance = advanceController.verifyAdvance(advance)

    if ( (await verifyAdvance) ) {

        res.json({
            "estado": true
        })
    } else {
        // Se llama a la función que inserta el avance
        const verifyInsert = await advanceController.insertAdvance(advance)

        if (verifyInsert) {
            // Se envía el secret al frontend
            res.json({
                "estado": true
            })
        } else {
            // Si sucede algún error se le notifica al frontend
            res.json({
                "mensaje": "No se pudo insertar el avance",
                "estado": false,
            })
        }
    }
})

// Se encarga de comunicarse con el controller para modificar un avance
router.put('/advance', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    const advance = new Advance(req.body.idAvance, req.body.idTrimestre, req.body.idFuncionario_Aplciativo, req.body.idSolicitud, req.body.fechaAvance, req.files.documento, 1)
    // Se llama a la función que modifica el avance
    const verifyModify = await advanceController.modifyAdvance(advance)

    if ( verifyModify )  {
        // Se envía el secret al frontend
        res.json({
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo modificar el avance",
            "estado": false,
        })
    }
})

// Se comunica con el controller para eliminar un avance
router.post('/deleteAdvance', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    // Se llama a la función que elimina el avance por el id
    const verifyDelete = await advanceController.deleteAdvance(req.body.idAvance, req.body.idFuncionario_Aplicativo)

    if (verifyDelete) {

        // Se envía el secret al frontend
        res.json({
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo eliminar el avance",
            "estado": false,
        })
    }
})

// Se encarga de comunicarse con el controller para recuperar un listado de avances
router.get('/advance', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
    // Se llama a la función recupera la lista
    const list = await advanceController.listAdvance(req.body.idFuncionario_Aplicativo)

    if (list) {

        // Se envía el secret al frontend
        res.json({
            "list": list,
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo recuperar la lista de avances",
            "estado": false,
        })
    }
})

// Se encarga de comunicarse con el controller para recuperar un objeto avance
router.post('/advanceById', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
   
    // Se llama a la función recupera el funcionario por el id
    const advance = await advanceController.recoverAdvanceById(req.body.idAvance, req.body.idFuncionario_Aplicativo)

    if (advance) {

        // Se envía el secret al frontend
        res.json({
            "advance": advance,
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo recuperar el avance",
            "estado": false,
        })
    }
})

export default router