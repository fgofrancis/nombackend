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
        const token = await generarJWT(usuarioDB.id, usuarioDB.email, usuarioDB.companiaID);

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
                google: true,
                companiaID: '61e050f884eb7bd8ad11d585'
            });
        }else{
            // Existe el usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en BD
        await usuario.save();

        // Generar el JWT
        const token = await generarJWT(usuario.id, usuario.email,usuario.companiaID);

        res.json({
            ok:true,
            msg:'Token-Google!!!',
            //  googleToken
             token
        });
    } catch (error) {
        
        res.json({
            ok:false,
            msg:'Token Google no es correcto',
        });
    }
};

const renewToken = async(req, res= response )=>{

    // const uid = req.uid;
    // const email = req.email
    // const companiaID = req.companiaID

    const { uid, email, companiaID } = req;
    
    // Generar el TOKEN - JWT
    const token = await generarJWT(uid, email, companiaID);

    //Obtener el usuarioDB por UID
    const usuarioDB = await Usuario.findById(uid);

    if(!usuarioDB){
        return res.json({
            ok: false,
            msg:'Usuario no existe por ese UID'
        });
    }

    res.json({
        ok:true,
        token,
        usuarioDB
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}