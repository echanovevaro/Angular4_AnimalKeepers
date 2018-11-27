'use strict'



//models

const User = require('../models/user');

//servicio jwt

const jwt = require('../services/jwt')

//modulos
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');
const path = require('path');

//acciones metodos de las rutas

function pruebas(req,res){
	res.status(200).send({
		message:'Probando el controlador de usuarios y la acción de pruebas',
		user:req.user
	});
}

function saveUser(req,res){

	//crear objeto usuario
	const user = new User();

	//recoger prametros de la petición
	const params = req.body;

	//asignar valores al objeto de usua

	if(params.password && params.name && params.surname && params.email){
		user.name = params.name;
		user.surname =  params.surname;
		user.email = params.email;
		user.role = 'ROLE_USER';
		user.image = null;

		User.findOne({email: user.email.toLowerCase()},(err, issetUser) =>{
			if(err){
				res.status(500).send({message:'Error al comprobar el usuario'});
			}else{
				if(!issetUser){
					bcrypt.hash(params.password, null, null, function(err, hash){
						user.password = hash;
					

						user.save((err,userStored) => {
							if(err){
								res.status(500).send({message:'Error al Guardar el usuario'});
							}else{
								if(!userStored){
									res.status(404).send({message:'No se ha regitrado el usuario'});
								}else{
									res.status(200).send({user: userStored});
								}
							}
						});

					});

				}else{
					res.status(403).send({
						message:'El usuario no puede registrarse porque ya existe'
					});

				}
			}

		});


	}else{
		res.status(403).send({
			message:'Introduce los datos correctamente'
		});
	}
}

function login(req, res ){

	let params = req.body;
	let email = params.email;
	let password = params.password;


	User.findOne({email: email.toLowerCase()},(err, user) => {

	
		if(err){
			res.status(500).send({message:'Error al comprobar el usuario'});
		}else{
			if(user){
				bcrypt.compare(password, user.password,(err ,check ) =>{
					if(check){
						//comprobar y generar el token
						if(params.gettoken){
							//devolver token jwt
							res.status(200).send({
								token: jwt.createToken(user)
							});

						}else{
							res.status(200).send({user});
						}
					
					}else{

						res.status(404).send({
							message:'El usuario no ha podido logearse correctamente'
						});
					}
				
				});	
			}
		}

	});
}


function updateUser(req, res){

	const userId = req.params.id;
	const update = req.body;

	if(userId != req.user.sub){
		res.status(500).send({
			message:'No tienes permiso para actualizar el usuario'});
	}	


	User.findByIdAndUpdate(userId, update, {new: true }, (err, userUpdated) => {
		if(err){
			res.status(500).send({
			message:'Error actualizar el usuario'
			});
		}else{
			if(!userUpdated){
				res.status(404).send({message:'no se ha podido actualizar el usuario'});
			}else{
				res.status(200).send({user: userUpdated});
			}
		}
	});

}


function uploadImages(req, res){
	const userId = req.params.id;
	const file_name = 'No subido...';

	if(req.files){
		const file_path = req.files.image.path;
		const file_split = file_path.split("/");
		const file_name = file_split[2];

		const file_ext = file_name.split(".").pop();
		

		if(file_ext == 'png'|| file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif' ){

			if(userId != req.user.sub){
				res.status(500).send({
				message:'No tienes permiso para actualizar el usuario'});
			}	

			User.findByIdAndUpdate(userId, {image: file_name}, {new: true }, (err, userUpdated) => {
				if(err){
					res.status(500).send({
						message:'Error actualizar el usuario'
					});
				}else{
					if(!userUpdated){
						res.status(404).send({message:'no se ha podido actualizar el usuario'});
					}else{
						res.status(200).send({user: userUpdated, image: file_name});
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
	const path_file = './uploads/users/'+imageFile;

	fs.exists(path_file,function(exist){
		if(exist){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(404).send({message: 'La imagen no existe'});
		}
	});

	
}

function getKeepers(req, res){
	User.find({role:'ROLE_ADMIN'}).exec((err, users) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!users){
				res.status(404).send({message: 'no hay cuidadores'});
			}else{
				res.status(200).send({users});
			}
		}
	});

}

module.exports = {
	pruebas,
	saveUser,
	login,
	updateUser,
	uploadImages,
	getImageFile,
	getKeepers

};