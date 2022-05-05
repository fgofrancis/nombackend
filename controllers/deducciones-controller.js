
const {response} = require('express');
const Deduccion = require('../models/deduccion');


const getDeducciones = async(req, res=response )=>{

    const deduccionDB = await Deduccion.find({})
                                         .populate('empleado', 'name1 apell1 identificacion salario')
                                         .populate('usuario', 'name')
                                         
    res.json({
        ok: true,
        deducciones: deduccionDB
    })
 
}
const getDeduccionesById = async(req, res= response)=>{

    const id = req.params.id;

    const deduccionDB = await Deduccion.findById(id) 
                                      .populate('empleado','name1 apell1 salario')
                                      .populate('usuario','name img email');
    try {
        
        if(!deduccionDB){
            return res.json({
                ok:false,
                msg:'Deducción no existe con este ID'
            })
        }
    
        res.json({
            ok:true,
            deduccion: deduccionDB
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'Error, hable con el administrador'
        })
    }
    
}

const crearDeduccion = async(req, res=response )=>{

    const uid = req.uid;
    const deduccion = new Deduccion({
        usuario: uid,
        ...req.body
    })
 
    try {
        const deduccionDB = await deduccion.save();

        res.status(200).json({
            ok:true,
            deduccion: deduccionDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error, Registro no gravado'
        })
        
    }

}

const actualizarDeduccion = async(req, res=response)=>{
    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const deduccion = await Deduccion.findById(id);

        if(!deduccion){
            return res.status(404).json({
                ok:false,
                msg:'Deduccion no encontrada por Id'
            });
        };

        // Actualizar empleados
        const cambiosDeduccion = {
            ...req.body,
            usuario:uid
        };

        deduccionActualizada = await Deduccion.findByIdAndUpdate( id, cambiosDeduccion, {new:true} );
        res.json({
            ok:true,
            deducción: deduccionActualizada
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador'
        })
    }
}
const borrarDeduccion = async(req, res= response)=>{

    const id = req.params.id;

    try {
        
        const deduccion = await Deduccion.findById(id);

        if(!deduccion){
            return res.status(404).json({
                ok:false,
                msg:'Deducción no encontrada por Id'
            });
        };
        await Deduccion.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg: 'Deducción Eliminada'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador'
        })
    }
}

module.exports = {
    getDeducciones,
    getDeduccionesById,
    crearDeduccion,
    actualizarDeduccion,
    borrarDeduccion
}
