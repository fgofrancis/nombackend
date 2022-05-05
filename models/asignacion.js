const { type } = require('express/lib/response');
const {Schema, model} = require('mongoose');

const asignacionSchema = Schema({

    empleado:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:'Empleado'
    },
    salarioCotizableTSS:{
        salario:{
            type:Number,
            requere:true
        },
        comisiones:{
            type:Number,
        },
        vacaciones:{
            type:Number,
        }
    },
    otrasRemuneraciones:{
        horasExtraDiasFeriados:{
            type:Number
        },
        otrosIngresos:{
            type:Number
        },
        bonosTrimestrales:{
            type:Number
        }
    },
    ingresosExentoISR:{
        regaliaPascual:{
            type:Number
        }, 
        indemnizacionesLaborales:{
            type:Number
        }, 
        preavisoYCesantia:{
            type:Number
        },
    },
    reembolsos:{
        type:Number
    },
    usuario:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    },
    fechaRegistro:{
        type: Date,
        default:Date.now()
    }

}, {collection: 'asignacion'} )
module.exports = model('Asignacion',asignacionSchema)

