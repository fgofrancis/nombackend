
const { response } = require('express');
const Compania = require('../models/compania');


const getCompania = async(req, res)=>{

    const desde = Number(req.query.desde) || 0;

    // const usuarios = await Usuario.find({}, 'name email role google')
    //                               .skip(desde)
    //                               .limit( 5);
    // const total = await Usuario.count();

    const [companias, total] = await Promise.all([
        Compania.find({}, 'name rnc address img')
               .skip(desde)
               .limit( 5),

        Compania.countDocuments()         
    ]);
 
    res.json({
        ok:true,
        companias,
        total
        // uid:req.uid, esto es para demostrar como capturar el usuario logeado
        // correo:req.address
    })
}
const crearCompania = async(req, res=response)=>{
    const {name, rnc } = req.body;

    try {
        const existeRNC = await Compania.findOne({ rnc });
        
        if(existeRNC){
            return res.status(400).json({
                ok:false,
                msg:'Esta Compañia (RNC) ya está registrada'
            });
        }   
        const compania = new Compania( req.body);

        // Guardar compania
        await compania.save();

        res.json({
            ok:true,
            compania
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado.... revisar log'
        })   
    }


}

const actualizarCompania = async(req, res=response )=>{

    // TODO: Validar token y comprobar si es el usuario correcto
    const ciaID = req.params.id;
 
    try {

        const companiaDB = await Compania.findById(ciaID);

        if( !companiaDB){
            return res.status(500).json({
                ok:false,
                msg:'No existe compania con ese ID'
            });
        }

        // Actualizaciones
        const { name, rnc, ...campos } = req.body;

        if(companiaDB.rnc !== rnc ){
            const existeRNC = await Usuario.findOne({ rnc })
            if(existeRNC){
                return res.status(400).json({
                    ok: false,
                    msg:'Ya existe una compañía con ese RNC'
                })
            }
        }
        campos.rnc = rnc;
        
        const companiaActualizada = await Compania.findByIdAndUpdate(rnc, campos, {new:true})

        res.json({
            ok: true,
            compania: companiaActualizada
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Error inesperado al actualizar.... revisar log'
        })
    }
}

const borrarCompania = async(req, res=response)=>{

    const ciaID = req.params.id;

    try {
        const companiaDB = await Compania.findById(ciaID);

        if( !companiaDB){
            return res.status(500).json({
                ok:false,
                msg:'No existe compañía con ese ID'
            });
        }

        // Eliminar usuario
        await Compania.findByIdAndDelete(ciaID);

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
    getCompania,
    crearCompania,
    actualizarCompania,
    borrarCompania
}

