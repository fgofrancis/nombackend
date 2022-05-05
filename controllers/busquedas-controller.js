
const { response } = require('express');
const Usuario = require('../models/usuario');
const Empleado = require('../models/empleado');
const Escala = require('../models/escalaSalarial');
const Compania = require('../models/compania');
 
const buscar = async(req, res= response )=>{

    const query = req.params.busqueda;

    //expresion regular para hacer la busqueda abierta. No case sensibily
    const regex = new RegExp(query, 'i');

    // const usuario = await Usuario.find({name:regex});
    // const empleado = await Empleado.find({name: regex});

    const [usuario, empleado] = await Promise.all([
         Usuario.find({name:regex}),
         Empleado.find({name1:regex})       
    ]);

    try {
        res.json({
            ok:true,
            usuario,
            empleado
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg:'Información no existe'
        });
    }

}

const buscarDocumentoColeccion = async(req, res= response )=>{

    const tabla = req.params.tabla;
    const query = req.params.busqueda;

    //expresion regular para hacer la busqueda abierta. No case sensibily
    const regex = new RegExp(query, 'i');

    let data = [];
    switch (tabla) {
        case 'usuarios':
            data = await Usuario.find({name:regex})
                                .populate('companiaID','name rnc');
            break;
    
        case 'empleados':
            data = await Empleado.find({name1:regex})
                                 .populate('usuario','name email')
                                 .populate('companiaID','name rnc');
            break;
    
        case 'escalas':
             data = await Escala.find({year:regex});
             break;

        case 'companias':
             data = await Compania.find({name:regex});
             break;
    
        default:
           return res.status(400).json({
                ok:false,
                msg: 'La tabla tiene que ser: usuarios/empleados/escalas/companias'
            });
    }
    res.json({
        ok: true,
        resultados: data
    })
}

module.exports = {
    buscar,
    buscarDocumentoColeccion
}