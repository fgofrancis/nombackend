/**
 * Ruta: 'api/todo'
 */
const { Router } = require('express');
const { buscar,buscarDocumentoColeccion } = require('../controllers/busquedas-controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const route= Router();

route.get('/:busqueda', validarJWT, buscar)
route.get('/coleccion/:tabla/:busqueda', validarJWT, buscarDocumentoColeccion)



module.exports = route;