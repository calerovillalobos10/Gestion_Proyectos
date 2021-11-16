// Importaciones necesarias
import { Router } from 'express'
import path from 'path'
import fileUpload from 'express-fileupload'
import LoginController from '../controllers/loginController'
import FileController from '../controllers/fileController'
import Advance from '../models/advance'
import AdvanceController from '../controllers/advanceController'

// Instancia
const router = Router()
const loginController = new LoginController()
const fileController = new FileController()
const advanceController = new AdvanceController()

// validaciones del fileUpload 
router.use(fileUpload({
    createParentPath: true,
    limits: {
        filesize: 1024
    },
}))

// Rutas de department

// Se encarga de comunicarse con el controller para insertar un funcionario
router.post('/advance', loginController.recuperarToken, loginController.verifyToken, fileController.upload, async (req, res) => {

    const advance = new advance(1, req.body.idSexo, req.body.idDepartamento, req.body.idTipoFuncionario, req.body.nombre, req.body.apellido_1, req.body.apellido_2, req.body.fechaNacimiento, req.body.correo, req.body.contrasenia, req.files.urlFoto.name, 1, 1, '')
    // Se llama al método del controller para que verifique si existe el funcionario en la bd y está con estado 0
    const verifyadvance = advanceController.verifyadvance(advance)
    const verifyEmailadvance = advanceController.verifyEmailadvance(req.body.correo)

    if ( (await verifyadvance) && (await !verifyEmailadvance) ) {

        res.json({
            "estado": true
        })
    } else if ( await !verifyEmailadvance ) {

        res.json({
            "mensaje": "No se pudo insertar el funcionario",
            "estado": false,
        })
    } else {
        // Se llama a la función inserta el departamento
        const verifyInsert = await advanceController.insertadvance(advance)

        if (verifyInsert) {
            // Se envía el secret al frontend
            res.json({
                "estado": true
            })
        } else {
            // Si sucede algún error se le notifica al frontend
            res.json({
                "mensaje": "No se pudo insertar el funcionario",
                "estado": false,
            })
        }
    }
})

// Se encarga de comunicarse con el controller para modificar un funcionario
router.put('/advance', loginController.recuperarToken, loginController.verifyToken, fileController.upload, async (req, res) => {

    let advance = null

    if( req.body.urlFoto != undefined ){
        
        advance = new advance(req.body.idFuncionario, req.body.idSexo, req.body.idDepartamento, req.body.idTipoFuncionario, req.body.nombre, req.body.apellido_1, req.body.apellido_2, req.body.fechaNacimiento, req.body.correo, req.body.contrasenia, req.body.urlFoto, 1, 1, '')
    } else {

        advance = new advance(req.body.idFuncionario, req.body.idSexo, req.body.idDepartamento, req.body.idTipoFuncionario, req.body.nombre, req.body.apellido_1, req.body.apellido_2, req.body.fechaNacimiento, req.body.correo, req.body.contrasenia, req.files.urlFoto.name, 1, 1, '')
    }
    
    const verifyModify = await advanceController.modifyadvance(advance)

    if (verifyModify) {
        // Se envía el secret al frontend
        res.json({
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo modificar el funcionario",
            "estado": false,
        })
    }
})

// Se comunica con el controller para aliminar un funcionario
router.post('/deleteadvance', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    // Se llama a la función que elimina el funcionario por el id
    const verifyDelete = await advanceController.deleteadvance(req.body.idFuncionario)

    if (verifyDelete) {

        // Se envía el secret al frontend
        res.json({
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo eliminar el funcionario",
            "estado": false,
        })
    }
})

// Se encarga de comunicarse con el controller para recuperar un listado de funcionarios
router.get('/advance', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
    // Se llama a la función recupera la lista
    const list = await advanceController.listadvance()

    if (list) {

        // Se envía el secret al frontend
        res.json({
            "list": list,
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo recuperar la lista de funcionarios",
            "estado": false,
        })
    }
})

// Se encarga de comunicarse con el controller para recuperar un objeto funcionario
router.post('/advanceById', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
   
    // Se llama a la función recupera el funcionario por el id
    const advance = await advanceController.recoveradvanceById(req.body.idFuncionario)
    console.log(advance);
    if (advance) {

        // Se envía el secret al frontend
        res.json({
            "advance": advance,
            "estado": true
        })
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo recuperar el funcionario",
            "estado": false,
        })
    }
})

export default router