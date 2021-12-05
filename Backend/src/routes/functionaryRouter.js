// Importaciones necesarias
import { Router } from 'express';
import fileUpload from 'express-fileupload';
import LoginController from '../controllers/loginController';
import FileController from '../controllers/fileController';
import Functionary from '../models/functionary';
import FunctionaryController from '../controllers/functionaryController';

// Instancia
const router = Router(),
      loginController = new LoginController(),
      fileController = new FileController(),
      functionaryController = new FunctionaryController();

// validaciones del fileUpload 
router.use(fileUpload({
    createParentPath: true,
    limits: {
        filesize: 1024
    },
}));

// Rutas de functionary
// Se encarga de comunicarse con el controller para insertar un funcionario
router.post('/functionary', loginController.recuperarToken, loginController.verifyToken, fileController.upload, async (req, res) => {

    const functionary = new Functionary(1, req.body.idSexo, req.body.idDepartamento, req.body.idTipoFuncionario, req.body.nombre, req.body.apellido_1, req.body.apellido_2, req.body.fechaNacimiento, req.body.correo, req.body.contrasenia, req.files.urlFoto.name, 1, 1, ''),
    // Se llama al método del controller para que verifique si existe el funcionario en la bd y está con estado 0
          verifyFunctionary = functionaryController.verifyFunctionary(functionary),
    // Se llama al método que verifica que el correo del funcionario no exista en la base de datos
          verifyEmailFunctionary = functionaryController.verifyEmailFunctionary(req.body.correo);

    if ( (await verifyFunctionary) && (await !verifyEmailFunctionary) ) {

        res.json({
            "estado": true
        });
    } else if ( await !verifyEmailFunctionary ) {

        res.json({
            "mensaje": "No se pudo insertar el funcionario",
            "estado": false,
        });
    } else {
        // Se llama a la función inserta el funcionario
        const verifyInsert = await functionaryController.insertFunctionary(functionary);

        if (verifyInsert) {
            // Se envía el secret al frontend
            res.json({
                "estado": true
            });
        } else {
            // Si sucede algún error se le notifica al frontend
            res.json({
                "mensaje": "No se pudo insertar el funcionario",
                "estado": false,
            });
        }
    }
});

// Se encarga de comunicarse con el controller para modificar un funcionario
router.put('/functionary', loginController.recuperarToken, loginController.verifyToken, fileController.upload, async (req, res) => {

    let functionary = null;
    // Esta sentencia se encarga de verificar si se modificó el archivo o no, sino se modifica se recupera el nombre del archivo
    if( req.body.urlFoto != undefined ){
        
        functionary = new Functionary(req.body.idFuncionario, req.body.idSexo, req.body.idDepartamento, req.body.idTipoFuncionario, req.body.nombre, req.body.apellido_1, req.body.apellido_2, req.body.fechaNacimiento, req.body.correo, req.body.contrasenia, req.body.urlFoto, 1, 1, '');
    } else {

        functionary = new Functionary(req.body.idFuncionario, req.body.idSexo, req.body.idDepartamento, req.body.idTipoFuncionario, req.body.nombre, req.body.apellido_1, req.body.apellido_2, req.body.fechaNacimiento, req.body.correo, req.body.contrasenia, req.files.urlFoto.name, 1, 1, '');
    }
    
    const verifyModify = await functionaryController.modifyFunctionary(functionary);

    if (verifyModify) {
        // Se envía el secret al frontend
        res.json({
            "estado": true
        });
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo modificar el funcionario",
            "estado": false,
        });
    }
});

// Se comunica con el controller para aliminar un funcionario
router.post('/deleteFunctionary', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    // Se llama a la función que elimina el funcionario por el id
    const verifyDelete = await functionaryController.deleteFunctionary(req.body.idFuncionario);

    if (verifyDelete) {
        // Se envía el secret al frontend
        res.json({
            "estado": true
        });
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo eliminar el funcionario",
            "estado": false,
        });
    }
});

// Se encarga de comunicarse con el controller para recuperar un listado de funcionarios
router.get('/functionary', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
    // Se llama a la función recupera la lista
    const list = await functionaryController.listFunctionary();

    if (list) {
        // Se envía el secret al frontend
        res.json({
            "list": list,
            "estado": true
        });
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo recuperar la lista de funcionarios",
            "estado": false,
        });
    }
});

// Se encarga de comunicarse con el controller para recuperar un objeto funcionario
router.post('/functionaryById', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {
    // Se llama a la función recupera el funcionario por el id
    const functionary = await functionaryController.recoverFunctionaryById(req.body.idFuncionario);

    if (functionary) {
        // Se envía el secret al frontend
        res.json({
            "functionary": functionary,
            "estado": true
        });
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo recuperar el funcionario",
            "estado": false,
        });
    }
});

export default router;