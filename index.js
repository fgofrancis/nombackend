
require('dotenv').config();
const express = require('express');
const cors = require('cors');


//Crear el servidor de express
const app = express();

const { dbConnection } =require('./database/config');

//Configurar CORS, el use(middlewere) es una funcion que se va a ejecutar desde esa linea
// hacia abajo
app.use(cors() );

// Lectura y parseo del body
app.use( express.json() );


dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios-routes'));
app.use('/api/login', require('./routes/auth-routes'));



app.listen( process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})
