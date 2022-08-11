
const { response } = require('express');
const { body } = require('express-validator');
const Parametro = require('../models/parametro');


const getParametro = async(req, res=response)=>{

    const parametroDB = await Parametro.find({})
                                        .populate('usuario', 'name')

    res.json({
        ok: true,
        parametros: parametroDB
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
    const uid = req.uid;

    // const parametro = new Parametro( req.body);
    const parametro = new Parametro({
        usuario:uid,
        ...req.body
    })

    try {
           // Guardar Renglon
           const parametroDB = await parametro.save();
           res.json({
               ok:true,
               parametro:parametroDB
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
    const uid = req.uid;

    try {

         const parametroDB = await Parametro.findById(id);
       
        if( !parametroDB){
            return res.status(500).json({
                ok:false,
                msg:'No existe Renglón con ese ID'
            });
        };
 
        /* Actualizaciones, con la instrucion de abajo podriamos extraer algun
            campo del body, pero ahora no lo aplicamos.const {camp1 ,...campos } = req.body;
        */
        const cambiosParametro = { 
            ...req.body,
            usuario:uid
        };

        const parametroActualizada = await Parametro.findByIdAndUpdate(id, cambiosParametro, {new:true})

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


