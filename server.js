// importation des packages

var express = require('express');
var bodyParser = require('body-parser');
var routerApi = require('./routerApi').router;

// instanciation 
var server = express();

// configuration de bodyParser
server.use(bodyParser.urlencoded({extended : true }));
server.use(bodyParser.json());


// configuration des routes
server.get('/', function(req,res){
	res.setHeader('Content-Type', 'text/html');
	res.status(200).send('<h1>Hello </h1>');
	})
	.use('/api/',routerApi)
	.listen(3000, function(){
		console.log('le serveur est sur ecoute :) ');
	});