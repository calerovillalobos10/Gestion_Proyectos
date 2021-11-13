// Importaciones necesarias
import {Router} from 'express'
import LoginController from '../controllers/loginController'
import path from 'path'

// Instancia
const router = Router()
const loginController = new LoginController()

router.get('/functionaryUrl/:urlFoto', loginController.recuperarToken, loginController.verifyToken, async (req, res)=> {

    const filepath = path.join(__dirname, '../../', 'images/' + req.params.urlFoto);
    console.log(filepath);
    res.sendFile(filepath);
})

export default router