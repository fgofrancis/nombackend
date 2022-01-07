const {response} = require('express');
const res = require('express/lib/response');
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
const crearAsignacion = async(req, res=response )=>{

    const uid = req.uid;
    const asignacion = new Asignacion({
        usuario: uid,
        ...req.body
    })

    try {
        const asignacionDB = await asignacion.save();

        res.status(300).json({
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

const actualizarAsignacion = (req, res=response)=>{

    res.json({
        ok:true,
        msg:'actualizarAsignacion'
    })
}
const borrarAsignacion = (req, res= response)=>{

    res.json({
        ok: true,
        msg:'borrarAsignacion'
    })
}

module.exports = {
    getAsignaciones,
    crearAsignacion,
    actualizarAsignacion,
    borrarAsignacion
}