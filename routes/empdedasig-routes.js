
/*
 Ruta: 'api/empDedAsig'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos }= require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getempDedAsig } = require('../controllers/empdedasig-controller')


const router = Router();

router.get('/',validarJWT,getempDedAsig);

module.exports = router;

