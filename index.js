
require('dotenv').config();
const express = require('express');
const cors = require('cors');


//Crear el servidor de express
const app = express();

const { dbConnection } =require('./database/config');

//Configurar CORS, el use(middlewere) es una funcion que se va a ejecutar desde esa linea
// hacia abajo
app.use(cors() );

dbConnection();

//Rutas
app.get('/', (req, res)=>{

    res.status(400).json({
        ok:true,
        msg:'Hola Mundo'
    })
});

app.listen( process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})
