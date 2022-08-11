/*
Ruta: '/api/parametros'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');


const { getParametro, 
        crearParametro,
        actualizarParametro,
        borrarParametro,
        getParametroById,

         } = require('../controllers/parametros-controller');


const router = Router();

router.get('/', validarJWT, getParametro);

router.post('/',
    [
        validarJWT,
        check('salarioMinPromedio','El Salario mínimo promedio es obligatorio').not().isEmpty(),    
        check('seguroFamiliarSalud.tasaEmpleado','El Seguro familiar de salud tasa empleado es obligatorio').not().isEmpty(),    
        check('seguroFamiliarSalud.tasaPatron','El Seguro familiar de salud tasa patrón es obligatorio').not().isEmpty(),    
        check('seguroVejezDiscapSobrevivencia.tasaEmpleado','El Seguro de vejez dicapacidad y sobrevivencia tasa empleado es obligatorio').not().isEmpty(),      
        check('seguroVejezDiscapSobrevivencia.tasaPatron','El Seguro de vejez dicapacidad y sobrevivencia tasa patrón es obligatorio').not().isEmpty(),      
        check('seguroRiesgoLaboral','El Seguro riesgo laboral es obligatorio').not().isEmpty(),      
        check('salarioMinTSS','El Salario mínimo TSS es obligatorio').not().isEmpty(),      
        validarCampos   
    ],
    crearParametro
);

router.put('/:id',
    [
        validarJWT
        
    ],
    actualizarParametro
);

router.delete('/:id',
    validarJWT, 
    borrarParametro
);
router.get('/:id',
    validarJWT,
    getParametroById);

module.exports = router;


