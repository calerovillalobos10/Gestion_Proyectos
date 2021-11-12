// Importaciones necesarias
import { getConnection, sql } from '../database/connection'
import ValidacionController from '../controllers/validationController'

export default class FileController {

    validacionController;
    fileUpload

    // Constructor donde se inicializan las instancias
    constructor() {

        this.validacionController = new ValidacionController()
    }



}