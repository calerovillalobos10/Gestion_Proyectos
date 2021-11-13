// Importaciones necesarias
import {Router} from 'express'
import LoginController from '../controllers/loginController'
import path from 'path'

// Instancia
const router = Router()
const loginController = new LoginController()

router.post('/functionaryUrl', loginController.recuperarToken, loginController.verifyToken, async (req, res)=> {

    const filepath = path.join(__dirname, '../../', 'images/' + req.body.urlFoto);
    console.log(filepath);
    res.sendFile(filepath);
})

export default router