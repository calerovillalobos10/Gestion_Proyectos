// Importaciones necesarias
import { Router } from 'express'
import path from 'path'
import fileUpload from 'express-fileupload'
import LoginController from '../controllers/loginController'
import FileController from '../controllers/fileController'
import Functionary from '../models/functionary'
import FunctionaryController from '../controllers/functionaryController'

// Instancia
const router = Router()
const loginController = new LoginController()
const fileController = new FileController()
const functionaryController = new FunctionaryController()

// validaciones del fileUpload 
router.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, '../../', 'temp',),
    createParentPath: true,
    limits: {
        filesize: 1024
    },
}))

// Rutas de department

// Se encarga de comunicarse con el controller para insertar un funcionario ----loginController.recuperarToken, loginController.verifyToken
router.post('/functionary', fileController.upload, async (req, res) => {


    const functionary = new Functionary(1, req.body.idSexo, req.body.idDepartamento, req.body.idTipoFuncionario, req.body.nombre, req.body.apellido_1, req.body.apellido_2, req.body.fechaNacimiento, req.body.correo, req.body.contrasenia, req.files.urlFoto.name, 1, 1, '')

    //const verifyFunctionary = functionaryController.verifyFunctionary(req.body.correo) --------Agregar la verificación del funcionario

    // Valida si ya existe un departamento con esa descripción
    // if ( (await verifyFunctionary).estado ) {
        // Se llama a la función inserta el departamento
        const verifyInsert = await functionaryController.insertFunctionary(functionary)

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
    /*} else {

        res.json({
            "mensaje": (await verifyFunctionary).mensaje,
            "estado": false,
        })
    }*/
})

// Rutas de file

export default router