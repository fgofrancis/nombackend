/**
 * Ruta 'api/nominaresumen'
 */
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getNominaResumen, borrarNominaByProcessID,
        getNominaByProcessID, getNominaByProcessIDByidEmpleado 
} = require('../controllers/nominaProcess-controller');

const router = Router();

router.get('/',validarJWT,getNominaResumen);

router.delete('/:IdProcess', validarJWT, borrarNominaByProcessID);
router.get('/:IdProcess', validarJWT, getNominaByProcessID);
router.get('/:IdProcess/:idEmpleado', validarJWT, getNominaByProcessIDByidEmpleado);

module.exports = router
