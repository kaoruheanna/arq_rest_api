var express = require('express')
var app = express()
var settings = require('./settings');
var routes = require('./routes');
var bodyParser = require('body-parser');
var dbAbstraction = require('./models/').init();
app.use(function (req, res, next) { // to load the db models for each request
    req.models = dbAbstraction.models;
    req.db     = dbAbstraction.db;
    return next();
});
app.use(function(req, res, next){ // to allow requests
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'accept, content-type, Authorization, If-Modified-Since');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});
app.use(express.Router());
app.use(bodyParser.json({ limit: '100mb' }));
routes(app);


app.listen(settings.port, function () {
	console.log( "Escuchando en el puerto " + settings.port );
}).on('error', function (e) {
  	if (e.code === 'EADDRINUSE') {
    	console.log('Address in USE');
  	}
});


