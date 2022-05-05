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
        check('smp','El Salario mínimo promedio es obligatorio').not().isEmpty(),    
        check('sfs','El Seguro familiar de salud es obligatorio').not().isEmpty(),    
        check('svds','El Seguro de vida dicapacidad y sobrevivencia es obligatorio').not().isEmpty(),      
        validarCampos   
    ],
    crearParametro
);

router.put('/:id',
    [
        validarJWT,
        check('smp','El Salario mínimo promedio es obligatorio').not().isEmpty(),    
        check('sfs','El Seguro familiar de salud es obligatorio').not().isEmpty(),    
        check('svds','El Seguro de vida dicapacidad y sobrevivencia es obligatorio').not().isEmpty(),    
        validarCampos  
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


