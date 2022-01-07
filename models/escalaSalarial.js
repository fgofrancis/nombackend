const {Schema, model } = require('mongoose');

const escalaSchema = Schema({

    year:{
        type: Number,
        require: true
    },

    limiteInf:{
        type: Number,
    },

    limiteSup:{
        type: Number
    },
    tasa:{
        type: Number
    },
    constante:{
        type: Number
    }
        



}, {collection: 'escala'} )

module.exports = model( 'Escala',escalaSchema )
