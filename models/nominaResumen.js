const { Schema, model} = require('mongoose');

const nominaResumenSchema = Schema({
    identificacion:{
        required:true,
        type:String
    },
    nombre:{
        required:true,
        type:String
    },
    asignacion:{
        required:true,
        type:Number
    },
    deduccion:{
        required:true,
        type:Number
    },
    netoapagar:{
        required:true,
        type:Number
    },
    fechaRegistro:{
        type:Date,
        default:Date.now()
    },
    IdProcess: {
        type:String
        
    }

}, {collection: 'nominaResumen'} )

module.exports = model('NominaResumen', nominaResumenSchema )

