/*
Empledos
Ruta: '/api/empleados'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEmpleados,
        crearEmpleado,
        actualizarEmpleado,
        borrarEmpleado } = require('../controllers/empleados-controller');



const router = Router();

router.get('/',validarJWT, getEmpleados);

router.post('/',
    [ validarJWT,
        check('identificacion', 'la identificación es requerida').not().isEmpty(),
        check('name1', 'El primer nombre es requerido').not().isEmpty(),
        check('apell1', 'El primer apellido es requerido').not().isEmpty(),
        check('fechaIngreso', 'La fecha de ingreso es requerida').not().isEmpty(),
        check('salario', 'El Salario es requerido').not().isEmpty(),
        validarCampos
    ],
    crearEmpleado);

router.put('/:id',
    [],
    actualizarEmpleado);


router.delete('/:id',
    validarJWT,
    borrarEmpleado);




module.exports = router