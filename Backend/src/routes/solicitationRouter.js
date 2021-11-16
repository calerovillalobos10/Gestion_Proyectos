// Importaciones necesarias
import { Router } from 'express'
import path from 'path'
import fileUpload from 'express-fileupload'
import LoginController from '../controllers/loginController'
import FileController from '../controllers/fileController'
import Solicitation from '../models/solicitation'
import SolicitationController from '../controllers/solicitationController'

// Instancia
const router = Router()
const loginController = new LoginController()
const fileController = new FileController()
const solicitationController = new SolicitationController()

// validaciones del fileUpload 
router.use(fileUpload({
    createParentPath: true,
    limits: {
        filesize: 1024
    },
}))

// Rutas de department

// Se encarga de comunicarse con el controller para insertar un funcionario
router.post('/solicitation', loginController.recuperarToken, loginController.verifyToken, fileController.upload, async (req, res) => {

    const solicitation = new solicitation(1, req.body.idSexo, req.body.idDepartamento, req.body.idTipoFuncionario, req.body.nombre, req.body.apellido_1, req.body.apellido_2, req.body.fechaNacimiento, req.body.correo, req.body.contrasenia, req.files.urlFoto.name, 1, 1, '')
    // Se llama al método del controller para que verifique si existe el funcionario en la bd y está con estado 0
    const verifysolicitation = solicitationController.verifysolicitation(solicitation)
    const verifyEmailsolicitation = solicitationController.verifyEmailsolicitation(req.body.correo)

    if ( (await verifysolicitation) && (await !verifyEmailsolicitation) ) {

        res.json({
            "estado": true
        })
    } else if ( await !verifyEmailsolicitation ) {

        res.json({
            "mensaje": "No se pudo insertar el funcionario",
            "estado": false,
        })
    } else {
        // Se llama a la función inserta el departamento
        const verifyInsert = await solicitationController.insertsolicitation(solicitation)

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
router.put('/solicitation', loginController.recuperarToken, loginController.verifyToken, fileController.upload, async (req, res) => {

    let solicitation = null

    if( req.body.urlFoto != undefined ){
        
        solicitation = new solicitation(req.body.idFuncionario, req.body.idSexo, req.body.idDepartamento, req.body.idTipoFuncionario, req.body.nombre, req.body.apellido_1, req.body.apellido_2, req.body.fechaNacimiento, req.body.correo, req.body.contrasenia, req.body.urlFoto, 1, 1, '')
    } else {

        solicitation = new solicitation(req.body.idFuncionario, req.body.idSexo, req.body.idDepartamento, req.body.idTipoFuncionario, req.body.nombre, req.body.apellido_1, req.body.apellido_2, req.body.fechaNacimiento, req.body.correo, req.body.contrasenia, req.files.urlFoto.name, 1, 1, '')
    }
    
    const verifyModify = await solicitationController.modifysolicitation(solicitation)

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
router.post('/deletesolicitation', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    // Se llama a la función que elimina el funcionario por el id
    const verifyDelete = await solicitationController.deletesolicitation(req.body.idFuncionario)

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
router.get('/solicitation', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
    // Se llama a la función recupera la lista
    const list = await solicitationController.listsolicitation()

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
router.post('/solicitationById', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
   
    // Se llama a la función recupera el funcionario por el id
    const solicitation = await solicitationController.recoversolicitationById(req.body.idFuncionario)
    console.log(solicitation);
    if (solicitation) {

        // Se envía el secret al frontend
        res.json({
            "solicitation": solicitation,
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