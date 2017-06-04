var xml2js = require('xml2js');
var builder = new xml2js.Builder();
var express = require('express');
var app = express();
var settings = require('./settings');
//var bodyParser = require('body-parser');
var xmlparser = require('express-xml-bodyparser');
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
    res.set('Content-Type', 'text/xml');
    next();
});
app.use(express.Router());
//app.use(bodyParser.json({ limit: '100mb' }));
app.use(xmlparser({explicitArray: false}));
//routes(app);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    var obj = {name: "Super", Surname: "Man", age: 23};
    var xml = builder.buildObject(obj);
    res.send(xml);
    //res.send('HOLA MUNDO!')
})

app.post('/', function (req, res) {
    console.log("recibi:",req.body.body);
    var obj = {name: req.body.body.nombre, Surname: req.body.body.apellido};
    var xml = builder.buildObject(obj);
    res.send(xml);
    //res.send('HOLA MUNDO!')
})

app.listen(settings.port, function () {
	console.log( "Escuchando en el puerto " + settings.port );
}).on('error', function (e) {
  	if (e.code === 'EADDRINUSE') {
    	console.log('Address in USE');
  	}
});