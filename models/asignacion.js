const { type } = require('express/lib/response');
const {Schema, model} = require('mongoose');

const asignacionSchema = Schema({

    empleado:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:'Empleado'
    },
    salario:{
        type:Number,
        requere:true
    },

    comisiones:{
        type:Number,
    },

    vacaciones:{
        type:Number,
    },

    horasExtraDiasFeriados:{
        type:Number
    },
    otrosIngresos:{
        type:Number
    },
    bonosTrimestrales:{
        type:Number
    },
    RegaliaPascual:{
        type:Number
    }, 
    IndemnizacionesLaborales:{
        type:Number
    }, 
    PreavisoYCesantia:{
        type:Number
    },
    Reembolsos:{
        type:Number
    },
    usuario:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    },

}, {collection: 'Asignaciones'} )
module.exports = model('Asignacion',asignacionSchema)