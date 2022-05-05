/**
 * Ruta: /api/deducciones
 */
 const { Router} = require('express');
 const { check } = require('express-validator');
 const { validarCampos } = require('../middlewares/validar-campos');
 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const { 
     getDeducciones,
     getDeduccionesById,
     crearDeduccion,
     actualizarDeduccion,
     borrarDeduccion
 
 } = require('../controllers/deducciones-controller');
 
 const router = Router();
 
 router.get('/',validarJWT, getDeducciones);
 
 router.post('/',
     [
         validarJWT,
         check('empleado','El id del Empleado debe ser válido').isMongoId(),
         validarCampos
     ],
      crearDeduccion);
      
 router.put('/:id', 
     [
         validarJWT
     ],
     actualizarDeduccion);
 
 router.delete('/:id',borrarDeduccion);
 
 router.get('/:id',
     validarJWT,
     getDeduccionesById);
 
 
 module.exports = router;
 