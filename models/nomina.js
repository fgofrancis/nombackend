const { Schema, model} = require('mongoose');

const nominaSchema = Schema({
    identificacion:{
        require:true,
        type:String
    },
    empleadoID:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'Empleado'
    },
    asignacionID:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'Asignacion'
    },
    deduccionID:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:'Deduccion'
    },
    fechaRegistro:{
        type:Date,
        default:Date.now()
    },
    IdProcess: {
        type:String
        
    }

}, {collection: 'nomina'} )

module.exports = model('Nomina', nominaSchema )

