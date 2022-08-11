const {Schema, model } = require('mongoose');
// No la estoy usando, sustituida por renglonSchema

const escalaSchema = Schema({
        year:{
            type:Number,
            required:true,
        },
        escalas:[{
            noEscala:{
                type:Number
            }, 
            limiteInf:{
                type:Number
            },
             limiteSup:{
                 type:Number
             },
             tasa:{
                 type:Number
             },
             constMenos:{
                 type:Number
             },
             constMas:{
                 type:Number
             }
        }] 
        
  
},{collection: 'escala'} )

escalaSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Escala',escalaSchema )


