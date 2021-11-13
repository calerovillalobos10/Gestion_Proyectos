// Importaciones necesarias
import {Router} from 'express'
import LoginController from '../controllers/loginController'
import FunctionaryController from '../controllers/functionaryController'


// Instancia
const router = Router()
const loginController = new LoginController()
const functionaryController = new FunctionaryController()

router.post('/functionaryUrl', loginController.recuperarToken, loginController.verifyToken, async ()=> {

    // Se llama a la función recupera el url de la imagen dentro de funcionario por el id
    const functionaryUrl = await functionaryController.recoverUrlFunctionaryById(req.body.idFuncionario)

    if (functionaryUrl) {

        // Se envía el secret al frontend
        res.json({
            "functionary": functionaryUrl,
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