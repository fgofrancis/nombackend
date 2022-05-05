const {Schema, model } = require('mongoose');
// No la estoy usando.

const escalaSchema = Schema({
        year:{
            type:Number,
            require:true,
        }, 
         renglon:{
             type:Number,
             requere:true
         },
         desde:{
            type:Number,
            default:0
        },
         hasta:{
            type:Number,
            default:0
        },
        tasa:{
            type:Number,
            default:0
        },
        constante:{
            type:Number,
            default:0
        },
        
  
},{collection: 'escala'} )

escalaSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Escala',escalaSchema )
