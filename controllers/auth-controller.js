const bcryptjs = require('bcryptjs');
const { response } = require('express');
const Usuario  = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res=response) =>{

    const { email, password }= req.body;
    try {
        // Verificar email
        const usuarioDB = await Usuario.findOne( {email} );

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Datos de Login no válido'
            })
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok:false,
                msg: 'Datos de Login no válido.'
            })
        };

        // Generar el Token - JWT
        const token = await generarJWT(usuarioDB.id, usuarioDB.email);

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error, hable con el administrador'
        });
    }

}

const googleSignIn = async(req, res=response )=>{

    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleVerify(googleToken);

        // Crear usuario en la DB
        const usuarioDB = await Usuario.findOne( {email} );
        let usuario;

        if (!usuarioDB){
            // Usuario no existe
            usuario = new Usuario({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }else{
            // Existe el usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en BD
        await usuario.save();

        // Generar el JWT
        const token = await generarJWT(usuario.id, usuario.email);

        res.json({
            ok:true,
            msg:'Token-Google!!!',
            //  googleToken
             token
        });
    } catch (error) {
        
        res.json({
            ok:false,
            msg:'Token no es correcto',
        });
    }
}

module.exports = {
    login,
    googleSignIn
}