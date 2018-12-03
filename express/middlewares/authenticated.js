'use strict'

const jwt = require('jwt-simple');
//comprobar si el token ha caducado
const moment = require('moment'); 
const secret = 'clave_secreta_del_curso_de_angular4avanzado';

exports.ensureAuth = function(req, res, next){
	if(!req.headers.authorization){
		return res.status(403).send({message:'la petición no tiene la cabecera de autenticación'});
	}

	const token = req.headers.authorization.replace(/['¨]+/g, '');

	try{
		const payload = jwt.decode(token, secret);
		if(payload.exp <= moment().unix()){
			return res.status(401).send({
				message:'el token ha expirado'
			});
		}
		req.user = payload;

	}catch(ex){
		return res.status(404).send({
			message:'el token no es válido'
		});

	}
	

	next();
};