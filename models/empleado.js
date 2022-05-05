const { Schema, model } = require('mongoose');

const EmpleadoSchema = Schema({
    identificacion:{
        type: String,
        required: true,
        unique: true
    },
    name1:{
        type: String,
        required: true
    },
    name2:{
        type: String,
    },
    apell1:{
        type: String,
        required: true
    },
    apell2:{
        type: String
     },
    email:{
        type: String,
    },
    fechaIngreso:{
        type: String,
        requered: true
    },
    fechaSalida:{
        type: Date
    },
    salario:{
        type: Number,
        required:true
    },
    img:{
        type: String
    },
    usuario:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Usuario'
    },
    companiaID:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Compania'
       
    }
 
}, {collection: 'empleados'} );

EmpleadoSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model('Empleado', EmpleadoSchema)