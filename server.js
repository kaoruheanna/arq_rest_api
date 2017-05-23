var express = require('express')
var app = express()
var settings = require('./settings');
var routes = require('./routes');
routes(app);

app.listen(settings.port, function () {
	console.log( "Escuchando en el puerto " + settings.port );
}).on('error', function (e) {
  	if (e.code === 'EADDRINUSE') {
    	console.log('Address in USE');
  	}
});


