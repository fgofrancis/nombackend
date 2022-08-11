
require('dotenv').config();
const path = require('path');

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

// Base de datos
dbConnection();

// Directorio público
app.use( express.static('public') );
  
//Rutas
app.use('/api/usuarios', require('./routes/usuarios-routes'));
app.use('/api/empleados', require('./routes/empleados-routes'));
app.use('/api/asignaciones', require('./routes/asignacion-routes'));
app.use('/api/deducciones', require('./routes/deduccion-routes'));
app.use('/api/todo', require('./routes/busquedas-routes'));
app.use('/api/uploads', require('./routes/uploads-routes'));
app.use('/api/login', require('./routes/auth-routes'));
app.use('/api/login/google', require('./routes/auth-routes'));
app.use('/api/cias', require('./routes/cia-routes'));
app.use('/api/escalas', require('./routes/escalas-routes'));
// app.use('/api/escalas/registral', require('./routes/escalas-routes'));

app.use('/api/renglones', require('./routes/renglones-routes'));
app.use('/api/parametros', require('./routes/parametros-routes'));
app.use('/api/empdedasig',require('./routes/empdedasig-routes')) 
app.use('/api/nominaProcess',require('./routes/nominaProcess-routes'))

// Lo ultimo
app.get('*', (req, res)=>{
    res.sendFile( path.resolve(__dirname, 'public/index.html'))
})


app.listen( process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})
