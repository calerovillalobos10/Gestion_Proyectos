// Importaciones necesarias
import { Router } from 'express'
import LoginController from '../controllers/loginController'
import Solicitation from '../models/solicitation'
import SolicitationController from '../controllers/solicitationController'

// Instancia
const router = Router()
const loginController = new LoginController()
const solicitationController = new SolicitationController()

// Rutas de department
// Se encarga de comunicarse con el controller para insertar una solicitud
router.post('/solicitation', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    const solicitation = new Solicitation(1, req.token.id, +req.body.funcionarioResponsable, +req.body.funcionarioFinal, req.body.fechaSolicitud, req.body.fechaInicio, req.body.fechaFin, req.files.documento, 1, 0)
    
    // Se llama al método del controller para que verifique si existe la solicitud en la bd y está con estado 0
    const verifySolicitation = solicitationController.verifySolicitation(solicitation)

    if ( (await verifySolicitation) ) {

        res.json({
            "estado": true
        })
    } else {
        // Se llama a la función que inserta la solicitud
        const verifyInsert = await solicitationController.insertSolicitation(solicitation)

        if (verifyInsert) {
            // Se envía el secret al frontend
            res.json({
                "estado": true
            })
        } else {
            // Si sucede algún error se le notifica al frontend
            res.json({
                "mensaje": "No se pudo insertar la solicitud",
                "estado": false,
            })
        }
    }
})

// Se encarga de comunicarse con el controller para modificar una solicitud
router.put('/solicitation', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
    
    const solicitation = new Solicitation(req.body.idSolicitud, req.token.id, req.body.funcionarioResponsable, req.body.funcionarioFinal, req.body.fechaSolicitud, req.body.fechaInicio, req.body.fechaFin, req.files.documentoActaConst, 1, 0)
    // Se llama a la función que modifica la solicitud

    const verifyModify = await solicitationController.inputDataModifySolicitation(solicitation)
    console.log(2);
    if ( verifyModify )  {
        // Se envía el secret al frontend
        res.json({
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo modificar la solicitud",
            "estado": false,
        })
    }
})

// Se comunica con el controller para eliminar una soliciud
router.post('/deleteSolicitation', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    // Se llama a la función que elimina la solicitud por el id
    const verifyDelete = await solicitationController.deleteSolicitation(+req.body.idSolicitud, req.token.id)

    if (verifyDelete) {

        // Se envía el secret al frontend
        res.json({
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo eliminar la solicitud",
            "estado": false,
        })
    }
})

// Se comunica con el controller para finalizar una soliciud
router.post('/finishSolicitation', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    // Se llama a la función que finaliza la solicitud por el id
    const verifyFinish = await solicitationController.finishedSolicitation(+req.body.idSolicitud, req.token.id)

    if (verifyFinish) {

        // Se envía el secret al frontend
        res.json({
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo finalizar la solicitud",
            "estado": false,
        })
    }
})

// Se encarga de comunicarse con el controller para recuperar un listado de solicitudes
router.get('/solicitation', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
    // Se llama a la función recupera la lista

    const list = await solicitationController.listSolicitation(req.token.id)
    
    if (list) {

        // Se envía el secret al frontend
        res.json({
            "list": list,
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo recuperar la lista de solicitudes",
            "estado": false,
        })
    }
})

// Se encarga de comunicarse con el controller para recuperar un objeto solicitud
router.post('/solicitationById', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
   
    // Se llama a la función recupera el funcionario por el id
    const solicitation = await solicitationController.recoverDocumentSolicitationById(+req.body.idSolicitud, +req.token.id)
        
    if (solicitation) {

        // Se envía el secret al frontend
        res.json({
            "solicitation": solicitation,
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo recuperar la solicitud",
            "estado": false,
        })
    }
})

// Se encarga de comunicarse con el controller para recuperar un objeto solicitud
router.post('/documentSolicitationById', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
   
    // Se llama a la función recupera el funcionario por el id
    const document = await solicitationController.recoverDocumentById(+req.body.idSolicitud, +req.token.id)
        
    if (document) {

        // Se envía el secret al frontend
        res.json({
            "document": document,
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo recuperar el documento",
            "estado": false,
        })
    }
})

export default router