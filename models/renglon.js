const {Schema, model } = require('mongoose');

const renglonSchema = Schema({
    
    year:{
        type:Number
    }, 
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
       
},{collection: 'renglon'} );

renglonSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Renglon',renglonSchema )


       

