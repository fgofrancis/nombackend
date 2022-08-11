
/*
Ruta: '/api/escalas'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { 
        getEscala,
        crearEscala,
        actualizarEscala,
        borrarEscala,
        getEscalaById,
        agregarEscala
      } = require('../controllers/escalas-controller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT, getEscala);

router.post('/',
    [
        validarJWT,
        check('year','El año es obligatorio').not().isEmpty(),    
        validarCampos   
    ],crearEscala
);
// Esto es mientras 
// router.put('/:id',
//     [
//         validarJWT,
//         check('year','El año es obligatorio').not().isEmpty(),    
//         validarCampos  
//     ],
//     actualizarEscala
// );

router.delete('/:id',
    validarJWT, 
    borrarEscala
);
router.get('/:id',
    validarJWT,
    getEscalaById);


router.post('/:id/add-escala',
        agregarEscala
);

module.exports = router;

