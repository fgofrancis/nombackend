/*
Ruta: '/api/login'
*/
const { Router } = require('express');
const {check } = require('express-validator');
const { login,googleSignIn, renewToken } = require('../controllers/auth-controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { route } = require('./usuarios-routes');

const router = Router();

router.post('/',
    [
        check('email','El email es obligatorio').not().isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),    
        validarCampos 
    ],
    login);

router.post('/google',
    [
        check('token','El Token de Google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn);

router.get('/renew',
     validarJWT,
     renewToken)



module.exports = router;
