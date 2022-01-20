const { response } = require('express');
const Usuario = require('../models/usuario');
const passcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res)=>{

    const desde = Number(req.query.desde) || 0;

    // const usuarios = await Usuario.find({}, 'name email role google')
    //                               .skip(desde)
    //                               .limit( 5);
    // const total = await Usuario.count();

    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'name email role google img')
               .skip(desde)
               .limit( 5),

        Usuario.countDocuments()         
    ]);
 
    res.json({
        ok:true,
        usuarios,
        total
        // uid:req.uid, esto es para demostrar como capturar el usuario logeado
        // correo:req.address
    })
}
const crearUsuario = async(req, res=response)=>{
    const {name, password, email } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });
        
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:`${email}, Este correo ya está registrado`,
        
            });
        }   
        const usuario = new Usuario( req.body);

        // Encriptar contraseña
        const salt = passcrypt.genSaltSync();
        usuario.password = passcrypt.hashSync(password, salt);

        // Guardar usuario
        await usuario.save();

        // Generar el Token - JWT
        const token = await generarJWT(usuario.id, usuario.email, usuario.companiaID);
    
        res.json({
            ok:true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado.... revisar log'
        })   
    }


}

const actualizarUsuario = async(req, res=response )=>{

    // TODO: Validar token y comprobar si es el usuario correcto
    const uid = req.params.id;
 
    try {

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB){
            return res.status(500).json({
                ok:false,
                msg:'No existe usuario con ese ID'
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if(usuarioDB.email !== email ){
            const existeEmail = await Usuario.findOne({ email })
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg:'Ya existe un usuario con este email'
                })
            }
        }

        if( !usuarioDB.google ){
            campos.email = email;
        }else if( usuarioDB.email !== email ){
            return res.status(400).json({
                ok:false,
                msg:'Usuarios de google no pueden cambiar su correo'
            });

        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true})

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Error inesperado al actualizar.... revisar log'
        })
    }
}

const borrarUsuario = async(req, res=response)=>{

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB){
            return res.status(500).json({
                ok:false,
                msg:'No existe usuario con ese ID'
            });
        }

        // Eliminar usuario
        await Usuario.findByIdAndDelete(uid);

         res.status(300).json({
             ok: true,
             msg:'Registro Borrado exitosamente'
         })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado al borrar registro.... revisar log'
        })
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}
