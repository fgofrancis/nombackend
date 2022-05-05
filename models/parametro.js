
const {Schema, model} = require('mongoose');

const paramSchema = Schema({

    smp:{
        type:Number
    },
    sfs:{
        type:Number
    },
    svds:{
        type:Number
    }
},{collection: 'parametro'} )

module.exports= model('Parametro', paramSchema)