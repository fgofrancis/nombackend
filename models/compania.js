const {Schema, model } = require('mongoose');

const companiaSchema = Schema({

    name:{
        type: String,
        require: true
    },

    rnc:{
        type: String,
    },

    address:{
        type: String
    },
    img:{
        type: String
    }
 
}, {collection: 'compania'} )

module.exports = model( 'Compania',companiaSchema )
