// Importaciones necesarias
import {Router} from 'express';
import LoginController from '../controllers/loginController';
import BinnacleController from '../controllers/binnacleController';

// Instancia
const router = Router(),
      loginController = new LoginController(),
      binnacleController = new BinnacleController();

// Rutas de binnacle
// Se encarga de comunicarse con el controller para recuperar un listado de bitácoras
router.get('/binnacle', loginController.recuperarToken, loginController.verifyToken, async (req, res) => {

    // Se llama a la función recupera la lista
    const list = await binnacleController.listBinnacle();

    if (list) {
        // Se envía el secret al frontend
        res.json({
            "list": list,
            "estado": true
        });
    } else {
        // Si sucede algún error se le notifica al frontend
        res.json({
            "mensaje": "No se pudo recuperar la lista de bitácoras",
            "estado": false,
        });
    }
})

export default router;