// Importaciones necesarias
import { getConnection, sql } from '../database/connection'
import ValidacionController from '../controllers/validationController'
import path from 'path'

export default class FileController {

    validacionController;

    // Constructor donde se inicializan las instancias
    constructor() {

        this.validacionController = new ValidacionController()
    }


    upload = async (req, res, next) => {
        
        if ( req.body.urlFoto != undefined ) {

            next()
        } else {

            const file = req.files.urlFoto
    
            if ( file !== null && this.validacionController.verifyMaxSize(file.name, 175) && this.validacionController.verifySpecialCharacters(file.name) && this.validacionController.verifyNameImage(file) ){
                try {
                    
                    const savePath = path.join(__dirname, '../../','images', file.name.trim())
                    // Validaciones requeridas para las imágenes
                    if( file.truncated || !this.validacionController.verifyExtImage(file) ) {
                        // Sino cumple con las validaciones 
                        throw new Error('La imagen no cumple con las validaciones requeridas')
                    } else {
                        // Guarda el archivo
                        file.mv(savePath)
        
                        next()
                    }
                } catch (error) {
        
                    res.json({
                        "mensaje": "No se pudo insertar el funcionario",
                        "estado": false,
                    })
                }
            } else {
        
                res.json({
                    "mensaje": "No se pudo insertar el funcionario",
                    "estado": false,
                })
            }
        }
    }
}