/**
 * Ruta: /api/asignaciones
 */
const { Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { 
    getAsignaciones,
    crearAsignacion,
    actualizarAsignacion,
    borrarAsignacion

} = require('../controllers/asignaciones-controller');

const route = Router();

route.get('/', getAsignaciones);

route.post('/',
    [
        validarJWT,
        check('empleado','El id del Empleado debe ser válido').isMongoId(),
        validarCampos
    ],
     crearAsignacion);
route.put('/:id', actualizarAsignacion);
route.delete('/:id',borrarAsignacion);


module.exports = route;
