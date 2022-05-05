
const { response } = require('express');
const Renglon = require('../models/renglon');


const getRenglon = async(req, res)=>{

    const desde = Number(req.query.desde) || 0;

    // const usuarios = await Usuario.find({}, 'name email role google')
    //                               .skip(desde)
    //                               .limit( 5);
    // const total = await Usuario.count();

    const [renglones, total] = await Promise.all([
        Renglon.find({}, 'year noEscala limiteInf limiteSup tasa constMenos constMas '),
            //    .skip(desde)
            //    .limit( 5),

        Renglon.countDocuments()         
    ]);
 
    res.json({
        ok:true,
        renglones,
        total
        // uid:req.uid, esto es para demostrar como capturar el usuario logeado
        // correo:req.address
    })
}
const getRenglonById = async(req, res= response)=>{

    const id = req.params.id;

    const renglonDB = await Renglon.findById(id);

    try {
        
        if(!renglonDB){
            return res.json({
                ok:false,
                msg:'Renglon no existe con este ID'
            })
        }
    
        res.json({
            ok:true,
            renglon: renglonDB
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'Error, hable con el administrador'
        })
    }
    
}

const crearRenglon = async(req, res=response)=>{
    const { year } = req.body;

    try {
       
        const renglon = new Renglon( req.body);

        // Guardar Renglon
        await renglon.save();
    
        res.json({
            ok:true,
            renglon
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado.... revisar log'
        })   
    }


}

const actualizarRenglon = async(req, res=response )=>{

    // TODO: Validar token y comprobar si es el usuario correcto
    const id = req.params.id;

    try {

         const RenglonDB = await Renglon.findById(id);
       
        if( !RenglonDB){
            return res.status(500).json({
                ok:false,
                msg:'No existe Renglón con ese ID'
            });
        }
 
        // Actualizaciones
        const { noEscala, ...campos } = req.body;

        if(RenglonDB.noEscala !== noEscala ){
            const existenoEscala = await Renglon.findOne({ noEscala })
            if(existenoEscala){
                return res.status(400).json({
                    ok: false,
                    msg:'Ya existe este un renglon con ese No. Escala'
                })
            }
        }
        campos.noEscala = noEscala;
        // console.log('campos..: ', campos);

        const RenglonActualizada = await Renglon.findByIdAndUpdate(id, campos, {new:true})

        res.json({
            ok: true,
            Renglon: RenglonActualizada
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Error inesperado al actualizar Escala.... revisar log'
        })
    }
}

const borrarRenglon = async(req, res=response)=>{

    const RenglonID = req.params.id;

    try {
        const RenglonDB = await Renglon.findById(RenglonID);

        if( !RenglonDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe compañía con ese ID'
            });
        }

        // Eliminar usuario
        await Renglon.findByIdAndDelete(RenglonID);

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
    getRenglon,
    crearRenglon,
    actualizarRenglon,
    borrarRenglon,
    getRenglonById
}


