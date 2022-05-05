/**
 * Ruta: /api/asignaciones
 */
const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { 
    getAsignaciones,
    getAsignacionesById,
    crearAsignacion,
    actualizarAsignacion,
    borrarAsignacion

} = require('../controllers/asignaciones-controller');

const router = Router();

router.get('/', getAsignaciones);

router.post('/',
    [
        validarJWT,
        check('empleado','El id del Empleado debe ser válido').isMongoId(),
        validarCampos
    ],
     crearAsignacion);
     
router.put('/:id', 
    [
        validarJWT
    ],
    actualizarAsignacion);

router.delete('/:id',borrarAsignacion);

router.get('/:id',
    validarJWT,
    getAsignacionesById);


module.exports = router;
