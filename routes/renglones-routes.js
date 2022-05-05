
/*
Ruta: '/api/renglones'
no estoy utilizando esta codigo lo cambié por el de escala.
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getRenglon,
        crearRenglon,
        actualizarRenglon, 
        borrarRenglon,
        getRenglonById
      } = require('../controllers/renglones-controlles');


const router = Router();

router.get('/', validarJWT, getRenglon);

router.post('/',
    [
        validarJWT,
        check('year','El año es obligatorio').not().isEmpty(),    
        validarCampos   
    ],
    crearRenglon
);

router.put('/:id',
    [
        validarJWT,
        check('year','El año es obligatorio').not().isEmpty(),    
        validarCampos  
    ],
    actualizarRenglon
);

router.delete('/:id',
    validarJWT, 
    borrarRenglon
);
router.get('/:id',
    validarJWT,
    getRenglonById);

module.exports = router;

