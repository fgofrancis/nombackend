const {response} = require('express');
const Asignacion = require('../models/asignacion');


const getAsignaciones = async(req, res=response )=>{

    const asignacionDB = await Asignacion.find({})
                                         .populate('empleado', 'name1 apell1 identificacion salario')
                                         .populate('usuario', 'name')
                                    
    res.json({
        ok: true,
        asignaciones: asignacionDB
    })

}
const getAsignacionesById = async(req, res= response)=>{

    const id = req.params.id;

    const asignacionDB = await Asignacion.findById(id) 
                                      .populate('empleado','name1 apell1 salario')
                                      .populate('usuario','name img email');
    try {
        
        if(!asignacionDB){
            return res.json({
                ok:false,
                msg:'Asignación no existe con este ID'
            })
        }
    
        res.json({
            ok:true,
            asignacion: asignacionDB
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'Error, hable con el administrador'
        })
    }
    
}

const crearAsignacion = async(req, res=response )=>{

    const uid = req.uid;
    const asignacion = new Asignacion({
        usuario: uid,
        ...req.body
    })

    try {
        const asignacionDB = await asignacion.save();

        res.status(200).json({
            ok:true,
            asignación: asignacionDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error Registro no gravado'
        })
        
    }

}

const actualizarAsignacion = async(req, res=response)=>{
    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const asignacion = await Asignacion.findById(id);

        if(!asignacion){
            return res.status(404).json({
                ok:false,
                msg:'Asignacion no encontrada por Id'
            });
        };

        // Actualizar empleados
        const cambiosAsignacion = {
            ...req.body,
            usuario:uid
        };

        asignacionActualizada = await Asignacion.findByIdAndUpdate( id, cambiosAsignacion, {new:true} );
        res.json({
            ok:true,
            Asignación: asignacionActualizada
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador'
        })
    }
}
const borrarAsignacion = async(req, res= response)=>{

    const id = req.params.id;

    try {
        
        const asignacion = await Asignacion.findById(id);

        if(!asignacion){
            return res.status(404).json({
                ok:false,
                msg:'Asignación no encontrada por Id'
            });
        };
        await Asignacion.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg: 'Asignación Eliminada'
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
    getAsignaciones,
    getAsignacionesById,
    crearAsignacion,
    actualizarAsignacion,
    borrarAsignacion
}