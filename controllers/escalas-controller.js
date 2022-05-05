

const { response } = require('express');
const Escala = require('../models/escalaSalarial');


const getEscala = async(req, res)=>{

    const desde = Number(req.query.desde) || 0;

    // const usuarios = await Usuario.find({}, 'name email role google')
    //                               .skip(desde)
    //                               .limit( 5);
    // const total = await Usuario.count();

    const [escalas, total] = await Promise.all([
        Escala.find({}, 'year renglon desde hasta tasa constante'),
            //    .skip(desde)
            //    .limit( 5),

        Escala.countDocuments()         
    ]);
    
    res.json({
        ok:true,
        escalas,
        total
        // uid:req.uid, esto es para demostrar como capturar el usuario logeado
        // correo:req.address
    })
}
const getEscalaById = async(req, res= response)=>{

    const id = req.params.id;

    const escalaDB = await Escala.findById(id);

    try {
        
        if(!escalaDB){
            return res.json({
                ok:false,
                msg:'Escala no existe con este ID'
            })
        }
    
        res.json({
            ok:true,
            escala: escalaDB
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'Error, hable con el administrador'
        })
    }
    
}


const crearEscala = async(req, res=response)=>{
    // const { year } = req.body;

    try {
        // const existeYear = await Escala.findOne({ year });
        
        // if(existeYear){
        //     return res.status(400).json({
        //         ok:false,
        //         msg:'Esta Escala para este año, ya está registrada'
        //     });
        // }   
        const escala = new Escala( req.body);

        // Guardar escala
        await escala.save();
    
        res.json({
            ok:true,
            escala
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado.... revisar log'
        })   
    }


}

const actualizarEscala = async(req, res=response )=>{

    // TODO: Validar token y comprobar si es el usuario correcto
    const id = req.params.id;
 
    try {

        const escalaDB = await Escala.findById (id);
       
        if( !escalaDB){
            return res.status(500).json({
                ok:false,
                msg:'No existe Escala con ese ID'
            });
        }

        // Actualizaciones
        const { renglon, ...campos } = req.body;

        if(escalaDB.renglon !== renglon ){
            const existeRenglon = await Escala.findOne({ renglon })
            if(existeRenglon){
                return res.status(400).json({
                    ok: false,
                    msg:'Ya existe una escala con ese Renglón'
                })
            }
        }
        campos.renglon = renglon;
        // console.log('campos..: ', campos);

        const escalaActualizada = await Escala.findByIdAndUpdate( id, campos, {new:true})

        res.json({
            ok: true,
            escala: escalaActualizada
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Error inesperado al actualizar.... revisar log'
        })
    }
}

const borrarEscala = async(req, res=response)=>{

    const escalaID = req.params.id;

    try {
        const escalaDB = await Escala.findById(escalaID);

        if( !escalaDB){
            return res.status(404).json({
                ok:false,
                msg:'No existe escala con ese ID'
            });
        }

        // Eliminar usuario
        await Escala.findByIdAndDelete(escalaID);

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
    getEscala,
    crearEscala,
    actualizarEscala,
    borrarEscala,
    getEscalaById
}

