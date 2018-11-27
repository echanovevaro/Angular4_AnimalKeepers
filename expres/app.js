'use strict'
	
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//cargar rutas

const user_routes = require('./routes/user');
const animal_routes = require('./routes/animal');



//cargar middlewares de body-parser

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabezeras y cors

// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});



//configurar rutas base

app.use('/api', user_routes);
app.use('/api', animal_routes);



module.exports = app;
