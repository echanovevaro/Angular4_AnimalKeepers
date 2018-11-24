'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zoo',{useMongoClient: true})
	.then(() => {
		console.log('La conexión a la base de datos se ha realizado correctamente...');

		app.listen(port, () => {
			console.log('El servidor local con Node y Express esta corriendo correctamente...');
		});
	})
	.catch(err => console.log(err));
	
		
