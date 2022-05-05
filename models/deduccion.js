const { type } = require('express/lib/response');
const {Schema, model} = require('mongoose');

const deduccionSchema = Schema({

    empleado:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:'Empleado'
    },
    retencionesLey:{
        sfs:{
            type:Number,
        },
        afp:{
            type:Number,
        },
        adicTSS:{
            type:Number,
        },
        retISR:{
            type:Number,
        }
    },
    otrasDeducciones:{
        cxcEmpleado:{
            type:Number
        },
        otrosDescuentos:{
            type:Number
        }
    },
    fechaRegistro:{
        type: Date,
        default:Date.now()
    },
    usuario:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    }

}, {collection: 'deduccion'} )
module.exports = model('Deduccion',deduccionSchema)

