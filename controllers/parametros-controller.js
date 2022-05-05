
const { response } = require('express');
const { body } = require('express-validator');
const Parametro = require('../models/parametro');


const getParametro = async(req, res)=>{

    const desde = Number(req.query.desde) || 0;

    // const usuarios = await Usuario.find({}, 'name email role google')
    //                               .skip(desde)
    //                               .limit( 5);
    // const total = await Usuario.count();

    const [parametros, total] = await Promise.all([
        Parametro.find({}, 'smp sfs svds'),
            //    .skip(desde)
            //    .limit( 5),

            Parametro.countDocuments()         
    ]);
 
    res.json({
        ok:true,
        parametros,
        total
        // uid:req.uid, esto es para demostrar como capturar el usuario logeado
        // correo:req.address
    })
}
const getParametroById = async(req, res= response)=>{

    const id = req.params.id;

    const parametroDB = await Parametro.findById(id);

    try {
        
        if(!parametroDB){
            return res.json({
                ok:false,
                msg:'Parámetro no existe con este ID'
            })
        }
    
        res.json({
            ok:true,
            parametro: parametroDB
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'Error, hable con el administrador'
        })
    }
    
}

const crearParametro = async(req, res=response)=>{
    // const { year } = req.body;

    try {
       
        const parametro = new Parametro( req.body);

        // Guardar Renglon
        await parametro.save();
    
        res.json({
            ok:true,
            parametro
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado.... revisar log'
        })   
    }


}

const actualizarParametro = async(req, res=response )=>{

    // TODO: Validar token y comprobar si es el usuario correcto
    const id = req.params.id;

    try {

         const parametroDB = await Parametro.findById(id);
       
        if( !parametroDB){
            return res.status(500).json({
                ok:false,
                msg:'No existe Renglón con ese ID'
            });
        }
 
        /* Actualizaciones, con la instrucion de abajo podriamos extraer algun
            campo del body, pero ahora no lo aplicamos.const {camp1 ,...campos } = req.body;
        */
        const { ...campos } = req.body;

        const parametroActualizada = await Parametro.findByIdAndUpdate(id, campos, {new:true})

        res.json({
            ok: true,
            Parametro: parametroActualizada
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Error inesperado al actualizar Escala.... revisar log'
        })
    }
}

const borrarParametro = async(req, res=response)=>{

    const parametroID = req.params.id;

    try {
        const parametroDB = await Parametro.findById(parametroID);

        if( !parametroDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe parámetro con ese ID'
            });
        }

        // Eliminar usuario
        await Parametro.findByIdAndDelete(parametroID);

         return res.status(200).json({
             ok: true,
             msg:'Registro Borrado exitosamente'
         })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Error inesperado al borrar registro.... revisar log'
        })
    }

}

module.exports = {
    getParametro,
    crearParametro,
    getParametroById,
    actualizarParametro,
    borrarParametro,
 
}


