
const { response } = require('express');
const Empleado = require('../models/empleado');

const getEmpleados = async(req, res= response)=>{

    const empleadoDB = await Empleado.find() 
                                      .populate('usuario','name img email')
                                      .populate('companiaID','name img email');
    res.json({
        ok:true,
        empleado: empleadoDB
    })
    
}
const getEmpleadosById = async(req, res= response)=>{

    const id = req.params.id;

    // const empleadoDB1 = await Empleado.aggregate
    // db.articles.aggregate([ { $match : { name : "dave" } } ]);

    const empleadoDB = await Empleado.findById(id) 
                                      .populate('usuario','name img email')
                                      .populate('companiaID','name img email');
    try {
        
        if(!empleadoDB){
            return res.json({
                ok:false,
                msg:'Empleado no existe con este ID'
            })
        }
    
        res.json({
            ok:true,
            empleado: empleadoDB
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'Error, hable con el administrador'
        })
    }
    
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
const actualizarEmpleado = async(req, res= response)=>{

    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const empleado = await Empleado.findById(id);

        if(!empleado){
            return res.status(404).json({
                ok:false,
                msg:'Empleado no encontrado por Id'
            });
        };

        // Actualizar empleados
        const cambiosEmpleado = {
            ...req.body,
            usuario:uid
        };

        empleadoActualizado = await Empleado.findByIdAndUpdate( id, cambiosEmpleado, {new:true} );
        res.json({
            ok:true,
            empleado: empleadoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador'
        })
    }
    
}
const borrarEmpleado = async(req, res= response)=>{
 
    const id = req.params.id;
    
    try {
        
        const empleado = await Empleado.findById(id);

        if(!empleado){
            return res.status(404).json({
                ok:false,
                msg:'Empleado no encontrado por Id'
            });
        };
        await Empleado.findByIdAndDelete(id);

        return res.json({
            ok:true,
            msg: 'Empleado Eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador'
        })
    }
}

module.exports ={
    getEmpleados,
    crearEmpleado,
    actualizarEmpleado,
    borrarEmpleado,
    getEmpleadosById
}