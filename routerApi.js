// importation des modules et controleurs

var express = require('express');
var usersCtrl = require('./routers/userCtrl');

// configuration des routes

exports.router = (function(){
	var routerApi = express.Router();

	routerApi.route('/users/register/').post(usersCtrl.register);
	routerApi.route('/users/login/').post(usersCtrl.login);

	return routerApi;
})();