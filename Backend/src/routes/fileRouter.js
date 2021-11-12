// Importaciones necesarias
import {Router} from 'express'
import path from 'path'
import LoginController from '../controllers/loginController'
import ValidacionController from '../controllers/validationController'
import fileUpload from 'express-fileupload'

// Instancia
const router = Router()
const loginController = new LoginController()
const validacionController = new ValidacionController()

// validaciones del fileUpload 
router.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, '../../','temp',),
    createParentPath: true,
    limits: {
        filesize: 1024
    },
}))

// Rutas de file

// Se encarga de comunicarse con el controller para insertar un file de tipo imagen en la carpeta de imagenes   -loginController.recuperarToken, loginController.verifyToken,
router.post('/uploadImage', async (req, res) =>{

    const file = req.files.urlFoto

    validacionController.verifyNameImage(file)

    if( file !== null && validacionController.verifyMaxSize(file.name, 175) && validacionController.verifySpecialCharacters(file.name) ){

        try {

            const savePath = path.join(__dirname, '../../','images', file.name)
            // Validaciones requeridas para las imágenes
            if( file.truncated || !validacionController.verifyExtImage(file) ) {
                // Sino cumple con las validaciones 
                throw new Error('La imagen no cumple con las validaciones requeridas')
            } else {
                // Guarda el archivo
                await file.mv(savePath)

                res.send({
                    mensaje: "Se añadió la imagen exitosamente",
                    estado: true
                })
            }
        } catch (error) {

            res.send({
                mensaje: "No se pudo añadir la imagen",
                estado: false
            })
        }
    } else {

        res.send({
            mensaje: "No se pudo añadir la imagen",
            estado: false
        })
    }
})

export default router