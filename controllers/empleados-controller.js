
const { response } = require('express');
const Empleado = require('../models/empleado');

const getEmpleados = async(req, res= response)=>{

    const empleadoDB = await Empleado.find({}) 
    res.json({
        ok:true,
        empleado: empleadoDB
    })
    
}
const crearEmpleado = async(req, res= response)=>{

    const uid = req.uid;
    // const empleado = new Empleado(req.body);
    const empleado = new Empleado({
        usuario: uid,
        ...req.body
    })

    try {
            const empleadoDB = await empleado.save();

            res.json({
            ok:true,
            empleado:empleadoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al crear empleado. Hable con el Administrador'
        })
    }

    
}
const actualizarEmpleado = (req, res= response)=>{

    res.json({
        ok:true,
        msg:'actualizarEmpleado'
    })
    
}
const borrarEmpleado = (req, res= response)=>{

    res.json({
        ok:true,
        msg:'borrarEmpleado'
    })
    
}

module.exports ={
    getEmpleados,
    crearEmpleado,
    actualizarEmpleado,
    borrarEmpleado
}