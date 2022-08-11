
const { type } = require('express/lib/response');
const {Schema, model} = require('mongoose');

const paramSchema = Schema({

    salarioMinPromedio:{
        require:true,
        type:Number
    },
    seguroFamiliarSalud:{
        tasaEmpleado:{
            type:Number,
            requere:true
        },
        tasaPatron:{
            type:Number,
            require:true
        }
    },
    seguroVejezDiscapSobrevivencia:{
        tasaEmpleado:{
            type:Number
        },
        tasaPatron:{
            type:Number,
            require:true
        }
    },
    seguroRiesgoLaboral:{
             type:Number,
             require:true
    }, 
    salarioMinTSS:{
            type:Number,
            require:true
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

}, {collection: 'parametro'} )
module.exports = model('Parametro',paramSchema )