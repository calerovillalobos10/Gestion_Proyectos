// Importaciones necesarias
import { Router } from 'express';
import LoginController from '../controllers/loginController';
import Advance from '../models/advance';
import AdvanceController from '../controllers/advanceController';

// Instancia
const router = Router(),
      loginController = new LoginController(),
      advanceController = new AdvanceController();

// Rutas de advance
// Se encarga de comunicarse con el controller para insertar un avance
router.post('/advance', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
    
    const advance = new Advance(1, req.body.idTrimestre, req.body.idFuncionario_Aplicativo, req.body.idSolicitud, req.body.fechaAvance, req.files.documento, 1),
    // Se llama al método del controller para que verifique si existe el avance en la bd y está con estado 0
          verifyAdvance = advanceController.verifyAdvance(advance);
    
    if ( (await verifyAdvance) ) {

        res.json({
            "estado": true
        });
    } else {
        // Se llama a la función que inserta el avance
        const verifyInsert = await advanceController.insertAdvance(advance);

        if (verifyInsert) {
            // Se envía el secret al frontend
            res.json({
                "estado": true
            });
        } else {
            // Si sucede algún error se le notifica al frontend
            res.json({
                "mensaje": "No se pudo insertar el avance",
                "estado": false,
            });
        }
    }
});

// Se encarga de comunicarse con el controller para modificar un avance
router.put('/advance', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
   
    const advance = new Advance(req.body.idAvance, req.body.idTrimestre, req.body.idFuncionario_Aplicativo, req.body.idSolicitud, req.body.fechaAvance, req.files?.documento, 1),
    // Se llama a la función que modifica el avance
          verifyModify = await advanceController.inputDataModifyAdvance(advance);
   
    if ( verifyModify )  {
        
        // Se envía el secret al frontend
        res.json({
            "estado": true
        });
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo modificar el avance",
            "estado": false,
        });
    }
});

// Se comunica con el controller para eliminar un avance
router.post('/deleteAdvance', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    // Se llama a la función que elimina el avance por el id
    const verifyDelete = await advanceController.deleteAdvance(+req.body.idAvance, req.token.id);

    if (verifyDelete) {
        // Se envía el secret al frontend
        res.json({
            "estado": true
        });
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo eliminar el avance",
            "estado": false,
        });
    }
});

// Se encarga de comunicarse con el controller para recuperar un listado de avances
router.get('/advance', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
    // Se llama a la función recupera la lista
    const list = await advanceController.listAdvance(req.token.id);

    if (list) {
        // Se envía el secret al frontend
        res.json({
            "list": list,
            "estado": true
        });
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo recuperar la lista de avances",
            "estado": false,
        });
    }
});

// Se encarga de comunicarse con el controller para recuperar un objeto avance
router.post('/advanceById', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
   
    // Se llama a la función recupera el funcionario por el id
    const advance = await advanceController.recoverAdvanceById(+req.body.idAvance, req.token.id);

    if (advance) {
        // Se envía el secret al frontend
        res.json({
            "advance": advance,
            "estado": true
        });
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo recuperar el avance",
            "estado": false,
        });
    }
});

// Se encarga de comunicarse con el controller para recuperar un documento del avance
router.post('/documentAdvanceById', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
   
    // Se llama a la función recupera el documento por el id
    const document = await advanceController.recoverDocumentAdvanceById(+req.body.idAvance, req.token.id);

    if (document) {
        // Se envía el secret al frontend
        res.json({
            "document": document,
            "estado": true
        });
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo recuperar el documento",
            "estado": false,
        });
    }
});

export default router;