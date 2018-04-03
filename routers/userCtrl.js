// importations des modules

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var models = require('../models');

// configuration des routes pour les users

module.exports = {
	register: function(req, res){
		// recuperation des parametres
		var email = req.body.email;
		var username = req.body.username;
		var password = req.body.password;
		var biography = req.body.biography;

		// testons si l'utilisateur a envoyer les parametres

		if (email == null || username == null || password == null || biography == null) {
			return res.status(400).json({'error': 'missing the parameters'});
		}

		// verifions si l'utilisateur existe dans la bd si oui on ne fait rien on renvoie un message
		// d'erreur sinon on l'emregiste dans la bd
		
		models.User.findOne({
			attributes: ['email'],
			where: { email: email}
		})
		.then(function(userFound){
			if (!userFound) {
				
				bcrypt.hash(password,5, function(err, bcryptedPassword){
					var newUser = models.User.create({
						email: email,
						username: username,
						password: bcryptedPassword,
						biography: biography,
						isAdmin: 0
					})
					.then(function(newUser){
						return res.status(201).json({
							'userId': newUser.id
						})
					})
					.catch(function(err){
						return res.status(500).json({'error': 'cannot add user'});
					});
				});

			}else {

				return res.status(409).json({'error':'user alredy exist'});
			}
		})
		.catch(function(error){
			return res.status(500).json({'error':'unable to virify user'});
		});
	},

	login: function(req, res){

	}
};