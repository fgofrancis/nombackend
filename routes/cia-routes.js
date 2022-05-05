
/*
Ruta: '/api/cias'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { 
        getCompania,
        crearCompania,
        actualizarCompania,
        borrarCompania
      } = require('../controllers/cia-controller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT, getCompania);

router.post('/',
    [
        check('name','El name es obligatorio').not().isEmpty(),    
        check('rnc','El rnc es obligatorio').not().isEmpty(),    
        validarCampos   
    ],crearCompania
);

router.put('/:id',
    [
        validarJWT,
        check('name','El name es obligatorio').not().isEmpty(),    
        check('rnc','El rnc es obligatorio').not().isEmpty(),    
        validarCampos  
    ],
    actualizarCompania
);

router.delete('/:id',
    validarJWT, 
    borrarCompania
);

module.exports = router;

