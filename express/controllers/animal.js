'use strict'



//models

const User = require('../models/user');
const Animal = require('../models/animal');

//servicio jwt



//modulos

const fs = require('fs');
const path = require('path');

//acciones metodos de las rutas

function pruebas(req,res){
	res.status(200).send({
		message:'Probando el controlador de animales y la acción de pruebas',
		user:req.user
	});
}

function saveAnimal(req, res){

	const animal = new Animal();
	const params = req.body;

	if(params.name){
		animal.name = params.name;
		animal.description = params.description;
		animal.year = params.year;
		animal.image = null;
		animal.user = req.user.sub;

		animal.save((err, animalStored) => {
			if(err){
				res.status(500).send({message: 'Error en el servidor'});
			}else{
				if(!animalStored){
					res.status(500).send({message:'El animal no se ha guardado'});
				}else{
					res.status(200).send({animal: animalStored});
				}

			}

		});

	}else{
		res.status(400).send({message: 'El nombre del animal es obligatorio'});
	}
}

function getAnimals(req, res){
	Animal.find({}).populate({path:'user'}).exec((err, animals) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!animals){
				res.status(200).send({message:'No hay animales'});
			}else{
				res.status(200).send({animals});
			}

		}

	});

}

function getAnimal(req, res){
	const animalId = req.params.id;
	Animal.findById(animalId).populate({path:'user'}).exec((err, animal) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!animal){
				res.status(400).send({message:'No existe el animal'});
			}else{
				res.status(200).send({animal});
			}

		}

	});
}

function updateAnimal(req, res){
	const animalId = req.params.id;
	const update = req.body;
	Animal.findByIdAndUpdate(animalId,update ,{new: true},(err, animalUpdated) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!animalUpdated){
				res.status(400).send({message:'No se ha actualizado el animal'});
			}else{
				res.status(200).send({animal: animalUpdated});
			}
		}
	});
}

function uploadImages(req, res){
	const animalId = req.params.id;
	const file_name = 'No subido...';

	if(req.files){
		const file_path = req.files.image.path;
		const file_split = file_path.split("/");
		const file_name = file_split[2];

		const file_ext = file_name.split(".").pop();
		

		if(file_ext == 'png'|| file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif' ){

			Animal.findByIdAndUpdate(animalId, {image: file_name}, {new: true }, (err, animalUpdated) => {
				if(err){
					res.status(500).send({
						message:'Error actualizar el animal'
					});
				}else{
					if(!animalUpdated){
						res.status(404).send({message:'no se ha podido actualizar el animal'});
					}else{
						res.status(200).send({animal: animalUpdated, image: file_name});
					}
				}
			});

		}else{
			fs.unlink(file_path,(err) => {
				if(err){
					res.status(200).send({message: 'Extensión no válida y fichero no borrado'});
				}else{
					res.status(200).send({message: 'Extensión no válida'});

				}

			});
		}
	}else{
		res.status(200).send({message: 'No se han subido archivo'});
	}


}


function getImageFile(req, res){

	const imageFile = req.params.imageFile;
	const path_file = './uploads/animals/'+imageFile;

	fs.exists(path_file,function(exist){
		if(exist){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(404).send({message: 'La imagen no existe'});
		}
	});

	
}

function deleteAnimal(req, res){
	const animalId = req.params.id;
	Animal.findByIdAndRemove(animalId,(err, animalRemoved) => {
		if(err){
			res.status(500).send({message:'Error en la petición'});
		}else{
			if(!animalRemoved){
				res.status(404).send({message:'No se ha podido borrar el animal'});
			}else{
				res.status(200).send({animal: animalRemoved});
			}

		}

	});
}

module.exports = {
	pruebas,
	saveAnimal,
	getAnimals,
	getAnimal,
	updateAnimal,
	uploadImages,
	getImageFile,
	deleteAnimal

};