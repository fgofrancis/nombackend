/**
 * '/api/uploads'
 */

 const { Router } = require('express');
 const expressfileUpload = require('express-fileupload');

 const { fileUpload,retornaImag } = require('../controllers/uploads-controller');
 const { validarJWT } = require('../middlewares/validar-jwt');
 

 const route= Router();

 route.use( expressfileUpload() );
 
 route.put('/:tipo/:id', validarJWT,fileUpload)
 route.get('/:tipo/:foto', retornaImag)
  
 
 module.exports = route;