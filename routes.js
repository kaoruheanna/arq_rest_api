var route = require('./controllers');
var settings = require('./settings');

module.exports = function (app) {
	var successCB = function(res,data){
		res.send({
			success: true,
			data: data
		});
	};

	var errorCB = function(res, error){
		res.send({
			success: false,
			error: 'internal'
		});
	};

    
    app.route('/alumno')
    	.get( function (req, res) {
        	route.alumno.list(req.models, function(err,data){
        		if (err){
        			errorCB(res, err);
        		} else {
        			successCB(res,data);
        		}
        	});
		});
        //.get(route.alumno.list);
        //.post(route.alumno.add);
    app.get('/materia/:parentId/curso/:id', function(req,res){
    	route.materia.alumnosInscriptos(req.params.id, req.models, function(err,data){
    		if (err){
    			errorCB(res, err);
    		} else {
    			successCB(res,data);
    		}
    	});
    });

    app.get('/materia/:id/curso', function(req,res){
    	route.materia.listCursos(req.params.id, req.models, function(err,data){
    		if (err){
    			errorCB(res, err);
    		} else {
    			successCB(res,data);
    		}
    	});
    });
       
    app.get('/materia', function (req, res) {
    	route.materia.list(req.models, function(err,data){
    		if (err){
    			errorCB(res, err);
    		} else {
    			successCB(res,data);
    		}
    	});
	});

    // respond with "hello world" when a GET request is made to the homepage
    app.get('/', function (req, res) {
        res.send('HOLA MUNDO!')
    })
};
