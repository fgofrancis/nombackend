const {Schema, model } = require('mongoose');

const companiaSchema = Schema({

    name:{
        type: String,
        require: true
    },

    rnc:{
        type: String,
    },
    telefono:{
        type: String,
    },

    email:{
        type: String
    },
    img:{
        type: String
    },
    fechaRegistro:{
        type: Date,
        default:Date.now()
    }
 
}, { collection: 'companias' } );

companiaSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Compania',companiaSchema )
