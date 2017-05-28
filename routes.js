var route = require('./controllers');
var settings = require('./settings');

module.exports = function (app) {
	var successCB = function(res,data){
		var toSend = {
			success: true
		};
		if (data){
			toSend.data = data;
		}
		res.send(toSend);
	};

	var errorCB = function(res, error){
		res.send({
			success: false,
			error: 'internal'
		});
	};

    
    app.delete('/materia/:parentId/curso/:cursoId/alumno/:alumnoId', function(req,res){
    	route.materia.desinscribir(req.params.cursoId, req.params.alumnoId, req.models, function(err,data){
    		if (err){
    			errorCB(res, err);
    		} else {
    			successCB(res,data);
    		}
    	});
    });

    // devuelve los alumnos candidatos a inscripcion
    app.get('/materia/:materiaId/curso/:cursoId/alumno', function(req,res){
    	route.materia.candidatos(req.params.materiaId, req.models, function(err,data){
    		if (err){
    			errorCB(res, err);
    		} else {
    			successCB(res,data);
    		}
    	});
    });

    app.post('/materia/:materiaId/curso/:cursoId/alumno', function(req,res){
    	route.materia.inscribir(req.body.cursoId, req.body.alumnoId, req.models, function(err,data){
    		if (err){
    			errorCB(res, err);
    		} else {
    			successCB(res,data);
    		}
    	});
    });

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
